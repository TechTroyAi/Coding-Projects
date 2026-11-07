# ✅ Troy's Toolbox — Task List

What's finished, and what's waiting on you. Updated: 2026-11-06.

## ✅ Finished

### Foundation (PR #2, merged)
- [x] Wipe the old Dev Toolkit; rebuild as **Troy's Toolbox** (single-page app, zero dependencies)
- [x] **“Ink & Iris”** designed color palette — warm paper canvas, deep-ink side panel, single iris accent
- [x] Side panel dashboard: Overview / All Tools / About + live tool nav
- [x] Hash routing (`#/`, `#/tools`, `#/about`, `#/tool/:id`) with back/forward support
- [x] Tool Nº 001 — **SnapPDF (Photos → PDF)**, self-hosted at `tools/snappdf/` (was a catbox.moe hotlink)
- [x] Runner view: **Back to home** button, “New tab”, “Original”, **Fill screen** fullscreen, loading shimmer
- [x] Search (`/` shortcut) + category chips; `Esc` to go back
- [x] `vercel.json` (clean URLs, security headers, SAMEORIGIN framing), `404.html`, PWA manifest
- [x] Smoke-tested (jsdom): routes, search, filters, runner, shortcuts

### Senior-proof UI pass — "90-year-old navigable" (PR #3)
- [x] Base text 16px, generous line-height (1.65), WCAG 2.2-aligned sizes
- [x] Contrast upgrades: ink `#141417` (**16.98:1**), secondary `#3F4047` (**9.53:1**), captions `#595A62` (**6.33:1**, AA+)
- [x] Touch targets ≥ 48px everywhere (buttons 50px, nav 54px, chips 40px, icon buttons 46px)
- [x] **“Larger text” switch** in the side panel — one obvious toggle, scales the whole page, remembered in localStorage
- [x] **“How it works”** — three plain-language numbered steps under the hero
- [x] Plain language pass — “Runs on your device” instead of jargon; no unexplained abbreviations
- [x] Runner actions now icon **+ visible label** (“New tab”, “Original”, “Fill screen”) — never icon-only
- [x] Prose links always underlined; focus outline thickened to 3px
- [x] `aria-current="page"` on active nav; `Esc` bridge from inside the tool iframe
- [x] Contrast audit of the full palette (computed, not eyeballed — all pairs ≥ 4.5:1)
- [x] Research-based decisions (senior-friendly body text ≥16–18px, 48px targets, minimal animation, icons + labels)

### Housekeeping
- [x] `robots.txt` — crawlers allowed (PR #3)
- [x] This task list
- [x] PR #3 merged to `main`

## ⏳ Waiting on you (all free, ~10 minutes)

- [ ] **Rename the free URL** — vercel.com → project → Settings → General → Project Name (e.g. `troystoolbox`) — `$0`
- [ ] **Google Search Console** — search.google.com/search-console → URL prefix property → add the `google-site-verification` meta tag (paste it here, I'll wire it + `sitemap.xml` + canonical) — `$0`
- [ ] **Request indexing** — URL Inspection → Request Indexing
- [ ] *(Optional)* Buy a custom domain — the only step that costs money; `*.vercel.app` works fine without it

## 🔭 Backlog (tool candidates)

- [ ] Tool Nº 002 — Palette Lab (Design)
- [ ] Tool Nº 003 — QR Studio (Utilities)
- [ ] Tool Nº 004 — Markdown Pad (Text)
