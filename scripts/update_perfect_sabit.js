const fs = require('fs');
const { JSDOM } = require('jsdom');

try {
  const rawHtml = fs.readFileSync('flowfest_raw.html', 'utf8');
  const dom = new JSDOM(rawHtml);
  const doc = dom.window.document;

  // 1. REWRITE ASSET PATHS FOR FONTS, CSS, JS
  doc.querySelectorAll('link[href^="/"]').forEach(link => {
    link.href = 'https://www.flowfest.co.uk' + link.getAttribute('href');
  });
  doc.querySelectorAll('script[src^="/"]').forEach(script => {
    script.src = 'https://www.flowfest.co.uk' + script.getAttribute('src');
  });

  // 2. INJECT CSS FOR:
  // - Centered Hero Title (not bleeding to the right!)
  // - Gorgeous X (Twitter) Cards in Tweets section
  // - Seamless layout
  const styleEl = doc.createElement('style');
  styleEl.innerHTML = `
    /* === 1. HERO TITLE CENTERING === */
    .welcome__row-text {
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      width: 100% !important;
    }
    .welcome__col-text {
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      margin: 0 auto !important;
      width: 100% !important;
      max-width: 48em !important;
    }
    .welcome__h1.is--cursor-default {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      margin: 0 auto 0.2em !important;
      width: 100% !important;
      line-height: 1.05 !important;
    }
    .sabit-hero-bubble {
      font-family: 'Sugar Peachy', sans-serif !important;
      font-size: 1.05em !important;
      font-weight: 900 !important;
      color: #121212 !important;
      -webkit-text-stroke: 0.08em #FFFEFB !important;
      paint-order: stroke fill !important;
      filter: drop-shadow(0.06em 0.06em 0px #121212) !important;
      text-align: center !important;
      letter-spacing: -0.01em !important;
      line-height: 1.05 !important;
      display: block !important;
      margin: 0 auto !important;
      white-space: nowrap !important;
    }
    @media (max-width: 768px) {
      .sabit-hero-bubble {
        font-size: 0.75em !important;
      }
    }
    .welcome__h2-box-wrap {
      display: flex !important;
      justify-content: center !important;
      width: 100% !important;
      margin: 0.2em auto 0 !important;
    }

    /* === 2. TWEETS / X CARDS STYLING === */
    .tweet-card {
      border: 3px solid #121212 !important;
      border-radius: 2rem !important;
      box-shadow: 6px 6px 0px #121212 !important;
      background: #FFFEFB !important;
      overflow: hidden !important;
      position: relative !important;
    }
    .tweet-ui-card {
      position: absolute !important;
      inset: 0 !important;
      padding: 1.5em 1.75em !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      box-sizing: border-box !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      background: #FFFEFB !important;
    }
    .tweet-header {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }
    .tweet-user {
      display: flex !important;
      align-items: center !important;
      gap: 0.75em !important;
    }
    .tweet-avatar {
      width: 3.2em !important;
      height: 3.2em !important;
      border-radius: 50% !important;
      object-fit: cover !important;
      border: 2px solid #121212 !important;
      flex-shrink: 0 !important;
    }
    .tweet-name {
      font-weight: 800 !important;
      font-size: 1.05em !important;
      color: #121212 !important;
      display: flex !important;
      align-items: center !important;
      gap: 0.3em !important;
    }
    .tweet-handle {
      font-size: 0.85em !important;
      color: #536471 !important;
      font-weight: 500 !important;
    }
    .tweet-body {
      font-size: 1.1em !important;
      line-height: 1.4 !important;
      color: #0F1419 !important;
      font-weight: 500 !important;
      margin: 0.5em 0 !important;
    }
    .tweet-footer {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-top: 1px solid #EFF3F4 !important;
      padding-top: 0.5em !important;
      font-size: 0.85em !important;
      color: #536471 !important;
    }

    /* Hide the blocking preloader */
    .loading-container, .loading-screen {
      display: none !important;
    }
  `;
  doc.head.appendChild(styleEl);

  // 3. TITLE & METADATA
  const title = doc.querySelector('title');
  if (title) title.textContent = 'Sabit Academy — Komunitas Informatika UIN SGD Bandung';

  // 4. NAVBAR / HEADBAR: CHANGE "FLOWFEST" LOGO TO "SABIT"
  const navLogo = doc.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 33" fill="none" style="display: block; cursor: pointer; overflow: visible;">
        <text x="50%" y="26" text-anchor="middle" font-family="'Sugar Peachy', sans-serif" font-weight="900" font-size="32" fill="var(--color-light-plus)" letter-spacing="2">
          SABIT
        </text>
      </svg>
    `;
  }

  // 5. BALANCED CENTERED HERO TEXT (3 SHORT LINES)
  const h1 = doc.querySelector('h1.welcome__h1');
  if (h1) {
    h1.innerHTML = `
      <span class="sabit-hero-bubble">Ngoding Bareng,</span>
      <span class="sabit-hero-bubble">Diskusi AI,</span>
      <span class="sabit-hero-bubble">Project Bareng.</span>
    `;
  }

  // Hero badge / sun pill
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

  // 6. DIVERSE STUDENT PHOTOS MAPPING (9 PHOTOS)
  const studentPhotos = {
    hijab1: '/images/student_female_hijab.jpg',
    male1: '/images/student_male_coder.jpg',
    hijabSpeaker: '/images/student_speaker_hijab.jpg',
    collab1: '/images/collab1.jpg',
    collab2: '/images/collab2.jpg',
    maleCoder: '/images/student_coder.jpg',
    vibe1: '/images/vibe1.jpg',
    vibe2: '/images/vibe2.jpg',
    vibe3: '/images/vibe3.jpg'
  };

  const photoList = [
    studentPhotos.hijab1,
    studentPhotos.male1,
    studentPhotos.hijabSpeaker,
    studentPhotos.collab1,
    studentPhotos.collab2,
    studentPhotos.maleCoder,
    studentPhotos.vibe1,
    studentPhotos.vibe2,
    studentPhotos.vibe3
  ];

  // Replace all general images (except tweet cards and footer)
  const allImgs = doc.querySelectorAll('img');
  allImgs.forEach((img, idx) => {
    // Skip tweet cards (custom UI) and footer (matches screenshot)
    if (img.closest('.tweet-card') || img.classList.contains('footer__left-img') || img.classList.contains('footer__right-img')) {
      return;
    }

    const src = img.getAttribute('src') || '';
    if (src.includes('vlad-magdalin')) {
      img.src = studentPhotos.hijabSpeaker; // Keynote Aisha Nuraini
    } else if (src.includes('ilja-van-eck')) {
      img.src = studentPhotos.male1; // Fajar Setiawan
    } else if (src.includes('cassie-evans')) {
      img.src = studentPhotos.hijab1; // Nabila Zahra
    } else if (src.includes('stephanie-bruce')) {
      img.src = studentPhotos.collab1; // Alifa Rahma
    } else if (src.includes('ross-plaskow')) {
      img.src = studentPhotos.maleCoder; // Rizky Pratama
    } else {
      img.src = photoList[idx % photoList.length];
    }
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
  });

  // 7. FOOTER: EXACTLY MATCH USER SCREENSHOT (Cutout sticker photos flanking the sun!)
  const fLeft = doc.querySelector('.footer__left-img');
  if (fLeft) {
    fLeft.src = '/images/footer-left-original.avif';
    fLeft.removeAttribute('srcset');
    fLeft.removeAttribute('sizes');
  }
  const fRight = doc.querySelector('.footer__right-img');
  if (fRight) {
    fRight.src = '/images/footer-right-original.avif';
    fRight.removeAttribute('srcset');
    fRight.removeAttribute('sizes');
  }

  // 8. BUILD AUTHENTIC X (TWITTER) CARDS FOR TWEETS SECTION
  const tweetContents = [
    {
      name: 'Aisha Nuraini',
      handle: '@aishanuraini_ · IF UIN SGD',
      avatar: studentPhotos.hijabSpeaker,
      text: 'Gak nyangka nemu komunitas se-seru ini di kampus. Diskusi <strong>Agentic AI &amp; Hermes Agent</strong> bareng anak-anak @sabitacademy ngebuka insight baru banget buat skripsi! Highly recommended buat anak IF UIN SGD 🚀🔥',
      date: '10:42 AM · 8 Okt 2026',
      rt: '48',
      likes: '312'
    },
    {
      name: 'Fajar Setiawan',
      handle: '@fajar_dev · Alumni IF',
      avatar: studentPhotos.male1,
      text: 'Konsultasi mata kuliah algoritma &amp; struktur data bareng mentor @sabitacademy langsung paham dalam 1 jam, padahal udah pusing seminggu wkwk. Makasih banyak! 🙏✨ #InformatikaUIN',
      date: '2:15 PM · 7 Okt 2026',
      rt: '35',
      likes: '240'
    },
    {
      name: 'Nabila Zahra',
      handle: '@nabilazhr_ui · IF 2023',
      avatar: studentPhotos.hijab1,
      text: 'Ikut project kolaboratif bareng tim @sabitacademy berasa magang beneran. Dari setup CI/CD sampai deployment diajarin dari nol. Portofolio langsung nambah buat apply intern! 💻✨',
      date: '11:20 AM · 6 Okt 2026',
      rt: '62',
      likes: '419'
    },
    {
      name: 'Rizky Pratama',
      handle: '@rizky_pratama · DevOps',
      avatar: studentPhotos.maleCoder,
      text: 'Akhirnya ada ruang sharing tech &amp; coding yang asik buat mahasiswa Informatika. Workshop kemarin daging semua materinya, practical banget buat persiapan dunia kerja! 🌟 @sabitacademy',
      date: '4:05 PM · 5 Okt 2026',
      rt: '29',
      likes: '198'
    },
    {
      name: 'Daffa Ramadhan',
      handle: '@daffaramadhan · IF 2024',
      avatar: studentPhotos.collab1,
      text: 'Next meetup Sabit Academy wajib ikut lagi sih. Circle positif, senior-seniornya humble dan ngebantu banget buat anak semester awal yang masih bingung arah karir IT 🚀✨',
      date: '8:30 PM · 4 Okt 2026',
      rt: '51',
      likes: '385'
    }
  ];

  const tweetCards = doc.querySelectorAll('.tweet-card');
  tweetCards.forEach((card, i) => {
    const t = tweetContents[i % tweetContents.length];
    card.innerHTML = `
      <div class="tweet-card__before"></div>
      <div class="tweet-ui-card">
        <div class="tweet-header">
          <div class="tweet-user">
            <img src="${t.avatar}" class="tweet-avatar" alt="${t.name}">
            <div>
              <div class="tweet-name">
                ${t.name}
                <svg style="width: 1em; height: 1em; color: #1D9BF0;" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div class="tweet-handle">${t.handle}</div>
            </div>
          </div>
          <!-- X Logo -->
          <svg style="width: 1.4em; height: 1.4em; color: #121212;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 23.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
        <div class="tweet-body">${t.text}</div>
        <div class="tweet-footer">
          <span>${t.date}</span>
          <div style="display: flex; gap: 1.5em; font-weight: 600;">
            <span>🔁 ${t.rt}</span>
            <span>❤️ ${t.likes}</span>
          </div>
        </div>
      </div>
    `;
  });

  // 9. ABOUT SECTION
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

  // 10. SPEAKERS / MENTORS SECTION
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

  doc.querySelectorAll('.speaker-card').forEach((card, i) => {
    const data = speakersData[i % speakersData.length];
    const tagSpan = card.querySelector('.speaker-card__tag-span');
    if (tagSpan) tagSpan.textContent = data.tag;
    const nameSpan = card.querySelector('.speakers-card__cursor-span');
    if (nameSpan) nameSpan.textContent = data.name + ' ';
    const bioP = card.querySelector('.speaker-card__bio-p');
    if (bioP) bioP.textContent = data.bio;
  });

  // 11. ACTIVITIES SECTION
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

  // 12. COMMUNITY SECTION
  const commH2 = doc.querySelector('.community__h2');
  if (commH2) {
    commH2.innerHTML = `Dari Mahasiswa, <br><span class="h2__boxed is--community">Untuk Mahasiswa</span>`;
  }
  const commP = doc.querySelector('.community__p');
  if (commP) {
    commP.innerHTML = `Sabit Academy adalah komunitas <strong>terbuka dan inklusif</strong> yang diinisiasi oleh mahasiswa & alumni Teknik Informatika UIN Sunan Gunung Djati Bandung. Tujuan kami adalah saling mendukung pertumbuhan teknis, kolaborasi proyek, dan menciptakan lingkungan belajar yang seru.`;
  }

  // 13. TWEETS TITLE
  const tweetsH2 = doc.querySelector('.tweets__h2');
  if (tweetsH2) {
    tweetsH2.innerHTML = `Sabit Academy <span class="h2__boxed is--tweets">Cerita</span>`;
  }

  // 14. FAQ SECTION
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

  // 15. PREFOOTER & FOOTER TEXT
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

  // 16. GENERAL STRING REPLACEMENTS
  function replaceRest(node) {
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
      node.childNodes.forEach(replaceRest);
    }
  }
  replaceRest(doc.body);

  // 17. SAVE TO PUBLIC
  fs.writeFileSync('public/flowfest_clone.html', dom.serialize());
  console.log('SUCCESS: Headbar logo changed to SABIT & Footer restored to match screenshot exactly!');

} catch (err) {
  console.error('Update failed:', err);
}
