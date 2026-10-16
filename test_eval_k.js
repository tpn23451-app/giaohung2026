const fs = require('fs');
const code = fs.readFileSync('index.js', 'utf8');

const start = code.indexOf(',y={"tin3-bai-1":') + 1;
const end = code.indexOf('},ue=[{id:`tin3-on-tap-giua-ki-1`');
console.log('start:', start, 'end:', end);

// The chunk is: y={"tin3-bai-1":...}...k={...y,...b,...x,...S,...C,...le,...w,"tin9-on-tap-giua-ki-1":ce}
const chunk = code.substring(start, end + 1);
console.log('chunk length:', chunk.length);

const evalCode = `
(() => {
  var ${chunk};
  return k;
})()
`;

try {
  const kObj = eval(evalCode);
  console.log('Successfully evaluated k!');
  const keys = Object.keys(kObj);
  console.log('Total lessons with question banks in k:', keys.length);
  
  let totalQuestions = 0;
  const countsPerLesson = {};
  for (const key of keys) {
    const qCount = Array.isArray(kObj[key]) ? kObj[key].length : 0;
    countsPerLesson[key] = qCount;
    totalQuestions += qCount;
  }
  console.log('Total questions in k:', totalQuestions);
  fs.writeFileSync('extracted_questions.json', JSON.stringify(kObj, null, 2), 'utf8');
  console.log('Successfully saved extracted_questions.json');
} catch (e) {
  console.error('Eval error:', e.message);
  // If undefined variable error, print it
}
