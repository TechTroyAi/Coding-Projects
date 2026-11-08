# ⚡ Troy's Toolbox

**Tiny tools, serious craftsmanship.** A growing collection of single-purpose HTML tools that run **100% in your browser** — no accounts, no installs, no uploads, no tracking.

**Live tools:** [SnapPDF — Photos to PDF](tools/snappdf/index.html) · [Palette Lab](tools/palette-lab/index.html) · [QR Studio](tools/qr-studio/index.html) · [Markdown Pad](tools/markdown-pad/index.html)

---

## 🚀 Run it locally

It's a static site — pick any of these:

```bash
npm run preview        # python3 -m http.server 3000
# or: npx serve .
# or: just open index.html
```

## 🗂️ Structure

```
.
├── index.html              # App shell — sidebar, router, views (CSP hardened)
├── 404.html                # Branded not-found page
├── assets/
│   ├── css/main.css        # "Ink & Iris" design system (senior-proof layer)
│   ├── js/app.js           # Tool registry + hash router (zero runtime deps)
│   └── img/favicon.svg     # Logo / favicon
├── tools/
│   ├── snappdf/            # Tool 001 — Photos → PDF (self-contained)
│   ├── palette-lab/        # Tool 002 — one base hex → full shade ramp
│   ├── qr-studio/          # Tool 003 — QR codes (vendored qrcode-generator, MIT)
│   │   └── vendor/         # third-party file + NOTICE.txt attribution
│   └── markdown-pad/       # Tool 004 — live Markdown → HTML (vendored markdown-it, MIT)
│       └── vendor/         # third-party file + NOTICE.txt attribution
├── tests/
│   ├── smoke.mjs           # SPA routes, search, filters, runner, a11y wiring
│   └── tools.test.mjs      # headless drive-through of the three new tools
├── vercel.json             # Static hosting config + security headers
├── TASKS.md                # Finished vs waiting-on-you task list
└── manifest.webmanifest    # PWA-ish metadata
```

## 🎨 Design — “Ink & Iris”

Minimalist palette: warm paper background (`#F6F6F3`), deep-ink sidebar (`#131316`), a single iris accent (`#6C55F5`), hairline borders, soft layered shadows, Inter + JetBrains Mono. Dark sidebar / light canvas keeps it slick without shouting.

## ➕ Adding a tool

1. Create `tools/<slug>/index.html` — self-contained is preferred (no build step).
2. Register it in the `TOOLS` array in [`assets/js/app.js`](assets/js/app.js):

```js
{
  id: 'my-tool',
  name: 'My Tool',
  tagline: 'One-line pitch',
  desc: 'What it does and why it respects your privacy.',
  category: 'Utilities',        // PDF · Text · Design · Utilities
  status: 'live',               // or 'soon' to show a ghost card
  keywords: 'search terms',
  src: 'tools/my-tool/index.html',
  glyph: ICONS.spark,           // any inline SVG icon
}
```

The sidebar, grid, search, category filters and `/tool/my-tool` route are all wired automatically.

## 🧪 Test

```bash
npm install     # once — pulls jsdom (dev-only; runtime stays dependency-free)
npm test        # smoke.mjs (SPA + a11y) and tools.test.mjs (the three tools)
```

## ⌨️ Shortcuts

| Key | Action |
|---|---|
| `/` | Focus the tool search (opens the side panel on mobile) |
| `Esc` | Clear search/filters · leave the tool runner |

## ☁️ Deploy to Vercel

This repo is deploy-ready static output (no build command, no framework). Two options:

**A. Git push (recommended):** import the repo at [vercel.com/new](https://vercel.com/new) — framework preset **Other**, no build command, output directory **root**. Every push to `main` auto-deploys.

**B. CLI:**

```bash
npx vercel
npx vercel --prod
```

`vercel.json` ships sane defaults: clean URLs, `SAMEORIGIN` framing (the toolbox iframes its own tools), `nosniff`, `no-referrer`-ish policy and cache headers for assets.

## 🔒 Privacy

Nothing leaves your device. No analytics, no cookies, no server-side processing — verify it yourself by reading the source.

## 📄 License

[MIT](LICENSE) © TechTroyAi
