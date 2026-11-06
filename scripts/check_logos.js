const fs = require('fs');
const html = fs.readFileSync('public/flowfest_clone.html', 'utf8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(html);
const doc = dom.window.document;

doc.querySelectorAll('[class*="logo"]').forEach((el, i) => {
  console.log(i, el.className, el.tagName, el.innerHTML.substring(0, 100));
});
