const fs = require('fs');
const { JSDOM } = require('jsdom');

try {
  const html = fs.readFileSync('public/flowfest_clone.html', 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // 1. UPDATE NAVBAR LOGO: SOLID BLACK (#121212)
  const navLogo = doc.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 33" fill="none" style="display: block; cursor: pointer; overflow: visible;">
        <text x="50%" y="26" text-anchor="middle" font-family="'Sugar Peachy', sans-serif" font-weight="900" font-size="32" fill="#121212" letter-spacing="2">
          SABIT
        </text>
      </svg>
    `;
  }

  // 2. UPDATE FOOTER IMAGES TO OUR CUSTOM STICKER-FRAMED AI STUDENT COMPOSITES
  const fLeft = doc.querySelector('.footer__left-img');
  if (fLeft) {
    fLeft.src = '/images/footer_left_custom.png';
    fLeft.removeAttribute('srcset');
    fLeft.removeAttribute('sizes');
  }

  const fRight = doc.querySelector('.footer__right-img');
  if (fRight) {
    fRight.src = '/images/footer_right_custom.png';
    fRight.removeAttribute('srcset');
    fRight.removeAttribute('sizes');
  }

  // Save the updated HTML
  fs.writeFileSync('public/flowfest_clone.html', dom.serialize());
  console.log('Successfully updated navbar logo to BLACK and footer to custom sticker cutouts!');

} catch (err) {
  console.error('Error updating HTML:', err);
}
