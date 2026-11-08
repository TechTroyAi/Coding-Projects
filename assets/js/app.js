/* ============================================================
   TROY'S TOOLBOX — app.js
   Zero-dependency single-page app: hash routing + tool registry
   ============================================================ */

'use strict';

/* ────────────────────────────────────────────
   ICONS (inline SVG, stroke = currentColor)
   ──────────────────────────────────────────── */
const ICONS = {
  image:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /> <circle cx="9" cy="9" r="2" /> <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /> </svg>',
  palette:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-palette" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /> <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /> <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /> <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /> <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /> </svg>',
  qr:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-qr-code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="5" height="5" x="3" y="3" rx="1" /> <rect width="5" height="5" x="16" y="3" rx="1" /> <rect width="5" height="5" x="3" y="16" rx="1" /> <path d="M21 16h-3a2 2 0 0 0-2 2v3" /> <path d="M21 21v.01" /> <path d="M12 7v3a2 2 0 0 1-2 2H7" /> <path d="M3 12h.01" /> <path d="M12 3h.01" /> <path d="M12 16v.01" /> <path d="M16 12h1" /> <path d="M21 12v.01" /> <path d="M12 21v-1" /> </svg>',
  markdown:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /> <path d="M14 2v5a1 1 0 0 0 1 1h5" /> <path d="M10 9H8" /> <path d="M16 13H8" /> <path d="M16 17H8" /> </svg>',
  arrowRight:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg>',
  arrowLeft:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m12 19-7-7 7-7" /> <path d="M19 12H5" /> </svg>',
  shield:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-shield-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /> <path d="m9 12 2 2 4-4" /> </svg>',
  bolt:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-zap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" /> </svg>',
  search:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" /> </svg>',
  external:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-external-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 3h6v6" /> <path d="M10 14 21 3" /> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /> </svg>',
  newTab:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-square-arrow-out-up-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /> <path d="m21 3-9 9" /> <path d="M15 3h6v6" /> </svg>',
  expand:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-expand" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m15 15 6 6" /> <path d="m15 9 6-6" /> <path d="M21 16v5h-5" /> <path d="M21 8V3h-5" /> <path d="M3 16v5h5" /> <path d="m3 21 6-6" /> <path d="M3 8V3h5" /> <path d="M9 9 3 3" /> </svg>',
  minimize:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-minimize-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m14 10 7-7" /> <path d="M20 10h-6V4" /> <path d="m3 21 7-7" /> <path d="M4 14h6v6" /> </svg>',
  spark:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-sparkles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /> <path d="M20 2v4" /> <path d="M22 4h-4" /> <circle cx="4" cy="20" r="2" /> </svg>',
  appWindow:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-app-window" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect x="2" y="4" width="20" height="16" rx="2" /> <path d="M10 4v4" /> <path d="M2 8h20" /> <path d="M6 4v4" /> </svg>',
  wholeWord:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-whole-word" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="7" cy="12" r="3" /> <path d="M10 9v6" /> <circle cx="17" cy="12" r="3" /> <path d="M14 7v8" /> <path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" /> </svg>',
  globe:
    '<!-- @license lucide-static v1.70.0 - ISC --> <svg class="lucide lucide-globe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /> <path d="M2 12h20" /> </svg>',
  github:
    '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-1.03-.01-1.86-2.51.46-3.16-.61-3.35-1.17-.11-.28-.6-1.17-1.03-1.41-.35-.19-.86-.66-.01-.67.8-.01 1.36.73 1.55 1.03.9 1.52 2.34 1.1 2.91.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.33-.01 2.41-.01 2.74 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>',
};

/* Single, reliable way to size an inline icon */
const icon = (name, size = 18) =>
  ICONS[name].replace('<svg ', '<svg width="' + size + '" height="' + size + '" ');

/* ────────────────────────────────────────────
   TOOL REGISTRY — add new tools here
   ──────────────────────────────────────────── */
const TOOLS = [
  { id: 'snappdf', name: 'SnapPDF', tagline: 'Photos to PDF', desc: 'Turn photos into a shareable PDF, on your device.', category: 'PDF', status: 'live',
    keywords: 'pdf photos images jpg png webp convert merge print document scan pages',
    src: 'tools/snappdf/index.html', original: 'https://files.catbox.moe/ol080y.html', glyph: ICONS.image, added: 'Tool 001' },
  { id: 'palette-lab', name: 'Palette Lab', tagline: 'Color ramps from one hex', desc: 'Turn one base color into nine shades with contrast checks.', category: 'Design', status: 'live',
    keywords: 'color palette ramp shades swatch hex contrast css variables design',
    src: 'tools/palette-lab/index.html', glyph: ICONS.palette, added: 'Tool 002' },
  { id: 'qr-studio', name: 'QR Studio', tagline: 'QR codes for links and Wi-Fi', desc: 'Make QR codes for links, text or Wi-Fi, downloads included.', category: 'Utilities', status: 'live',
    keywords: 'qr code generator link wifi network svg png scan',
    src: 'tools/qr-studio/index.html', glyph: ICONS.qr, added: 'Tool 003' },
  { id: 'markdown-pad', name: 'Markdown Pad', tagline: 'Markdown to HTML, live', desc: 'Write Markdown and see it rendered as you type.', category: 'Text', status: 'live',
    keywords: 'markdown editor preview html write notes document',
    src: 'tools/markdown-pad/index.html', glyph: ICONS.markdown, added: 'Tool 004' },
  { id: 'favicon-maker', name: 'Favicon Maker', tagline: 'Site icons from any image', desc: 'Drop in an image and get every favicon size you need.', category: 'Design', status: 'soon',
    keywords: 'favicon icon site app pwa image resize', glyph: ICONS.appWindow },
  { id: 'word-counter', name: 'Word Counter', tagline: 'Words, characters, reading time', desc: 'Paste text and see word count and reading time instantly.', category: 'Text', status: 'soon',
    keywords: 'word count characters reading time text essay', glyph: ICONS.wholeWord },
];

const CATEGORIES = ['All', 'PDF', 'Text', 'Design', 'Utilities'];
const state = (() => {
  try {
    const raw = sessionStorage.getItem('tt-filters');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.q === 'string' && typeof parsed.cat === 'string') {
        return { q: parsed.q, cat: CATEGORIES.includes(parsed.cat) ? parsed.cat : 'All' };
      }
    }
  } catch (e) { /* private mode / disabled storage */ }
  return { q: '', cat: 'All' };
})();
function persistFilters() {
  try { sessionStorage.setItem('tt-filters', JSON.stringify(state)); } catch (e) { /* ignore */ }
}
const GITHUB_REPO = 'https://github.com/TechTroyAi/Coding-Projects';
const ISSUES_URL = GITHUB_REPO + '/issues/new';

let fsChangeHandler = null;
let keepSidebarOpen = false;

const view = document.getElementById('view');
const toolNav = document.getElementById('toolNav');
const sideSearch = document.getElementById('sideSearch');

/* ────────────────────────────────────────────
   HELPERS
   ──────────────────────────────────────────── */
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const liveTools = () => TOOLS.filter((t) => t.status === 'live');

function toolById(id) {
  return TOOLS.find((t) => t.id === id);
}

function visibleTools() {
  const q = state.q.trim().toLowerCase();
  return TOOLS.filter((t) => {
    const catOk = state.cat === 'All' || t.category === state.cat;
    if (!catOk) return false;
    if (!q) return true;
    const hay = [t.name, t.tagline || '', t.desc, t.category, t.keywords || ''].join(' ').toLowerCase();
    return hay.includes(q);
  });
}

function counts() {
  const live = liveTools().length;
  return { live, total: TOOLS.length };
}

/* ────────────────────────────────────────────
   SIDEBAR TOOL NAV
   ──────────────────────────────────────────── */
function renderToolNav() {
  toolNav.innerHTML = TOOLS.map((t) => {
    if (t.status === 'live') {
      return (
        '<a class="nav-item" href="#/tool/' + esc(t.id) + '" data-tool-nav="' + esc(t.id) + '">' +
          '<span class="nav-icon">' + t.glyph + '</span>' +
          '<span class="nav-text"><span class="nav-name">' + esc(t.name) + '</span>' +
          '<span class="nav-desc">' + esc(t.tagline || '') + '</span></span>' +
          '<span class="live-dot" title="Live"></span>' +
        '</a>'
      );
    }
    return (
      '<span class="nav-item soon" aria-disabled="true" title="Coming soon">' +
        '<span class="nav-icon">' + t.glyph + '</span>' +
        '<span class="nav-text"><span class="nav-name">' + esc(t.name) + '</span>' +
        '<span class="nav-desc">' + esc(t.tagline || '') + '</span></span>' +
        '<span class="soon-pill">Soon</span>' +
      '</span>'
    );
  }).join('');
  const c = counts();
  const countEl = document.getElementById('toolCount');
  if (countEl) countEl.textContent = c.live + ' live';
}

/* ────────────────────────────────────────────
   SHARED CHUNKS
   ──────────────────────────────────────────── */
function crumbRow(section) {
  return (
    '<div class="crumb-row">' +
      '<div class="crumb"><b>' + esc(section) + '</b></div>' +
      '<span class="crumb-chip"><i></i>Runs on your device</span>' +
    '</div>'
  );
}

function footRow() {
  return (
    '<footer class="foot">' +
      '<span>Troy&rsquo;s Toolbox, MIT license</span>' +
      '<span>Runs on your device, open source on <a href="' + GITHUB_REPO + '" target="_blank" rel="noopener">GitHub</a></span>' +
    '</footer>'
  );
}

function toolCard(t) {
  if (t.status === 'live') {
    return (
      '<a class="tool-card live" href="#/tool/' + esc(t.id) + '" aria-label="Launch ' + esc(t.name) + '">' +
        '<span class="tool-glyph">' + t.glyph + '</span>' +
        '<h3 class="tool-name">' + esc(t.name) + '</h3>' +
        '<p class="tool-desc">' + esc(t.desc) + '</p>' +
        '<span class="tool-foot"><span class="tool-cat">' + esc(t.category) + '</span>' +
          '<span class="tool-open">Launch ' + icon('arrowRight', 14) + '</span>' +
        '</span>' +
      '</a>'
    );
  }
  return (
    '<div class="tool-card soon" aria-label="' + esc(t.name) + ' — coming soon">' +
      '<span class="soon-flag">Soon</span>' +
      '<span class="tool-glyph">' + t.glyph + '</span>' +
      '<h3 class="tool-name">' + esc(t.name) + '</h3>' +
      '<p class="tool-desc">' + esc(t.desc) + '</p>' +
      '<span class="tool-foot"><span class="tool-cat">' + esc(t.category) + '</span></span>' +
    '</div>'
  );
}

function gridHTML(list) {
  if (!list.length) {
    return (
      '<div class="empty-state">' +
        '<h3>No matching tools</h3>' +
        '<p>Try a different search or category.</p>' +
        '<button class="btn btn-ghost btn-sm" id="clearFilters" type="button">Clear search &amp; filters</button>' +
      '</div>'
    );
  }
  return '<div class="tool-grid">' + list.map(toolCard).join('') + '</div>';
}

function searchAndChipsHTML() {
  const chips = CATEGORIES.map(
    (c) => '<button class="chip' + (state.cat === c ? ' active' : '') + '" data-cat="' + esc(c) + '" type="button">' + esc(c) + '</button>'
  ).join('');
  return (
    '<div class="view-search">' +
      ICONS.search +
      '<input id="viewSearch" type="search" placeholder="Search tools" autocomplete="off" spellcheck="false" value="' + esc(state.q) + '" aria-label="Search tools">' +
    '</div>' +
    '<div class="chips" role="group" aria-label="Filter by category">' + chips + '</div>'
  );
}

/* ────────────────────────────────────────────
   VIEW: OVERVIEW
   ──────────────────────────────────────────── */
function viewOverview() {
  const snap = TOOLS[0];
  return (
    '<div class="content">' +
      crumbRow('Overview') +

      '<section class="hero">' +
        '<div class="eyebrow">Free, private, in your browser</div>' +
        '<h1>Free tools that <span class="accent">just work.</span></h1>' +
        '<p class="lede">Single-purpose tools that run in your browser. No accounts, no uploads, nothing to install.</p>' +
        '<div class="cta-row">' +
          '<a class="btn btn-primary" href="#/tool/snappdf">Launch SnapPDF ' + ICONS.arrowRight + '</a>' +
          '<a class="btn btn-ghost" href="#/tools">Browse all tools</a>' +
        '</div>' +
      '</section>' +

      '<section class="how" aria-label="How it works — three steps">' +
        '<div class="how-step"><span class="how-num" aria-hidden="true">1</span><span><h3>Pick a tool</h3><p>Choose one from the list — SnapPDF turns photos into a PDF.</p></span></div>' +
        '<div class="how-step"><span class="how-num" aria-hidden="true">2</span><span><h3>Add your photos</h3><p>Drag them into the box, or tap to pick them from your device.</p></span></div>' +
        '<div class="how-step"><span class="how-num" aria-hidden="true">3</span><span><h3>Get your PDF</h3><p>Press the big button — your PDF downloads. Nothing is uploaded.</p></span></div>' +
      '</section>' +

      '<article class="featured" aria-label="Featured tool: SnapPDF">' +
        '<div class="featured-body">' +
          '<div class="featured-kicker"><span class="badge-featured">Featured</span><span class="tool-cat">' + esc(snap.added || 'Tool 001') + '</span></div>' +
          '<h2>SnapPDF</h2>' +
          '<p>Drop in your photos and get one clean PDF. Nothing is uploaded.</p>' +
          '<div class="tagrow"><span class="tag">PDF</span><span class="tag">Images</span><span class="tag neutral">Works offline</span><span class="tag neutral">Under 3 MB</span></div>' +
          '<div class="featured-actions">' +
            '<a class="btn btn-primary btn-sm" href="#/tool/snappdf">Launch tool ' + ICONS.arrowRight + '</a>' +
            '<a class="btn btn-ghost btn-sm" href="' + esc(snap.src) + '" target="_blank" rel="noopener">Open in new tab ' + ICONS.newTab + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="featured-visual" aria-hidden="true">' +
          '<div class="mock">' +
            '<div class="mock-card">' +
              '<div class="mock-head"><span class="mock-logo">▧</span><span class="mock-title">SnapPDF</span><span class="mock-pill">Private, on device</span></div>' +
              '<div class="mock-drop">Drop your photos here</div>' +
              '<div class="mock-photos"><span class="mock-photo"></span><span class="mock-photo"></span><span class="mock-photo"></span><span class="mock-photo"></span></div>' +
              '<div class="mock-cta">Create &amp; download PDF</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>' +

      '<div class="section-head">' +
        '<div><div class="section-label">The Collection</div><h2 class="section-title">All tools</h2></div>' +
        '<a class="section-link" href="#/tools">See all ' + counts().total + ' tools ' + icon('arrowRight', 13) + '</a>' +
      '</div>' +
      gridHTML(visibleTools()) +

      footRow() +
    '</div>'
  );
}

/* ────────────────────────────────────────────
   VIEW: ALL TOOLS
   ──────────────────────────────────────────── */
function viewTools() {
  return (
    '<div class="content">' +
      crumbRow('All Tools') +
      '<div class="section-head tools-head">' +
        '<div><div class="section-label">The Collection</div><h1 class="section-title tools-title">All tools</h1></div>' +
        '<span class="crumb-chip">' + counts().live + ' live, ' + (counts().total - counts().live) + ' coming</span>' +
      '</div>' +
      '<p class="lede view-lede">Search or filter by category. Everything runs in your browser.</p>' +
      searchAndChipsHTML() +
      '<div id="gridSlot">' + gridHTML(visibleTools()) + '</div>' +

      '<div class="about-card about-cta">' +
        '<div class="about-cta-body">' +
          '<div class="section-label label-tight">Missing something?</div>' +
          '<strong>Request a tool — it might become Tool Nº 002.</strong>' +
          '<p class="about-cta-text">Open an issue on the repo with what you need. Popular requests get built next.</p>' +
        '</div>' +
        '<a class="btn btn-ghost btn-sm" href="' + ISSUES_URL + '" target="_blank" rel="noopener">Request a tool ' + ICONS.external + '</a>' +
      '</div>' +

      footRow() +
    '</div>'
  );
}

/* ────────────────────────────────────────────
   VIEW: ABOUT
   ──────────────────────────────────────────── */
function viewAbout() {
  return (
    '<div class="content">' +
      crumbRow('About') +
      '<div class="about-card">' +
        '<div class="section-label">About</div>' +
        '<h1>Built for the little things worth keeping.</h1>' +
        '<p>Troy&rsquo;s Toolbox is a curated set of single-purpose tools. Each one is a self-contained HTML file that runs entirely in your browser — your files never leave your machine.</p>' +
        '<ul>' +
          '<li><strong>Private</strong> — zero uploads, zero accounts, zero analytics.</li>' +
          '<li><strong>Fast</strong> — no frameworks, no build step, no waiting.</li>' +
          '<li><strong>Open</strong> — read every line in the <a href="' + GITHUB_REPO + '" target="_blank" rel="noopener">public repo</a>.</li>' +
        '</ul>' +
        '<p>Want to add a tool? Drop a folder into <code>tools/</code> and register it in <code>assets/js/app.js</code>:</p>' +
        '<pre class="code-block"><span class="c">// 1. add your tool file</span>\ntools/my-tool/index.html\n\n<span class="c">// 2. register it in the TOOLS array</span>\n{ id: \'my-tool\', name: \'My Tool\', category: \'Utilities\',\n  status: \'live\', src: \'tools/my-tool/index.html\', … }</pre>' +
      '</div>' +
      footRow() +
    '</div>'
  );
}

/* ────────────────────────────────────────────
   VIEW: TOOL RUNNER
   ──────────────────────────────────────────── */
function viewToolRunner(tool) {
  return (
    '<div class="runner">' +
      '<div class="runner-bar">' +
        '<button class="back-btn" id="backHome" type="button" aria-label="Back to home">' + ICONS.arrowLeft + '<span>Back to home</span></button>' +
        '<div class="runner-meta">' +
          '<span class="runner-mark" aria-hidden="true">' + tool.glyph.replace('<svg ', '<svg width="18" height="18" ') + '</span>' +
          '<span class="runner-name">' + esc(tool.name) + ' <span class="ondevice"><i></i>On-device</span></span>' +
        '</div>' +
        '<div class="runner-actions">' +
          '<a class="runner-btn" href="' + esc(tool.src) + '" target="_blank" rel="noopener" title="Open this tool in its own tab">' + ICONS.newTab + '<span class="rb-label">New tab</span></a>' +
          '<a class="runner-btn" href="' + esc(tool.original || tool.src) + '" target="_blank" rel="noopener" title="Open the original version, hosted on Catbox">' + ICONS.external + '<span class="rb-label">Original</span></a>' +
          '<button class="runner-btn" id="fsToggle" type="button" title="Make the tool fill the whole screen" aria-pressed="false">' + ICONS.expand + '<span class="rb-label">Fill screen</span></button>' +
        '</div>' +
      '</div>' +
      '<div class="runner-frame" id="runnerFrame">' +
        '<div class="runner-loading" id="runnerLoading"><div class="spinner" role="status" aria-label="Loading tool"></div><span>Loading ' + esc(tool.name) + '…</span></div>' +
        '<iframe id="toolFrame" title="' + esc(tool.name) + ' — ' + esc(tool.tagline || 'tool') + '" src="' + esc(tool.src) + '" sandbox="allow-scripts allow-same-origin allow-downloads" referrerpolicy="no-referrer"></iframe>' +
      '</div>' +
      '<div class="runner-foot">' +
        '<span>Runs locally, nothing leaves this device. <a href="' + GITHUB_REPO + '" target="_blank" rel="noopener">source</a></span>' +
        '<span class="desktop-hint">Press <kbd class="key">Esc</kbd> to go back home</span>' +
      '</div>' +
    '</div>'
  );
}

/* ────────────────────────────────────────────
   VIEW: 404
   ──────────────────────────────────────────── */
function viewNotFound() {
  return (
    '<div class="content notfound">' +
      '<div class="section-label label-gap">Error 404</div>' +
      '<h1 class="section-title notfound-title">That page wandered off.</h1>' +
      '<p class="lede notfound-lede">The route you asked for doesn&rsquo;t exist — but the toolbox is right where you left it.</p>' +
      '<div class="cta-row cta-center">' +
        '<a class="btn btn-primary" href="#/">Back to home ' + ICONS.arrowRight + '</a>' +
        '<a class="btn btn-ghost" href="#/tools">Browse tools</a>' +
      '</div>' +
    '</div>'
  );
}

/* ────────────────────────────────────────────
   ROUTER
   ──────────────────────────────────────────── */
const TITLES = {
  overview: "Troy's Toolbox",
  tools: "All Tools — Troy's Toolbox",
  about: "About — Troy's Toolbox",
  notfound: "Not found — Troy's Toolbox",
};

function parseHash() {
  let h = (location.hash || '#/').replace(/^#/, '');
  if (!h.startsWith('/')) h = '/' + h;
  const parts = h.split('/').filter(Boolean); // ['tool','snappdf']
  if (parts.length === 0) return { name: 'overview', id: null };
  if (parts[0] === 'tools') return { name: 'tools', id: null };
  if (parts[0] === 'about') return { name: 'about', id: null };
  if (parts[0] === 'tool' && parts[1]) return { name: 'tool', id: decodeURIComponent(parts[1]) };
  return { name: 'notfound', id: null };
}

function setActiveNav(name, toolId) {
  document.querySelectorAll('[data-route]').forEach((el) => {
    const on = el.getAttribute('data-route') === name;
    el.classList.toggle('active', on);
    if (on) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
  });
  document.querySelectorAll('[data-tool-nav]').forEach((el) => {
    const on = el.getAttribute('data-tool-nav') === toolId;
    el.classList.toggle('active', on);
    if (on) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
  });
}

function closeMobileSidebar() {
  document.body.classList.remove('sidebar-open');
  const hb = document.getElementById('hamburger');
  if (hb) hb.setAttribute('aria-expanded', 'false');
}

function afterRender(focusMain) {
  window.scrollTo(0, 0);
  if (focusMain !== false) {
    try { view.focus({ preventScroll: true }); } catch (e) { view.focus(); }
  }
}

function render() {
  const route = parseHash();
  if (!keepSidebarOpen) closeMobileSidebar();
  keepSidebarOpen = false;

  if (route.name === 'tool') {
    const tool = toolById(route.id);
    if (!tool || tool.status !== 'live') {
      view.innerHTML = viewNotFound();
      document.title = TITLES.notfound;
      setActiveNav('notfound', null);
      afterRender();
      return;
    }
    view.innerHTML = viewToolRunner(tool);
    document.title = tool.name + " — Troy's Toolbox";
    setActiveNav('tool', tool.id);
    bindRunner(tool);
    afterRender(false);
    return;
  }

  if (route.name === 'tools') {
    view.innerHTML = viewTools();
    document.title = TITLES.tools;
    setActiveNav('tools', null);
    bindToolsView();
    afterRender();
    return;
  }

  if (route.name === 'about') {
    view.innerHTML = viewAbout();
    document.title = TITLES.about;
    setActiveNav('about', null);
    afterRender();
    return;
  }

  if (route.name === 'overview') {
    view.innerHTML = viewOverview();
    document.title = TITLES.overview;
    setActiveNav('overview', null);
    bindOverview();
    afterRender();
    return;
  }

  view.innerHTML = viewNotFound();
  document.title = TITLES.notfound;
  setActiveNav('notfound', null);
  afterRender();
}

/* ────────────────────────────────────────────
   VIEW BINDINGS
   ──────────────────────────────────────────── */
function refreshGrid() {
  const slot = document.getElementById('gridSlot');
  if (slot) slot.innerHTML = gridHTML(visibleTools());
  bindClearFilters();
}

function bindClearFilters() {
  const btn = document.getElementById('clearFilters');
  if (btn)
    btn.addEventListener('click', () => {
      state.q = '';
      state.cat = 'All';
      persistFilters();
      if (sideSearch) sideSearch.value = '';
      render();
    });
}

function bindToolsView() {
  const input = document.getElementById('viewSearch');
  if (input) {
    input.addEventListener('input', () => {
      state.q = input.value;
      persistFilters();
      if (sideSearch) sideSearch.value = input.value;
      refreshGrid();
    });
  }
  document.querySelectorAll('[data-cat]').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.cat = chip.getAttribute('data-cat');
      persistFilters();
      document.querySelectorAll('[data-cat]').forEach((c) => c.classList.toggle('active', c === chip));
      refreshGrid();
    });
  });
  bindClearFilters();
}

function bindOverview() {
  bindClearFilters();
}

function bindRunner(tool) {
  const back = document.getElementById('backHome');
  if (back) back.addEventListener('click', () => { location.hash = '#/'; });

  const frame = document.getElementById('runnerFrame');
  const iframe = document.getElementById('toolFrame');
  const loading = document.getElementById('runnerLoading');
  if (iframe && loading) {
    const done = () => loading.classList.add('hidden');
    iframe.addEventListener('load', () => {
      done();
      // Bridge Escape from inside the same-origin tool iframe → back home
      try {
        const doc = iframe.contentDocument;
        if (doc) {
          doc.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !document.fullscreenElement) location.hash = '#/';
          });
        }
      } catch (_) { /* cross-origin tool — parent listener still applies */ }
    });
    // Safety net: never leave the loader up forever.
    window.setTimeout(done, 4000);
  }

  const fsBtn = document.getElementById('fsToggle');
  if (fsBtn && frame) {
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else if (frame.requestFullscreen) {
        frame.requestFullscreen().catch(() => {});
      }
    });
    if (fsChangeHandler) document.removeEventListener('fullscreenchange', fsChangeHandler);
    fsChangeHandler = () => {
      const on = !!document.fullscreenElement;
      fsBtn.setAttribute('aria-pressed', String(on));
      fsBtn.innerHTML = (on ? ICONS.minimize : ICONS.expand) + '<span class="rb-label">' + (on ? 'Exit full screen' : 'Fill screen') + '</span>';
      fsBtn.title = on ? 'Exit full screen' : 'Make the tool fill the whole screen';
    };
    document.addEventListener('fullscreenchange', fsChangeHandler);
  }
}

/* Sidebar search — typing from anywhere jumps to All Tools and filters */
if (sideSearch) {
  sideSearch.addEventListener('input', () => {
    state.q = sideSearch.value;
    persistFilters();
    const route = parseHash();
    if (route.name !== 'tools') {
      keepSidebarOpen = true;
      location.hash = '#/tools';
    } else {
      const input = document.getElementById('viewSearch');
      if (input && input !== document.activeElement) input.value = state.q;
      refreshGrid();
    }
  });
}

/* Mobile sidebar */
const hamburger = document.getElementById('hamburger');
const backdrop = document.getElementById('backdrop');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = document.body.classList.toggle('sidebar-open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
}
if (backdrop) {
  backdrop.addEventListener('click', closeMobileSidebar);
}

/* Keyboard shortcuts:  /  focus search ·  Esc  back / clear */
document.addEventListener('keydown', (e) => {
  const tag = (e.target && e.target.tagName) || '';
  const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable;

  if (e.key === '/' && !typing) {
    e.preventDefault();
    const route = parseHash();
    if (route.name === 'tools') {
      const input = document.getElementById('viewSearch');
      if (input) input.focus();
    } else if (window.innerWidth <= 980) {
      document.body.classList.add('sidebar-open');
      if (sideSearch) sideSearch.focus();
    } else if (sideSearch) {
      sideSearch.focus();
    }
    return;
  }

  if (e.key === 'Escape') {
    if (document.fullscreenElement) return; // let the browser exit fullscreen first
    const route = parseHash();
    if (state.q || state.cat !== 'All') {
      state.q = '';
      state.cat = 'All';
      if (sideSearch) sideSearch.value = '';
      if (route.name === 'tools') { render(); return; }
    }
    if (route.name === 'tool' || route.name === 'notfound' || route.name === 'about') {
      location.hash = '#/';
    }
  }
});

/* Larger-text mode — one obvious switch in the side panel */
const fontToggle = document.getElementById('fontToggle');
const fontToggleState = document.getElementById('fontToggleState');
function applyLargeText(on) {
  document.documentElement.classList.toggle('large-text', on);
  if (fontToggle) fontToggle.setAttribute('aria-pressed', String(on));
  if (fontToggleState) fontToggleState.textContent = on ? 'On' : 'Off';
  try { localStorage.setItem('tt-large-text', on ? '1' : '0'); } catch (e) { /* private mode */ }
}
(function initLargeText() {
  let on = document.documentElement.classList.contains('large-text');
  try { on = localStorage.getItem('tt-large-text') === '1'; } catch (e) { /* private mode */ }
  applyLargeText(on);
})();
if (fontToggle) {
  fontToggle.addEventListener('click', () => {
    applyLargeText(!document.documentElement.classList.contains('large-text'));
  });
}

/* Boot */
renderToolNav();
window.addEventListener('hashchange', render);
render();
