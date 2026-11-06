const fs = require('fs');
const html = fs.readFileSync('public/flowfest_clone.html', 'utf8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(html);
const doc = dom.window.document;

console.log('=== VERIFICATION REPORT ===');
const remoteImgs = Array.from(doc.querySelectorAll('img')).filter(img => img.src.includes('website-files.com'));
console.log('1. Remote CDN Images remaining:', remoteImgs.length);

const localImgs = Array.from(doc.querySelectorAll('img')).filter(img => img.src.includes('/images/'));
console.log('2. Local student images in use:', localImgs.length);

console.log('3. Sample image sources:');
Array.from(doc.querySelectorAll('img')).slice(0, 8).forEach((img, i) => {
  console.log(`   [${i}] ${img.className} -> ${img.src}`);
});

console.log('4. Hero Title HTML:');
console.log(doc.querySelector('h1.welcome__h1').innerHTML.trim());

console.log('5. About Section:');
console.log('   Heading:', doc.querySelector('.about h2')?.textContent.trim());
console.log('   Desc:', doc.querySelector('.about p')?.textContent.trim());

console.log('6. Speakers:');
doc.querySelectorAll('.speaker-card').forEach((card, i) => {
  const tag = card.querySelector('.speaker-card__tag-span')?.textContent.trim();
  const name = card.querySelector('.speakers-card__cursor-span')?.textContent.trim();
  const bio = card.querySelector('.speaker-card__bio-p')?.textContent.trim().substring(0, 70);
  console.log(`   [${i}] ${tag} | ${name} | ${bio}...`);
});

console.log('7. Activities:');
doc.querySelectorAll('.expect-item_p').forEach((p, i) => {
  console.log(`   [${i}] ${p.textContent.trim()}`);
});

console.log('8. FAQs:');
doc.querySelectorAll('.accordion-css__item-top h3').forEach((h3, i) => {
  console.log(`   [${i}] ${h3.textContent.trim()}`);
});
