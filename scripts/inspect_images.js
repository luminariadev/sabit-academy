const fs = require('fs');
const html = fs.readFileSync('public/flowfest_clone.html', 'utf8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(html);
const doc = dom.window.document;

console.log('=== All IMG elements ===');
doc.querySelectorAll('img').forEach((img, i) => {
  console.log(`[${i}] class="${img.className}" src="${img.src}" hasSrcset="${Boolean(img.getAttribute('srcset'))}"`);
});

const cdnImgs = Array.from(doc.querySelectorAll('img')).filter(img => img.src.includes('website-files.com'));
console.log('\nTotal images from website-files.com:', cdnImgs.length);
