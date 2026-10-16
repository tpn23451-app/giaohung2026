const fs = require('fs');

const lessons = JSON.parse(fs.readFileSync('extracted_lessons.json', 'utf8'));
const questions = JSON.parse(fs.readFileSync('extracted_questions.json', 'utf8'));

// 1. Generate danh_sach_bai_hoc.md
let mdLessons = `# DANH MỤC 120 BÀI HỌC TIN HỌC TIỂU HỌC & THCS (SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
**Tác giả ứng dụng:** GV Ms. Trúc Tin Học.AI  
**Nguồn dữ liệu:** https://gia-su-tin-hoc-thcs.vercel.app/  
**Tổng số bài học:** 120 bài (Khối 3 đến Khối 9)  
**Tổng số câu hỏi biên soạn sẵn:** 534 câu

---

`;

const grades = ['Khối 3', 'Khối 4', 'Khối 5', 'Khối 6', 'Khối 7', 'Khối 8', 'Khối 9'];

for (const g of grades) {
  const gLessons = lessons.filter(l => l.grade === g);
  mdLessons += `## 📚 ${g.toUpperCase()} (${gLessons.length} bài học / đề ôn)\n\n`;
  mdLessons += `| STT | Mã bài | Chủ đề / Loại | Tên bài học / Đề ôn tập | Số câu hỏi sẵn có |\n`;
  mdLessons += `| :---: | :--- | :--- | :--- | :---: |\n`;

  gLessons.forEach((l, idx) => {
    const qCount = questions[l.id] ? questions[l.id].length : 0;
    const specialMark = l.isSpecialExam ? '⭐ ' : '';
    mdLessons += `| ${idx + 1} | \`${l.id}\` | ${l.subject || 'Chủ đề'} | **${specialMark}${l.title}** | ${qCount > 0 ? `**${qCount} câu**` : '_Tạo bằng AI_'} |\n`;
  });

  mdLessons += `\n`;
}

fs.writeFileSync('danh_sach_bai_hoc.md', mdLessons, 'utf8');
console.log('Successfully generated danh_sach_bai_hoc.md');

// 2. Generate ngan_hang_cau_hoi_mau.md
let mdQuestions = `# BỘ DỮ LIỆU NGÂN HÀNG CÂU HỎI TIN HỌC (534 CÂU HỎI TRÍCH XUẤT)
**Nguồn:** Ms. Trúc Tin Học.AI - Ứng dụng Gia Sư Tin Học THCS  
**Phân loại:** Trắc nghiệm khách quan, Điền khuyết, Ghép nối, Kéo thả thứ tự  

---

`;

for (const g of grades) {
  const gLessons = lessons.filter(l => l.grade === g);
  let gradeQCount = 0;
  gLessons.forEach(l => {
    if (questions[l.id]) gradeQCount += questions[l.id].length;
  });

  mdQuestions += `## 🎓 ${g.toUpperCase()} (Tổng cộng: ${gradeQCount} câu hỏi)\n\n`;

  for (const l of gLessons) {
    const qList = questions[l.id];
    if (!qList || qList.length === 0) continue;

    mdQuestions += `### 📖 ${l.title} (\`${l.id}\` - ${qList.length} câu)\n`;
    mdQuestions += `*Mô tả bài học:* ${l.description || 'Theo chuẩn SGK Kết Nối Tri Thức'}\n\n`;

    qList.forEach((q, qIdx) => {
      const typeLabel = q.type === 'multiple_choice' ? 'Trắc nghiệm 4 lựa chọn' :
                        q.type === 'fill_blank' ? 'Điền khuyết / Chọn từ' :
                        q.type === 'matching' ? 'Ghép nối' :
                        q.type === 'drag_drop_order' ? 'Kéo thả thứ tự' :
                        q.type === 'drag_drop' ? 'Kéo thả khối lệnh' : (q.type || 'Câu hỏi trắc nghiệm');

      const diffLabel = q.difficulty === 'de' ? '🟢 Dễ' :
                        q.difficulty === 'trung_binh' ? '🟡 Trung bình' :
                        q.difficulty === 'kho' ? '🔴 Khó' : '⚪ Tổng hợp';

      mdQuestions += `#### Câu ${qIdx + 1} [${typeLabel} - ${diffLabel}]: ${q.question}\n`;

      if (q.options && q.options.length > 0 && q.type !== 'matching') {
        q.options.forEach((opt, optIdx) => {
          const optLetter = String.fromCharCode(65 + optIdx);
          const isCorrect = q.correctAnswer === optIdx;
          mdQuestions += `- **${optLetter}.** ${opt} ${isCorrect ? '✅ *(Đáp án đúng)*' : ''}\n`;
        });
      }

      if (q.matchingLeft && q.matchingRight && q.correctMatches) {
        mdQuestions += `\n*Cặp ghép đúng:*\n`;
        for (const [leftId, rightId] of Object.entries(q.correctMatches)) {
          const leftText = q.matchingLeft.find(item => item.id === leftId)?.text || leftId;
          const rightText = q.matchingRight.find(item => item.id === rightId)?.text || rightId;
          mdQuestions += `- **${leftText}** ➡️ **${rightText}**\n`;
        }
      }

      if (q.blankAnswers) {
        mdQuestions += `\n*Từ khóa điền khuyết:* ${q.blankAnswers.map(ans => `\`${ans}\``).join(', ')}\n`;
      }

      if (q.orderItems && q.correctOrder) {
        mdQuestions += `\n*Thứ tự chính xác:*\n`;
        q.correctOrder.forEach((stepId, sIdx) => {
          const itemText = q.orderItems.find(it => it.id === stepId)?.text || stepId;
          mdQuestions += `${sIdx + 1}. ${itemText}\n`;
        });
      }

      if (q.explanation) {
        mdQuestions += `\n> 💡 **Giải thích:** ${q.explanation}\n`;
      }
      if (q.hint) {
        mdQuestions += `> 📌 **Gợi ý:** ${q.hint}\n`;
      }

      mdQuestions += `\n---\n\n`;
    });
  }
}

fs.writeFileSync('ngan_hang_cau_hoi_mau.md', mdQuestions, 'utf8');
console.log('Successfully generated ngan_hang_cau_hoi_mau.md');
