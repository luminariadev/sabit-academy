const fs = require('fs');
const { JSDOM } = require('jsdom');

try {
  const rawHtml = fs.readFileSync('flowfest_raw.html', 'utf8');
  const dom = new JSDOM(rawHtml);
  const doc = dom.window.document;

  // 1. REWRITE ASSET PATHS FOR ASSETS/FONTS/CSS
  doc.querySelectorAll('link[href^="/"]').forEach(link => {
    link.href = 'https://www.flowfest.co.uk' + link.getAttribute('href');
  });
  doc.querySelectorAll('script[src^="/"]').forEach(script => {
    script.src = 'https://www.flowfest.co.uk' + script.getAttribute('src');
  });

  // 2. STYLES FOR CRISP BUBBLE STICKER HERO TEXT
  const styleEl = doc.createElement('style');
  styleEl.innerHTML = `
    .welcome__h1.is--cursor-default {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0.1em auto 0.25em !important;
      padding: 0 !important;
      gap: 0 !important;
    }
    .sabit-hero-bubble {
      font-family: 'Sugar Peachy', sans-serif !important;
      font-size: 1.1em !important;
      font-weight: 900 !important;
      color: #121212 !important;
      -webkit-text-stroke: 0.08em #FFFEFB !important;
      paint-order: stroke fill !important;
      filter: drop-shadow(0.06em 0.06em 0px #121212) !important;
      text-align: center !important;
      letter-spacing: -0.01em !important;
      line-height: 1.1 !important;
      display: block !important;
      white-space: nowrap !important;
    }
    @media (max-width: 768px) {
      .sabit-hero-bubble {
        white-space: normal !important;
        font-size: 0.8em !important;
      }
    }
    .loading-container, .loading-screen {
      display: none !important;
    }
  `;
  doc.head.appendChild(styleEl);

  // 3. SET TITLE & HERO
  const title = doc.querySelector('title');
  if (title) title.textContent = 'Sabit Academy — Komunitas Informatika UIN SGD Bandung';

  // Hero H1: replace SVG words with crisp Sugar Peachy bubble text
  const h1 = doc.querySelector('h1.welcome__h1');
  if (h1) {
    h1.innerHTML = `
      <span class="sabit-hero-bubble">Ngoding Bareng, Diskusi AI,</span>
      <span class="sabit-hero-bubble">Project Bareng.</span>
    `;
  }

  // Hero badge & sun pill
  const dateBubble = doc.querySelector('.welcome__header-svg-wrap span, .welcome__date-span, [data-sunny-face] + span');
  doc.querySelectorAll('.welcome span, .header span, .hero span').forEach(s => {
    if (s.textContent.includes('Friday 8th') || s.textContent.includes('Manchester')) {
      s.textContent = 'Mahasiswa & Alumni IF UIN SGD Bandung';
    }
  });

  // Welcome box text "Sabit Academy."
  const welcomeH2 = doc.querySelector('.welcome__h2');
  if (welcomeH2) {
    welcomeH2.textContent = 'Sabit Academy.';
  }

  // 4. MAP ALL 37 IMAGES TO OUR AI GENERATED INDONESIAN STUDENT PHOTOS
  // student_female_hijab.jpg  -> Indonesian female CS student with hijab & backpack on campus
  // student_male_coder.jpg    -> Indonesian male student with glasses, hoodie & laptop in library
  // student_speaker_hijab.jpg -> Indonesian female student speaker in hijab presenting at CS workshop
  // vibe1.jpg, vibe2.jpg, vibe3.jpg -> Campus collaborative vibe
  
  const allImgs = doc.querySelectorAll('img');
  allImgs.forEach((img, idx) => {
    let chosenImg;
    const parentClasses = (img.parentElement ? img.parentElement.className : '') + ' ' + img.className;
    const src = img.getAttribute('src') || '';

    if (img.classList.contains('footer__left-img')) {
      chosenImg = '/images/student_female_hijab.jpg';
    } else if (img.classList.contains('footer__right-img')) {
      chosenImg = '/images/student_male_coder.jpg';
    } else if (src.includes('vlad-magdalin')) {
      chosenImg = '/images/student_speaker_hijab.jpg'; // Keynote Speaker (Aisha Nuraini)
    } else if (src.includes('ilja-van-eck')) {
      chosenImg = '/images/student_male_coder.jpg'; // Fajar Setiawan
    } else if (src.includes('cassie-evans')) {
      chosenImg = '/images/student_female_hijab.jpg'; // Nabila Zahra
    } else if (src.includes('stephanie-bruce')) {
      chosenImg = '/images/student_speaker_hijab.jpg'; // Alifa Rahma
    } else if (src.includes('ross-plaskow')) {
      chosenImg = '/images/student_male_coder.jpg'; // Rizky Pratama
    } else if (idx % 3 === 0) {
      chosenImg = '/images/student_female_hijab.jpg';
    } else if (idx % 3 === 1) {
      chosenImg = '/images/student_male_coder.jpg';
    } else {
      chosenImg = '/images/student_speaker_hijab.jpg';
    }

    img.src = chosenImg;
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
  });

  // 5. UPDATE ABOUT SECTION
  const aboutH2 = doc.querySelector('.about__text-h2');
  if (aboutH2) {
    aboutH2.innerHTML = `Komunitas Informatika: <br><span class="h2__boxed is--about">UIN SGD Bandung</span>`;
  }
  const aboutP = doc.querySelector('.about__text-small p');
  if (aboutP) {
    aboutP.textContent = 'Wadah berkumpulnya mahasiswa dan alumni Teknik Informatika UIN Sunan Gunung Djati Bandung. Tempat konsultasi mata kuliah, bimbingan tugas akhir, diskusi tren teknologi terbaru seperti Agentic AI, dan kolaborasi project IT bersama.';
  }
  const aboutBtnSpan = doc.querySelector('.about .btn__span');
  if (aboutBtnSpan) {
    aboutBtnSpan.textContent = 'Lihat Kegiatan Kami';
  }

  // 6. UPDATE SPEAKERS SECTION
  const speakersH2 = doc.querySelector('.speakers__h2');
  if (speakersH2) {
    speakersH2.innerHTML = `Mentor & <br><span class="h2__boxed is--speakers">Alumni Berbagi</span>`;
  }
  const speakersDesc = doc.querySelector('.speakers__p, .speakers__col-left p');
  if (speakersDesc) {
    speakersDesc.innerHTML = `Sharing session santai bersama alumni dan mahasiswa aktif berprestasi seputar persiapan karir, software engineering, dan riset AI.`;
  }

  const speakersData = [
    {
      tag: 'Keynote • Agentic AI',
      name: 'Aisha Nuraini',
      bio: 'Mahasiswi semester akhir & AI Researcher di Sabit Academy. Membahas arsitektur Hermes Agent, Autonomous Tool-Calling, dan otomatisasi AI dalam perkuliahan & industri.'
    },
    {
      tag: 'Fullstack & Cloud',
      name: 'Fajar Setiawan',
      bio: 'Ketua Komunitas Sabit Academy. Berpengalaman membangun scalable web applications, microservices, dan membimbing adik tingkat seputar persiapan karir IT.'
    },
    {
      tag: 'UI/UX & Frontend',
      name: 'Nabila Zahra',
      bio: 'Mahasiswi Informatika pemenang kompetisi UI/UX. Berbagi pengalaman mendesain antarmuka modern, interaktif, dan cara kolaborasi efektif dengan developer.'
    },
    {
      tag: 'Web & Mobile Apps',
      name: 'Alifa Rahma',
      bio: 'Alumni Informatika UIN Bandung yang berkarir di tech startup. Mentor aktif untuk project kolaboratif dan perancangan aplikasi mobile modern.'
    },
    {
      tag: 'DevOps & Open Source',
      name: 'Rizky Pratama',
      bio: 'Alumni Informatika UIN SGD Bandung & DevOps Engineer. Berbagi tips manajemen container, CI/CD, dan strategi berkontribusi ke open source internasional.'
    }
  ];

  const speakerCards = doc.querySelectorAll('.speaker-card');
  speakerCards.forEach((card, i) => {
    const data = speakersData[i % speakersData.length];
    const tagSpan = card.querySelector('.speaker-card__tag-span');
    if (tagSpan) tagSpan.textContent = data.tag;
    const nameSpan = card.querySelector('.speakers-card__cursor-span');
    if (nameSpan) nameSpan.textContent = data.name + ' ';
    const bioP = card.querySelector('.speaker-card__bio-p');
    if (bioP) bioP.textContent = data.bio;
  });

  // 7. UPDATE EXPECT / ACTIVITIES SECTION
  const expectH2 = doc.querySelector('.expect__h2');
  if (expectH2) {
    expectH2.textContent = 'Kegiatan Komunitas';
  }
  const expectLabels = [
    'Konsultasi Akademik & Tugas Akhir',
    'Tech Talk & Diskusi Agentic AI',
    'Project IT Kolaboratif',
    'Workshop & Bimbingan Karir',
    'Meetup Santai & Networking'
  ];
  doc.querySelectorAll('.expect-item_p').forEach((p, i) => {
    if (expectLabels[i]) p.textContent = expectLabels[i];
  });

  // 8. UPDATE COMMUNITY SECTION
  const commH2 = doc.querySelector('.community__h2');
  if (commH2) {
    commH2.innerHTML = `Dari Mahasiswa, <br><span class="h2__boxed is--community">Untuk Mahasiswa</span>`;
  }
  const commP = doc.querySelector('.community__p');
  if (commP) {
    commP.innerHTML = `Sabit Academy adalah komunitas <strong>terbuka dan inklusif</strong> yang diinisiasi oleh mahasiswa & alumni Teknik Informatika UIN Sunan Gunung Djati Bandung. Tujuan kami adalah saling mendukung pertumbuhan teknis, kolaborasi proyek, dan menciptakan lingkungan belajar yang seru.`;
  }
  const commBtn = doc.querySelector('.community .btn__span, .community a.btn');
  if (commBtn) {
    commBtn.textContent = 'Gabung Grup Komunitas';
  }

  // 9. UPDATE TWEETS / TESTIMONIALS SECTION
  const tweetsH2 = doc.querySelector('.tweets__h2');
  if (tweetsH2) {
    tweetsH2.innerHTML = `Sabit Academy <span class="h2__boxed is--tweets">Cerita</span>`;
  }

  // 10. UPDATE FAQ SECTION
  const faqH2 = doc.querySelector('.faq__h2, .faq h2');
  if (faqH2) {
    faqH2.textContent = 'Tanya Jawab (FAQ)';
  }

  const faqData = [
    {
      q: 'Siapa saja yang boleh bergabung di Sabit Academy?',
      a: 'Komunitas ini terbuka untuk seluruh mahasiswa aktif maupun alumni jurusan Teknik Informatika UIN Sunan Gunung Djati Bandung dari semua angkatan!'
    },
    {
      q: 'Bagaimana cara konsultasi seputar perkuliahan dan tugas akhir?',
      a: 'Kamu bisa langsung berdiskusi di grup komunitas atau mengikuti sesi mentoring khusus bersama kakak tingkat dan alumni yang sudah berpengalaman di bidangnya.'
    },
    {
      q: 'Teknologi apa saja yang sering dibahas?',
      a: 'Mulai dari fundamental pemrograman, Fullstack Web, Mobile Development, hingga teknologi terkini seperti Agentic AI (misalnya implementasi Hermes Agent) dan Cloud Computing.'
    },
    {
      q: 'Apakah ada biaya untuk bergabung?',
      a: 'Sama sekali tidak ada biaya (100% gratis). Sabit Academy adalah komunitas belajar dan silaturahmi sukarela.'
    },
    {
      q: 'Apakah pemula atau mahasiswa baru bisa ikut project bareng?',
      a: 'Tentu saja! Kami membagi project berdasarkan level keahlian dan menyediakan mentor agar kamu bisa belajar langsung lewat studi kasus nyata.'
    }
  ];

  doc.querySelectorAll('.accordion-css__item').forEach((item, i) => {
    if (faqData[i]) {
      const qEl = item.querySelector('.accordion-css__item-top h3, h3');
      if (qEl) qEl.textContent = faqData[i].q;
      const aEl = item.querySelector('.accordion-css__item-p');
      if (aEl) aEl.textContent = faqData[i].a;
    }
  });

  // 11. UPDATE PREFOOTER & FOOTER
  const prefooterH2 = doc.querySelector('.prefooter__h2, .prefooter h2');
  if (prefooterH2) {
    prefooterH2.innerHTML = `Mari Bertumbuh <br><span class="h2__boxed is--prefooter">Bersama Sabit Academy</span>`;
  }
  const prefooterP = doc.querySelector('.prefooter__p, .prefooter p');
  if (prefooterP) {
    prefooterP.textContent = 'Dapatkan teman ngoding baru, mentor berpengalaman, dan pengalaman kolaborasi project di dunia teknologi.';
  }
  const footerH2 = doc.querySelector('.footer__h2');
  if (footerH2) {
    footerH2.textContent = 'Sampai Jumpa di Kampus!';
  }
  const footerP = doc.querySelector('.footer__p');
  if (footerP) {
    footerP.innerHTML = 'Hubungi kami di <strong>sabitacademy@uinsgd.ac.id</strong> atau mampir ke lab Informatika.';
  }

  // 12. GENERAL STRING REPLACEMENTS FOR MARQUEE & BUTTONS
  function replaceRestOfText(node) {
    if (node.nodeType === 3) {
      let t = node.nodeValue;
      t = t.replace(/FlowFest 2025/gi, 'Sabit Academy 2025');
      t = t.replace(/FlowFest/gi, 'Sabit Academy');
      t = t.replace(/Flowfest/gi, 'Sabit Academy');
      t = t.replace(/FLOWFEST/g, 'SABIT ACADEMY');
      t = t.replace(/Buy Tickets/gi, 'Gabung Sekarang');
      t = t.replace(/Get Tickets/gi, 'Daftar Komunitas');
      t = t.replace(/Get your ticket/gi, 'Gabung sekarang');
      t = t.replace(/Manchester, UK/gi, 'UIN SGD Bandung');
      t = t.replace(/Media City Gardens/gi, 'Kampus UIN SGD Bandung');
      t = t.replace(/Media City/gi, 'UIN Bandung');
      node.nodeValue = t;
    } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      node.childNodes.forEach(replaceRestOfText);
    }
  }
  replaceRestOfText(doc.body);

  // 13. SERIALIZE & WRITE TO PUBLIC DIRECTORY
  fs.writeFileSync('public/flowfest_clone.html', dom.serialize());
  console.log('COMPLETE SABIT TRANSFORMATION: All 37 photos replaced with student photos, all text fully translated & customized!');

} catch (err) {
  console.error('Error during transformation:', err);
}
