/**
 * Dữ liệu Ngân hàng câu hỏi & Cấu hình Đa môn (TOÁN, LÍ, HÓA, ANH)
 * Trung tâm Bồi dưỡng Văn hóa & LTĐH Giao Hùng - Thầy Hùng ĐT
 */

export const extraQuestions = {
  "toan-ltdh-k6": [
  {
    "id": "toan6-1",
    "type": "multiple_choice",
    "question": "Tập hợp các ước tự nhiên của số $12$ là tập hợp nào sau đây?",
    "options": [
      "$\\{1; 2; 3; 4; 6; 12\\}$",
      "$\\{1; 2; 4; 6; 12\\}$",
      "$\\{2; 3; 4; 6\\}$",
      "$\\{0; 1; 2; 3; 4; 6; 12\\}$"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Các ước của $12$ là các số tự nhiên mà $12$ chia hết: $1, 2, 3, 4, 6, 12$. Lưu ý số $0$ không phải là ước của bất kì số nào.",
    "hint": "Liệt kê các số tự nhiên mà $12$ chia hết."
  },
  {
    "id": "toan6-2",
    "type": "multiple_choice",
    "question": "Kết quả của phép tính: $(-15) + (-25)$ là:",
    "options": [
      "$-40$",
      "$40$",
      "$-10$",
      "$10$"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Quy tắc cộng hai số nguyên âm: Muốn cộng hai số nguyên âm, ta cộng hai giá trị tuyệt đối rồi đặt dấu '-' trước kết quả: $(-15) + (-25) = -(15 + 25) = -40$.",
    "hint": "Cộng hai phần số rồi đặt dấu âm trước kết quả."
  },
  {
    "id": "toan6-3",
    "type": "multiple_choice",
    "question": "Rút gọn phân số $\\frac{24}{36}$ về phân số tối giản ta được:",
    "options": [
      "$\\frac{2}{3}$",
      "$\\frac{3}{4}$",
      "$\\frac{4}{6}$",
      "$\\frac{12}{18}$"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Ta chia cả tử và mẫu cho $\\text{ƯCLN}(24, 36) = 12$: $\\frac{24 : 12}{36 : 12} = \\frac{2}{3}$.",
    "hint": "Tìm ƯCLN của $24$ và $36$ để rút gọn một bước."
  },
  {
    "id": "toan6-4",
    "type": "multiple_choice",
    "question": "Hình nào sau đây có $4$ cạnh bằng nhau và $4$ góc vuông?",
    "options": [
      "Hình vuông",
      "Hình thoi",
      "Hình chữ nhật",
      "Hình bình hành"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Hình vuông là hình có $4$ cạnh bằng nhau và $4$ góc vuông. (Hình thoi có $4$ cạnh bằng nhau nhưng các góc không nhất thiết vuông).",
    "hint": "Đặc điểm nhận biết hình vuông."
  },
  {
    "id": "toan6-5",
    "type": "multiple_choice",
    "question": "Một mảnh vườn hình chữ nhật có chiều dài là $25\\text{ m}$, chiều rộng là $12\\text{ m}$. Diện tích mảnh vườn đó là:",
    "options": [
      "$300\\text{ m}^2$",
      "$74\\text{ m}^2$",
      "$150\\text{ m}^2$",
      "$300\\text{ m}$"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Diện tích hình chữ nhật là $S = a \\times b = 25 \\times 12 = 300\\text{ m}^2$.",
    "hint": "Công thức $S = \\text{dài} \\times \\text{rộng}$."
  },
  {
    "id": "toan6-6",
    "type": "multiple_choice",
    "question": "Tìm số nguyên $x$ thỏa mãn biểu thức: $3x - 5 = -20$. Giá trị của $x$ là:",
    "options": [
      "$-5$",
      "$5$",
      "$-25$",
      "$-15$"
    ],
    "correctAnswer": 0,
    "difficulty": "kho",
    "cognitiveLevel": "van_dung",
    "explanation": "Ta có: $3x = -20 + 5 \\Rightarrow 3x = -15 \\Rightarrow x = -15 : 3 = -5$.",
    "hint": "Chuyển vế $-5$ sang vế phải đổi dấu thành $+5$."
  }
],
  "toan-ltdh-k7": [
  {
    "id": "toan7-1",
    "type": "multiple_choice",
    "question": "Số nào sau đây là số vô tỉ?",
    "options": [
      "$\\sqrt{2}$",
      "$\\frac{3}{5}$",
      "$0{,}25$",
      "$\\sqrt{9}$"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "$\\sqrt{2} \\approx 1{,}41421356...$ là số thập phân vô hạn không tuần hoàn nên là số vô tỉ. Còn $\\sqrt{9} = 3$ là số hữu tỉ.",
    "hint": "Số vô tỉ không thể viết dưới dạng phân số $\\frac{a}{b}$."
  },
  {
    "id": "toan7-2",
    "type": "multiple_choice",
    "question": "Bậc của đa thức $P(x) = 4x^5 - 2x^3 + 7x^2 - 4x^5 + 9x$ là:",
    "options": [
      "$3$",
      "$5$",
      "$2$",
      "$1$"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Thu gọn đa thức trước khi xác định bậc: $P(x) = (4x^5 - 4x^5) - 2x^3 + 7x^2 + 9x = -2x^3 + 7x^2 + 9x$. Hạng tử có bậc cao nhất là $-2x^3$ nên bậc của đa thức là $3$.",
    "hint": "Cần thu gọn đa thức trước: để ý $4x^5 - 4x^5 = 0$."
  },
  {
    "id": "toan7-3",
    "type": "multiple_choice",
    "question": "Cho $\\triangle ABC$ vuông tại $A$, có $AB = 6\\text{ cm}$ và $AC = 8\\text{ cm}$. Độ dài cạnh huyền $BC$ là:",
    "options": [
      "$10\\text{ cm}$",
      "$14\\text{ cm}$",
      "$12\\text{ cm}$",
      "$\\sqrt{28}\\text{ cm}$"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Áp dụng định lý Pythagore trong tam giác vuông $ABC$: $BC^2 = AB^2 + AC^2 = 6^2 + 8^2 = 36 + 64 = 100 \\Rightarrow BC = \\sqrt{100} = 10\\text{ cm}$.",
    "hint": "Định lý Pythagore: $BC^2 = AB^2 + AC^2$."
  },
  {
    "id": "toan7-4",
    "type": "multiple_choice",
    "question": "Biết rằng $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k = -3$. Khi $x = 4$ thì giá trị của $y$ bằng:",
    "options": [
      "$-12$",
      "$12$",
      "$-\\frac{4}{3}$",
      "$\\frac{4}{3}$"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Công thức tỉ lệ thuận: $y = kx = -3 \\times 4 = -12$.",
    "hint": "Thay $x$ vào công thức $y = kx$."
  },
  {
    "id": "toan7-5",
    "type": "multiple_choice",
    "question": "Cho tam giác $ABC$ có $\\widehat{A} = 70^\\circ$ và $\\widehat{B} = 50^\\circ$. Số đo của góc $\\widehat{C}$ là:",
    "options": [
      "$60^\\circ$",
      "$70^\\circ$",
      "$50^\\circ$",
      "$120^\\circ$"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Tổng ba góc trong một tam giác bằng $180^\\circ$: $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) = 180^\\circ - (70^\\circ + 50^\\circ) = 60^\\circ$.",
    "hint": "Tổng 3 góc trong một tam giác luôn bằng $180^\\circ$."
  },
  {
    "id": "toan7-6",
    "type": "multiple_choice",
    "question": "Tìm giá trị nhỏ nhất của biểu thức $A = (x - 3)^2 + |y + 1| + 2026$. Giá trị nhỏ nhất đó là:",
    "options": [
      "$2026$",
      "$0$",
      "$3$",
      "$-1$"
    ],
    "correctAnswer": 0,
    "difficulty": "van_dung_cao",
    "cognitiveLevel": "van_dung_cao",
    "explanation": "Vì $(x - 3)^2 \\ge 0$ với mọi $x$ và $|y + 1| \\ge 0$ với mọi $y$, nên $A \\ge 0 + 0 + 2026 = 2026$. Dấu '=' xảy ra khi $x = 3$ và $y = -1$. Vậy $\\min A = 2026$.",
    "hint": "Bình phương và giá trị tuyệt đối luôn không âm ($\\ge 0$)."
  }
],
  "toan-vao-10": [
  {
    "id": "toan10-1",
    "type": "multiple_choice",
    "question": "Rút gọn biểu thức $P = \\left(\\frac{\\sqrt{x}}{\\sqrt{x} - 1} - \\frac{1}{x - \\sqrt{x}}\\right) : \\frac{\\sqrt{x} + 1}{x - 1}$ với $x > 0$ và $x \\ne 1$ ta được kết quả là:",
    "options": [
      "$\\sqrt{x} - 1$",
      "$\\sqrt{x} + 1$",
      "$\\frac{\\sqrt{x} - 1}{\\sqrt{x}}$",
      "$1$"
    ],
    "correctAnswer": 0,
    "difficulty": "kho",
    "cognitiveLevel": "van_dung",
    "explanation": "Ta có $x - \\sqrt{x} = \\sqrt{x}(\\sqrt{x} - 1)$. Quy đồng trong ngoặc: $\\frac{x - 1}{\\sqrt{x}(\\sqrt{x} - 1)}$. Phép chia nhân đảo ngược: $\\frac{x - 1}{\\sqrt{x}(\\sqrt{x} - 1)} \\times \\frac{(\\sqrt{x}-1)(\\sqrt{x}+1)}{\\sqrt{x}+1} = \\frac{x - 1}{\\sqrt{x}} = \\sqrt{x} - 1$.",
    "hint": "Phân tích mẫu số $x - \\sqrt{x} = \\sqrt{x}(\\sqrt{x} - 1)$ rồi quy đồng."
  },
  {
    "id": "toan10-2",
    "type": "multiple_choice",
    "question": "Cho phương trình $x^2 - 2(m + 1)x + m^2 + 3 = 0$. Phương trình có hai nghiệm phân biệt khi và chỉ khi:",
    "options": [
      "$m > 1$",
      "$m \\ge 1$",
      "$m < 1$",
      "$m \\ne 1$"
    ],
    "correctAnswer": 0,
    "difficulty": "kho",
    "cognitiveLevel": "van_dung",
    "explanation": "Ta có $\\Delta' = (m + 1)^2 - (m^2 + 3) = m^2 + 2m + 1 - m^2 - 3 = 2m - 2$. Phương trình có $2$ nghiệm phân biệt khi $\\Delta' > 0 \\Leftrightarrow 2m - 2 > 0 \\Leftrightarrow m > 1$.",
    "hint": "Tính $\\Delta' = b'^2 - ac > 0$."
  },
  {
    "id": "toan10-3",
    "type": "multiple_choice",
    "question": "Hệ phương trình $\\begin{cases} 2x + y = 5 \\\\ 3x - 2y = 4 \\end{cases}$ có nghiệm $(x; y)$ duy nhất là:",
    "options": [
      "$(2; 1)$",
      "$(1; 3)$",
      "$(3; -1)$",
      "$(2; -1)$"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Nhân phương trình đầu với $2$: $4x + 2y = 10$. Cộng hai phương trình: $7x = 14 \\Rightarrow x = 2$. Thay vào tìm được $y = 5 - 2(2) = 1$. Vậy nghiệm là $(2; 1)$.",
    "hint": "Sử dụng phương pháp cộng đại số triệt tiêu $y$."
  },
  {
    "id": "toan10-4",
    "type": "multiple_choice",
    "question": "Cho đường tròn $(O; R)$ và dây cung $AB = R\\sqrt{3}$. Khoảng cách từ tâm $O$ đến dây $AB$ bằng:",
    "options": [
      "$\\frac{R}{2}$",
      "$\\frac{R\\sqrt{3}}{2}$",
      "$\\frac{R\\sqrt{2}}{2}$",
      "$\\frac{R}{4}$"
    ],
    "correctAnswer": 0,
    "difficulty": "kho",
    "cognitiveLevel": "van_dung",
    "explanation": "Kẻ $OH \\perp AB$ tại $H$. Suy ra $H$ là trung điểm $AB$, nên $AH = \\frac{AB}{2} = \\frac{R\\sqrt{3}}{2}$. Xét $\\triangle OHA$ vuông tại $H$: $OH = \\sqrt{OA^2 - AH^2} = \\sqrt{R^2 - \\left(\\frac{R\\sqrt{3}}{2}\\right)^2} = \\sqrt{R^2 - \\frac{3R^2}{4}} = \\sqrt{\\frac{R^2}{4}} = \\frac{R}{2}$.",
    "hint": "Kẻ đường vuông góc từ tâm đến dây cung và dùng Pythagore."
  },
  {
    "id": "toan10-5",
    "type": "multiple_choice",
    "question": "Góc nội tiếp chắn nửa đường tròn có số đo bằng:",
    "options": [
      "$90^\\circ$",
      "$180^\\circ$",
      "$60^\\circ$",
      "$45^\\circ$"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Định lý hình học đường tròn: Góc nội tiếp chắn nửa đường tròn luôn là góc vuông ($90^\\circ$).",
    "hint": "Tính chất cơ bản của góc nội tiếp chắn nửa đường tròn."
  },
  {
    "id": "toan10-6",
    "type": "multiple_choice",
    "question": "Cho hai số thực dương $x, y$ thỏa mãn $x + y = 2$. Giá trị nhỏ nhất của biểu thức $M = \\frac{1}{x} + \\frac{1}{y}$ là:",
    "options": [
      "$2$",
      "$1$",
      "$4$",
      "$\\frac{1}{2}$"
    ],
    "correctAnswer": 0,
    "difficulty": "van_dung_cao",
    "cognitiveLevel": "van_dung_cao",
    "explanation": "Áp dụng bất đẳng thức Cauchy-Schwarz dạng Engel (hoặc BĐT cộng mẫu): $\\frac{1}{x} + \\frac{1}{y} \\ge \\frac{(1 + 1)^2}{x + y} = \\frac{4}{2} = 2$. Dấu '=' xảy ra khi $x = y = 1$. Vậy $\\min M = 2$.",
    "hint": "Áp dụng BĐT $\\frac{1}{x} + \\frac{1}{y} \\ge \\frac{4}{x + y}$."
  }
],
  "li-ltdh-k6": [
  {
    "id": "li6-1",
    "type": "multiple_choice",
    "question": "Đơn vị đo lực hợp pháp trong hệ thống đo lường quốc tế (SI) là:",
    "options": [
      "Niutơn ($\\text{N}$)",
      "Kilôgam ($\\text{kg}$)",
      "Mét trên giây ($\\text{m/s}$)",
      "Jun ($\\text{J}$)"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Đơn vị đo lực là Niutơn, kí hiệu là $\\text{N}$. (Kilôgam là đơn vị đo khối lượng).",
    "hint": "Đơn vị mang tên nhà bác học Isaac Newton."
  },
  {
    "id": "li6-2",
    "type": "multiple_choice",
    "question": "Một vật có khối lượng $m = 2{,}5\\text{ kg}$ đặt trên mặt bàn nằm ngang. Trọng lượng của vật đó xấp xỉ bằng:",
    "options": [
      "$25\\text{ N}$",
      "$2{,}5\\text{ N}$",
      "$250\\text{ N}$",
      "$0{,}25\\text{ N}$"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Công thức liên hệ giữa trọng lượng và khối lượng trên bề mặt Trái Đất: $P = 10 \\times m = 10 \\times 2{,}5 = 25\\text{ N}$.",
    "hint": "Công thức $P = 10 \\times m$."
  },
  {
    "id": "li6-3",
    "type": "multiple_choice",
    "question": "Lực nào sau đây là ví dụ về lực không tiếp xúc?",
    "options": [
      "Lực hút giữa Trái Đất và Mặt Trăng",
      "Lực đẩy của tay khi đẩy xe hàng",
      "Lực cản của không khí tác dụng lên dù nhảy",
      "Lực ma sát giữa lốp xe và mặt đường"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Lực hấp dẫn (lực hút giữa Trái Đất và Mặt Trăng, lực từ của nam châm) tác dụng qua không gian mà hai vật không cần tiếp xúc nhau, gọi là lực không tiếp xúc.",
    "hint": "Hai vật không cần chạm vào nhau vẫn chịu tác dụng lực."
  }
],
  "li-ltdh-k7": [
  {
    "id": "li7-1",
    "type": "multiple_choice",
    "question": "Một học sinh đạp xe đi quãng đường $s = 3\\text{ km}$ hết thời gian $t = 15\\text{ phút}$. Tốc độ trung bình của học sinh đó là:",
    "options": [
      "$12\\text{ km/h}$",
      "$20\\text{ km/h}$",
      "$5\\text{ km/h}$",
      "$15\\text{ km/h}$"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Đổi $t = 15\\text{ phút} = 0{,}25\\text{ giờ}$. Tốc độ $v = \\frac{s}{t} = \\frac{3}{0{,}25} = 12\\text{ km/h}$.",
    "hint": "Đổi 15 phút sang giờ rồi áp dụng $v = \\frac{s}{t}$."
  },
  {
    "id": "li7-2",
    "type": "multiple_choice",
    "question": "Theo định luật phản xạ ánh sáng, góc phản xạ $i'$ và góc tới $i$ có mối quan hệ như thế nào?",
    "options": [
      "$i' = i$",
      "$i' > i$",
      "$i' < i$",
      "$i' + i = 90^\\circ$"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Nội dung định luật phản xạ ánh sáng: Góc phản xạ luôn bằng góc tới ($i' = i$).",
    "hint": "Góc phản xạ luôn bằng góc tới."
  },
  {
    "id": "li7-3",
    "type": "multiple_choice",
    "question": "Âm thanh không thể truyền được trong môi trường nào sau đây?",
    "options": [
      "Chân không",
      "Chất lỏng (Nước)",
      "Chất rắn (Kim loại)",
      "Chất khí (Không khí)"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Sóng âm cần các hạt vật chất môi trường để dao động và lan truyền. Chân không không có các phân tử hạt nên âm thanh hoàn toàn không thể truyền qua.",
    "hint": "Môi trường không có vật chất."
  }
],
  "anh-ltdh-k6": [
  {
    "id": "anh6-1",
    "type": "multiple_choice",
    "question": "Look! The students _______ football in the school yard.",
    "options": [
      "are playing",
      "play",
      "plays",
      "played"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "Dấu hiệu nhận biết 'Look!' ở đầu câu chỉ hành động đang xảy ra tại thời điểm nói -> Dùng thì Hiện tại tiếp diễn: S + am/is/are + V-ing. 'The students' số nhiều đi với 'are playing'.",
    "hint": "Có từ 'Look!' là thì Hiện tại tiếp diễn."
  },
  {
    "id": "anh6-2",
    "type": "multiple_choice",
    "question": "There are _______ books on the table, but there isn't _______ milk in the bottle.",
    "options": [
      "some / any",
      "any / some",
      "some / some",
      "any / any"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Dùng 'some' trong câu khẳng định, và dùng 'any' trong câu phủ định (isn't) hoặc nghi vấn.",
    "hint": "'some' cho câu khẳng định, 'any' cho câu phủ định."
  },
  {
    "id": "anh6-3",
    "type": "multiple_choice",
    "question": "Choose the word with different sound in the underlined part: 'f<u>i</u>nd', 'n<u>i</u>ce', 'c<u>i</u>ty', 'l<u>i</u>ke'",
    "options": [
      "city (âm /ɪ/)",
      "find (âm /aɪ/)",
      "nice (âm /aɪ/)",
      "like (âm /aɪ/)"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Chữ 'i' trong 'city' phát âm là /ɪ/. Trong khi 'find', 'nice', 'like' đều phát âm là nguyên âm đôi /aɪ/.",
    "hint": "Phát âm /ai/ so với /i/ ngắn."
  }
],
  "anh-ltdh-k7": [
  {
    "id": "anh7-1",
    "type": "multiple_choice",
    "question": "My father _______ to work by car five years ago, but now he takes the bus.",
    "options": [
      "used to go",
      "is used to going",
      "uses to go",
      "was used to go"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Cấu trúc 'used to + V_infinitive' dùng để diễn tả một thói quen hoặc hành động thường làm trong quá khứ nhưng nay không còn nữa.",
    "hint": "Thói quen trong quá khứ đã chấm dứt: used to + V nguyên mẫu."
  },
  {
    "id": "anh7-2",
    "type": "multiple_choice",
    "question": "Life in the city is much _______ than life in the countryside.",
    "options": [
      "busier",
      "more busy",
      "busy",
      "busiest"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "'Busy' là tính từ 2 âm tiết tận cùng bằng 'y', khi so sánh hơn đổi 'y' thành 'i' rồi thêm 'er' -> 'busier'.",
    "hint": "Tính từ đuôi -y chuyển thành -ier trong so sánh hơn."
  },
  {
    "id": "anh7-3",
    "type": "multiple_choice",
    "question": "You _______ drive when you are feeling tired or sleepy. It is dangerous.",
    "options": [
      "shouldn't",
      "must",
      "should",
      "might"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "'Shouldn't' dùng để đưa ra lời khuyên không nên làm gì vì có thể gây nguy hiểm.",
    "hint": "Khuyên không nên làm việc nguy hiểm."
  }
],
  "anh-vao-10": [
  {
    "id": "anh10-1",
    "type": "multiple_choice",
    "question": "Choose the word whose main stress is placed differently: 'develop', 'consider', 'understand', 'imagine'",
    "options": [
      "understand (trọng âm 3)",
      "develop (trọng âm 2)",
      "consider (trọng âm 2)",
      "imagine (trọng âm 2)"
    ],
    "correctAnswer": 0,
    "difficulty": "kho",
    "cognitiveLevel": "van_dung",
    "explanation": "'understand' có trọng âm rơi vào âm tiết thứ 3 (/ˌʌndərˈstænd/). Các từ còn lại 'de'velop', 'con'sider', 'i'magine' đều có trọng âm rơi vào âm tiết thứ 2.",
    "hint": "Tìm từ có trọng âm rơi vào âm tiết thứ 3."
  },
  {
    "id": "anh10-2",
    "type": "multiple_choice",
    "question": "\"If I _______ a million dollars, I would build a modern library for our town,\" the student said.",
    "options": [
      "had",
      "have",
      "will have",
      "would have"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Câu điều kiện loại 2 diễn tả giả định không có thật ở hiện tại: If + S + V-ed/V2 (were), S + would/could + V-infinitive -> Cần dùng 'had'.",
    "hint": "Vế sau có 'would build' nên đây là câu điều kiện loại 2."
  },
  {
    "id": "anh10-3",
    "type": "multiple_choice",
    "question": "The man _______ car was stolen yesterday reported the incident to the local police.",
    "options": [
      "whose",
      "who",
      "whom",
      "which"
    ],
    "correctAnswer": 0,
    "difficulty": "kho",
    "cognitiveLevel": "van_dung",
    "explanation": "Đại từ quan hệ chỉ quan hệ sở hữu: 'whose + danh từ' (whose car = chiếc xe của người đàn ông đó).",
    "hint": "Đại từ chỉ sở hữu cho danh từ theo sau."
  },
  {
    "id": "anh10-4",
    "type": "multiple_choice",
    "question": "Rewrite sentence: \"They built this high school in 2010.\" -> \"This high school _______ in 2010.\"",
    "options": [
      "was built",
      "is built",
      "has been built",
      "were built"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Chuyển câu chủ động quá khứ đơn sang bị động: S + was/were + V3/ed. 'This high school' là số ít nên dùng 'was built'.",
    "hint": "Bị động quá khứ đơn: was/were + V3."
  },
  {
    "id": "anh10-5",
    "type": "multiple_choice",
    "question": "Although he was very exhausted, _______ to finish the final assignment.",
    "options": [
      "he tried his best",
      "but he tried his best",
      "so he tried his best",
      "and he tried his best"
    ],
    "correctAnswer": 0,
    "difficulty": "trung_binh",
    "cognitiveLevel": "thong_hieu",
    "explanation": "Trong tiếng Anh, mệnh đề bắt đầu bằng 'Although/Even though' thì vế sau TUYỆT ĐỐI KHÔNG dùng 'but' hay 'so'.",
    "hint": "Đã có Although thì vế sau không dùng 'but'."
  },
  {
    "id": "anh10-6",
    "type": "multiple_choice",
    "question": "Choose the word CLOSEST in meaning to the underlined word: \"The government is trying to <u>preserve</u> the historic pagoda.\"",
    "options": [
      "protect",
      "destroy",
      "change",
      "ignore"
    ],
    "correctAnswer": 0,
    "difficulty": "de",
    "cognitiveLevel": "nhan_biet",
    "explanation": "'Preserve' (bảo tồn, giữ gìn) đồng nghĩa với 'protect' (bảo vệ). 'Destroy' là phá hủy (trái nghĩa).",
    "hint": "Preserve có nghĩa là bảo tồn, giữ gìn."
  }
],

  // 1. TOÁN KHỐI 8
  "toan-ltdh-k8": [
    {
      id: "toan8-1",
      type: "multiple_choice",
      question: "Khai triển của hằng đẳng thức bình phương một tổng (a + b)² là biểu thức nào sau đây?",
      options: [
        "a² + 2ab + b²",
        "a² - 2ab + b²",
        "a² + ab + b²",
        "a² + b²"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Hằng đẳng thức số 1: (a + b)² = a² + 2ab + b².",
      hint: "Bình phương số thứ nhất + 2 lần tích + bình phương số thứ hai."
    },
    {
      id: "toan8-2",
      type: "multiple_choice",
      question: "Viết biểu thức x² - 9 dưới dạng tích của hai đa thức:",
      options: [
        "(x - 3)(x + 3)",
        "(x - 9)(x + 9)",
        "(x - 3)²",
        "(x + 3)²"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Áp dụng hằng đẳng thức hiệu hai bình phương: a² - b² = (a - b)(a + b). Ở đây x² - 3² = (x - 3)(x + 3).",
      hint: "Số 9 chính là 3 bình phương."
    },
    {
      id: "toan8-3",
      type: "multiple_choice",
      question: "Điều kiện xác định của phân thức đại số (2x + 1) / (x - 4) là:",
      options: [
        "x ≠ 4",
        "x ≠ -4",
        "x ≠ -1/2",
        "x > 4"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Phân thức A/B xác định khi mẫu thức B khác 0. Ta có x - 4 ≠ 0 => x ≠ 4.",
      hint: "Cho mẫu thức khác 0."
    },
    {
      id: "toan8-4",
      type: "multiple_choice",
      question: "Rút gọn phân thức đại số P = (x² - 4x + 4) / (x - 2) với x ≠ 2 ta được kết quả là:",
      options: [
        "x - 2",
        "x + 2",
        "(x - 2)²",
        "1"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Tử thức x² - 4x + 4 = (x - 2)². Do đó P = (x - 2)² / (x - 2) = x - 2.",
      hint: "Tử thức là hằng đẳng thức bình phương một hiệu."
    },
    {
      id: "toan8-5",
      type: "multiple_choice",
      question: "Cho tam giác ABC có MN // BC (M ∈ AB, N ∈ AC). Theo định lý Ta-lét trong tam giác, khẳng định nào sau đây ĐÚNG?",
      options: [
        "AM / AB = AN / AC",
        "AM / MB = AC / AN",
        "AM / BC = AN / MN",
        "AB / AM = AN / AC"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Theo định lý Ta-lét: Một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ: AM/AB = AN/AC.",
      hint: "Các đoạn thẳng tương ứng trên 2 cạnh AB và AC tỉ lệ với nhau."
    },
    {
      id: "toan8-6",
      type: "multiple_choice",
      question: "Hai tam giác ABC và A'B'C' đồng dạng với nhau theo tỉ số đồng dạng k = 2. Tỉ số diện tích S(A'B'C') / S(ABC) bằng:",
      options: [
        "4",
        "2",
        "1/2",
        "1/4"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      explanation: "Tỉ số diện tích của hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng: S'/S = k² = 2² = 4.",
      hint: "Diện tích tỉ lệ với bình phương tỉ số đồng dạng k."
    },
    {
      id: "toan8-7",
      type: "fill_blank",
      question: "Điền từ hoặc số thích hợp vào chỗ trống: \"Hình thang có hai đường chéo bằng nhau là hình thang [1]. Trong tam giác vuông, bình phương cạnh huyền bằng [2] bình phương hai cạnh góc vuông.\"",
      options: ["cân", "tổng", "vuông", "hiệu"],
      blankAnswers: ["cân", "tổng"],
      wordBank: ["cân", "tổng", "vuông", "hiệu", "tích"],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Hình thang cân có 2 đường chéo bằng nhau. Định lý Pytago: cạnh huyền bình phương bằng tổng bình phương 2 cạnh góc vuông.",
      hint: "Hình thang cân - Định lý Pytago."
    },
    {
      id: "toan8-8",
      type: "matching",
      question: "Hãy ghép tên hằng đẳng thức ở Cột A với dạng biểu thức tương ứng ở Cột B:",
      options: ["Ghép nối chính xác"],
      correctAnswer: 0,
      matchingLeft: [
        { id: "l1", text: "(a - b)²" },
        { id: "l2", text: "a² - b²" },
        { id: "l3", text: "(a + b)³" }
      ],
      matchingRight: [
        { id: "r1", text: "a² - 2ab + b²" },
        { id: "r2", text: "(a - b)(a + b)" },
        { id: "r3", text: "a³ + 3a²b + 3ab² + b³" }
      ],
      correctMatches: { "l1": "r1", "l2": "r2", "l3": "r3" },
      difficulty: "trung_binh",
      explanation: "Các hằng đẳng thức đáng nhớ số 2, số 3 và số 4.",
      hint: "So khớp các công thức 7 hằng đẳng thức đáng nhớ lớp 8."
    }
  ],

  // 2. TOÁN KHỐI 9 & LUYỆN THI VÀO 10
  "toan-ltdh-k9": [
    {
      id: "toan9-1",
      type: "multiple_choice",
      question: "Điều kiện để căn thức bậc hai √(3x - 6) có nghĩa là:",
      options: [
        "x ≥ 2",
        "x > 2",
        "x ≤ 2",
        "x ≥ 0"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Biểu thức dưới dấu căn bậc hai không âm: 3x - 6 ≥ 0 <=> 3x ≥ 6 <=> x ≥ 2.",
      hint: "Biểu thức dưới căn phải lớn hơn hoặc bằng 0."
    },
    {
      id: "toan9-2",
      type: "multiple_choice",
      question: "Phương trình bậc hai ax² + bx + c = 0 (a ≠ 0) có biệt thức Δ = b² - 4ac > 0 thì:",
      options: [
        "Phương trình có 2 nghiệm phân biệt",
        "Phương trình có nghiệm kép",
        "Phương trình vô nghiệm",
        "Phương trình có vô số nghiệm"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Khi Δ > 0, phương trình bậc hai luôn có 2 nghiệm phân biệt x₁ = (-b + √Δ)/(2a) và x₂ = (-b - √Δ)/(2a).",
      hint: "Δ > 0 thì có 2 nghiệm phân biệt; Δ = 0 có nghiệm kép; Δ < 0 vô nghiệm."
    },
    {
      id: "toan9-3",
      type: "multiple_choice",
      question: "Cho phương trình x² - 7x + 10 = 0 có 2 nghiệm x₁ và x₂. Theo hệ thức Vi-ét, tổng x₁ + x₂ và tích x₁x₂ lần lượt là:",
      options: [
        "x₁ + x₂ = 7 và x₁x₂ = 10",
        "x₁ + x₂ = -7 và x₁x₂ = 10",
        "x₁ + x₂ = 7 và x₁x₂ = -10",
        "x₁ + x₂ = -7 và x₁x₂ = -10"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Theo định lý Vi-ét: S = x₁ + x₂ = -b/a = -(-7)/1 = 7; P = x₁x₂ = c/a = 10/1 = 10.",
      hint: "Tổng bằng -b/a, Tích bằng c/a."
    },
    {
      id: "toan9-4",
      type: "multiple_choice",
      question: "Trong một đường tròn, số đo của góc nội tiếp bằng bao nhiêu lần số đo của cung bị chắn?",
      options: [
        "Bằng một nửa số đo cung bị chắn",
        "Bằng số đo cung bị chắn",
        "Bằng hai lần số đo cung bị chắn",
        "Bằng số đo của góc ở tâm cùng chắn cung đó"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Định lý: Trong một đường tròn, số đo góc nội tiếp bằng nửa số đo cung bị chắn.",
      hint: "Góc nội tiếp đỉnh nằm trên đường tròn, số đo bằng 1/2 số đo cung bị chắn."
    },
    {
      id: "toan9-5",
      type: "multiple_choice",
      question: "Tứ giác ABCD nội tiếp đường tròn khi và chỉ khi:",
      options: [
        "Tổng hai góc đối diện bằng 180°",
        "Hai góc kề một cạnh phụ nhau",
        "Bốn cạnh của tứ giác bằng nhau",
        "Hai đường chéo vuông góc với nhau"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Định lý: Một tứ giác nội tiếp được đường tròn khi và chỉ khi tổng số đo hai góc đối nhau bằng 180°.",
      hint: "Tổng hai góc đối nhau bằng 180 độ."
    },
    {
      id: "toan9-6",
      type: "multiple_choice",
      question: "Tìm giá trị của tham số m để phương trình x² - 2x + m = 0 có nghiệm kép:",
      options: [
        "m = 1",
        "m = -1",
        "m = 4",
        "m = 0"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      explanation: "Phương trình có nghiệm kép <=> Δ' = 0 <=> (-1)² - 1*m = 0 <=> 1 - m = 0 <=> m = 1.",
      hint: "Tính biệt thức Δ' = b'² - ac và cho bằng 0."
    },
    {
      id: "toan9-7",
      type: "drag_drop_order",
      question: "Hãy sắp xếp các bước giải bài toán bằng cách lập phương trình hoặc hệ phương trình theo đúng quy trình:",
      options: ["Quy trình giải bài toán"],
      correctAnswer: 0,
      orderItems: [
        { id: "step1", text: "1. Chọn ẩn số, đặt điều kiện và đơn vị thích hợp cho ẩn" },
        { id: "step2", text: "2. Biểu diễn các đại lượng chưa biết qua ẩn và các đại lượng đã biết" },
        { id: "step3", text: "3. Lập phương trình hoặc hệ phương trình biểu thị mối liên hệ" },
        { id: "step4", text: "4. Giải phương trình / hệ phương trình vừa tìm được" },
        { id: "step5", text: "5. Kiểm tra điều kiện và kết luận câu trả lời" }
      ],
      correctOrder: ["step1", "step2", "step3", "step4", "step5"],
      difficulty: "trung_binh",
      explanation: "Quy trình chuẩn gồm 3 bước lớn: Lập phương trình -> Giải phương trình -> Đối chiếu và kết luận.",
      hint: "Đặt ẩn -> Biểu diễn đại lượng -> Lập pt -> Giải pt -> Kết luận."
    }
  ],

  // 3. VẬT LÍ KHỐI 8
  "li-ltdh-k8": [
    {
      id: "li8-1",
      type: "multiple_choice",
      question: "Một người đi xe đạp đi được quãng đường 36 km trong thời gian 2 giờ. Vận tốc của người đó là:",
      options: [
        "18 km/h (tức 5 m/s)",
        "36 km/h (tức 10 m/s)",
        "72 km/h (tức 20 m/s)",
        "9 km/h (tức 2.5 m/s)"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Công thức tính vận tốc: v = s / t = 36 / 2 = 18 km/h. Đổi ra m/s: 18 / 3.6 = 5 m/s.",
      hint: "Vận tốc bằng quãng đường chia cho thời gian."
    },
    {
      id: "li8-2",
      type: "multiple_choice",
      question: "Công thức tính áp suất chất rắn p tác dụng lên diện tích bị ép S với áp lực F là:",
      options: [
        "p = F / S",
        "p = F * S",
        "p = S / F",
        "p = d * h"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Áp suất là độ lớn của áp lực trên một đơn vị diện tích bị ép: p = F / S (Đơn vị: N/m² hoặc Pascal Pa).",
      hint: "Áp suất tỉ lệ thuận với áp lực và tỉ lệ nghịch với diện tích bị ép."
    },
    {
      id: "li8-3",
      type: "multiple_choice",
      question: "Một vật nhúng trong chất lỏng bị chất lỏng tác dụng một lực đẩy Ác-si-mét có phương và chiều như thế nào?",
      options: [
        "Phương thẳng đứng, chiều từ dưới lên trên",
        "Phương thẳng đứng, chiều từ trên xuống dưới",
        "Phương nằm ngang, chiều từ trái sang phải",
        "Phương bất kì hướng vào tâm của vật"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Lực đẩy Ác-si-mét luôn có phương thẳng đứng, chiều từ dưới lên trên, độ lớn bằng trọng lượng phần chất lỏng bị vật chiếm chỗ: F_A = d * V.",
      hint: "Lực đẩy chất lỏng đẩy vật nổi lên trên."
    },
    {
      id: "li8-4",
      type: "multiple_choice",
      question: "Điều kiện để một vật chìm hoàn toàn xuống đáy bình chứa chất lỏng là:",
      options: [
        "Trọng lượng riêng của vật lớn hơn trọng lượng riêng của chất lỏng (d_vật > d_lỏng)",
        "Trọng lượng riêng của vật nhỏ hơn trọng lượng riêng của chất lỏng (d_vật < d_lỏng)",
        "Trọng lượng riêng của vật bằng trọng lượng riêng của chất lỏng (d_vật = d_lỏng)",
        "Thể tích của vật lớn hơn thể tích của chất lỏng"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Vật chìm khi P > F_A <=> d_vật * V > d_lỏng * V <=> d_vật > d_lỏng.",
      hint: "Vật nặng hơn chất lỏng thì sẽ chìm xuống đáy."
    },
    {
      id: "li8-5",
      type: "multiple_choice",
      question: "Công cơ học được thực hiện khi nào?",
      options: [
        "Khi có lực tác dụng vào vật và làm vật dịch chuyển một quãng đường theo phương của lực",
        "Khi có lực rất lớn tác dụng vào vật nhưng vật vẫn đứng yên",
        "Khi vật chuyển động tròn đều không có lực tác dụng",
        "Khi vật có khối lượng lớn đặt trên mặt sàn nằm ngang"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Điều kiện có công cơ học: Phải có lực tác dụng vào vật (F) và vật phải dịch chuyển (s): A = F * s.",
      hint: "Có lực tác dụng VÀ có độ dời theo phương của lực."
    },
    {
      id: "li8-6",
      type: "multiple_choice",
      question: "Định luật về công khẳng định điều gì đối với các máy cơ đơn giản (đòn bẩy, ròng rọc, mặt phẳng nghiêng)?",
      options: [
        "Không một máy cơ đơn giản nào cho ta lợi về công",
        "Máy cơ đơn giản luôn cho ta lợi cả về lực và về công",
        "Dùng ròng rọc động luôn cho ta lợi gấp đôi về công",
        "Mặt phẳng nghiêng càng dốc thì càng lợi về công"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      explanation: "Định luật về công: Không một máy cơ đơn giản nào cho ta lợi về công. Lợi bao nhiêu lần về lực thì thiệt bấy nhiêu lần về đường đi và ngược lại.",
      hint: "Được lợi về lực thì thiệt hại về đường đi, công không đổi."
    }
  ],

  // 4. VẬT LÍ KHỐI 9 & LUYỆN THI VÀO 10
  "li-ltdh-k9": [
    {
      id: "li9-1",
      type: "multiple_choice",
      question: "Hệ thức của Định luật Ôm cho một đoạn mạch điện có điện trở R là:",
      options: [
        "I = U / R",
        "I = U * R",
        "R = U * I",
        "U = I / R"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Định luật Ôm: Cường độ dòng điện qua dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu dây và tỉ lệ nghịch với điện trở của dây: I = U / R.",
      hint: "I bằng U chia R."
    },
    {
      id: "li9-2",
      type: "multiple_choice",
      question: "Hai điện trở R₁ = 10 Ω và R₂ = 20 Ω mắc nối tiếp vào hiệu điện thế U. Điện trở tương đương R_tđ của đoạn mạch là:",
      options: [
        "30 Ω",
        "10 Ω",
        "200 Ω",
        "6.67 Ω"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Trong đoạn mạch mắc nối tiếp: R_tđ = R₁ + R₂ = 10 + 20 = 30 Ω.",
      hint: "Mắc nối tiếp thì cộng dồn các điện trở."
    },
    {
      id: "li9-3",
      type: "multiple_choice",
      question: "Công suất điện của một đoạn mạch tiêu thụ năng lượng được tính bằng công thức:",
      options: [
        "P = U * I",
        "P = U / I",
        "P = I / U",
        "P = U² * I"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Công suất điện định mức: P = U * I = I² * R = U² / R (Đơn vị: Watt W).",
      hint: "P bằng U nhân I."
    },
    {
      id: "li9-4",
      type: "multiple_choice",
      question: "Định luật Jun - Len-xơ cho biết nhiệt lượng Q tỏa ra trên dây dẫn có điện trở R khi có dòng điện I chạy qua trong thời gian t là:",
      options: [
        "Q = I² * R * t",
        "Q = I * R² * t",
        "Q = I * R * t",
        "Q = U * I² * t"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Nhiệt lượng tỏa ra trên dây dẫn tỉ lệ thuận với bình phương cường độ dòng điện, điện trở và thời gian dòng điện chạy qua: Q = I² * R * t.",
      hint: "I bình phương nhân R nhân t."
    },
    {
      id: "li9-5",
      type: "multiple_choice",
      question: "Thấu kính hội tụ có đặc điểm quang học nào sau đây?",
      options: [
        "Chùm tia tới song song với trục chính cho chùm tia ló hội tụ tại tiêu điểm",
        "Chùm tia tới song song với trục chính cho chùm tia ló phân kì",
        "Phần rìa dày hơn phần giữa của thấu kính",
        "Luôn cho ảnh ảo nhỏ hơn vật thật"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Thấu kính hội tụ có phần giữa dày hơn phần rìa, làm hội tụ chùm tia sáng song song tại tiêu điểm F.",
      hint: "Tia sáng song song trục chính đi qua thấu kính hội tụ tụ lại tại tiêu điểm."
    },
    {
      id: "li9-6",
      type: "multiple_choice",
      question: "Mắt một người chỉ nhìn rõ các vật ở gần mà không nhìn rõ các vật ở xa. Người đó bị tật gì và phải đeo kính gì để khắc phục?",
      options: [
        "Tật cận thị, cần đeo kính phân kì thích hợp",
        "Tật cận thị, cần đeo kính hội tụ thích hợp",
        "Tật viễn thị, cần đeo kính phân kì thích hợp",
        "Tật viễn thị, cần đeo kính hội tụ thích hợp"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      explanation: "Mắt cận thị nhìn rõ vật gần, không nhìn rõ vật xa; điểm cực viễn ở gần hơn bình thường. Cần đeo kính phân kì để làm phân kì chùm sáng, đưa ảnh về đúng màng lưới.",
      hint: "Cận thị nhìn gần -> đeo thấu kính phân kì."
    }
  ],

  // 5. HÓA HỌC KHỐI 8
  "hoa-ltdh-k8": [
    {
      id: "hoa8-1",
      type: "multiple_choice",
      question: "Hạt nhân nguyên tử được cấu tạo bởi những loại hạt vi mô nào?",
      options: [
        "Proton (mang điện dương) và Nơtron (không mang điện)",
        "Proton và Electron (mang điện âm)",
        "Chỉ có hạt Electron chuyển động xung quanh",
        "Electron và Nơtron"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Nguyên tử gồm vỏ chứa electron mang điện âm và hạt nhân ở tâm chứa proton (+) và nơtron (không mang điện).",
      hint: "Hạt nhân gồm hạt p và hạt n."
    },
    {
      id: "hoa8-2",
      type: "multiple_choice",
      question: "Định luật bảo toàn khối lượng phát biểu: Trong một phản ứng hóa học, tổng khối lượng của các chất sản phẩm bằng:",
      options: [
        "Tổng khối lượng của các chất tham gia phản ứng",
        "Lớn hơn tổng khối lượng của các chất tham gia",
        "Nhỏ hơn tổng khối lượng của các chất tham gia vì có khí thoát ra",
        "Bằng hai lần khối lượng chất phản ứng ban đầu"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Trong phản ứng hóa học, chỉ có liên kết giữa các nguyên tử thay đổi, số nguyên tử mỗi nguyên tố giữ nguyên => m_sản phẩm = m_tham gia.",
      hint: "Khối lượng trước và sau phản ứng luôn được bảo toàn."
    },
    {
      id: "hoa8-3",
      type: "multiple_choice",
      question: "Một mol nguyên tử hoặc phân tử của bất kì chất nào đều chứa bao nhiêu hạt vi mô (Số Avogađro N)?",
      options: [
        "6,022 * 10²³ hạt",
        "6,022 * 10²² hạt",
        "3,14 * 10²³ hạt",
        "1,66 * 10⁻²⁴ hạt"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Số Avogađro N = 6,022 * 10²³ hạt (nguyên tử hoặc phân tử chất đó).",
      hint: "Con số 6,022 nhân 10 mũ 23."
    },
    {
      id: "hoa8-4",
      type: "multiple_choice",
      question: "Ở điều kiện chuẩn (25°C, 1 bar), thể tích mol của 1 mol chất khí bất kì là:",
      options: [
        "24,79 lít",
        "22,4 lít",
        "24,4 lít",
        "25,0 lít"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Theo chuẩn mới chương trình GDPT 2018 (đo ở 25°C, 1 bar), 1 mol khí chiếm thể tích 24,79 lít (chuẩn cũ là 22,4 lít ở 0°C, 1 atm).",
      hint: "Chuẩn mới GDPT 2018 nhiệt độ phòng 25 độ C là 24,79 lít."
    },
    {
      id: "hoa8-5",
      type: "multiple_choice",
      question: "Cho kim loại Sắt (Fe) phản ứng hoàn toàn với dung dịch Axit Clohiđric (HCl). Phương trình hóa học viết đúng là:",
      options: [
        "Fe + 2HCl -> FeCl₂ + H₂↑",
        "2Fe + 6HCl -> 2FeCl₃ + 3H₂↑",
        "Fe + HCl -> FeCl + H₂↑",
        "Fe + 2HCl -> FeCl₂ + H₂O"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Sắt tác dụng với dung dịch HCl tạo muối Sắt(II) Clorua FeCl₂ và giải phóng khí Hiđro H₂.",
      hint: "Tạo muối sắt hóa trị II và sủi bọt khí hiđro."
    },
    {
      id: "hoa8-6",
      type: "multiple_choice",
      question: "Đốt cháy hoàn toàn 12 gam Cacbon (C) trong khí Oxi vừa đủ thu được m gam khí Cacbon đioxit (CO₂). Giá trị của m là (Cho C=12, O=16):",
      options: [
        "44 gam",
        "28 gam",
        "32 gam",
        "56 gam"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      explanation: "n_C = 12 / 12 = 1 mol. Phương trình: C + O₂ -> CO₂. n_CO₂ = n_C = 1 mol => m_CO₂ = 1 * 44 = 44 gam.",
      hint: "1 mol C tạo ra 1 mol CO2 (M = 12 + 16*2 = 44 g/mol)."
    }
  ],

  // 6. HÓA HỌC KHỐI 9 & LUYỆN THI VÀO 10
  "hoa-ltdh-k9": [
    {
      id: "hoa9-1",
      type: "multiple_choice",
      question: "Dung dịch nào sau đây làm quỳ tím chuyển sang màu đỏ đặc trưng?",
      options: [
        "Dung dịch Axit Clohiđric (HCl)",
        "Dung dịch Natri hiđroxit (NaOH)",
        "Dung dịch Natri clorua (NaCl)",
        "Dung dịch Nước vôi trong Ca(OH)₂"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Axit làm quỳ tím đổi màu đỏ. Dung dịch kiềm bazơ làm quỳ tím đổi màu xanh. Muối trung tính NaCl không đổi màu quỳ tím.",
      hint: "Axit biến quỳ tím thành đỏ."
    },
    {
      id: "hoa9-2",
      type: "multiple_choice",
      question: "Khí nào sau đây là nguyên nhân chủ yếu gây ra hiện tượng mưa axit phá hủy môi trường?",
      options: [
        "Khí Lưu huỳnh đioxit (SO₂) và Nitơ đioxit (NO₂)",
        "Khí Oxi (O₂) và Nitơ (N₂)",
        "Khí Mêtan (CH₄) và Cacbon monoxit (CO)",
        "Khí Hiđro (H₂) và Heli (He)"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Khí SO₂ và các oxit của nitơ thải ra từ nhà máy, xe cộ kết hợp hơi nước trong không khí tạo axit H₂SO₄, HNO₃ gây mưa axit.",
      hint: "Các oxit axit của lưu huỳnh và nitơ."
    },
    {
      id: "hoa9-3",
      type: "multiple_choice",
      question: "Dãy kim loại nào sau đây được sắp xếp theo chiều mức độ hoạt động hóa học GIẢM DẦN?",
      options: [
        "K, Na, Mg, Al, Zn, Fe, Cu, Ag",
        "Cu, Ag, Fe, Zn, Al, Mg, Na, K",
        "Al, Fe, Cu, Ag, K, Na, Mg, Zn",
        "Na, K, Fe, Zn, Mg, Al, Ag, Cu"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Dãy hoạt động hóa học của kim loại: K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, (H), Cu, Hg, Ag, Pt, Au. (Khi Nào Cần May Áo Záp Sắt Nhìn Sang Phố Hỏi Cửa Hàng Á Phi Âu).",
      hint: "Kim loại kiềm K, Na đứng đầu, kim loại quý Ag đứng cuối."
    },
    {
      id: "hoa9-4",
      type: "multiple_choice",
      question: "Cho mẩu kim loại Đồng (Cu) vào ống nghiệm chứa dung dịch Bạc nitrat (AgNO₃), hiện tượng quan sát được là:",
      options: [
        "Có kim loại màu xám bạc bám ngoài lá đồng, dung dịch chuyển dần sang màu xanh lam",
        "Có sủi bọt khí mạnh thoát ra từ ống nghiệm",
        "Không có hiện tượng gì xảy ra vì đồng kém hoạt động hơn bạc",
        "Mẩu đồng tan hoàn toàn và xuất hiện kết tủa màu đỏ nâu"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Cu hoạt động mạnh hơn Ag nên đẩy Ag ra khỏi muối: Cu + 2AgNO₃ -> Cu(NO₃)₂ + 2Ag↓. Muối Cu(NO₃)₂ có màu xanh lam, kim loại Ag màu trắng bạc.",
      hint: "Đồng đẩy bạc ra khỏi dung dịch muối, tạo ion Cu²⁺ màu xanh lam."
    },
    {
      id: "hoa9-5",
      type: "multiple_choice",
      question: "Khí Mêtan (CH₄) và khí Etilen (C₂H₄) có phản ứng đặc trưng nào giúp phân biệt hai khí này?",
      options: [
        "Etilen làm mất màu dung dịch Nước Brom, còn Mêtan thì không",
        "Mêtan cháy tỏa nhiệt còn Etilen không cháy được",
        "Etilen phản ứng nổ với oxi còn Mêtan không nổ",
        "Mêtan làm đục nước vôi trong còn Etilen thì không"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      explanation: "Etilen chứa liên kết đôi C=C kém bền nên dễ dàng tham gia phản ứng cộng làm mất màu dung dịch Brom (da cam sang không màu). Mêtan chỉ chứa liên kết đơn nên không làm mất màu Brom ở điều kiện thường.",
      hint: "Liên kết đôi trong phân tử Etilen làm mất màu dung dịch Brom."
    }
  ],

  // 7. TIẾNG ANH KHỐI 8
  "anh-ltdh-k8": [
    {
      id: "anh8-1",
      type: "multiple_choice",
      question: "Choose the best option: \"Look at the dark clouds! It _______ soon.\"",
      options: [
        "is going to rain",
        "rained",
        "rains",
        "was raining"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Dùng thì tương lai gần 'be going to + V' để diễn tả một sự việc sắp xảy ra có bằng chứng rõ ràng ở hiện tại (dark clouds).",
      hint: "Có bằng chứng thấy mây đen ngay trước mắt -> tương lai gần."
    },
    {
      id: "anh8-2",
      type: "multiple_choice",
      question: "Complete the sentence: \"She has lived in this city _______ 2015.\"",
      options: [
        "since",
        "for",
        "in",
        "at"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Thì hiện tại hoàn thành (has lived): 'since + mốc thời gian' (năm 2015), 'for + khoảng thời gian'.",
      hint: "Mốc thời gian dùng since, khoảng thời gian dùng for."
    },
    {
      id: "anh8-3",
      type: "multiple_choice",
      question: "Comparative degree: \"This laptop is _______ than the old one I bought last year.\"",
      options: [
        "more powerful",
        "powerfuler",
        "most powerful",
        "as powerful"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "'Powerful' là tính từ dài 3 âm tiết, công thức so sánh hơn: more + adj + than.",
      hint: "Tính từ dài có đuôi 'ful' dùng more... than."
    },
    {
      id: "anh8-4",
      type: "multiple_choice",
      question: "First Conditional: \"If it _______ tomorrow, we will cancel the camping trip.\"",
      options: [
        "rains",
        "will rain",
        "rained",
        "is raining"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Câu điều kiện loại 1 diễn tả sự việc có thể xảy ra ở hiện tại hoặc tương lai: Mệnh đề If dùng thì Hiện tại đơn (If it rains), mệnh đề chính dùng 'will + V'.",
      hint: "Mệnh đề If không chia 'will', chia hiện tại đơn ngôi thứ 3 số ít."
    },
    {
      id: "anh8-5",
      type: "multiple_choice",
      question: "Relative Pronouns: \"The teacher _______ taught us English in grade 7 has just moved to London.\"",
      options: [
        "who",
        "which",
        "whose",
        "whom"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "'The teacher' là danh từ chỉ người, đóng vai trò chủ ngữ trong mệnh đề quan hệ => dùng đại từ quan hệ 'who'.",
      hint: "Chỉ người làm chủ ngữ dùng 'who'."
    },
    {
      id: "anh8-6",
      type: "fill_blank",
      question: "Fill in the correct prepositions: \"She is interested [1] learning foreign languages and good [2] solving math problems.\"",
      options: ["in", "at", "on", "about"],
      blankAnswers: ["in", "at"],
      wordBank: ["in", "at", "on", "about", "for"],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Cụm cố định: 'be interested in' (quan tâm/thích thú điều gì), 'be good at' (giỏi môn gì/kỹ năng gì).",
      hint: "interested in - good at."
    }
  ],

  // 8. TIẾNG ANH KHỐI 9 & LUYỆN THI VÀO 10
  "anh-ltdh-k9": [
    {
      id: "anh9-1",
      type: "multiple_choice",
      question: "Passive voice: \"They built this magnificent bridge in 1998.\" -> \"This magnificent bridge _______ in 1998.\"",
      options: [
        "was built",
        "is built",
        "has been built",
        "were built"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Câu chủ động ở thì Quá khứ đơn (built), chủ ngữ mới số ít (bridge) => Bị động: was + V3/ed (was built).",
      hint: "Quá khứ đơn bị động: was/were + P2."
    },
    {
      id: "anh9-2",
      type: "multiple_choice",
      question: "Reported speech: \"I am studying hard for the high school entrance exam,\" Nam said. -> Nam said that he _______ hard for the high school entrance exam.",
      options: [
        "was studying",
        "is studying",
        "has studied",
        "studies"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "Khi chuyển sang câu gián tiếp có động từ tường thuật ở quá khứ (said), ta lùi thì: Hiện tại tiếp diễn (am studying) -> Quá khứ tiếp diễn (was studying).",
      hint: "Lùi thì: am studying -> was studying."
    },
    {
      id: "anh9-3",
      type: "multiple_choice",
      question: "Phrasal verbs: \"Remember to _______ your coat before going outside because it is freezing cold!\"",
      options: [
        "put on",
        "take off",
        "look after",
        "give up"
      ],
      correctAnswer: 0,
      difficulty: "de",
      explanation: "'put on' nghĩa là mặc vào / mang vào; 'take off' là cởi ra; 'look after' là chăm sóc; 'give up' là từ bỏ.",
      hint: "Mặc áo khoác vào: put on your coat."
    },
    {
      id: "anh9-4",
      type: "multiple_choice",
      question: "Wish clause: \"I don't have enough money to buy that modern scientific calculator.\" -> \"I wish I _______ enough money to buy that calculator.\"",
      options: [
        "had",
        "have",
        "will have",
        "would have"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Câu ước cho điều không có thật ở hiện tại: S + wish + S + V(quá khứ đơn). Động từ 'have' lùi thành 'had'.",
      hint: "Ước ở hiện tại lùi về thì quá khứ đơn (had)."
    },
    {
      id: "anh9-5",
      type: "multiple_choice",
      question: "Suggesting structure: \"The teacher suggested that we _______ more time practicing speaking English.\"",
      options: [
        "should spend",
        "spent",
        "must spend",
        "spending"
      ],
      correctAnswer: 0,
      difficulty: "trung_binh",
      explanation: "Cấu trúc giả định với suggest: S + suggest + that + S + (should) + V_nguyên thể.",
      hint: "suggest that S (should) + V-infinitive."
    },
    {
      id: "anh9-6",
      type: "multiple_choice",
      question: "Choose the word whose underlined part is pronounced differently from the others:",
      options: [
        "decided (âm /ɪd/)",
        "worked (âm /t/)",
        "stopped (âm /t/)",
        "watched (âm /t/)"
      ],
      correctAnswer: 0,
      difficulty: "kho",
      explanation: "Quy tắc phát âm đuôi -ed: 'decided' tận cùng bằng âm /d/ nên phát âm là /ɪd/. Các từ còn lại có âm tận cùng vô thanh (/k/, /p/, /tʃ/) nên phát âm là /t/.",
      hint: "Đuôi 't' và 'd' thì phát âm là /id/."
    }
  ]
};

export const extraLessons = [

  {
    "id": "toan-ltdh-k6",
    "subject": "Môn TOÁN",
    "grade": "Khối 6",
    "gradeNumber": 6,
    "title": "📐 TOÁN 6: Số học, Phân số, Số thập phân & Hình học trực quan",
    "description": "Tập hợp số tự nhiên, tính chất chia hết, số nguyên, phân số, số thập phân và các hình phẳng trực quan (tam giác đều, hình vuông, lục giác đều, hình thoi).",
    "iconName": "Calculator",
    "color": "from-blue-600 to-indigo-700",
    "isSpecialExam": true
  },
  {
    "id": "toan-ltdh-k7",
    "subject": "Môn TOÁN",
    "grade": "Khối 7",
    "gradeNumber": 7,
    "title": "📐 TOÁN 7: Số hữu tỉ, Số thực, Đa thức & Tam giác bằng nhau",
    "description": "Cộng trừ nhân chia số hữu tỉ, căn bậc hai số học, đơn thức - đa thức một biến, các trường hợp bằng nhau của tam giác và định lý Pythagore.",
    "iconName": "Calculator",
    "color": "from-blue-600 to-indigo-700",
    "isSpecialExam": true
  },
  {
    "id": "toan-vao-10",
    "subject": "Môn TOÁN",
    "grade": "Luyện thi vào 10",
    "gradeNumber": 9,
    "title": "⭐ TOÁN TUYỂN SINH VÀO 10: Rút gọn biểu thức, Hệ phương trình, Vi-ét & Hình học đường tròn",
    "description": "Bộ đề tổng hợp cấu trúc thi vào 10 chính thức: Rút gọn căn thức, giải bài toán bằng cách lập hệ phương trình, định lý Vi-ét tìm m, tiếp tuyến đường tròn và cực trị đại số.",
    "iconName": "Award",
    "color": "from-amber-500 to-rose-600",
    "isSpecialExam": true
  },
  {
    "id": "li-ltdh-k6",
    "subject": "Môn LÍ",
    "grade": "Khối 6",
    "gradeNumber": 6,
    "title": "⚡ KHTN 6 (VẬT LÍ): Lực, Khối lượng, Trọng lượng & Đo lường",
    "description": "Đơn vị đo độ dài, khối lượng, thời gian, nhiệt độ; lực tiếp xúc và không tiếp xúc, lực ma sát, lực cản và năng lượng trong đời sống.",
    "iconName": "Zap",
    "color": "from-amber-500 to-orange-600",
    "isSpecialExam": true
  },
  {
    "id": "li-ltdh-k7",
    "subject": "Môn LÍ",
    "grade": "Khối 7",
    "gradeNumber": 7,
    "title": "⚡ KHTN 7 (VẬT LÍ): Tốc độ chuyển động, Âm thanh & Ánh sáng",
    "description": "Đo tốc độ, đồ thị quãng đường - thời gian, sóng âm, độ to - độ cao của âm thanh, định luật phản xạ ánh sáng và ảnh tạo bởi gương phẳng.",
    "iconName": "Zap",
    "color": "from-amber-500 to-orange-600",
    "isSpecialExam": true
  },
  {
    "id": "khtn-vao-10",
    "subject": "Môn LÍ",
    "grade": "Luyện thi vào 10",
    "gradeNumber": 9,
    "title": "⭐ KHTN VÀO 10: Tổng hợp Vật Lí (Điện - Quang) & Hóa Học (Vô cơ - Hữu cơ)",
    "description": "Đề thi thử môn KHTN / Lí - Hóa tổng hợp vào 10: Định luật Ôm, máy biến thế, khúc xạ ánh sáng, phân loại hợp chất vô cơ, bài toán kim loại và hidrocacbon.",
    "iconName": "Sparkles",
    "color": "from-emerald-600 to-cyan-700",
    "isSpecialExam": true
  },
  {
    "id": "anh-ltdh-k6",
    "subject": "Môn ANH",
    "grade": "Khối 6",
    "gradeNumber": 6,
    "title": "🇬🇧 TIẾNG ANH 6: Hiện tại đơn, Hiện tại tiếp diễn & Từ vựng căn bản",
    "description": "Ngữ pháp cốt lõi lớp 6: Present Simple vs Present Continuous, giới từ chỉ nơi chốn, đại từ sở hữu, danh từ đếm được và không đếm được.",
    "iconName": "Globe2",
    "color": "from-purple-600 to-indigo-800",
    "isSpecialExam": true
  },
  {
    "id": "anh-ltdh-k7",
    "subject": "Môn ANH",
    "grade": "Khối 7",
    "gradeNumber": 7,
    "title": "🇬🇧 TIẾNG ANH 7: Quá khứ đơn, Tương lai đơn, So sánh & Cụm từ chỉ số lượng",
    "description": "Past Simple, Future Simple, cấu trúc 'used to', so sánh bằng 'as...as' và khác biệt 'different from', much/many/a lot of.",
    "iconName": "Globe2",
    "color": "from-purple-600 to-indigo-800",
    "isSpecialExam": true
  },
  {
    "id": "anh-vao-10",
    "subject": "Môn ANH",
    "grade": "Luyện thi vào 10",
    "gradeNumber": 9,
    "title": "⭐ TIẾNG ANH TUYỂN SINH VÀO 10: Ngữ âm, Trọng âm, Ngữ pháp tổng hợp & Đọc hiểu",
    "description": "Bộ đề thi thử môn Tiếng Anh vào lớp 10 theo form chuẩn: Phát âm đuôi -ed/-s, trọng âm 2-3 âm tiết, câu gián tiếp, câu điều kiện, bị động, mệnh đề quan hệ và bài đọc hiểu điền từ.",
    "iconName": "Award",
    "color": "from-purple-600 to-pink-600",
    "isSpecialExam": true
  }
,
  {
    id: "toan-ltdh-k8",
    subject: "Môn TOÁN",
    grade: "Khối 8",
    gradeNumber: 8,
    title: "📐 Chuyên đề TOÁN: Hằng đẳng thức, Phân thức đại số & Tam giác đồng dạng",
    description: "Ôn tập trọng tâm các hằng đẳng thức đáng nhớ, rút gọn phân thức đại số, định lý Ta-lét và tam giác đồng dạng bồi dưỡng HSG & LTĐH.",
    iconName: "Calculator",
    color: "from-blue-600 to-indigo-700",
    isSpecialExam: true
  },
  {
    id: "li-ltdh-k8",
    subject: "Môn LÍ",
    grade: "Khối 8",
    gradeNumber: 8,
    title: "⚡ Chuyên đề VẬT LÍ: Cơ học, Áp suất, Lực đẩy Ác-si-mét & Công cơ học",
    description: "Chuyển động cơ học, vận tốc, áp suất chất lỏng - chất khí, điều kiện vật nổi và định luật bảo toàn công cơ học.",
    iconName: "Zap",
    color: "from-amber-500 to-orange-600",
    isSpecialExam: true
  },
  {
    id: "hoa-ltdh-k8",
    subject: "Môn HÓA",
    grade: "Khối 8",
    gradeNumber: 8,
    title: "🧪 Chuyên đề HÓA HỌC: Nguyên tử, Phản ứng hóa học & Định luật bảo toàn khối lượng",
    description: "Công thức hóa học, hóa trị, lập phương trình hóa học, tính toán theo công thức hóa học và phương trình hóa học chuẩn.",
    iconName: "Scroll",
    color: "from-emerald-600 to-teal-700",
    isSpecialExam: true
  },
  {
    id: "anh-ltdh-k8",
    subject: "Môn ANH",
    grade: "Khối 8",
    gradeNumber: 8,
    title: "🇬🇧 Chuyên đề TIẾNG ANH: Ngữ pháp trọng tâm, Thì động từ & Cấu trúc so sánh",
    description: "Tổng hợp 6 thì cơ bản, so sánh hơn - so sánh nhất, câu điều kiện loại 1, đại từ quan hệ và từ vựng chuyên đề.",
    iconName: "Globe2",
    color: "from-purple-600 to-indigo-800",
    isSpecialExam: true
  },
  {
    id: "toan-ltdh-k9",
    subject: "Môn TOÁN",
    grade: "Khối 9",
    gradeNumber: 9,
    title: "📐 Chuyên đề TOÁN: Phương trình bậc hai, Hệ thức Vi-ét & Đường tròn (Luyện thi vào 10)",
    description: "Phương pháp giải phương trình bậc hai một ẩn, ứng dụng định lý Vi-ét tìm m, góc với đường tròn, tứ giác nội tiếp và bài toán thực tế.",
    iconName: "Calculator",
    color: "from-blue-600 to-indigo-700",
    isSpecialExam: true
  },
  {
    id: "li-ltdh-k9",
    subject: "Môn LÍ",
    grade: "Khối 9",
    gradeNumber: 9,
    title: "⚡ Chuyên đề VẬT LÍ: Điện học, Định luật Ôm, Công suất điện & Quang hình học",
    description: "Đoạn mạch nối tiếp - song song, định luật Jun - Len-xơ, từ trường của ống dây, thấu kính hội tụ, thấu kính phân kì và tật khúc xạ mắt.",
    iconName: "Zap",
    color: "from-amber-500 to-orange-600",
    isSpecialExam: true
  },
  {
    id: "hoa-ltdh-k9",
    subject: "Môn HÓA",
    grade: "Khối 9",
    gradeNumber: 9,
    title: "🧪 Chuyên đề HÓA HỌC: Oxit, Axit, Bazơ, Muối & Hợp chất hữu cơ Hidrocacbon",
    description: "Tính chất hóa học các hợp chất vô cơ, dãy hoạt động hóa học kim loại, Mêtan, Etilen, Axetilen và bài toán hỗn hợp kinh điển.",
    iconName: "Scroll",
    color: "from-emerald-600 to-teal-700",
    isSpecialExam: true
  },
  {
    id: "anh-ltdh-k9",
    subject: "Môn ANH",
    grade: "Khối 9",
    gradeNumber: 9,
    title: "🇬🇧 Chuyên đề TIẾNG ANH: Câu gián tiếp, Câu bị động & Mệnh đề quan hệ (Luyện thi vào 10)",
    description: "Chuyển đổi câu chủ động - bị động đặc biệt, câu gián tiếp các dạng, mệnh đề quan hệ xác định - không xác định, phrasal verbs trọng tâm.",
    iconName: "Globe2",
    color: "from-purple-600 to-indigo-800",
    isSpecialExam: true
  }
];

// Gắn vào window để index.js và các module khác truy cập ngay lập tức
if (typeof window !== "undefined") {
  window.__EXTRA_QUESTION_BANKS__ = extraQuestions;
  window.__EXTRA_LESSONS__ = extraLessons;
  window.__QUESTION_BANKS__ = window.__QUESTION_BANKS__ || {};
  Object.assign(window.__QUESTION_BANKS__, extraQuestions);
  window.__ALL_LESSONS__ = window.__ALL_LESSONS__ || [];
  if (window.__ALL_LESSONS__.length === 0) {
    window.__ALL_LESSONS__.push(...extraLessons);
  }
}

