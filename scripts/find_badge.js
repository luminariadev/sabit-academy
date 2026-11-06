const fs = require('fs');
const { JSDOM } = require('jsdom');
const rawHtml = fs.readFileSync('flowfest_raw.html', 'utf8');

const dom = new JSDOM(rawHtml);
const doc = dom.window.document;

// Find the element containing "Friday 8th"
const elements = Array.from(doc.querySelectorAll('*'));
const textEl = elements.find(el => el.textContent && el.textContent.includes('Friday 8th August'));

if (textEl) {
  // Let's get its parents to see what the container is called
  let parent = textEl.parentElement;
  console.log('Found element! Parents:');
  while (parent && parent.tagName !== 'BODY') {
    console.log(parent.tagName, parent.className);
    parent = parent.parentElement;
  }
} else {
  console.log('Not found');
}
