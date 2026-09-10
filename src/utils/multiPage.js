// Multi-page extraction and standalone subpage generation utilities
// Used for multi-page live preview, ZIP export, Vercel multi-page deploy, and Netlify multi-page deploy.

export const cleanEditorArtifacts = (html) => {
  if (!html) return html;
  let clean = html;
  
  // Strip injected scripts and styles
  clean = clean.replace(/<script id="pagecraft-prevent-navigation">[\s\S]*?<\/script>/gi, '');
  clean = clean.replace(/<script id="pagecraft-visual-editor">[\s\S]*?<\/script>/gi, '');
  clean = clean.replace(/<style id="pagecraft-stagger-styles">[\s\S]*?<\/style>/gi, '');
  
  // Clean up visual editor inline styles
  clean = clean.replace(/\s*style="outline:[^"]*"\s*/gi, ' ');
  clean = clean.replace(/\s*contenteditable="false"\s*/gi, ' ');
  clean = clean.replace(/\s*contenteditable="true"\s*/gi, ' ');
  
  // Remove staggered animation classes
  clean = clean.replace(/\bpagecraft-staggered\b/gi, '');
  
  // Remove animation delay inline styles
  clean = clean.replace(/\s*style="animation-delay:\s*[^"]*"\s*/gi, ' ');
  clean = clean.replace(/\s*class="\s*"\s*/gi, ' ');
  
  return clean.trim();
};

export const detectAvailablePages = (htmlCode) => {
  if (!htmlCode) return [{ id: 'index.html', label: 'index.html (Home)', icon: '🏠' }];
  
  const pages = [{ id: 'index.html', label: 'index.html (Home)', icon: '🏠' }];
  const foundIds = new Set(['index', 'home', 'root', 'app']);

  const getIconForId = (id) => {
    if (id.includes('menu')) return '📜';
    if (id.includes('origin') || id.includes('about') || id.includes('story')) return '🌾';
    if (id.includes('location') || id.includes('map')) return '📍';
    if (id.includes('gallery') || id.includes('photo') || id.includes('atmosphere')) return '🖼️';
    if (id.includes('contact') || id.includes('inquir')) return '📞';
    if (id.includes('feature') || id.includes('capability')) return '⚡';
    if (id.includes('pricing') || id.includes('tier')) return '💳';
    if (id.includes('fleet') || id.includes('yacht')) return '⛵';
    if (id.includes('destination')) return '🗺️';
    if (id.includes('concierge') || id.includes('service')) return '🛎️';
    if (id.includes('faq')) return '❓';
    return '📄';
  };
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    // 1. Detect all explicit HTML file links in navigation or body (e.g. href="menu.html", href="locations.html")
    const links = doc.querySelectorAll('a[href]');
    links.forEach(a => {
      const href = (a.getAttribute('href') || '').trim();
      const match = href.match(/^([^#?:]+)\.html$/i);
      if (match) {
        const clean = match[1].replace(/^\//, '').toLowerCase();
        if (clean && !foundIds.has(clean) && clean.length > 1) {
          foundIds.add(clean);
          pages.push({
            id: `${clean}.html`,
            cleanId: clean,
            label: `${clean}.html`,
            icon: getIconForId(clean)
          });
        }
      }
    });

    // 2. Detect all sections with identifiable IDs (e.g. section id="menu", section id="locations")
    const sections = doc.querySelectorAll('section[id], div[id]');
    sections.forEach(sec => {
      const id = sec.id.toLowerCase().trim();
      if (id && !foundIds.has(id) && id.length > 2) {
        foundIds.add(id);
        pages.push({
          id: `${id}.html`,
          cleanId: id,
          label: `${id}.html`,
          icon: getIconForId(id)
        });
      }
    });
  } catch (e) {
    console.error("Failed to detect pages:", e);
  }

  return pages;
};

export const buildStandaloneSubPageHTML = (masterCode, pageFileName) => {
  if (!masterCode || !pageFileName || pageFileName === 'index.html' || pageFileName === 'home') {
    return cleanEditorArtifacts(masterCode);
  }

  const cleanId = pageFileName.replace(/\.html$/, '').replace(/^\//, '').replace(/^#/, '').toLowerCase();

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(masterCode, 'text/html');

    const headContent = doc.head ? doc.head.innerHTML : '';
    const headerElem = doc.querySelector('header');
    const footerElem = doc.querySelector('footer');
    const bodyClass = doc.body ? doc.body.className : 'bg-[#1C1512] text-white min-h-screen';

    // Find target section by ID or attribute
    const targetSection = doc.getElementById(cleanId) || 
      doc.querySelector(`section[id*="${cleanId}"]`) || 
      doc.querySelector(`div[id*="${cleanId}"]`);

    let sectionHTML = '';
    if (targetSection) {
      sectionHTML = targetSection.outerHTML;
    } else {
      // Elegant themed placeholder if section was linked in nav but not yet fully defined
      const titleCap = cleanId.charAt(0).toUpperCase() + cleanId.slice(1);
      sectionHTML = `
        <section class="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 mb-6 uppercase tracking-widest">
            <span>EXPLORE // ${titleCap.toUpperCase()}</span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif font-bold mb-6 text-white tracking-tight">${titleCap}</h2>
          <p class="text-slate-400 text-base max-w-xl mx-auto leading-relaxed mb-8">
            Discover all our curated offerings, details, and information regarding ${cleanId}.
          </p>
          <a href="index.html" class="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 rounded-xl hover:bg-amber-400 transition-colors">
            ← Return to Home
          </a>
        </section>
      `;
    }

    let headerHTML = headerElem ? headerElem.outerHTML : '';
    if (headerHTML) {
      // Update logo/home link to point back to index.html
      headerHTML = headerHTML.replace(/href=["'](#|#home|\/?)["']/gi, 'href="index.html"');

      // Highlight current page active link
      const reg = new RegExp(`href=["'](#|\\/?)${cleanId}(\\.html)?["']`, 'gi');
      headerHTML = headerHTML.replace(reg, `href="${cleanId}.html" class="text-amber-400 font-bold border-b-2 border-amber-400 pb-1"`);
    }

    const titleCap = cleanId.charAt(0).toUpperCase() + cleanId.slice(1);

    const standaloneHTML = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleCap} // PageCraft AI</title>
  ${headContent}
</head>
<body class="${bodyClass}">

  ${headerHTML}

  <!-- Dedicated Page Content -->
  <main class="py-6 min-h-[65vh]">
    ${sectionHTML}
  </main>

  ${footerElem ? footerElem.outerHTML : ''}

</body>
</html>`;

    return cleanEditorArtifacts(standaloneHTML);
  } catch (err) {
    console.error('Error generating standalone sub-page HTML:', err);
  }

  return cleanEditorArtifacts(masterCode);
};
