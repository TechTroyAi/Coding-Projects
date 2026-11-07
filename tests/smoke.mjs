/* ============================================================
   Troy's Toolbox — smoke tests
   Usage:  npm install  (once)  →  npm test
   Loads the real index.html + app.js into jsdom and drives the
   SPA through every route, the search/filter logic, the tool
   runner contract and the accessibility wiring.
   ============================================================ */
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const html = read('index.html');
const appJs = read('assets/js/app.js');

const errors = [];
const dom = new JSDOM(html, {
  url: 'https://localhost.local/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
const { window } = dom;
window.scrollTo = () => {};
window.addEventListener('error', (e) => errors.push('window error: ' + e.message));

try {
  window.eval(appJs);
} catch (e) {
  errors.push('boot threw: ' + e.message);
}

const assert = (cond, msg) => { if (!cond) errors.push('ASSERT: ' + msg); };
const q = (sel) => window.document.querySelector(sel);
const qa = (sel) => [...window.document.querySelectorAll(sel)];
const hash = (h) => {
  window.location.hash = h;
  window.dispatchEvent(new window.HashChangeEvent('hashchange'));
};

/* 1 — Overview */
assert(q('#view').innerHTML.includes('Tiny tools'), 'overview hero rendered');
assert(qa('.tool-card').length === 4, 'tool grid renders 4 cards');
assert(q('#toolCount').textContent.includes('1'), 'tool count chip shows live tools');
assert(qa('#toolNav .nav-item').length === 4, 'sidebar renders tool entries');
assert(q('#view').innerHTML.includes('How it works'), 'how-it-works strip renders');
assert(qa('.how-step').length === 3, 'three how-it-works steps');

/* 2 — All Tools route: search, chips, grid */
hash('#/tools');
assert(q('#viewSearch') !== null, 'tools view search renders');
assert(qa('.chip').length === 5, 'category chips render');
const vs = q('#viewSearch');
vs.value = 'snappdf';
vs.dispatchEvent(new window.Event('input', { bubbles: true }));
assert(qa('#gridSlot .tool-card').length === 1, 'search narrows to SnapPDF');
vs.value = '';
vs.dispatchEvent(new window.Event('input', { bubbles: true }));
qa('.chip').find((c) => c.dataset.cat === 'Design').dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
assert(qa('#gridSlot .tool-card').length === 1, 'category filter works');
qa('.chip').find((c) => c.dataset.cat === 'All').dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

/* 3 — Tool runner contract */
hash('#/tool/snappdf');
assert(q('#toolFrame') !== null, 'runner iframe mounted');
assert(q('#toolFrame').getAttribute('src') === 'tools/snappdf/index.html', 'iframe points at self-hosted tool');
assert(q('#backHome') !== null, 'back-to-home button present');
assert(qa('#view .runner-btn').length === 3, 'runner actions are icon+label');
assert(q('#fsToggle').querySelector('.rb-label') !== null, 'fullscreen button keeps visible label');
assert(window.document.querySelector('[aria-current="page"]') !== null, 'aria-current set on active nav');

/* 4 — Esc from the runner returns home */
window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert(window.location.hash === '#/', 'Esc returns home (got ' + window.location.hash + ')');

/* 5 — Larger-text toggle */
const ft = window.document.getElementById('fontToggle');
assert(ft !== null, 'larger-text toggle present in sidebar');
ft.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
assert(window.document.documentElement.classList.contains('large-text'), 'large-text applied');
assert(ft.getAttribute('aria-pressed') === 'true', 'aria-pressed true when on');
ft.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
assert(!window.document.documentElement.classList.contains('large-text'), 'large-text removed');

/* 6 — About & 404 routes */
hash('#/about');
assert(q('#view').innerHTML.includes('little things worth keeping'), 'about view renders');
hash('#/nope');
assert(q('#view').innerHTML.includes('wandered off'), '404 view renders');
hash('#/tool/ghost');
assert(q('#view').innerHTML.includes('wandered off'), 'unknown tool id → 404');

if (errors.length) {
  console.error('SMOKE FAILURES:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('✓ SMOKE PASSED — routes, filters, runner, toggle, a11y wiring');
