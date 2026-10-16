const fs = require('fs');

const code = fs.readFileSync('index.js', 'utf8');

// 1. Extract ue array (Lessons list)
const startIdx = code.indexOf(',ue=[');
if (startIdx === -1) {
  console.error('Could not find ,ue=[');
  process.exit(1);
}

const arrayStart = startIdx + 4; // points to '['
let depth = 0;
let arrayEnd = -1;
let inString = false;
let quoteChar = '';

for (let i = arrayStart; i < code.length; i++) {
  const ch = code[i];
  const prev = code[i - 1];

  if (inString) {
    if (ch === quoteChar && prev !== '\\') {
      inString = false;
    }
  } else {
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      quoteChar = ch;
    } else if (ch === '[') {
      depth++;
    } else if (ch === ']') {
      depth--;
      if (depth === 0) {
        arrayEnd = i;
        break;
      }
    }
  }
}

console.log('arrayStart:', arrayStart, 'arrayEnd:', arrayEnd);
const ueCode = code.substring(arrayStart, arrayEnd + 1);
const lessons = eval(ueCode);
console.log('Total lessons extracted:', lessons.length);

const byGrade = {};
for (const item of lessons) {
  byGrade[item.grade] = (byGrade[item.grade] || 0) + 1;
}
console.log('Lessons by grade:');
console.table(byGrade);

fs.writeFileSync('extracted_lessons.json', JSON.stringify(lessons, null, 2), 'utf8');
console.log('Successfully wrote extracted_lessons.json');
