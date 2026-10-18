const fs = require('fs');

const phase2Lessons = [
  {
    id: "toan-ltdh-k6",
    subject: "Môn TOÁN",
    grade: "Khối 6",
    gradeNumber: 6,
    title: "📐 TOÁN 6: Số học, Phân số, Số thập phân & Hình học trực quan",
    description: "Tập hợp số tự nhiên, tính chất chia hết, số nguyên, phân số, số thập phân và các hình phẳng trực quan (tam giác đều, hình vuông, lục giác đều, hình thoi).",
    iconName: "Calculator",
    color: "from-blue-600 to-indigo-700",
    isSpecialExam: true
  },
  {
    id: "toan-ltdh-k7",
    subject: "Môn TOÁN",
    grade: "Khối 7",
    gradeNumber: 7,
    title: "📐 TOÁN 7: Số hữu tỉ, Số thực, Đa thức & Tam giác bằng nhau",
    description: "Cộng trừ nhân chia số hữu tỉ, căn bậc hai số học, đơn thức - đa thức một biến, các trường hợp bằng nhau của tam giác và định lý Pythagore.",
    iconName: "Calculator",
    color: "from-blue-600 to-indigo-700",
    isSpecialExam: true
  },
  {
    id: "toan-vao-10",
    subject: "Môn TOÁN",
    grade: "Luyện thi vào 10",
    gradeNumber: 9,
    title: "⭐ TOÁN TUYỂN SINH VÀO 10: Rút gọn biểu thức, Hệ phương trình, Vi-ét & Hình học đường tròn",
    description: "Bộ đề tổng hợp cấu trúc thi vào 10 chính thức: Rút gọn căn thức, giải bài toán bằng cách lập hệ phương trình, định lý Vi-ét tìm m, tiếp tuyến đường tròn và cực trị đại số.",
    iconName: "Award",
    color: "from-amber-500 to-rose-600",
    isSpecialExam: true
  },
  {
    id: "li-ltdh-k6",
    subject: "Môn LÍ",
    grade: "Khối 6",
    gradeNumber: 6,
    title: "⚡ KHTN 6 (VẬT LÍ): Lực, Khối lượng, Trọng lượng & Đo lường",
    description: "Đơn vị đo độ dài, khối lượng, thời gian, nhiệt độ; lực tiếp xúc và không tiếp xúc, lực ma sát, lực cản và năng lượng trong đời sống.",
    iconName: "Zap",
    color: "from-amber-500 to-orange-600",
    isSpecialExam: true
  },
  {
    id: "li-ltdh-k7",
    subject: "Môn LÍ",
    grade: "Khối 7",
    gradeNumber: 7,
    title: "⚡ KHTN 7 (VẬT LÍ): Tốc độ chuyển động, Âm thanh & Ánh sáng",
    description: "Đo tốc độ, đồ thị quãng đường - thời gian, sóng âm, độ to - độ cao của âm thanh, định luật phản xạ ánh sáng và ảnh tạo bởi gương phẳng.",
    iconName: "Zap",
    color: "from-amber-500 to-orange-600",
    isSpecialExam: true
  },
  {
    id: "khtn-vao-10",
    subject: "Môn LÍ",
    grade: "Luyện thi vào 10",
    gradeNumber: 9,
    title: "⭐ KHTN VÀO 10: Tổng hợp Vật Lí (Điện - Quang) & Hóa Học (Vô cơ - Hữu cơ)",
    description: "Đề thi thử môn KHTN / Lí - Hóa tổng hợp vào 10: Định luật Ôm, máy biến thế, khúc xạ ánh sáng, phân loại hợp chất vô cơ, bài toán kim loại và hidrocacbon.",
    iconName: "Sparkles",
    color: "from-emerald-600 to-cyan-700",
    isSpecialExam: true
  },
  {
    id: "anh-ltdh-k6",
    subject: "Môn ANH",
    grade: "Khối 6",
    gradeNumber: 6,
    title: "🇬🇧 TIẾNG ANH 6: Hiện tại đơn, Hiện tại tiếp diễn & Từ vựng căn bản",
    description: "Ngữ pháp cốt lõi lớp 6: Present Simple vs Present Continuous, giới từ chỉ nơi chốn, đại từ sở hữu, danh từ đếm được và không đếm được.",
    iconName: "Globe2",
    color: "from-purple-600 to-indigo-800",
    isSpecialExam: true
  },
  {
    id: "anh-ltdh-k7",
    subject: "Môn ANH",
    grade: "Khối 7",
    gradeNumber: 7,
    title: "🇬🇧 TIẾNG ANH 7: Quá khứ đơn, Tương lai đơn, So sánh & Cụm từ chỉ số lượng",
    description: "Past Simple, Future Simple, cấu trúc 'used to', so sánh bằng 'as...as' và khác biệt 'different from', much/many/a lot of.",
    iconName: "Globe2",
    color: "from-purple-600 to-indigo-800",
    isSpecialExam: true
  },
  {
    id: "anh-vao-10",
    subject: "Môn ANH",
    grade: "Luyện thi vào 10",
    gradeNumber: 9,
    title: "⭐ TIẾNG ANH TUYỂN SINH VÀO 10: Ngữ âm, Trọng âm, Ngữ pháp tổng hợp & Đọc hiểu",
    description: "Bộ đề thi thử môn Tiếng Anh vào lớp 10 theo form chuẩn: Phát âm đuôi -ed/-s, trọng âm 2-3 âm tiết, câu gián tiếp, câu điều kiện, bị động, mệnh đề quan hệ và bài đọc hiểu điền từ.",
    iconName: "Award",
    color: "from-purple-600 to-pink-600",
    isSpecialExam: true
  }
];

const phase2Questions = {
  // 1. TOÁN KHỐI 6
  "toan-ltdh-k6": [
    {
      id: "toan6-1",
      type: "multiple_choice",
      question: "Tập hợp các ước tự nhiên của số $12$ là tập hợp nào sau đây?",
      options: [
        "$\\{1; 2; 3; 4; 6; 12\\}$",
        "$\\{1; 2; 4; 6; 12\\}$",
        "$\\{2; 3; 4; 6\\}$",
        "$\\{0; 1; 2; 3; 4; 6; 12\\}$"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Các ước của $12$ là các số tự nhiên mà $12$ chia hết: $1, 2, 3, 4, 6, 12$. Lưu ý số $0$ không phải là ước của bất kì số nào.",
      hint: "Liệt kê các số tự nhiên mà $12$ chia hết."
    },
    {
      id: "toan6-2",
      type: "multiple_choice",
      question: "Kết quả của phép tính: $(-15) + (-25)$ là:",
      options: [
        "$-40$",
        "$40$",
        "$-10$",
        "$10$"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Quy tắc cộng hai số nguyên âm: Muốn cộng hai số nguyên âm, ta cộng hai giá trị tuyệt đối rồi đặt dấu '-' trước kết quả: $(-15) + (-25) = -(15 + 25) = -40$.",
      hint: "Cộng hai phần số rồi đặt dấu âm trước kết quả."
    },
    {
      id: "toan6-3",
      type: "multiple_choice",
      question: "Rút gọn phân số $\\frac{24}{36}$ về phân số tối giản ta được:",
      options: [
        "$\\frac{2}{3}$",
        "$\\frac{3}{4}$",
        "$\\frac{4}{6}$",
        "$\\frac{12}{18}$"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Ta chia cả tử và mẫu cho $\\text{ƯCLN}(24, 36) = 12$: $\\frac{24 : 12}{36 : 12} = \\frac{2}{3}$.",
      hint: "Tìm ƯCLN của $24$ và $36$ để rút gọn một bước."
    },
    {
      id: "toan6-4",
      type: "multiple_choice",
      question: "Hình nào sau đây có $4$ cạnh bằng nhau và $4$ góc vuông?",
      options: [
        "Hình vuông",
        "Hình thoi",
        "Hình chữ nhật",
        "Hình bình hành"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Hình vuông là hình có $4$ cạnh bằng nhau và $4$ góc vuông. (Hình thoi có $4$ cạnh bằng nhau nhưng các góc không nhất thiết vuông).",
      hint: "Đặc điểm nhận biết hình vuông."
    },
    {
      id: "toan6-5",
      type: "multiple_choice",
      question: "Một mảnh vườn hình chữ nhật có chiều dài là $25\\text{ m}$, chiều rộng là $12\\text{ m}$. Diện tích mảnh vườn đó là:",
      options: [
        "$300\\text{ m}^2$",
        "$74\\text{ m}^2$",
        "$150\\text{ m}^2$",
        "$300\\text{ m}$"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Diện tích hình chữ nhật là $S = a \\times b = 25 \\times 12 = 300\\text{ m}^2$.",
      hint: "Công thức $S = \\text{dài} \\times \\text{rộng}$."
    },
    {
      id: "toan6-6",
      type: "multiple_choice",
      question: "Tìm số nguyên $x$ thỏa mãn biểu thức: $3x - 5 = -20$. Giá trị của $x$ là:",
      options: [
        "$-5$",
        "$5$",
        "$-25$",
        "$-15$"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      cognitiveLevel: "van_dung",
      explanation: "Ta có: $3x = -20 + 5 \\Rightarrow 3x = -15 \\Rightarrow x = -15 : 3 = -5$.",
      hint: "Chuyển vế $-5$ sang vế phải đổi dấu thành $+5$."
    }
  ],

  // 2. TOÁN KHỐI 7
  "toan-ltdh-k7": [
    {
      id: "toan7-1",
      type: "multiple_choice",
      question: "Số nào sau đây là số vô tỉ?",
      options: [
        "$\\sqrt{2}$",
        "$\\frac{3}{5}$",
        "$0{,}25$",
        "$\\sqrt{9}$"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "$\\sqrt{2} \\approx 1{,}41421356...$ là số thập phân vô hạn không tuần hoàn nên là số vô tỉ. Còn $\\sqrt{9} = 3$ là số hữu tỉ.",
      hint: "Số vô tỉ không thể viết dưới dạng phân số $\\frac{a}{b}$."
    },
    {
      id: "toan7-2",
      type: "multiple_choice",
      question: "Bậc của đa thức $P(x) = 4x^5 - 2x^3 + 7x^2 - 4x^5 + 9x$ là:",
      options: [
        "$3$",
        "$5$",
        "$2$",
        "$1$"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Thu gọn đa thức trước khi xác định bậc: $P(x) = (4x^5 - 4x^5) - 2x^3 + 7x^2 + 9x = -2x^3 + 7x^2 + 9x$. Hạng tử có bậc cao nhất là $-2x^3$ nên bậc của đa thức là $3$.",
      hint: "Cần thu gọn đa thức trước: để ý $4x^5 - 4x^5 = 0$."
    },
    {
      id: "toan7-3",
      type: "multiple_choice",
      question: "Cho $\\triangle ABC$ vuông tại $A$, có $AB = 6\\text{ cm}$ và $AC = 8\\text{ cm}$. Độ dài cạnh huyền $BC$ là:",
      options: [
        "$10\\text{ cm}$",
        "$14\\text{ cm}$",
        "$12\\text{ cm}$",
        "$\\sqrt{28}\\text{ cm}$"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Áp dụng định lý Pythagore trong tam giác vuông $ABC$: $BC^2 = AB^2 + AC^2 = 6^2 + 8^2 = 36 + 64 = 100 \\Rightarrow BC = \\sqrt{100} = 10\\text{ cm}$.",
      hint: "Định lý Pythagore: $BC^2 = AB^2 + AC^2$."
    },
    {
      id: "toan7-4",
      type: "multiple_choice",
      question: "Biết rằng $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k = -3$. Khi $x = 4$ thì giá trị của $y$ bằng:",
      options: [
        "$-12$",
        "$12$",
        "$-\\frac{4}{3}$",
        "$\\frac{4}{3}$"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Công thức tỉ lệ thuận: $y = kx = -3 \\times 4 = -12$.",
      hint: "Thay $x$ vào công thức $y = kx$."
    },
    {
      id: "toan7-5",
      type: "multiple_choice",
      question: "Cho tam giác $ABC$ có $\\widehat{A} = 70^\\circ$ và $\\widehat{B} = 50^\\circ$. Số đo của góc $\\widehat{C}$ là:",
      options: [
        "$60^\\circ$",
        "$70^\\circ$",
        "$50^\\circ$",
        "$120^\\circ$"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Tổng ba góc trong một tam giác bằng $180^\\circ$: $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) = 180^\\circ - (70^\\circ + 50^\\circ) = 60^\\circ$.",
      hint: "Tổng 3 góc trong một tam giác luôn bằng $180^\\circ$."
    },
    {
      id: "toan7-6",
      type: "multiple_choice",
      question: "Tìm giá trị nhỏ nhất của biểu thức $A = (x - 3)^2 + |y + 1| + 2026$. Giá trị nhỏ nhất đó là:",
      options: [
        "$2026$",
        "$0$",
        "$3$",
        "$-1$"
      ],
      correctAnswer: 0,
      difficulty: "van_dung_cao",
      cognitiveLevel: "van_dung_cao",
      explanation: "Vì $(x - 3)^2 \\ge 0$ với mọi $x$ và $|y + 1| \\ge 0$ với mọi $y$, nên $A \\ge 0 + 0 + 2026 = 2026$. Dấu '=' xảy ra khi $x = 3$ và $y = -1$. Vậy $\\min A = 2026$.",
      hint: "Bình phương và giá trị tuyệt đối luôn không âm ($\\ge 0$)."
    }
  ],

  // 3. TOÁN TUYỂN SINH VÀO 10
  "toan-vao-10": [
    {
      id: "toan10-1",
      type: "multiple_choice",
      question: "Rút gọn biểu thức $P = \\left(\\frac{\\sqrt{x}}{\\sqrt{x} - 1} - \\frac{1}{x - \\sqrt{x}}\\right) : \\frac{\\sqrt{x} + 1}{x - 1}$ với $x > 0$ và $x \\ne 1$ ta được kết quả là:",
      options: [
        "$\\sqrt{x} - 1$",
        "$\\sqrt{x} + 1$",
        "$\\frac{\\sqrt{x} - 1}{\\sqrt{x}}$",
        "$1$"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      cognitiveLevel: "van_dung",
      explanation: "Ta có $x - \\sqrt{x} = \\sqrt{x}(\\sqrt{x} - 1)$. Quy đồng trong ngoặc: $\\frac{x - 1}{\\sqrt{x}(\\sqrt{x} - 1)}$. Phép chia nhân đảo ngược: $\\frac{x - 1}{\\sqrt{x}(\\sqrt{x} - 1)} \\times \\frac{(\\sqrt{x}-1)(\\sqrt{x}+1)}{\\sqrt{x}+1} = \\frac{x - 1}{\\sqrt{x}} = \\sqrt{x} - 1$.",
      hint: "Phân tích mẫu số $x - \\sqrt{x} = \\sqrt{x}(\\sqrt{x} - 1)$ rồi quy đồng."
    },
    {
      id: "toan10-2",
      type: "multiple_choice",
      question: "Cho phương trình $x^2 - 2(m + 1)x + m^2 + 3 = 0$. Phương trình có hai nghiệm phân biệt khi và chỉ khi:",
      options: [
        "$m > 1$",
        "$m \\ge 1$",
        "$m < 1$",
        "$m \\ne 1$"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      cognitiveLevel: "van_dung",
      explanation: "Ta có $\\Delta' = (m + 1)^2 - (m^2 + 3) = m^2 + 2m + 1 - m^2 - 3 = 2m - 2$. Phương trình có $2$ nghiệm phân biệt khi $\\Delta' > 0 \\Leftrightarrow 2m - 2 > 0 \\Leftrightarrow m > 1$.",
      hint: "Tính $\\Delta' = b'^2 - ac > 0$."
    },
    {
      id: "toan10-3",
      type: "multiple_choice",
      question: "Hệ phương trình $\\begin{cases} 2x + y = 5 \\\\ 3x - 2y = 4 \\end{cases}$ có nghiệm $(x; y)$ duy nhất là:",
      options: [
        "$(2; 1)$",
        "$(1; 3)$",
        "$(3; -1)$",
        "$(2; -1)$"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Nhân phương trình đầu với $2$: $4x + 2y = 10$. Cộng hai phương trình: $7x = 14 \\Rightarrow x = 2$. Thay vào tìm được $y = 5 - 2(2) = 1$. Vậy nghiệm là $(2; 1)$.",
      hint: "Sử dụng phương pháp cộng đại số triệt tiêu $y$."
    },
    {
      id: "toan10-4",
      type: "multiple_choice",
      question: "Cho đường tròn $(O; R)$ và dây cung $AB = R\\sqrt{3}$. Khoảng cách từ tâm $O$ đến dây $AB$ bằng:",
      options: [
        "$\\frac{R}{2}$",
        "$\\frac{R\\sqrt{3}}{2}$",
        "$\\frac{R\\sqrt{2}}{2}$",
        "$\\frac{R}{4}$"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      cognitiveLevel: "van_dung",
      explanation: "Kẻ $OH \\perp AB$ tại $H$. Suy ra $H$ là trung điểm $AB$, nên $AH = \\frac{AB}{2} = \\frac{R\\sqrt{3}}{2}$. Xét $\\triangle OHA$ vuông tại $H$: $OH = \\sqrt{OA^2 - AH^2} = \\sqrt{R^2 - \\left(\\frac{R\\sqrt{3}}{2}\\right)^2} = \\sqrt{R^2 - \\frac{3R^2}{4}} = \\sqrt{\\frac{R^2}{4}} = \\frac{R}{2}$.",
      hint: "Kẻ đường vuông góc từ tâm đến dây cung và dùng Pythagore."
    },
    {
      id: "toan10-5",
      type: "multiple_choice",
      question: "Góc nội tiếp chắn nửa đường tròn có số đo bằng:",
      options: [
        "$90^\\circ$",
        "$180^\\circ$",
        "$60^\\circ$",
        "$45^\\circ$"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Định lý hình học đường tròn: Góc nội tiếp chắn nửa đường tròn luôn là góc vuông ($90^\\circ$).",
      hint: "Tính chất cơ bản của góc nội tiếp chắn nửa đường tròn."
    },
    {
      id: "toan10-6",
      type: "multiple_choice",
      question: "Cho hai số thực dương $x, y$ thỏa mãn $x + y = 2$. Giá trị nhỏ nhất của biểu thức $M = \\frac{1}{x} + \\frac{1}{y}$ là:",
      options: [
        "$2$",
        "$1$",
        "$4$",
        "$\\frac{1}{2}$"
      ],
      correctAnswer: 0,
      difficulty: "van_dung_cao",
      cognitiveLevel: "van_dung_cao",
      explanation: "Áp dụng bất đẳng thức Cauchy-Schwarz dạng Engel (hoặc BĐT cộng mẫu): $\\frac{1}{x} + \\frac{1}{y} \\ge \\frac{(1 + 1)^2}{x + y} = \\frac{4}{2} = 2$. Dấu '=' xảy ra khi $x = y = 1$. Vậy $\\min M = 2$.",
      hint: "Áp dụng BĐT $\\frac{1}{x} + \\frac{1}{y} \\ge \\frac{4}{x + y}$."
    }
  ],

  // 4. KHTN 6 (VẬT LÍ)
  "li-ltdh-k6": [
    {
      id: "li6-1",
      type: "multiple_choice",
      question: "Đơn vị đo lực hợp pháp trong hệ thống đo lường quốc tế (SI) là:",
      options: [
        "Niutơn ($\\text{N}$)",
        "Kilôgam ($\\text{kg}$)",
        "Mét trên giây ($\\text{m/s}$)",
        "Jun ($\\text{J}$)"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Đơn vị đo lực là Niutơn, kí hiệu là $\\text{N}$. (Kilôgam là đơn vị đo khối lượng).",
      hint: "Đơn vị mang tên nhà bác học Isaac Newton."
    },
    {
      id: "li6-2",
      type: "multiple_choice",
      question: "Một vật có khối lượng $m = 2{,}5\\text{ kg}$ đặt trên mặt bàn nằm ngang. Trọng lượng của vật đó xấp xỉ bằng:",
      options: [
        "$25\\text{ N}$",
        "$2{,}5\\text{ N}$",
        "$250\\text{ N}$",
        "$0{,}25\\text{ N}$"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Công thức liên hệ giữa trọng lượng và khối lượng trên bề mặt Trái Đất: $P = 10 \\times m = 10 \\times 2{,}5 = 25\\text{ N}$.",
      hint: "Công thức $P = 10 \\times m$."
    },
    {
      id: "li6-3",
      type: "multiple_choice",
      question: "Lực nào sau đây là ví dụ về lực không tiếp xúc?",
      options: [
        "Lực hút giữa Trái Đất và Mặt Trăng",
        "Lực đẩy của tay khi đẩy xe hàng",
        "Lực cản của không khí tác dụng lên dù nhảy",
        "Lực ma sát giữa lốp xe và mặt đường"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Lực hấp dẫn (lực hút giữa Trái Đất và Mặt Trăng, lực từ của nam châm) tác dụng qua không gian mà hai vật không cần tiếp xúc nhau, gọi là lực không tiếp xúc.",
      hint: "Hai vật không cần chạm vào nhau vẫn chịu tác dụng lực."
    }
  ],

  // 5. KHTN 7 (VẬT LÍ)
  "li-ltdh-k7": [
    {
      id: "li7-1",
      type: "multiple_choice",
      question: "Một học sinh đạp xe đi quãng đường $s = 3\\text{ km}$ hết thời gian $t = 15\\text{ phút}$. Tốc độ trung bình của học sinh đó là:",
      options: [
        "$12\\text{ km/h}$",
        "$20\\text{ km/h}$",
        "$5\\text{ km/h}$",
        "$15\\text{ km/h}$"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Đổi $t = 15\\text{ phút} = 0{,}25\\text{ giờ}$. Tốc độ $v = \\frac{s}{t} = \\frac{3}{0{,}25} = 12\\text{ km/h}$.",
      hint: "Đổi 15 phút sang giờ rồi áp dụng $v = \\frac{s}{t}$."
    },
    {
      id: "li7-2",
      type: "multiple_choice",
      question: "Theo định luật phản xạ ánh sáng, góc phản xạ $i'$ và góc tới $i$ có mối quan hệ như thế nào?",
      options: [
        "$i' = i$",
        "$i' > i$",
        "$i' < i$",
        "$i' + i = 90^\\circ$"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Nội dung định luật phản xạ ánh sáng: Góc phản xạ luôn bằng góc tới ($i' = i$).",
      hint: "Góc phản xạ luôn bằng góc tới."
    },
    {
      id: "li7-3",
      type: "multiple_choice",
      question: "Âm thanh không thể truyền được trong môi trường nào sau đây?",
      options: [
        "Chân không",
        "Chất lỏng (Nước)",
        "Chất rắn (Kim loại)",
        "Chất khí (Không khí)"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Sóng âm cần các hạt vật chất môi trường để dao động và lan truyền. Chân không không có các phân tử hạt nên âm thanh hoàn toàn không thể truyền qua.",
      hint: "Môi trường không có vật chất."
    }
  ],

  // 6. TIẾNG ANH KHỐI 6
  "anh-ltdh-k6": [
    {
      id: "anh6-1",
      type: "multiple_choice",
      question: "Look! The students _______ football in the school yard.",
      options: [
        "are playing",
        "play",
        "plays",
        "played"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "Dấu hiệu nhận biết 'Look!' ở đầu câu chỉ hành động đang xảy ra tại thời điểm nói -> Dùng thì Hiện tại tiếp diễn: S + am/is/are + V-ing. 'The students' số nhiều đi với 'are playing'.",
      hint: "Có từ 'Look!' là thì Hiện tại tiếp diễn."
    },
    {
      id: "anh6-2",
      type: "multiple_choice",
      question: "There are _______ books on the table, but there isn't _______ milk in the bottle.",
      options: [
        "some / any",
        "any / some",
        "some / some",
        "any / any"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Dùng 'some' trong câu khẳng định, và dùng 'any' trong câu phủ định (isn't) hoặc nghi vấn.",
      hint: "'some' cho câu khẳng định, 'any' cho câu phủ định."
    },
    {
      id: "anh6-3",
      type: "multiple_choice",
      question: "Choose the word with different sound in the underlined part: 'f<u>i</u>nd', 'n<u>i</u>ce', 'c<u>i</u>ty', 'l<u>i</u>ke'",
      options: [
        "city (âm /ɪ/)",
        "find (âm /aɪ/)",
        "nice (âm /aɪ/)",
        "like (âm /aɪ/)"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Chữ 'i' trong 'city' phát âm là /ɪ/. Trong khi 'find', 'nice', 'like' đều phát âm là nguyên âm đôi /aɪ/.",
      hint: "Phát âm /ai/ so với /i/ ngắn."
    }
  ],

  // 7. TIẾNG ANH KHỐI 7
  "anh-ltdh-k7": [
    {
      id: "anh7-1",
      type: "multiple_choice",
      question: "My father _______ to work by car five years ago, but now he takes the bus.",
      options: [
        "used to go",
        "is used to going",
        "uses to go",
        "was used to go"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Cấu trúc 'used to + V_infinitive' dùng để diễn tả một thói quen hoặc hành động thường làm trong quá khứ nhưng nay không còn nữa.",
      hint: "Thói quen trong quá khứ đã chấm dứt: used to + V nguyên mẫu."
    },
    {
      id: "anh7-2",
      type: "multiple_choice",
      question: "Life in the city is much _______ than life in the countryside.",
      options: [
        "busier",
        "more busy",
        "busy",
        "busiest"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "'Busy' là tính từ 2 âm tiết tận cùng bằng 'y', khi so sánh hơn đổi 'y' thành 'i' rồi thêm 'er' -> 'busier'.",
      hint: "Tính từ đuôi -y chuyển thành -ier trong so sánh hơn."
    },
    {
      id: "anh7-3",
      type: "multiple_choice",
      question: "You _______ drive when you are feeling tired or sleepy. It is dangerous.",
      options: [
        "shouldn't",
        "must",
        "should",
        "might"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "'Shouldn't' dùng để đưa ra lời khuyên không nên làm gì vì có thể gây nguy hiểm.",
      hint: "Khuyên không nên làm việc nguy hiểm."
    }
  ],

  // 8. TIẾNG ANH TUYỂN SINH VÀO 10
  "anh-vao-10": [
    {
      id: "anh10-1",
      type: "multiple_choice",
      question: "Choose the word whose main stress is placed differently: 'develop', 'consider', 'understand', 'imagine'",
      options: [
        "understand (trọng âm 3)",
        "develop (trọng âm 2)",
        "consider (trọng âm 2)",
        "imagine (trọng âm 2)"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      cognitiveLevel: "van_dung",
      explanation: "'understand' có trọng âm rơi vào âm tiết thứ 3 (/ˌʌndərˈstænd/). Các từ còn lại 'de'velop', 'con'sider', 'i'magine' đều có trọng âm rơi vào âm tiết thứ 2.",
      hint: "Tìm từ có trọng âm rơi vào âm tiết thứ 3."
    },
    {
      id: "anh10-2",
      type: "multiple_choice",
      question: "\"If I _______ a million dollars, I would build a modern library for our town,\" the student said.",
      options: [
        "had",
        "have",
        "will have",
        "would have"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Câu điều kiện loại 2 diễn tả giả định không có thật ở hiện tại: If + S + V-ed/V2 (were), S + would/could + V-infinitive -> Cần dùng 'had'.",
      hint: "Vế sau có 'would build' nên đây là câu điều kiện loại 2."
    },
    {
      id: "anh10-3",
      type: "multiple_choice",
      question: "The man _______ car was stolen yesterday reported the incident to the local police.",
      options: [
        "whose",
        "who",
        "whom",
        "which"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      cognitiveLevel: "van_dung",
      explanation: "Đại từ quan hệ chỉ quan hệ sở hữu: 'whose + danh từ' (whose car = chiếc xe của người đàn ông đó).",
      hint: "Đại từ chỉ sở hữu cho danh từ theo sau."
    },
    {
      id: "anh10-4",
      type: "multiple_choice",
      question: "Rewrite sentence: \"They built this high school in 2010.\" -> \"This high school _______ in 2010.\"",
      options: [
        "was built",
        "is built",
        "has been built",
        "were built"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Chuyển câu chủ động quá khứ đơn sang bị động: S + was/were + V3/ed. 'This high school' là số ít nên dùng 'was built'.",
      hint: "Bị động quá khứ đơn: was/were + V3."
    },
    {
      id: "anh10-5",
      type: "multiple_choice",
      question: "Although he was very exhausted, _______ to finish the final assignment.",
      options: [
        "he tried his best",
        "but he tried his best",
        "so he tried his best",
        "and he tried his best"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      cognitiveLevel: "thong_hieu",
      explanation: "Trong tiếng Anh, mệnh đề bắt đầu bằng 'Although/Even though' thì vế sau TUYỆT ĐỐI KHÔNG dùng 'but' hay 'so'.",
      hint: "Đã có Although thì vế sau không dùng 'but'."
    },
    {
      id: "anh10-6",
      type: "multiple_choice",
      question: "Choose the word CLOSEST in meaning to the underlined word: \"The government is trying to <u>preserve</u> the historic pagoda.\"",
      options: [
        "protect",
        "destroy",
        "change",
        "ignore"
      ],
      correctAnswer: 0,
      difficulty: "de",
      cognitiveLevel: "nhan_biet",
      explanation: "'Preserve' (bảo tồn, giữ gìn) đồng nghĩa với 'protect' (bảo vệ). 'Destroy' là phá hủy (trái nghĩa).",
      hint: "Preserve có nghĩa là bảo tồn, giữ gìn."
    }
  ]
};

// 1. Cập nhật subject_data.js
let subjectDataCode = fs.readFileSync('subject_data.js', 'utf8');

// Thêm phase2Questions vào extraQuestions
const extraQMarker = 'export const extraQuestions = {';
let newQBlocks = '';
for (const [key, qList] of Object.entries(phase2Questions)) {
  newQBlocks += `  "${key}": ${JSON.stringify(qList, null, 2)},\n`;
}

subjectDataCode = subjectDataCode.replace(extraQMarker, `${extraQMarker}\n${newQBlocks}`);

// Thêm phase2Lessons vào extraLessons
const extraLMarker = 'export const extraLessons = [';
const newLessonsJson = JSON.stringify(phase2Lessons, null, 2).slice(1, -1); // bỏ [ và ]
subjectDataCode = subjectDataCode.replace(extraLMarker, `${extraLMarker}\n${newLessonsJson},`);

fs.writeFileSync('subject_data.js', subjectDataCode, 'utf8');
console.log('✅ Đã cập nhật subject_data.js với các bài học & câu hỏi Khối 6, 7 và Tuyển sinh vào 10!');

// 2. Cập nhật extracted_lessons.json
const extractedLessons = JSON.parse(fs.readFileSync('extracted_lessons.json', 'utf8'));
const mergedLessons = [...phase2Lessons, ...extractedLessons.filter(l => !phase2Lessons.some(p => p.id === l.id))];
fs.writeFileSync('extracted_lessons.json', JSON.stringify(mergedLessons, null, 2), 'utf8');
console.log(`✅ Đã cập nhật extracted_lessons.json. Tổng bài học: ${mergedLessons.length}`);

// 3. Cập nhật extracted_questions.json
const extractedQuestions = JSON.parse(fs.readFileSync('extracted_questions.json', 'utf8'));
Object.assign(extractedQuestions, phase2Questions);
fs.writeFileSync('extracted_questions.json', JSON.stringify(extractedQuestions, null, 2), 'utf8');
let totalQ = 0;
for (const k in extractedQuestions) totalQ += extractedQuestions[k].length;
console.log(`✅ Đã cập nhật extracted_questions.json. Tổng câu hỏi: ${totalQ} câu trong ${Object.keys(extractedQuestions).length} chuyên đề!`);
