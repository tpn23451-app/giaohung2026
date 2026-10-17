/**
 * Dữ liệu Ngân hàng câu hỏi & Cấu hình Đa môn (TOÁN, LÍ, HÓA, ANH)
 * Trung tâm Bồi dưỡng Văn hóa & LTĐH Giao Hùng - Thầy Hùng ĐT
 */

export const extraQuestions = {
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
  if (window.__QUESTION_BANKS__) {
    Object.assign(window.__QUESTION_BANKS__, extraQuestions);
  }
}

