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
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4.5 18l5-5 4 4 3.2-3.2L21 18.5"/></svg>',
  palette:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="8.2" cy="10.4" r="1.05" fill="currentColor" stroke="none"/><circle cx="11" cy="7.2" r="1.05" fill="currentColor" stroke="none"/><circle cx="15" cy="7.4" r="1.05" fill="currentColor" stroke="none"/><circle cx="17.6" cy="11.2" r="1.05" fill="currentColor" stroke="none"/><path d="M12 21a9 9 0 0 0 8.7-6.9c-2 .6-3.9-.6-4.3-2.6-.3-1.7 1-3.4 2.7-3.9A9 9 0 1 0 12 21z"/></svg>',
  qr:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14h1M14 20h1M18.5 18.5H21V21"/></svg>',
  markdown:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17V7l4 5 4-6 4 6 4-5v10"/></svg>',
  arrowRight:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15"/><path d="M13 5.5L19.5 12 13 18.5"/></svg>',
  arrowLeft:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H5"/><path d="M11 5.5L4.5 12 11 18.5"/></svg>',
  shield:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"/><path d="M9.5 12l2 2 3.5-3.5"/></svg>',
  bolt:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L5 13.5h5L9.5 22 18 10.5h-5.5L13 2z"/></svg>',
  lock:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10.5" width="16" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>',
  search:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  external:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4L10.5 13.5"/><path d="M19 13.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V6.5A1.5 1.5 0 0 1 5 5h5.5"/></svg>',
  newTab:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6"/><path d="M14 4h6v6"/><path d="M20 4l-9 9"/></svg>',
  expand:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg>',
  minimize:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5"/></svg>',
  spark:
    '<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2 6.2L20.2 11 14 13l-2 6.2L10 13 3.8 11 10 9.2 12 3z"/></svg>',
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
  {
    id: 'snappdf',
    name: 'SnapPDF',
    tagline: 'Photos → PDF',
    desc: 'Turn photos into a neat, shareable PDF — straight on your device. Reorder pages, choose A4 / Letter / fit-to-photo, auto-compress under 3 MB.',
    category: 'PDF',
    status: 'live',
    keywords: 'pdf photos images jpg png webp convert merge print document scan pages',
    src: 'tools/snappdf/index.html',
    original: 'https://files.catbox.moe/ol080y.html',
    glyph: ICONS.image,
    added: 'Tool Nº 001',
  },
  {
    id: 'palette-lab',
    name: 'Palette Lab',
    tagline: 'Design color ramps',
    desc: 'Build HTML-ready color palettes with lockable ramps, live contrast checks and one-click export as CSS variables.',
    category: 'Design',
    status: 'soon',
    keywords: 'color palette contrast css variables design hex',
    glyph: ICONS.palette,
  },
  {
    id: 'qr-studio',
    name: 'QR Studio',
    tagline: 'QR codes, crisp',
    desc: 'Generate sharp QR codes for links, Wi-Fi and email. Export as SVG or PNG, no watermark, no sign-up.',
    category: 'Utilities',
    status: 'soon',
    keywords: 'qr code generator link wifi png svg',
    glyph: ICONS.qr,
  },
  {
    id: 'markdown-pad',
    name: 'Markdown Pad',
    tagline: 'Live Markdown editor',
    desc: 'A distraction-free Markdown editor with split live preview, outline sidebar and one-click HTML export.',
    category: 'Text',
    status: 'soon',
    keywords: 'markdown editor preview text html write',
    glyph: ICONS.markdown,
  },
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
      '<div class="crumb">Toolbox <span aria-hidden="true">/</span> <b>' + esc(section) + '</b></div>' +
      '<span class="crumb-chip"><i></i>Runs on your device</span>' +
    '</div>'
  );
}

function footRow() {
  return (
    '<footer class="foot">' +
      '<span>Troy&rsquo;s Toolbox — MIT licensed &copy; TechTroyAi</span>' +
      '<span>100% client-side &middot; No tracking &middot; <a href="' + GITHUB_REPO + '" target="_blank" rel="noopener">View source</a></span>' +
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
        '<h3>Nothing matches that — yet</h3>' +
        '<p>No tools match &ldquo;' + esc(state.q) + '&rdquo; in ' + esc(state.cat) + '. Try a different keyword.</p>' +
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
      '<input id="viewSearch" type="search" placeholder="Search tools…" autocomplete="off" spellcheck="false" value="' + esc(state.q) + '" aria-label="Search tools">' +
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
        '<div class="eyebrow">Free · Private · In-browser</div>' +
        '<h1>Tiny tools, <span class="accent">serious craftsmanship.</span></h1>' +
        '<p class="lede">Troy&rsquo;s Toolbox is a growing collection of single-purpose HTML tools. No sign-up, no installs, no uploads — everything runs right on your device, and nothing leaves it.</p>' +
        '<div class="cta-row">' +
          '<a class="btn btn-primary" href="#/tool/snappdf">Launch SnapPDF ' + ICONS.arrowRight + '</a>' +
          '<a class="btn btn-ghost" href="#/tools">Browse all tools</a>' +
        '</div>' +
        '<div class="trust-row">' +
          '<span class="trust">' + ICONS.shield + '100% client-side</span>' +
          '<span class="trust">' + ICONS.bolt + 'Zero install</span>' +
          '<span class="trust">' + ICONS.lock + 'No tracking</span>' +
        '</div>' +
      '</section>' +

      '<section class="how" aria-label="How it works — three steps">' +
        '<div class="how-step"><span class="how-num" aria-hidden="true">1</span><span><h3>Pick a tool</h3><p>Choose one from the list — SnapPDF turns photos into a PDF.</p></span></div>' +
        '<div class="how-step"><span class="how-num" aria-hidden="true">2</span><span><h3>Add your photos</h3><p>Drag them into the box, or tap to pick them from your device.</p></span></div>' +
        '<div class="how-step"><span class="how-num" aria-hidden="true">3</span><span><h3>Get your PDF</h3><p>Press the big button — your PDF downloads. Nothing is uploaded.</p></span></div>' +
      '</section>' +

      '<article class="featured" aria-label="Featured tool: SnapPDF">' +
        '<div class="featured-body">' +
          '<div class="featured-kicker"><span class="badge-featured">Featured</span><span class="tool-cat">' + esc(snap.added || 'Tool Nº 001') + '</span></div>' +
          '<h2>SnapPDF — your photos, one PDF.</h2>' +
          '<p>Drop in your photos, set the page size and compression, and get a clean, shareable PDF. Your images are processed locally in memory and never touch a server.</p>' +
          '<div class="tagrow"><span class="tag">PDF</span><span class="tag">Images</span><span class="tag neutral">Works offline</span><span class="tag neutral">Under 3 MB</span></div>' +
          '<div class="featured-actions">' +
            '<a class="btn btn-primary btn-sm" href="#/tool/snappdf">Launch tool ' + ICONS.arrowRight + '</a>' +
            '<a class="btn btn-ghost btn-sm" href="' + esc(snap.src) + '" target="_blank" rel="noopener">Open in new tab ' + ICONS.newTab + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="featured-visual" aria-hidden="true">' +
          '<div class="mock">' +
            '<div class="mock-card">' +
              '<div class="mock-head"><span class="mock-logo">▧</span><span class="mock-title">SnapPDF</span><span class="mock-pill">Private · on device</span></div>' +
              '<div class="mock-drop">Drop your photos here</div>' +
              '<div class="mock-photos"><span class="mock-photo"></span><span class="mock-photo"></span><span class="mock-photo"></span><span class="mock-photo"></span></div>' +
              '<div class="mock-cta">Create &amp; download PDF ↓</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>' +

      '<div class="section-head">' +
        '<div><div class="section-label">The Collection</div><h2 class="section-title">All tools</h2></div>' +
        '<a class="section-link" href="#/tools">See all ' + counts().total + ' tools ' + icon('arrowRight', 13) + '</a>' +
      '</div>' +
      gridHTML(visibleTools()) +

      '<div class="trio" aria-label="Why Troy\'s Toolbox">' +
        '<div class="trio-item">' + ICONS.shield + '<h3>Private by default</h3><p>Files are processed in your browser&rsquo;s memory. No uploads, no cloud, no asterisks.</p></div>' +
        '<div class="trio-item">' + ICONS.bolt + '<h3>Opens instantly</h3><p>Pure HTML, CSS and vanilla JS. No frameworks to download, nothing to install.</p></div>' +
        '<div class="trio-item">' + ICONS.spark + '<h3>Built in the open</h3><p>Every tool is a single readable HTML file in a public repo. Fork it, audit it, learn from it.</p></div>' +
      '</div>' +

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
        '<span class="crumb-chip">' + counts().live + ' live · ' + (counts().total - counts().live) + ' coming</span>' +
      '</div>' +
      '<p class="lede view-lede">Search the collection or filter by category. Every tool opens instantly — nothing to install.</p>' +
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
        '<span>Runs locally · nothing leaves this device · <a href="' + GITHUB_REPO + '" target="_blank" rel="noopener">source</a></span>' +
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
  overview: "Troy's Toolbox — Free, Private, In-Browser Tools",
  tools: "All Tools · Troy's Toolbox",
  about: "About · Troy's Toolbox",
  notfound: "Not found · Troy's Toolbox",
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
    document.title = tool.name + " · Troy's Toolbox";
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
