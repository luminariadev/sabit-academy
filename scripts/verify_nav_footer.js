const fs = require('fs');
const html = fs.readFileSync('public/flowfest_clone.html', 'utf8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(html);
const doc = dom.window.document;

console.log('=== VERIFICATION: NAV LOGO ===');
const logo = doc.querySelector('.nav-logo');
console.log('nav-logo HTML:', logo ? logo.innerHTML.trim() : 'none');

console.log('\n=== VERIFICATION: FOOTER IMAGES ===');
const fl = doc.querySelector('.footer__left-img');
const fr = doc.querySelector('.footer__right-img');
console.log('Left footer img src:', fl ? fl.src : 'none');
console.log('Right footer img src:', fr ? fr.src : 'none');

console.log('\n=== VERIFICATION: FOOTER CSS OVERRIDES ===');
const styles = Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join('\n');
console.log('Contains custom .footer__left-img override:', styles.includes('.footer__left-img'));
console.log('Contains custom .footer__right-img override:', styles.includes('.footer__right-img'));
