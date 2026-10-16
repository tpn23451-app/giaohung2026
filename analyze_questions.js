const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('extracted_questions.json', 'utf8'));
const lessons = JSON.parse(fs.readFileSync('extracted_lessons.json', 'utf8'));

console.log('--- ANALYSIS OF EXTRACTED QUESTIONS ---');
const types = new Set();
const levels = new Set();
const sampleByType = {};

for (const [lessonId, qList] of Object.entries(questions)) {
  for (const q of qList) {
    if (q.type) types.add(q.type);
    if (q.level) levels.add(q.level);
    
    const t = q.type || (q.options ? 'multiple_choice' : 'other');
    if (!sampleByType[t]) {
      sampleByType[t] = { lessonId, sample: q };
    }
  }
}

console.log('Question Types found:', [...types]);
console.log('Levels found:', [...levels]);
console.log('\nSamples by Type:');
console.log(JSON.stringify(sampleByType, null, 2));

// Check correlation between lessons and questions
const lessonMap = new Map();
lessons.forEach(l => lessonMap.set(l.id, l));

const missingQuestions = [];
for (const l of lessons) {
  if (!questions[l.id] || questions[l.id].length === 0) {
    missingQuestions.push({ id: l.id, grade: l.grade, title: l.title });
  }
}

console.log('\nTotal lessons:', lessons.length);
console.log('Lessons with pre-authored questions:', lessons.length - missingQuestions.length);
console.log('Lessons without pre-authored questions (using AI generation in original app):', missingQuestions.length);
if (missingQuestions.length > 0) {
  console.log('Sample lessons without pre-authored questions:', missingQuestions.slice(0, 5));
}
