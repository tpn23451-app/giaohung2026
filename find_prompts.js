const fs = require('fs');
const code = fs.readFileSync('index.js', 'utf8');

// Find prompts or gemini calls
const prompts = [];
const promptMatches = code.match(/systemInstruction|prompt|Gemini|generateContent|GoogleGenerativeAI/gi);
console.log('Prompt occurrences:', promptMatches ? promptMatches.length : 0);

// Find prompt text
const geminiIdx = code.indexOf('gemini-');
if (geminiIdx !== -1) {
  console.log('Gemini model:', code.substring(geminiIdx - 50, geminiIdx + 100));
}

// Find prompt templates
const promptIdx = code.indexOf('Bạn là một chuyên gia sư phạm');
if (promptIdx !== -1) {
  console.log('Found pedagogical prompt:', code.substring(promptIdx, promptIdx + 500));
} else {
  // search for "giáo viên" or "câu hỏi"
  const gvIdx = code.indexOf('giáo viên Tin học');
  if (gvIdx !== -1) {
    console.log('Found prompt with giáo viên Tin học:', code.substring(gvIdx - 50, gvIdx + 500));
  }
}
