const fs = require('fs');
const { JSDOM } = require('jsdom');

try {
  // Baca file clone HTML yang sedang berjalan
  const html = fs.readFileSync('public/flowfest_clone.html', 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // 1. GANTI TEKS SECARA REKURSIF (agar tidak merusak struktur tag/span HTML)
  function replaceTextNodes(node) {
    if (node.nodeType === 3) { // Jika ini adalah Text Node murni
      let text = node.nodeValue;
      
      // Nama & Brand
      text = text.replace(/FlowFest 2025/gi, 'Sabit Academy 2025');
      text = text.replace(/FlowFest/gi, 'Sabit Academy');
      text = text.replace(/Flowfest/gi, 'Sabit Academy');
      text = text.replace(/FLOWFEST/g, 'SABIT ACADEMY');
      
      // Hero & Taglines
      text = text.replace(/vibes, good times\./gi, 'Konsultasi. Diskusi AI. Project Bareng.');
      text = text.replace(/Sabit Academy is back\./gi, 'Sabit Academy.');
      text = text.replace(/Friday 8th August, Manchester, UK/gi, 'Mahasiswa & Alumni IF UIN SGD Bandung');
      text = text.replace(/The No\.1 Fest for Web Designers & Devs/gi, 'Wadah Komunitas Teknik Informatika UIN Bandung');
      
      // CTA Buttons
      text = text.replace(/Buy Tickets/gi, 'Gabung Sekarang');
      text = text.replace(/Get Tickets/gi, 'Daftar Komunitas');
      
      // Sections
      text = text.replace(/Our 2025 Speaker Lineup/gi, 'Kegiatan & Mentor Kami');
      text = text.replace(/Speaker Lineup/gi, 'Kegiatan Rutin');
      text = text.replace(/What is Sabit Academy\?/gi, 'Apa itu Sabit Academy?');
      text = text.replace(/A huge thank you to everyone who made Sabit Academy '24 so special\./gi, 'Mari kembangkan skill IT kamu bersama kami. Dari obrolan seputar Agentic AI hingga kolaborasi project, semua ada di sini!');
      text = text.replace(/We are so excited to bring Sabit Academy back/gi, 'Kami menyediakan wadah silaturahmi & diskusi teknologi terbaru (seperti Hermes Agent).');
      
      // Testimonials & Misc
      text = text.replace(/Not exaggerating when I say Sabit Academy was my web event of the year\./gi, 'Gak lebay, Sabit beneran ngebantu banget buat nambah relasi dan diskusi tugas kuliah!');
      text = text.replace(/Manchester/gi, 'Bandung');

      node.nodeValue = text;
    } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      // Traverse children jika bukan script/style
      node.childNodes.forEach(replaceTextNodes);
    }
  }

  replaceTextNodes(document.body);
  replaceTextNodes(document.head);

  // 2. GANTI GAMBAR DENGAN FOTO AI LOKAL KITA
  const myImages = ['/images/vibe1.jpg', '/images/vibe2.jpg', '/images/vibe3.jpg'];
  let imgIndex = 0;

  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.src || '';
    // Hanya ganti gambar utama (foto orang/acara), abaikan icon kecil berformat SVG
    if (src.includes('flowfest') && (src.includes('.jpg') || src.includes('.png') || src.includes('.webp'))) {
      img.src = myImages[imgIndex % myImages.length];
      // Hapus atribut srcset agar browser dipaksa memuat src kita (bukan versi responsive flowfest)
      img.removeAttribute('srcset'); 
      img.removeAttribute('sizes');
      imgIndex++;
    }
  });

  // Tulis kembali perubahannya
  fs.writeFileSync('public/flowfest_clone.html', dom.serialize());
  console.log('Branding Sabit Academy successfully injected!');
} catch (err) {
  console.error(err);
}
