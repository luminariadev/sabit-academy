const fs = require('fs');
const html = fs.readFileSync('public/flowfest_clone.html', 'utf8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(html);
const doc = dom.window.document;

console.log('1. Hero Title:');
console.log(doc.querySelector('h1.welcome__h1').innerHTML.trim());

console.log('\n2. Tweets Section Cards (Count: ' + doc.querySelectorAll('.tweet-card').length + '):');
doc.querySelectorAll('.tweet-card').forEach((card, i) => {
  const name = card.querySelector('.tweet-name')?.textContent.trim();
  const body = card.querySelector('.tweet-body')?.textContent.trim().substring(0, 70);
  console.log('   [Card ' + i + '] ' + name + ' -> ' + body + '...');
});

console.log('\n3. Footer Images:');
const fl = doc.querySelector('.footer__left-img');
const fr = doc.querySelector('.footer__right-img');
console.log('   Left: ' + fl?.src);
console.log('   Right: ' + fr?.src);

console.log('\n4. Distinct Image Sources:');
const srcs = Array.from(new Set(Array.from(doc.querySelectorAll('img')).map(i => i.src)));
console.log(srcs);
