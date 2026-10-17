const fs = require('fs');

const lessons = JSON.parse(fs.readFileSync('extracted_lessons.json', 'utf8'));
const questions = JSON.parse(fs.readFileSync('extracted_questions.json', 'utf8'));

// 1. Generate danh_sach_bai_hoc.md
let totalQ = 0;
for (const [k, v] of Object.entries(questions)) {
  totalQ += v.length;
}

let mdLessons = `# DANH MỤC ${lessons.length} BÀI HỌC & CHUYÊN ĐỀ BỒI DƯỠNG (TOÁN - LÍ - HÓA - ANH - TIN)
**Hệ thống:** TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Thầy Hùng ĐT  
**Nguồn dữ liệu bồi dưỡng:** SGK Kết Nối Tri Thức & Hệ thống Chuyên đề Bồi dưỡng Văn hóa LTĐH  
**Tổng số bài học & chuyên đề:** ${lessons.length} bài  
**Tổng số câu hỏi biên soạn sẵn:** ${totalQ} câu hỏi chất lượng cao  

---

`;

const grades = ['Khối 3', 'Khối 4', 'Khối 5', 'Khối 6', 'Khối 7', 'Khối 8', 'Khối 9'];

for (const g of grades) {
  const gLessons = lessons.filter(l => l.grade === g);
  mdLessons += `## 📚 ${g.toUpperCase()} (${gLessons.length} bài học / chuyên đề ôn tập)\n\n`;
  mdLessons += `| STT | Mã bài | Chủ đề / Môn | Tên bài học / Chuyên đề ôn tập | Số câu hỏi sẵn có |\n`;
  mdLessons += `| :---: | :--- | :--- | :--- | :---: |\n`;

  gLessons.forEach((l, idx) => {
    const qCount = questions[l.id] ? questions[l.id].length : 0;
    const specialMark = l.isSpecialExam ? '⭐ ' : '';
    mdLessons += `| ${idx + 1} | \`${l.id}\` | ${l.subject || 'Chủ đề'} | **${specialMark}${l.title}** | ${qCount > 0 ? `**${qCount} câu**` : '_Tạo bằng AI_'} |\n`;
  });

  mdLessons += `\n`;
}

fs.writeFileSync('danh_sach_bai_hoc.md', mdLessons, 'utf8');
console.log('✅ Đã cập nhật danh_sach_bai_hoc.md!');
