/**
 * NGÂN HÀNG CÂU HỎI MẪU (30 CÂU)
 * Cấu trúc:
 * - question: Nội dung câu hỏi
 * - options: Mảng 4 đáp án
 * - answer: Vị trí index (0 -> 3) của đáp án đúng
 * - explanation: Giải thích ngắn gọn cho đáp án
 */
const quizQuestions = [
  {
    question: "Tác phẩm nào đánh dấu sự ra đời của Chủ nghĩa xã hội khoa học?",
    options: [
      "Bộ Tư bản",
      "Tuyên ngôn của Đảng cộng sản",
      "Chống Đuy-rinh",
      "Hệ tư tưởng Đức"
    ],
    answer: 1,
    explanation: "Tác phẩm 'Tuyên ngôn của Đảng cộng sản' (2/1848) của C.Mác và Ph.Ănghen đánh dấu sự ra đời chính thức của CNXH khoa học."
  },
  {
    question: "Ai là tác giả của tác phẩm nổi tiếng 'Không tưởng' (Utopia)?",
    options: [
      "Tômát Morơ (Thomas More)",
      "Xanh Xi-mông (Saint-Simon)",
      "Sáclơ Phuriê (Charles Fourier)",
      "Rôbơt Ôoen (Robert Owen)"
    ],
    answer: 0,
    explanation: "Thomas More là tác giả của cuốn tiểu thuyết Utopia xuất bản năm 1516."
  },
  {
    question: "Giai cấp nào có lợi ích cơ bản đối lập trực tiếp với lợi ích của giai cấp tư sản?",
    options: [
      "Giai cấp nông dân",
      "Tầng lớp trí thức",
      "Giai cấp công nhân",
      "Tầng lớp tiểu tư sản"
    ],
    answer: 2,
    explanation: "Giai cấp công nhân là lực lượng lao động làm thuê, bị bóc lột giá trị thặng dư nên đối lập lợi ích cơ bản với giai cấp tư sản."
  },
  {
    question: "Nhà nước xã hội chủ nghĩa đầu tiên trên thế giới ra đời năm nào?",
    options: [
      "Năm 1871 (Công xã Paris)",
      "Năm 1917 (Nhà nước Xô Viết)",
      "Năm 1945 (Việt Nam)",
      "Năm 1949 (Trung Quốc)"
    ],
    answer: 1,
    explanation: "Cách mạng Tháng Mười Nga năm 1917 thành công đã lập nên Nhà nước Xô Viết - nhà nước XHCN đầu tiên trên thế giới."
  },
  {
    question: "Phạm trù nào được xác định là trung tâm của Chủ nghĩa xã hội khoa học?",
    options: [
      "Cách mạng xã hội chủ nghĩa",
      "Chuyên chính vô sản",
      "Sứ mệnh lịch sử của giai cấp công nhân",
      "Thời kỳ quá độ lên CNXH"
    ],
    answer: 2,
    explanation: "Sứ mệnh lịch sử của giai cấp công nhân là phạm trù cơ bản và trung tâm xuyên suốt học thuyết CNXH khoa học."
  },
  {
    question: "Theo Hiến pháp năm 2013, lãnh thổ nước Cộng hòa XHCN Việt Nam bao gồm:",
    options: [
      "Đất liền, hải đảo, vùng biển và vùng trời",
      "Đất liền, vùng biển và thềm lục địa",
      "Vùng đất liền và hải đảo xa bờ",
      "Đất liền, các đảo và toàn bộ thềm lục địa"
    ],
    answer: 0,
    explanation: "Hiến pháp 2013 quy định toàn vẹn lãnh thổ bao gồm: đất liền, hải đảo, vùng biển và vùng trời."
  },
  {
    question: "Việt Nam hiện nay có bao nhiêu dân tộc cùng sinh sống?",
    options: [
      "53 dân tộc",
      "54 dân tộc",
      "55 dân tộc",
      "56 dân tộc"
    ],
    answer: 1,
    explanation: "Cộng đồng các dân tộc Việt Nam gồm 54 dân tộc anh em cùng chung sống hòa thuận."
  },
  {
    question: "Tổ chức nào trực tiếp thực thi quyền lực dân chủ của nhân dân trong hệ thống chính trị?",
    options: [
      "Mặt trận Tổ quốc",
      "Nhà nước",
      "Các đoàn thể thanh niên",
      "Các hội nhóm xã hội"
    ],
    answer: 1,
    explanation: "Nhà nước là công cụ, tổ chức quyền lực công để hiện thực hóa và trực tiếp thực thi dân chủ của nhân dân."
  },
  {
    question: "Nền tảng tư tưởng và kim chỉ nam cho hành động của Đảng Cộng sản Việt Nam là gì?",
    options: [
      "Chủ nghĩa Mác - Lênin",
      "Tư tưởng Hồ Chí Minh",
      "Chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh",
      "Truyền thống yêu nước và bản sắc dân tộc"
    ],
    answer: 2,
    explanation: "Đảng ta luôn khẳng định lấy Chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động."
  },
  {
    question: "Nguồn gốc lý luận trực tiếp dẫn đến sự ra đời của Chủ nghĩa xã hội khoa học là gì?",
    options: [
      "Triết học cổ điển Đức",
      "Kinh tế chính trị học cổ điển Anh",
      "Chủ nghĩa xã hội không tưởng - phê phán Pháp và Anh",
      "Phong trào giải phóng dân tộc Á - Phi"
    ],
    answer: 2,
    explanation: "Chủ nghĩa xã hội không tưởng - phê phán thế kỷ XIX (Xanh Xi-mông, Phuriê, Ôoen) là tiền đề lý luận trực tiếp."
  },
  {
    question: "Hình thức quá độ từ CNTB lên CNXH có mấy loại hình chủ yếu?",
    options: [
      "Trực tiếp và gián tiếp",
      "Tự nhiên và nhân tạo",
      "Tiệm tiến và bùng nổ",
      "Hòa bình và quân sự"
    ],
    answer: 0,
    explanation: "Chủ nghĩa Mác - Lênin chỉ rõ hai con đường: Quá độ trực tiếp (từ các nước tư bản phát triển) và quá độ gián tiếp (từ các nước tiền tư bản)."
  },
  {
    question: "Mục tiêu tổng quát đến năm 2045 của Việt Nam là gì?",
    options: [
      "Trở thành nước đang phát triển có thu nhập trung bình cao",
      "Trở thành nước phát triển, thu nhập cao",
      "Trở thành trung tâm công nghiệp lớn nhất Đông Nam Á",
      "Đạt mức phát triển ngang tầm các cường quốc G7"
    ],
    answer: 1,
    explanation: "Nghị quyết Đại hội XIII xác định mục tiêu đến năm 2045: Việt Nam trở thành nước phát triển, thu nhập cao theo định hướng XHCN."
  },
  {
    question: "Đội tiên phong chính trị của giai cấp công nhân là tổ chức nào?",
    options: [
      "Nghiệp đoàn lao động",
      "Đảng cộng sản",
      "Nhà nước pháp quyền",
      "Hội liên hiệp lao động quốc tế"
    ],
    answer: 1,
    explanation: "Đảng Cộng sản là đội tiên phong của giai cấp công nhân, đại biểu trung thành cho lợi ích của giai cấp và toàn dân tộc."
  },
  {
    question: "Quan hệ nào là mối liên kết tự nhiên và bền chặt nhất giữa các thành viên trong gia đình?",
    options: [
      "Quan hệ huyết thống",
      "Quan hệ kinh tế nuôi dưỡng",
      "Quan hệ hôn nhân pháp lý",
      "Quan hệ đạo đức truyền thống"
    ],
    answer: 0,
    explanation: "Quan hệ huyết thống là quan hệ tự nhiên gắn kết sinh học và tình cảm sâu sắc nhất giữa cha mẹ, con cái và anh em."
  },
  {
    question: "Phương châm thực hiện dân chủ ở cơ sở tại Việt Nam theo luật mới nhất là:",
    options: [
      "Dân biết, dân bàn, dân làm, dân kiểm tra",
      "Dân biết, dân làm, dân quản lý, dân hưởng thụ",
      "Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng",
      "Dân đồng tình, dân thực hiện, dân thụ hưởng"
    ],
    answer: 2,
    explanation: "Luật Thực hiện dân chủ ở cơ sở quy định đầy đủ: 'Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng'."
  },
  {
    question: "Hình thức cộng đồng người nào phát triển cao nhất trong lịch sử nhân loại tính đến nay?",
    options: [
      "Thị tộc",
      "Bộ lạc",
      "Bộ tộc",
      "Dân tộc"
    ],
    answer: 3,
    explanation: "Tiến trình phát triển cộng đồng người theo thứ tự từ thấp đến cao: Thị tộc -> Bộ lạc -> Bộ tộc -> Dân tộc."
  },
  {
    question: "Yếu tố cơ bản nhất để phân biệt một tộc người này với tộc người khác là gì?",
    options: [
      "Địa bàn cư trú",
      "Ý thức tự giác tộc người",
      "Thu nhập kinh tế",
      "Trang phục truyền thống"
    ],
    answer: 1,
    explanation: "Ý thức tự giác tộc người (tự nhận thức về cội nguồn, tên gọi, ngôn ngữ mẹ đẻ) là tiêu chí hàng đầu định vị bản sắc tộc người."
  },
  {
    question: "Giai đoạn đầu (bậc thấp) của hình thái kinh tế - xã hội cộng sản chủ nghĩa là:",
    options: [
      "Thời kỳ quá độ",
      "Chủ nghĩa xã hội",
      "Chủ nghĩa cộng sản hoàn thiện",
      "Dân chủ nhân dân"
    ],
    answer: 1,
    explanation: "Chủ nghĩa xã hội chính là giai đoạn thấp của hình thái kinh tế - xã hội cộng sản chủ nghĩa."
  },
  {
    question: "Mốc thời gian Việt Nam và Hoa Kỳ chính thức bình thường hóa quan hệ ngoại giao là:",
    options: [
      "Năm 1975",
      "Năm 1986",
      "Năm 1995",
      "Năm 2000"
    ],
    answer: 2,
    explanation: "Ngày 11/7/1995, hai nước chính thức tuyên bố bình thường hóa quan hệ ngoại giao, phá vỡ hoàn toàn thế cấm vận."
  },
  {
    question: "Tính chính trị của tôn giáo xuất hiện trong hoàn cảnh lịch sử nào?",
    options: [
      "Khi tôn giáo bắt đầu xây dựng giáo hội",
      "Khi xã hội phân chia giai cấp và có đối kháng lợi ích",
      "Từ thời kỳ công xã nguyên thủy",
      "Khi con người biết ghi chép kinh sách"
    ],
    answer: 1,
    explanation: "Tính chính trị xuất hiện khi các giai cấp bóc lột lợi dụng tôn giáo để phục vụ mưu đồ và địa vị thống trị của mình."
  },
  {
    question: "Nguyên nhân kinh tế - xã hội chủ yếu cho sự ra đời của niềm tin tôn giáo là gì?",
    options: [
      "Sự bất lực trước các tai ương tự nhiên",
      "Sự phân hóa xã hội, bất công và áp bức giai cấp không giải thích được",
      "Sự tưởng tượng phong phú của các triết gia",
      "Nhu cầu sinh hoạt ca múa cộng đồng"
    ],
    answer: 1,
    explanation: "Nguồn gốc kinh tế - xã hội bắt nguồn từ sự phân hóa giai cấp, áp bức bóc lột khiến người nghèo tìm đến tôn giáo như chỗ dựa tinh thần."
  },
  {
    question: "Tờ báo cách mạng đầu tiên của Việt Nam do lãnh tụ Nguyễn Ái Quốc sáng lập là:",
    options: [
      "Báo Thanh Niên",
      "Báo Người Cùng Khổ (Le Paria)",
      "Báo Nhân Dân",
      "Báo Cờ Giải Phóng"
    ],
    answer: 0,
    explanation: "Báo Thanh Niên do Nguyễn Ái Quốc sáng lập ra số đầu tiên ngày 21/6/1925, đặt nền móng cho báo chí cách mạng Việt Nam."
  },
  {
    question: "Mô hình gia đình phổ biến nhất trong xã hội công nghiệp hiện đại là gì?",
    options: [
      "Gia đình nhiều thế hệ (Tam đại đồng đường)",
      "Gia đình hạt nhân (chỉ có bố mẹ và con)",
      "Gia đình truyền thống mẫu hệ",
      "Gia đình gia tộc mở rộng"
    ],
    answer: 1,
    explanation: "Gia đình hạt nhân gồm hai thế hệ (cha mẹ và con cái) là mô hình linh hoạt, thích ứng cao trong xã hội hiện đại."
  },
  {
    question: "Cơ sở nền tảng hình thành nên một gia đình hợp pháp là:",
    options: [
      "Quan hệ kinh tế độc lập",
      "Quan hệ hôn nhân và quan hệ huyết thống",
      "Sự bảo trợ của họ hàng",
      "Hợp đồng tài sản cá nhân"
    ],
    answer: 1,
    explanation: "Quan hệ hôn nhân (pháp lý) và quan hệ huyết thống (tự nhiên) là hai trụ cột căn bản hình thành nên gia đình."
  },
  {
    question: "Bản chất của nhà nước xã hội chủ nghĩa về mặt kinh tế dựa trên chế độ sở hữu nào?",
    options: [
      "Chế độ sở hữu tư nhân tuyệt đối",
      "Chế độ công hữu về các tư liệu sản xuất chủ yếu",
      "Chế độ phân chia đất đai cho địa chủ",
      "Chế độ tập đoàn tư bản xuyên quốc gia"
    ],
    answer: 1,
    explanation: "Về kinh tế, nhà nước XHCN dựa trên chế độ công hữu về các tư liệu sản xuất chủ yếu nhằm phục vụ lợi ích nhân dân."
  },
  {
    question: "Hình thức dân chủ trực tiếp của nhân dân được biểu hiện rõ nhất qua hành động nào?",
    options: [
      "Bầu cử đại biểu Quốc hội và Hội đồng nhân dân",
      "Ủy quyền cho đại biểu biểu quyết",
      "Thông qua các bài phát biểu trên báo chí",
      "Chấp hành các chính sách ban hành"
    ],
    answer: 0,
    explanation: "Tham gia trực tiếp bỏ phiếu bầu cử hay trưng cầu ý dân là hình thức thực hiện quyền dân chủ trực tiếp tiêu biểu nhất."
  },
  {
    question: "Ai là người sáng lập ra Quốc tế thứ ba (Quốc tế Cộng sản) năm 1919?",
    options: [
      "C.Mác",
      "Ph.Ănghen",
      "V.I.Lênin",
      "I.V.Stalin"
    ],
    answer: 2,
    explanation: "V.I.Lênin đã sáng lập ra Quốc tế Cộng sản (Quốc tế III) tại Mát-xcơ-va vào tháng 3 năm 1919."
  },
  {
    question: "Khối liên minh nào là nền tảng vững chắc của nhà nước xã hội chủ nghĩa?",
    options: [
      "Liên minh công nhân - tư sản - tiểu thương",
      "Liên minh công nhân - nông dân - tầng lớp trí thức",
      "Khối thống nhất doanh nhân và tri thức trẻ",
      "Liên kết kinh tế giữa nhà nước và tư nhân"
    ],
    answer: 1,
    explanation: "Khối liên minh giữa giai cấp công nhân với nông dân và đội ngũ trí thức là nền tảng chính trị - xã hội của nhà nước XHCN."
  },
  {
    question: "Tính chất nào của tôn giáo thể hiện qua việc các nghi lễ dần thay đổi để phù hợp với thời đại mới?",
    options: [
      "Tính lịch sử",
      "Tính giáo điều",
      "Tính quần chúng",
      "Tính chính trị"
    ],
    answer: 0,
    explanation: "Tính lịch sử cho thấy tôn giáo có sự biến đổi và thích nghi qua từng giai đoạn phát triển nhất định của xã hội loài người."
  },
  {
    question: "Công xã Paris (năm 1871) - hình thức nhà nước kiểu mới của giai cấp công nhân tồn tại trong bao nhiêu ngày?",
    options: [
      "62 ngày",
      "72 ngày",
      "82 ngày",
      "92 ngày"
    ],
    answer: 1,
    explanation: "Công xã Paris chỉ tồn tại trong 72 ngày ngắn ngủi nhưng đã để lại nhiều bài học kinh nghiệm sâu sắc cho phong trào vô sản thế giới."
  }
];