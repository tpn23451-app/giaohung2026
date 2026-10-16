const fs = require('fs');
const code = fs.readFileSync('index.js', 'utf8');

// Let's locate the object `k={...y,...b,...x,...S,...C,...le,...w,"tin9-on-tap-giua-ki-1":ce}`
const kPos = code.indexOf(',"tin9-on-tap-giua-ki-1":ce}');
console.log('kPos:', kPos);
if (kPos !== -1) {
  console.log('Around kPos:', code.substring(kPos - 120, kPos + 80));
}

// Let's check how y, b, x, S, C, le, w, ce are declared
// In JS bundlers, they are usually declared right before k or as const y={...}
const vars = ['y', 'b', 'x', 'S', 'C', 'le', 'w', 'ce'];
for (const v of vars) {
  const patterns = [`,${v}={`, `const ${v}={`, `let ${v}={`, `var ${v}={`, `,${v}=[`];
  for (const p of patterns) {
    const idx = code.indexOf(p);
    if (idx !== -1) {
      console.log(`Found ${v} with pattern "${p}" at pos ${idx}:`, code.substring(idx, idx + 80));
    }
  }
}
