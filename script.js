/**
 * TRÌNH ĐIỀU KHIỂN HỆ THỐNG QUIZ STUDY (script.js)
 * Chức năng:
 * - Trộn câu hỏi và trộn thứ tự đáp án (không làm sai lệch đáp án đúng).
 * - Đếm giờ, thanh tiến trình, hiển thị màu đúng/sai tức thì kèm giải thích.
 * - Lưu thống kê tổng hợp (tổng câu, câu đúng, tỷ lệ) vào LocalStorage.
 * - Hỗ trợ chế độ "Ôn lại các câu trả lời sai".
 */

// --- 1. BIẾN TRẠNG THÁI (STATE) ---
let currentQuizSet = [];          // Danh sách câu hỏi đang làm
let currentQuestionIndex = 0;     // Vị trí câu hỏi hiện tại
let score = 0;                    // Số câu đúng lượt này
let wrongAnswersHistory = [];     // Danh sách các câu làm sai lượt này
let hasAnswered = false;          // Khóa không cho chọn nhiều lần
let timerInterval = null;         // Bộ đếm thời gian
let elapsedSeconds = 0;           // Thời gian làm bài tính bằng giây

// Key lưu trữ LocalStorage
const STORAGE_KEY = 'quiz_study_cumulative_stats';

// --- 2. CÁC PHẦN TỬ GIAO DIỆN (DOM ELEMENTS) ---
const screens = {
  home: document.getElementById('home-screen'),
  quiz: document.getElementById('quiz-screen'),
  result: document.getElementById('result-screen')
};

// Home Elements
const homeTotalAnswered = document.getElementById('home-total-answered');
const homeTotalCorrect = document.getElementById('home-total-correct');
const homeAccuracy = document.getElementById('home-accuracy');
const btnStart = document.getElementById('btn-start');
const btnResetStats = document.getElementById('btn-reset-stats');

// Quiz Elements
const quizProgressText = document.getElementById('quiz-progress-text');
const quizTimer = document.getElementById('quiz-timer');
const progressBarFill = document.getElementById('progress-bar-fill');
const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const feedbackBox = document.getElementById('feedback-box');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackExplanation = document.getElementById('feedback-explanation');
const btnNext = document.getElementById('btn-next');

// Result Elements
const resScore = document.getElementById('res-score');
const resCorrect = document.getElementById('res-correct');
const resWrong = document.getElementById('res-wrong');
const resAccuracy = document.getElementById('res-accuracy');
const resTime = document.getElementById('res-time');
const wrongAnswersContainer = document.getElementById('wrong-answers-container');
const wrongAnswersList = document.getElementById('wrong-answers-list');
const btnRestart = document.getElementById('btn-restart');
const btnReviewWrong = document.getElementById('btn-review-wrong');
const btnGoHome = document.getElementById('btn-go-home');

// --- 3. TIỆN ÍCH HỖ TRỢ (UTILITIES) ---

// Chuyển đổi màn hình hiển thị
function switchScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[screenName].classList.add('active');
}

// Hàm xáo trộn mảng (Fisher-Yates Shuffle)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Chuẩn bị dữ liệu câu hỏi: Xáo trộn câu và xáo trộn đáp án an toàn
function prepareQuizData(rawQuestions) {
  const shuffledQuestions = shuffleArray(rawQuestions);

  return shuffledQuestions.map(item => {
    // Lấy nội dung đáp án đúng ban đầu
    const correctOptionText = item.options[item.answer];
    // Xáo trộn 4 đáp án
    const shuffledOptions = shuffleArray(item.options);
    // Tìm index mới của đáp án đúng sau khi đã xáo trộn
    const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

    return {
      question: item.question,
      options: shuffledOptions,
      answer: newCorrectIndex,
      explanation: item.explanation
    };
  });
}

// Định dạng thời gian (giây -> MM:SS)
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}

// --- 4. QUẢN LÝ BỘ ĐẾM GIỜ ---
function startTimer() {
  clearInterval(timerInterval);
  elapsedSeconds = 0;
  quizTimer.textContent = `⏱️ 00:00`;
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    quizTimer.textContent = `⏱️ ${formatTime(elapsedSeconds)}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// --- 5. QUẢN LÝ LOCALSTORAGE (THỐNG KÊ LŨY KẾ) ---
function loadHomeStats() {
  const rawData = localStorage.getItem(STORAGE_KEY);
  if (!rawData) {
    homeTotalAnswered.textContent = '0';
    homeTotalCorrect.textContent = '0';
    homeAccuracy.textContent = '0%';
    return;
  }

  const stats = JSON.parse(rawData);
  homeTotalAnswered.textContent = stats.totalAnswered;
  homeTotalCorrect.textContent = stats.totalCorrect;
  const rate = stats.totalAnswered > 0 
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) 
    : 0;
  homeAccuracy.textContent = `${rate}%`;
}

function updateLocalStorageStats(answeredCount, correctCount) {
  const rawData = localStorage.getItem(STORAGE_KEY);
  let stats = rawData ? JSON.parse(rawData) : { totalAnswered: 0, totalCorrect: 0 };

  stats.totalAnswered += answeredCount;
  stats.totalCorrect += correctCount;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

// --- 6. TIẾN TRÌNH LÀM BÀI TRẮC NGHIỆM ---

// Khởi tạo bài trắc nghiệm mới
function startQuiz(questionsList) {
  if (!questionsList || questionsList.length === 0) {
    alert("Không có câu hỏi nào để ôn tập!");
    return;
  }

  currentQuizSet = prepareQuizData(questionsList);
  currentQuestionIndex = 0;
  score = 0;
  wrongAnswersHistory = [];
  
  switchScreen('quiz');
  startTimer();
  renderQuestion();
}

// Hiển thị câu hỏi hiện tại
function renderQuestion() {
  hasAnswered = false;
  btnNext.classList.add('hidden');
  feedbackBox.classList.add('hidden');
  feedbackBox.className = 'feedback-box hidden';

  const currentQ = currentQuizSet[currentQuestionIndex];
  const total = currentQuizSet.length;

  // Cập nhật text tiến trình & thanh tiến trình (progress bar)
  quizProgressText.textContent = `Câu ${currentQuestionIndex + 1}/${total}`;
  const progressPercent = ((currentQuestionIndex + 1) / total) * 100;
  progressBarFill.style.width = `${progressPercent}%`;

  // Hiển thị câu hỏi
  questionText.textContent = currentQ.question;

  // Tạo 4 nút đáp án A, B, C, D
  optionsGrid.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];

  currentQ.options.forEach((optionText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-tag">${labels[idx]}.</span> <span>${optionText}</span>`;
    btn.addEventListener('click', () => handleSelectOption(idx));
    optionsGrid.appendChild(btn);
  });
}

// Xử lý khi người dùng nhấn chọn đáp án
function handleSelectOption(selectedIndex) {
  if (hasAnswered) return; // Khóa nếu đã trả lời
  hasAnswered = true;

  const currentQ = currentQuizSet[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQ.answer;
  const optionButtons = optionsGrid.querySelectorAll('.option-btn');

  // Khóa tất cả các nút để tránh chọn lại
  optionButtons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    score++;
    optionButtons[selectedIndex].classList.add('correct');
    
    // Hiển thị feedback đúng
    feedbackBox.classList.remove('hidden');
    feedbackBox.classList.add('correct');
    feedbackStatus.textContent = '🎉 Chính xác!';
    feedbackExplanation.textContent = currentQ.explanation;
  } else {
    // Đánh dấu nút đã bấm sai và nút đúng thực sự
    optionButtons[selectedIndex].classList.add('wrong');
    optionButtons[currentQ.answer].classList.add('correct');

    // Lưu lại thông tin câu sai để xem lại ở trang kết quả
    wrongAnswersHistory.push({
      question: currentQ.question,
      userChoice: currentQ.options[selectedIndex],
      correctChoice: currentQ.options[currentQ.answer],
      explanation: currentQ.explanation
    });

    // Hiển thị feedback sai
    feedbackBox.classList.remove('hidden');
    feedbackBox.classList.add('wrong');
    feedbackStatus.textContent = '❌ Chưa chính xác!';
    feedbackExplanation.innerHTML = `<strong>Đáp án đúng:</strong> ${currentQ.options[currentQ.answer]}<br>${currentQ.explanation}`;
  }

  // Đổi nhãn nút nếu là câu cuối cùng
  if (currentQuestionIndex === currentQuizSet.length - 1) {
    btnNext.textContent = 'Hoàn thành & Xem kết quả 🏁';
  } else {
    btnNext.textContent = 'Câu tiếp theo ➡️';
  }

  btnNext.classList.remove('hidden');
}

// Chuyển sang câu tiếp theo
btnNext.addEventListener('click', () => {
  if (!hasAnswered) {
    alert("Vui lòng chọn một đáp án trước khi qua câu tiếp theo!");
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuizSet.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
});

// --- 7. HOÀN THÀNH BÀI & TRANG KẾT QUẢ ---
function finishQuiz() {
  stopTimer();

  const total = currentQuizSet.length;
  const wrongCount = total - score;
  const accuracy = Math.round((score / total) * 100);

  // Lưu thống kê vào LocalStorage
  updateLocalStorageStats(total, score);

  // Hiển thị dữ liệu lên trang kết quả
  resScore.textContent = `${score}/${total}`;
  resCorrect.textContent = score;
  resWrong.textContent = wrongCount;
  resAccuracy.textContent = `${accuracy}%`;
  resTime.textContent = formatTime(elapsedSeconds);

  // Xử lý nút "Ôn lại câu sai"
  if (wrongAnswersHistory.length === 0) {
    btnReviewWrong.style.display = 'none';
    wrongAnswersContainer.classList.add('hidden');
  } else {
    btnReviewWrong.style.display = 'inline-flex';
    wrongAnswersContainer.classList.remove('hidden');
    renderWrongAnswersList();
  }

  switchScreen('result');
}

// Hiển thị danh sách chi tiết các câu đã làm sai
function renderWrongAnswersList() {
  wrongAnswersList.innerHTML = '';
  wrongAnswersHistory.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'wrong-item';
    card.innerHTML = `
      <div class="wrong-item-title">Câu ${index + 1}: ${item.question}</div>
      <div class="wrong-item-row text-red"><strong>Bạn đã chọn:</strong> ${item.userChoice}</div>
      <div class="wrong-item-row text-green"><strong>Đáp án đúng:</strong> ${item.correctChoice}</div>
      <div class="wrong-item-exp"><strong>Giải thích:</strong> ${item.explanation}</div>
    `;
    wrongAnswersList.appendChild(card);
  });
}

// --- 8. SỰ KIỆN ĐIỀU HƯỚNG VÀ TƯƠNG TÁC ---

// Bắt đầu làm bài từ trang chủ
btnStart.addEventListener('click', () => {
  startQuiz(quizQuestions);
});

// Làm lại toàn bộ từ đầu
btnRestart.addEventListener('click', () => {
  startQuiz(quizQuestions);
});

// Ôn lại duy nhất các câu đã làm sai
btnReviewWrong.addEventListener('click', () => {
  if (wrongAnswersHistory.length === 0) return;

  // Lọc lại các câu hỏi gốc tương ứng với các câu sai
  const questionsToReview = quizQuestions.filter(q => 
    wrongAnswersHistory.some(wrong => wrong.question === q.question)
  );

  startQuiz(questionsToReview);
});

// Quay về trang chủ
btnGoHome.addEventListener('click', () => {
  loadHomeStats();
  switchScreen('home');
});

// Xóa dữ liệu lịch sử
btnResetStats.addEventListener('click', () => {
  if (confirm("Bạn có chắc chắn muốn đặt lại toàn bộ số liệu thống kê?")) {
    localStorage.removeItem(STORAGE_KEY);
    loadHomeStats();
  }
});

// Khởi chạy khi nạp trang
document.addEventListener('DOMContentLoaded', () => {
  loadHomeStats();
});