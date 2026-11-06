const fs = require('fs');
let html = fs.readFileSync('flowfest_raw.html', 'utf8');

// Fix all relative URLs to point to the actual flowfest domain
html = html.replace(/href="\/(?!\/)/g, 'href="https://www.flowfest.co.uk/');
html = html.replace(/src="\/(?!\/)/g, 'src="https://www.flowfest.co.uk/');
html = html.replace(/srcset="\/(?!\/)/g, 'srcset="https://www.flowfest.co.uk/');

fs.writeFileSync('public/flowfest_clone.html', html);
console.log('Successfully written pure HTML clone to public directory!');
