const fs = require('fs');
const html = fs.readFileSync('public/flowfest_clone.html', 'utf8');

const matches = [...html.matchAll(/flowfest/gi)];
console.log('Total occurrences of flowfest:', matches.length);

matches.forEach((m, i) => {
  const start = Math.max(0, m.index - 50);
  const end = Math.min(html.length, m.index + 50);
  console.log('[' + i + '] ...' + html.substring(start, end).replace(/\s+/g, ' ') + '...');
});
