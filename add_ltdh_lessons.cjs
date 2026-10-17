const fs = require('fs');

const lessons = JSON.parse(fs.readFileSync('extracted_lessons.json', 'utf8'));

const ltdhLessons = [
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

// Thêm vào đầu danh sách
const newLessons = [...ltdhLessons, ...lessons.filter(l => !l.id.includes('ltdh'))];
fs.writeFileSync('extracted_lessons.json', JSON.stringify(newLessons, null, 2), 'utf8');
console.log('✅ Đã cập nhật extracted_lessons.json. Tổng số bài học/chuyên đề:', newLessons.length);
