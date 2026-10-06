/**
 * App Logic cho Quiz Study
 * Cấu trúc này được viết bằng JS thuần nhưng phân tách state/UI riêng biệt,
 * tư duy Component-based. Rất thuận tiện để sau này bạn chuyển sang ReactJS
 * hoặc mở rộng thành kiến trúc Full-stack với Node.js/Express.
 */

// --- Quản lý State (Trạng thái) ---
const state = {
    currentQuestions: [],
    currentIndex: 0,
    score: 0,
    wrongAnswersList: [],
    timerInterval: null,
    timeElapsed: 0 // giây
};

// --- DOM Elements ---
const DOM = {
    screens: {
        home: document.getElementById('home-screen'),
        quiz: document.getElementById('quiz-screen'),
        result: document.getElementById('result-screen')
    },
    home: {
        total: document.getElementById('stat-total'),
        correct: document.getElementById('stat-correct'),
        accuracy: document.getElementById('stat-accuracy')
    },
    quiz: {
        counter: document.getElementById('question-counter'),
        timer: document.getElementById('timer'),
        progressBar: document.getElementById('progress-bar'),
        questionText: document.getElementById('question-text'),
        optionsGrid: document.getElementById('options-grid'),
        feedbackContainer: document.getElementById('feedback-container'),
        feedbackMsg: document.getElementById('feedback-message'),
        feedbackExp: document.getElementById('feedback-explanation'),
        btnNext: document.getElementById('btn-next')
    },
    result: {
        score: document.getElementById('final-score'),
        time: document.getElementById('final-time'),
        accuracy: document.getElementById('final-accuracy'),
        wrongContainer: document.getElementById('wrong-answers-container'),
        wrongList: document.getElementById('wrong-answers-list'),
        btnRetryWrong: document.getElementById('btn-retry-wrong')
    }
};

// --- Khởi tạo ứng dụng ---
document.addEventListener('DOMContentLoaded', () => {
    updateHomeStats();
    
    // Đăng ký sự kiện (Event Listeners)
    document.getElementById('btn-set1').addEventListener('click', () => startQuiz('set1'));
    document.getElementById('btn-set2').addEventListener('click', () => startQuiz('set2'));
    document.getElementById('btn-set3').addEventListener('click', () => startQuiz('set3'));
    document.getElementById('btn-set-short').addEventListener('click', () => startQuiz('setShort'));
    document.getElementById('btn-set-all').addEventListener('click', () => startQuiz('all'));
    document.getElementById('btn-retry').addEventListener('click', () => startQuiz(state.currentMode));
    DOM.result.btnRetryWrong.addEventListener('click', () => startQuiz('wrong'));
    document.getElementById('btn-home').addEventListener('click', () => showScreen('home'));
    DOM.quiz.btnNext.addEventListener('click', nextQuestion);
});

// Chuyển đổi giữa các màn hình
function showScreen(screenName) {
    Object.values(DOM.screens).forEach(screen => screen.classList.remove('active'));
    DOM.screens[screenName].classList.add('active');
    if(screenName === 'home') updateHomeStats();
}

// --- Logic Trắc nghiệm ---

// Bắt đầu làm bài (mode: 'all' hoặc 'wrong')
function startQuiz(mode) {
    state.currentMode = mode;
    if (mode === 'set1') {
        state.currentQuestions = shuffleArray([...questionSets.set1]);
    } else if (mode === 'set2') {
        state.currentQuestions = shuffleArray([...questionSets.set2]);
    } else if (mode === 'set3') {
        state.currentQuestions = shuffleArray([...questionSets.set3]);
    } else if (mode === 'setShort') {
        state.currentQuestions = shuffleArray([...questionSets.setShort]);
    } else if (mode === 'all') {
        const allQuestions = [...questionSets.set1, ...questionSets.set2, ...questionSets.set3, ...questionSets.setShort];
        state.currentQuestions = shuffleArray(allQuestions);
    } else if (mode === 'wrong') {
        state.currentQuestions = shuffleArray([...state.wrongAnswersList.map(item => item.questionObj)]);
    }

    if (state.currentQuestions.length === 0) {
        alert("Không có câu hỏi nào để hiển thị!");
        return;
    }

    // Reset state
    state.currentIndex = 0;
    state.score = 0;
    state.wrongAnswersList = [];
    state.timeElapsed = 0;
    
    startTimer();
    showScreen('quiz');
    renderQuestion();
}

// Render nội dung 1 câu hỏi
function renderQuestion() {
    const q = state.currentQuestions[state.currentIndex];
    
    // Cập nhật Header & Thanh tiến trình
    DOM.quiz.counter.textContent = `Câu ${state.currentIndex + 1}/${state.currentQuestions.length}`;
    const progressPercent = (state.currentIndex / state.currentQuestions.length) * 100;
    DOM.quiz.progressBar.style.width = `${progressPercent}%`;
    
    // Hiển thị nội dung câu hỏi
    DOM.quiz.questionText.textContent = q.question;
    
    // Xử lý xáo trộn thứ tự các lựa chọn đáp án
    DOM.quiz.optionsGrid.innerHTML = '';
    
    // Map đáp án với thuộc tính isCorrect để khi xáo trộn không bị mất vị trí đáp án đúng
    let mappedOptions = q.options.map((optText, index) => ({
        text: optText,
        isCorrect: index === q.answer
    }));
    mappedOptions = shuffleArray(mappedOptions);
    
    // Render các nút đáp án
    mappedOptions.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.text;
        btn.addEventListener('click', () => handleSelectOption(btn, opt, mappedOptions, q));
        DOM.quiz.optionsGrid.appendChild(btn);
    });

    // Reset UI trạng thái
    DOM.quiz.feedbackContainer.classList.add('hidden');
    DOM.quiz.btnNext.classList.add('hidden');
}

// Xử lý khi người dùng click chọn 1 đáp án
function handleSelectOption(selectedBtn, selectedOpt, allOptions, questionObj) {
    // 1. Vô hiệu hóa (disable) tất cả các nút đáp án để tránh click nhiều lần
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    // 2. Reset classes cho feedback container
    DOM.quiz.feedbackContainer.className = 'feedback'; 
    
    // 3. Kiểm tra đúng/sai
    if (selectedOpt.isCorrect) {
        selectedBtn.classList.add('correct');
        DOM.quiz.feedbackContainer.classList.add('success');
        DOM.quiz.feedbackMsg.textContent = '✅ Chính xác!';
        state.score++;
    } else {
        selectedBtn.classList.add('wrong');
        DOM.quiz.feedbackContainer.classList.add('error');
        DOM.quiz.feedbackMsg.textContent = '❌ Chưa chính xác!';
        
        // Highlight hiển thị đáp án đúng thực sự
        const correctIndex = allOptions.findIndex(o => o.isCorrect);
        buttons[correctIndex].classList.add('correct');
        
        // Lưu câu sai vào mảng để phục vụ màn hình kết quả / tính năng ôn tập
        state.wrongAnswersList.push({
            questionObj: questionObj,
            userChoice: selectedOpt.text,
            correctChoice: allOptions[correctIndex].text,
            explanation: questionObj.explanation
        });
    }
    
    // 4. Hiển thị giải thích & nút Next
    DOM.quiz.feedbackExp.textContent = questionObj.explanation || '';
    DOM.quiz.feedbackContainer.classList.remove('hidden');
    DOM.quiz.btnNext.classList.remove('hidden');
}

// Chuyển sang câu tiếp theo
function nextQuestion() {
    state.currentIndex++;
    if (state.currentIndex < state.currentQuestions.length) {
        renderQuestion();
    } else {
        endQuiz(); // Hết câu hỏi
    }
}

// Kết thúc bài làm
function endQuiz() {
    stopTimer();
    
    // Kéo thanh progress đầy 100%
    DOM.quiz.progressBar.style.width = `100%`;
    
    // Lưu kết quả vào LocalStorage
    saveToLocalStorage(state.currentQuestions.length, state.score);
    
    // Cập nhật UI màn hình kết quả
    DOM.result.score.textContent = `${state.score}/${state.currentQuestions.length}`;
    DOM.result.time.textContent = formatTime(state.timeElapsed);
    
    const accuracy = Math.round((state.score / state.currentQuestions.length) * 100);
    DOM.result.accuracy.textContent = accuracy;
    
    // Vẽ danh sách các câu trả lời sai
    if (state.wrongAnswersList.length > 0) {
        DOM.result.wrongContainer.classList.remove('hidden');
        DOM.result.btnRetryWrong.classList.remove('hidden');
        
        DOM.result.wrongList.innerHTML = state.wrongAnswersList.map((item, idx) => `
            <div class="wrong-item">
                <h4>Câu ${idx + 1}: ${item.questionObj.question}</h4>
                <p>Bạn đã chọn: <span class="text-danger">${item.userChoice}</span></p>
                <p>Đáp án đúng: <span class="text-success">${item.correctChoice}</span></p>
                ${item.explanation ? `<p class="explanation-text">💡 Giải thích: ${item.explanation}</p>` : ''}
            </div>
        `).join('');
    } else {
        DOM.result.wrongContainer.classList.add('hidden');
        DOM.result.btnRetryWrong.classList.add('hidden');
    }
    
    showScreen('result');
}

// --- Tiện ích (Helpers) ---

// Thuật toán xáo trộn mảng (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- Bộ đếm thời gian ---
function startTimer() {
    DOM.quiz.timer.textContent = formatTime(state.timeElapsed);
    state.timerInterval = setInterval(() => {
        state.timeElapsed++;
        DOM.quiz.timer.textContent = formatTime(state.timeElapsed);
    }, 1000);
}

function stopTimer() {
    clearInterval(state.timerInterval);
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// --- LocalStorage ---
function saveToLocalStorage(totalQ, correctQ) {
    let stats = JSON.parse(localStorage.getItem('quizStats')) || { played: 0, correct: 0, total: 0 };
    stats.played++;
    stats.correct += correctQ;
    stats.total += totalQ;
    localStorage.setItem('quizStats', JSON.stringify(stats));
}

function updateHomeStats() {
    let stats = JSON.parse(localStorage.getItem('quizStats')) || { played: 0, correct: 0, total: 0 };
    DOM.home.total.textContent = stats.total;
    DOM.home.correct.textContent = stats.correct;
    
    const accuracy = stats.total === 0 ? 0 : Math.round((stats.correct / stats.total) * 100);
    DOM.home.accuracy.textContent = `${accuracy}%`;
}
