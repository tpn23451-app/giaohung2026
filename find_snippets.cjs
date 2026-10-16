const fs = require('fs');
const code = fs.readFileSync('index.js', 'utf8');

const searchTerms = ['Chúc mừng', 'Hoàn thành', 'Nộp bài', 'Làm lại', 'GIA SƯ TIN HỌC', 'score', 'correctCount'];
searchTerms.forEach(t => {
  let count = 0;
  let idx = 0;
  while ((idx = code.indexOf(t, idx)) !== -1) {
    count++;
    if (count <= 2) {
      console.log('Term:', t, 'at', idx, 'snippet:', code.substring(Math.max(0, idx - 60), Math.min(code.length, idx + 120)));
    }
    idx += t.length;
  }
  console.log('Total ' + t + ':', count);
});
