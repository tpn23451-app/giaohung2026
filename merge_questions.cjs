const fs = require('fs');

const origQ = JSON.parse(fs.readFileSync('extracted_questions.json', 'utf8'));
const extraQ = JSON.parse(fs.readFileSync('extra_subject_questions.json', 'utf8'));

const merged = { ...origQ, ...extraQ };
fs.writeFileSync('extracted_questions.json', JSON.stringify(merged, null, 2), 'utf8');

let total = 0;
for (const [k, v] of Object.entries(merged)) {
  total += v.length;
}
console.log('✅ Đã gộp thành công! Tổng số chuyên đề:', Object.keys(merged).length);
console.log('✅ Tổng số câu hỏi hiện tại:', total);
