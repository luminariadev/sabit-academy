const fs = require('fs');
const html = fs.readFileSync('flowfest_raw.html', 'utf8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(html);
const h1 = dom.window.document.querySelector('h1.welcome__h1');
const spans = Array.from(h1.querySelectorAll('span'));
console.log('Total spans inside H1:', spans.length);
spans.forEach((s, i) => {
  console.log(`Span [${i}]: text="${s.textContent.trim().substring(0, 50)}" (hasSVG: ${Boolean(s.querySelector('svg'))})`);
});
