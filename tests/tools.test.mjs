import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path'; import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') + '/';
const errors = [];
const assert = (c, m) => { if (!c) errors.push('ASSERT: ' + m); };

function boot(path, preludes = []) {
  const html = fs.readFileSync(root + path, 'utf8');
  const dom = new JSDOM(html, { url: 'https://x.test/' + path, runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  window.scrollTo = () => {};
  window.URL.createObjectURL = () => 'blob:x';
  window.URL.revokeObjectURL = () => {};
  try {
    for (const pre of preludes) window.eval(fs.readFileSync(root + path.replace(/index\.html$/, '') + pre, 'utf8'));
    const m = html.match(/<script>([\s\S]*?)<\/script>/g) || [];
    // last script block = inline logic (vendor tags have src= and no body)
    for (const block of m) {
      if (!block.includes('src=')) window.eval(block.replace(/^<script>|<\/script>$/g, ''));
    }
  } catch (e) { errors.push(path + ' boot threw: ' + e.message); }
  return window;
}

/* ── Palette Lab ── */
{
  const w = boot('tools/palette-lab/index.html');
  const doc = w.document;
  const swatches = doc.querySelectorAll('.swatch');
  assert(swatches.length === 10, 'renders 10 shades, got ' + swatches.length);
  assert(doc.getElementById('cssOut').textContent.includes('--brand-500'), 'CSS output contains vars');
  const hexIn = doc.getElementById('hex');
  hexIn.value = '#ff0000'; hexIn.dispatchEvent(new w.Event('input', { bubbles: true }));
  assert(doc.querySelectorAll('.swatch').length === 10, 'regenerates on hex input');
  assert(doc.getElementById('cssOut').textContent.includes('--brand-500'), 'vars regenerate');
  hexIn.value = 'banana'; hexIn.dispatchEvent(new w.Event('input', { bubbles: true }));
  assert(doc.getElementById('ramp').innerHTML.includes('ramp-error'), 'invalid hex shows friendly error');
  const slug = doc.getElementById('slug');
  hexIn.value = '#6c55f5'; hexIn.dispatchEvent(new w.Event('input', { bubbles: true }));
  slug.value = 'Troy Accent!'; slug.dispatchEvent(new w.Event('input', { bubbles: true }));
  assert(doc.getElementById('cssOut').textContent.includes('--troy-accent-500'), 'slug sanitizes into var names');
}

/* ── QR Studio ── */
{
  const w = boot('tools/qr-studio/index.html', ['vendor/qrcode.js', 'vendor/qrcode_UTF8.js']);
  const doc = w.document;
  const ta = doc.getElementById('text');
  ta.value = 'https://codingprojects-gamma.vercel.app/';
  ta.dispatchEvent(new w.Event('input', { bubbles: true }));
  await new Promise(r => setTimeout(r, 300));
  const svg = doc.querySelector('#qrHolder svg');
  assert(svg !== null, 'QR svg preview renders after typing');
  assert(doc.getElementById('dlPng').disabled === false, 'PNG download enabled');
  assert(doc.getElementById('qrMeta').textContent.includes('modules'), 'module count meta shown');
  // Wi-Fi mode
  doc.getElementById('tabWifi').dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  const ssid = doc.getElementById('ssid');
  ssid.value = 'My Home WiFi'; ssid.dispatchEvent(new w.Event('input', { bubbles: true }));
  await new Promise(r => setTimeout(r, 300));
  assert(doc.querySelector('#qrHolder svg') !== null, 'Wi-Fi QR renders');
}

/* ── Markdown Pad ── */
{
  const w = boot('tools/markdown-pad/index.html', ['vendor/markdown-it.umd.min.js']);
  const doc = w.document;
  assert(doc.getElementById('preview').innerHTML.includes('<h1>'), 'default doc renders to preview');
  const src = doc.getElementById('src');
  src.value = '# Test\n\n- a\n- b\n\n<b>raw</b>';
  src.dispatchEvent(new w.Event('input', { bubbles: true }));
  await new Promise(r => setTimeout(r, 250));
  const out = doc.getElementById('preview').innerHTML;
  assert(out.includes('<h1>Test</h1>'), 'preview updates on input');
  assert(!out.includes('<b>raw</b>'), 'raw HTML is escaped');
  assert(doc.getElementById('stats').textContent.includes('words'), 'word stats shown');
}

if (errors.length) { console.error('TOOL FAILURES:\n' + errors.join('\n')); process.exit(1); }
console.log('ALL THREE TOOLS PASS — palette, qr, markdown');
