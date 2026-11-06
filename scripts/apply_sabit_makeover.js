const fs = require('fs');
const { JSDOM } = require('jsdom');

try {
  // Start from clean flowfest_raw.html so we have full pristine structure
  const rawHtml = fs.readFileSync('flowfest_raw.html', 'utf8');
  const dom = new JSDOM(rawHtml);
  const doc = dom.window.document;

  // 1. REWRITE ASSET PATHS FOR FONTS, CSS, JS
  // Fix relative URLs in head links and scripts
  doc.querySelectorAll('link[href^="/"]').forEach(link => {
    link.href = 'https://www.flowfest.co.uk' + link.getAttribute('href');
  });
  doc.querySelectorAll('script[src^="/"]').forEach(script => {
    script.src = 'https://www.flowfest.co.uk' + script.getAttribute('src');
  });

  // 2. INJECT CSS FOR PERFECT HERO STICKER TEXT (Using native Sugar Peachy font!)
  const styleEl = doc.createElement('style');
  styleEl.innerHTML = `
    .welcome__h1.is--cursor-default {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      line-height: 1.05 !important;
      margin-bottom: 0.25em !important;
    }
    .sabit-hero-line {
      font-family: 'Sugar Peachy', sans-serif !important;
      font-size: 1.15em !important;
      font-weight: 900 !important;
      color: #121212 !important;
      -webkit-text-stroke: 0.075em #FFFEFB !important;
      paint-order: stroke fill !important;
      filter: drop-shadow(0.05em 0.05em 0px #121212) !important;
      text-align: center !important;
      letter-spacing: -0.02em !important;
      white-space: nowrap !important;
      display: block !important;
    }
    @media (max-width: 768px) {
      .sabit-hero-line {
        white-space: normal !important;
        font-size: 0.85em !important;
      }
    }
    /* Hide the blocking preloader */
    .loading-container, .loading-screen {
      display: none !important;
    }
  `;
  doc.head.appendChild(styleEl);

  // 3. REPLACE HERO TITLE
  const h1 = doc.querySelector('h1.welcome__h1');
  if (h1) {
    h1.innerHTML = `
      <span class="sabit-hero-line">Ngoding Bareng, Diskusi AI,</span>
      <span class="sabit-hero-line">Project Nyata.</span>
    `;
  }

  // 4. REPLACE ALL 37 IMAGES WITH OUR NEW GENERATED INDONESIAN STUDENT PHOTOS!
  // Images:
  // student_female_hijab.jpg (Indonesian female student with pastel hijab on campus)
  // student_male_coder.jpg (Indonesian male student in hoodie with glasses & laptop)
  // student_speaker_hijab.jpg (Indonesian female student speaker in hijab presenting at CS workshop)
  // vibe1.jpg, vibe2.jpg, vibe3.jpg (Campus collaborative tech vibe)
  
  const studentImages = [
    '/images/student_female_hijab.jpg',
    '/images/student_male_coder.jpg',
    '/images/student_speaker_hijab.jpg',
    '/images/vibe1.jpg',
    '/images/vibe2.jpg',
    '/images/vibe3.jpg'
  ];

  const allImgs = doc.querySelectorAll('img');
  allImgs.forEach((img, idx) => {
    const src = img.getAttribute('src') || '';
    // Strip out all remote website-files.com CDN images and replace with student photos
    if (src.includes('website-files.com') || src.includes('.avif') || src.includes('.jpg') || src.includes('.png') || src.includes('.webp')) {
      // Pick appropriate image based on class or position
      let chosenImage;
      if (img.classList.contains('footer__left-img')) {
        chosenImage = '/images/student_female_hijab.jpg';
      } else if (img.classList.contains('footer__right-img')) {
        chosenImage = '/images/student_male_coder.jpg';
      } else if (img.src.includes('vlad-magdalin')) {
        chosenImage = '/images/student_speaker_hijab.jpg'; // Keynote speaker (Aisha Nuraini)
      } else if (img.src.includes('ilja-van-eck')) {
        chosenImage = '/images/student_male_coder.jpg'; // Fajar Setiawan
      } else if (img.src.includes('cassie-evans')) {
        chosenImage = '/images/student_female_hijab.jpg'; // Nabila Zahra
      } else if (img.src.includes('stephanie-bruce')) {
        chosenImage = '/images/student_speaker_hijab.jpg'; // Alifa Putri
      } else if (img.src.includes('ross-plaskow')) {
        chosenImage = '/images/student_male_coder.jpg'; // Rizky Pratama
      } else {
        chosenImage = studentImages[idx % studentImages.length];
      }

      img.src = chosenImage;
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
    }
  });

  // 5. UPDATE TEXT CONTENT TO SABIT ACADEMY
  // Update title & metadata
  const title = doc.querySelector('title');
  if (title) title.textContent = 'Sabit Academy — Komunitas Informatika UIN SGD Bandung';

  // Recursively replace text in DOM
  function replaceText(node) {
    if (node.nodeType === 3) {
      let t = node.nodeValue;
      t = t.replace(/FlowFest 2025/gi, 'Sabit Academy 2025');
      t = t.replace(/FlowFest/gi, 'Sabit Academy');
      t = t.replace(/Flowfest/gi, 'Sabit Academy');
      t = t.replace(/FLOWFEST/g, 'SABIT ACADEMY');
      t = t.replace(/Friday 8th August, Manchester, UK/gi, 'Mahasiswa & Alumni IF UIN SGD Bandung');
      t = t.replace(/Manchester, UK/gi, 'UIN SGD Bandung');
      t = t.replace(/The No\.1 Fest for Web Designers & Devs/gi, 'Wadah Belajar, Konsultasi & Kolaborasi IT');
      t = t.replace(/Buy Tickets/gi, 'Gabung Sekarang');
      t = t.replace(/Get Tickets/gi, 'Daftar Komunitas');
      t = t.replace(/Get your ticket/gi, 'Gabung sekarang');
      t = t.replace(/Media City Gardens/gi, 'Kampus UIN SGD Bandung');
      t = t.replace(/Media City/gi, 'UIN Bandung');
      t = t.replace(/Manchester/gi, 'Bandung');
      
      // Speaker names & tags
      t = t.replace(/Vlad Magdalin/g, 'Aisha Nuraini');
      t = t.replace(/Ilja van Eck/g, 'Fajar Setiawan');
      t = t.replace(/Cassie Evans/g, 'Nabila Zahra');
      t = t.replace(/Stephanie Bruce/g, 'Alifa Rahma');
      t = t.replace(/Ross Plaskow/g, 'Rizky Pratama');
      t = t.replace(/Isabel Adwards/g, 'Zulfa Amalia');
      t = t.replace(/Josh Fry/g, 'Daffa Ramadhan');
      t = t.replace(/Benn Raistrick/g, 'M. Farhan');
      t = t.replace(/Scott Humphrey/g, 'Ilham Saputra');
      t = t.replace(/Rachael Ward/g, 'Siti Nurhaliza');
      t = t.replace(/John Ostler/g, 'Wildan Fauzi');

      // Speaker bios
      t = t.replace(/Our founding Webflow father\..*?keynote speaker!/gi, 'Mahasiswi semester akhir & AI Researcher di Sabit Academy. Membahas implementasi Hermes Agent dan masa depan Autonomous AI perkuliahan!');
      t = t.replace(/Oh 'Eck, we've only gone and secured the web wizard himself\..*?Sabit Academy!/gi, 'Ketua Komunitas Sabit Academy. Pengembang web antusias yang aktif membangun microservices dan arsitektur modern.');
      t = t.replace(/Our GSAP fairy codemother is here to sprinkle some tween magic.*?speakers!/gi, 'Spesialis desain antarmuka interaktif dan animasi web. Berbagi tips transisi dari Figma ke production code.');

      node.nodeValue = t;
    } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      node.childNodes.forEach(replaceText);
    }
  }
  replaceText(doc.body);
  replaceText(doc.head);

  // 6. SAVE TO PUBLIC DIRECTORY
  const finalHtml = dom.serialize();
  fs.writeFileSync('public/flowfest_clone.html', finalHtml);
  console.log('Successfully generated Sabit Academy with Indonesian student photos and crisp Sugar Peachy hero text!');

} catch (err) {
  console.error('Error applying makeover:', err);
}
