const fs = require('fs');
const { JSDOM } = require('jsdom');

try {
  // Selalu mulai dari file mentah yang bersih
  const rawHtml = fs.readFileSync('flowfest_raw.html', 'utf8');
  const dom = new JSDOM(rawHtml);
  const doc = dom.window.document;

  // 1. TAMBAHKAN FONT FREDOKA & CSS STIKER KUSTOM
  const customStyles = doc.createElement('style');
  customStyles.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&display=swap');
    
    .sabit-sticker {
      font-family: 'Fredoka', sans-serif !important;
      font-weight: 700 !important;
      color: #121212 !important;
      /* Trik 4 shadow untuk outline putih + 1 shadow tebal untuk bayangan hitam */
      text-shadow: 
        -4px -4px 0 #FFFEFB,  
         4px -4px 0 #FFFEFB,
        -4px  4px 0 #FFFEFB,
         4px  4px 0 #FFFEFB,
         8px  8px 0 #121212 !important;
      text-align: center;
      line-height: 1.1 !important;
      display: inline-block;
      margin: 10px 0;
    }
    
    .sabit-hero { font-size: 5rem !important; }
    .sabit-section { font-size: 4rem !important; }
    
    /* Hilangkan preloader untuk memperbaiki animasi */
    .loading-container, .loading-screen { display: none !important; }
    
    /* Perbaikan responsif mobile */
    @media (max-width: 768px) {
      .sabit-hero { font-size: 3rem !important; }
      .sabit-section { font-size: 2.5rem !important; }
    }
  `;
  doc.head.appendChild(customStyles);

  // 2. GANTI SEMUA JUDUL SVG DENGAN TEKS STIKER HTML (HARD REPLACE)
  const replaceTitle = (selector, text, sizeClass) => {
    const el = doc.querySelector(selector);
    if (el) {
      el.innerHTML = `<span class="sabit-sticker ${sizeClass}">${text}</span>`;
    }
  };

  replaceTitle('h1.welcome__h1', 'Ngoding bareng,<br/>diskusi AI, project IT.', 'sabit-hero');
  replaceTitle('h2.about__text-h2', 'Wadah Komunitas:<br/><span style="color:#F26522">Informatika UIN Bandung</span>', 'sabit-section');
  replaceTitle('h2.speakers__h2', 'Mentor &<br/>Alumni Inspiratif', 'sabit-section');
  replaceTitle('h2.community__h2', 'Dari Mahasiswa,<br/>Untuk Mahasiswa', 'sabit-section');
  replaceTitle('h2.tweets__h2', 'Sabit Academy<br/><span style="color:#F3729C">Testimoni</span>', 'sabit-section');
  replaceTitle('h2.footer__h2', 'Sampai Jumpa<br/>di Kampus!', 'sabit-hero');

  // 3. GANTI TEKS KECIL (Text Nodes Traverse)
  function replaceTextNodes(node) {
    if (node.nodeType === 3) {
      let text = node.nodeValue;
      text = text.replace(/FlowFest 2025/gi, 'Sabit Academy 2025');
      text = text.replace(/FlowFest/gi, 'Sabit Academy');
      text = text.replace(/Flowfest/gi, 'Sabit Academy');
      text = text.replace(/FLOWFEST/g, 'SABIT ACADEMY');
      text = text.replace(/Friday 8th August, Manchester, UK/gi, 'Mahasiswa & Alumni IF UIN SGD Bandung');
      text = text.replace(/Buy Tickets/gi, 'Gabung Sekarang');
      text = text.replace(/Get Tickets/gi, 'Daftar Komunitas');
      text = text.replace(/What is Sabit Academy\?/gi, 'Apa itu Sabit Academy?');
      text = text.replace(/We are so excited to bring Sabit Academy back/gi, 'Kami menyediakan wadah silaturahmi & diskusi teknologi terbaru.');
      text = text.replace(/Not exaggerating when I say Sabit Academy was my web event of the year\./gi, 'Sabit beneran ngebantu banget buat nambah relasi dan ngerjain project!');
      text = text.replace(/Manchester/gi, 'Bandung');
      node.nodeValue = text;
    } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      node.childNodes.forEach(replaceTextNodes);
    }
  }
  replaceTextNodes(doc.body);
  replaceTextNodes(doc.head);

  // 4. GANTI GAMBAR DENGAN FOTO AI KITA
  const myImages = ['/images/vibe1.jpg', '/images/vibe2.jpg', '/images/vibe3.jpg'];
  let imgIndex = 0;
  const images = doc.querySelectorAll('img');
  images.forEach(img => {
    const src = img.src || '';
    if (src.includes('flowfest') && (src.includes('.jpg') || src.includes('.png') || src.includes('.webp') || src.includes('.avif'))) {
      img.src = myImages[imgIndex % myImages.length];
      img.removeAttribute('srcset'); 
      img.removeAttribute('sizes');
      imgIndex++;
    }
  });

  // 5. PERBAIKI URL ABSOLUT ASET TERSISA
  let finalHtml = dom.serialize();
  finalHtml = finalHtml.replace(/href="\/(?!\/)/g, 'href="https://www.flowfest.co.uk/');
  finalHtml = finalHtml.replace(/src="\/(?!\/)(?!images)/g, 'src="https://www.flowfest.co.uk/');

  // Simpan hasilnya
  fs.writeFileSync('public/flowfest_clone.html', finalHtml);
  console.log('Master Transformation Sabit Academy SUCCESS!');

} catch (err) {
  console.error("Master script error: ", err);
}
