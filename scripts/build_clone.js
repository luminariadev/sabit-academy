const fs = require('fs');
const { JSDOM } = require('jsdom');

try {
  const rawHtml = fs.readFileSync('flowfest_raw.html', 'utf8');
  const dom = new JSDOM(rawHtml);
  const document = dom.window.document;

  // Extract CSS links
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map(link => link.outerHTML.replace(/href="\//g, 'href="https://www.flowfest.co.uk/'))
    .join('\n');

  // Remove scripts from HTML body to prevent conflicts
  Array.from(document.querySelectorAll('script')).forEach(s => s.remove());

  // Extract Body content
  let bodyHtml = document.body.innerHTML;
  bodyHtml = bodyHtml.replace(/src="\/(?!\/)/g, 'src="https://www.flowfest.co.uk/');
  bodyHtml = bodyHtml.replace(/srcset="\/(?!\/)/g, 'srcset="https://www.flowfest.co.uk/');
  const escapedBodyHtml = bodyHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  const reactCode = `"use client";
import { useEffect, useState } from 'react';

export default function ScrapedPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Custom logic to elegantly remove the frozen loading screen after 1.5 seconds
    const timer = setTimeout(() => {
      const loader = document.querySelector('.loading-container');
      if (loader) {
        loader.classList.add('custom-hide-loader');
      }
    }, 1500);

    // Initialize Webflow basic interactions if present
    const webflowScript = document.createElement('script');
    webflowScript.src = "https://assets-global.website-files.com/66964b4cda0ed6f44d825c86/js/webflow.c6deaf836.js";
    webflowScript.onload = () => {
      if (window.Webflow) {
        window.Webflow.ready();
        if (window.Webflow.require('ix2')) window.Webflow.require('ix2').init();
      }
    };
    document.body.appendChild(webflowScript);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning>
      <div dangerouslySetInnerHTML={{ __html: \`${links}\` }} />
      <style>{\`
        /* Custom CSS to force the frozen loading screen to slide out elegantly */
        .loading-container {
          transition: transform 1s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.8s ease;
          z-index: 999999 !important;
        }
        .custom-hide-loader {
          transform: translateY(-100%) !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      \`}</style>
      <div dangerouslySetInnerHTML={{ __html: \`${escapedBodyHtml}\` }} />
    </div>
  );
}
`;

  fs.writeFileSync('src/app/page.tsx', reactCode);
  console.log('Successfully injected Flowfest clone with Custom Loading Screen Exit Animation.');
} catch (error) {
  console.error("Failed to parse and inject:", error);
}
