const fs = require('fs');
const html = fs.readFileSync('public/flowfest_clone.html', 'utf8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(html);
const doc = dom.window.document;
doc.querySelectorAll('.speaker-card').forEach((card, i) => {
  console.log('Speaker [' + i + ']: ' + card.textContent.replace(/\s+/g, ' ').trim().substring(0, 150));
});
