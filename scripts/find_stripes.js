const fs = require('fs');
const { JSDOM } = require('jsdom');
const rawHtml = fs.readFileSync('flowfest_raw.html', 'utf8');

// Looking for the 4 bars. They might be .page-transition, .transition-wrap, etc.
const dom = new JSDOM(rawHtml);
const doc = dom.window.document;

const stripes = Array.from(doc.querySelectorAll('*')).filter(el => {
  return el.className && typeof el.className === 'string' && 
         (el.className.includes('stripe') || el.className.includes('transition') || el.className.includes('line') || el.className.includes('menu'));
});

// Let's log the first few matching classes to figure out what the 4 lines are called.
const uniqueClasses = new Set();
stripes.forEach(el => uniqueClasses.add(el.className));
console.log(Array.from(uniqueClasses).slice(0, 30));
