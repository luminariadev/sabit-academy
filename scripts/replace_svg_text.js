const fs = require('fs');

try {
  let html = fs.readFileSync('public/flowfest_clone.html', 'utf8');

  // Replace the entire h1 block that contains the SVGs
  const newH1 = `<h1 class="welcome__h1 is--cursor-default" style="font-size: 1.1em; line-height: 1.1; margin-bottom: 20px; text-align: center;">
    <span style="color: #121212; -webkit-text-stroke: 12px #FFFEFB; paint-order: stroke fill; text-shadow: 6px 6px 0px #121212, 6px 6px 0px #121212; font-weight: 900; letter-spacing: -2px;">Ngoding bareng, diskusi seru, project IT.</span>
  </h1>`;

  html = html.replace(/<h1 class="welcome__h1[^>]*>.*?<\/h1>/is, newH1);

  // We should also ensure the small text "Webflow" on the top left or other stragglers are removed if they are SVGs
  // Let's replace the navigation SVGs for FlowFest if they exist, but wait, the prompt is about the hero text.
  
  fs.writeFileSync('public/flowfest_clone.html', html);
  console.log('Hero text SVG successfully replaced with stylized Sabit text!');
} catch (err) {
  console.error(err);
}
