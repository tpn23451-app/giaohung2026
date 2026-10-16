const fs = require('fs');
const code = fs.readFileSync('index.js', 'utf8');

const keywords = ['apiKey', 'api_key', 'generateContent', 'gemini', 'generative', 'ai.google', 'tạo câu hỏi', 'Tạo đề', 'xuatDocx', 'exportDocx', 'saveAs'];
for (const kw of keywords) {
  let idx = 0;
  let count = 0;
  while ((idx = code.indexOf(kw, idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(`Keyword [${kw}] at ${idx}:`, code.substring(Math.max(0, idx - 80), Math.min(code.length, idx + 120)));
    }
    idx += kw.length;
  }
  if (count > 0) console.log(`Total [${kw}]: ${count}`);
}
