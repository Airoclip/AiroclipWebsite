# Airoclip Website Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Claude.ai artifact export in this repo into a production-ready static company website (Studio direction, dark theme), push to Bitbucket. GitHub Pages hosting + DNS cutover is Phase 2 (separate plan, later).

**Architecture:** Static HTML/CSS/JS. Homepage uses React 18 via UMD CDN with in-browser Babel transformation of JSX. Other pages (careers, news, privacy, terms) are React-rendered HTML using a single shared dark stylesheet (`styles/adaptive.css`, recolored from light). No build step, no bundler. Edits ship via `git push`.

**Tech Stack:** Plain HTML5, CSS3 (custom properties), React 18 (UMD), Babel standalone (CDN). No npm dependencies, no build tooling.

**Spec:** `docs/superpowers/specs/2026-05-01-airoclip-website-launch-design.md`

---

## File Map

**Modified:**
- `styles/adaptive.css` — recolored from light to dark theme
- `index.html` — strip switcher/tweaks/dev tooling, lock to Studio
- `careers.html` — flip inline light colors to dark
- `privacy.html` — flip inline light colors to dark
- `terms.html` — flip inline light colors to dark

**Created:**
- `404.html` — Studio-themed not-found page

**Deleted:**
- `components/adaptive.jsx`
- `components/playful.jsx`
- `styles/playful.css`
- `tweaks-panel.jsx`
- `design-canvas.jsx`
- `Airoclip Site.html`
- `Airoclip Site (standalone).html`

**Untouched:**
- `components/shared.jsx`, `components/studio.jsx`
- `styles/shared.css`, `styles/studio.css`
- `news.html` (already Studio-themed)
- `games/tap-hexa.html`, `games/hexa-dreams.html`
- `assets/`, `uploads/`, `ads.txt`, `.gitignore`

---

## Verification Approach

This is a static site with no test framework. "Tests" are visual checks in a real browser, run after each task. Standard verification command for any task that needs a browser check:

```bash
cd /Users/abinash/Documents/Workspace/Tooling/AiroclipWebsite
python3 -m http.server 8000
# Then open http://localhost:8000/<page>.html in a browser
# Ctrl-C to stop the server when done
```

The same server handles every page in this plan. Don't restart it between tasks unless instructed.

---

## Task 1: Recolor `styles/adaptive.css` to dark theme

**Files:**
- Modify: `styles/adaptive.css` (entire `.adaptive {}` variables block at top, plus a few hard-coded color rules)

**Why this task is first:** `careers.html`, `privacy.html`, and `terms.html` all link this stylesheet for their nav/footer/eyebrow/btn classes. Restyling it first means each page already looks half-dark when we tackle their inline styles in later tasks.

- [ ] **Step 1: Read current state**

Read `styles/adaptive.css` lines 1-22 to see the current variables block.

- [ ] **Step 2: Replace the `.adaptive {}` variables block**

Replace lines 1-18 (the file header comment plus the `.adaptive { ... }` opening with variables) with:

```css
/* Secondary-page stylesheet — dark theme matching Studio direction.
   Used by careers.html, privacy.html, terms.html for nav/footer/eyebrow/btn chrome.
   Originally Direction B (Adaptive, light); recolored 2026-05-01 for production. */
.adaptive {
  --bg: #07070a;
  --bg-2: #0e0e14;
  --bg-3: #12121a;
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.16);
  --ink: #ffffff;
  --ink-2: rgba(255, 255, 255, 0.78);
  --ink-dim: rgba(255, 255, 255, 0.55);
  --ink-faint: rgba(255, 255, 255, 0.4);
  --brand: #1a40e8;
  --brand-soft: rgba(26, 64, 232, 0.18);
  font-family: 'Inter Tight', system-ui, sans-serif;
  background: var(--bg);
  color: var(--ink);
  min-height: 100%;
}
```

- [ ] **Step 3: Fix nav background (currently hardcoded light)**

In `styles/adaptive.css`, find the rule:

```css
.adaptive .nav {
  ...
  background: rgba(250,250,247,0.82);
  ...
}
```

Change `background: rgba(250,250,247,0.82);` to `background: rgba(7,7,10,0.78);`.

- [ ] **Step 4: Fix `.numbers` and `.careers-banner` sections**

These two sections were dark-on-light originally and used `var(--ink)` (which was `#0e0e14`) as their background. Now `var(--ink)` is `#ffffff`, so they'd render white. Override with a slightly different dark shade for visual differentiation from the body.

Find:
```css
.adaptive .numbers { background: var(--ink); color: #f4f4f7; padding: 100px 40px; }
```
Replace with:
```css
.adaptive .numbers { background: #0a0a12; color: #f4f4f7; padding: 100px 40px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
```

Find:
```css
.adaptive .numbers .num-cell { padding: 32px 28px; background: var(--ink); }
```
Replace with:
```css
.adaptive .numbers .num-cell { padding: 32px 28px; background: #0a0a12; }
```

Find:
```css
.adaptive .careers-banner { padding: 96px 40px; background: var(--ink); color: #fff; }
```
Replace with:
```css
.adaptive .careers-banner { padding: 96px 40px; background: #0a0a12; color: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
```

Find:
```css
.adaptive .careers-banner .btn-primary { background: #fff; color: var(--ink); margin-top: 28px; }
.adaptive .careers-banner .btn-primary:hover { background: var(--brand); color: #fff; }
```
Replace with:
```css
.adaptive .careers-banner .btn-primary { background: var(--brand); color: #fff; margin-top: 28px; }
.adaptive .careers-banner .btn-primary:hover { background: #fff; color: var(--ink); }
```

- [ ] **Step 5: Fix `.btn-primary` (currently `var(--ink)` background = white in dark mode)**

Find:
```css
.adaptive .btn-primary { background: var(--ink); color: #fff; }
.adaptive .btn-primary:hover { background: var(--brand); }
```
Replace with:
```css
.adaptive .btn-primary { background: var(--brand); color: #fff; }
.adaptive .btn-primary:hover { background: #fff; color: #0a0a12; }
```

- [ ] **Step 6: Fix `.store-btn` (same issue — uses `var(--ink)` for bg)**

Find:
```css
.adaptive .store-btn { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; background: var(--ink); color: #fff; font-size: 13px; font-weight: 500; transition: all 0.18s; }
```
Replace `background: var(--ink);` with `background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);`.

- [ ] **Step 7: Verify in browser**

```bash
cd /Users/abinash/Documents/Workspace/Tooling/AiroclipWebsite
python3 -m http.server 8000
```

Open `http://localhost:8000/careers.html` in a browser.

Expected:
- Nav at top is dark (translucent dark, blurred backdrop)
- Footer at bottom is dark
- The "What we believe" section's `<h2>` text is white/light, not black
- The "Compensation, ownership..." perks section was already dark; should still look right
- The page body background will still look light (Tailwind-ish cream `#fafaf7`) because that's set inline in `careers.html` — that's expected and gets fixed in Task 3
- Console should be free of errors (open DevTools, F12)

If the nav, footer, and section title text look dark/correct, this task is done.

- [ ] **Step 8: Commit**

```bash
git add styles/adaptive.css
git commit -m "Recolor secondary-page stylesheet from light to dark

styles/adaptive.css is shared by careers/privacy/terms for nav, footer,
eyebrow, and btn chrome. Flipped CSS variables and adjusted hard-coded
backgrounds in nav/numbers/careers-banner sections so the file matches
the Studio direction's dark theme.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Strip dev-only tooling from `index.html`

**Files:**
- Modify: `index.html` (entire file)

This task removes the Claude.ai authoring infrastructure (direction switcher, tweaks panel, multi-direction `App` component, EDITMODE markers, bundler thumbnail template) and locks the homepage to the Studio direction.

- [ ] **Step 1: Replace the entire `index.html` file**

Overwrite `index.html` with:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Airoclip — AI Powered Gaming Experiences</title>
<meta name="description" content="Airoclip is a Bengaluru-based gaming studio building AI-powered casual puzzle games. Backed by T-Accelerate Capital, BITKRAFT Ventures and Centre Court Capital." />
<link rel="icon" type="image/png" href="assets/airoclip-logo.png" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<link rel="stylesheet" href="styles/shared.css" />
<link rel="stylesheet" href="styles/studio.css" />

<style>
  body { background: #07070a; }
</style>
</head>
<body>
<div id="root"></div>

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

<script type="text/babel" src="components/shared.jsx"></script>
<script type="text/babel" src="components/studio.jsx"></script>

<script type="text/babel">
function App() {
  return <StudioSite tweaks={{ showFunding: false, brandColor: '#1a40e8', tagline: null }} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
</script>
</body>
</html>
```

Changes vs. before:
- Removed `<link rel="stylesheet" href="styles/adaptive.css">` and `playful.css` (homepage doesn't need them)
- Removed the `.dir-switch` `<style>` block (~30 lines)
- Removed the `<template id="__bundler_thumbnail">` block
- Removed `<script src="tweaks-panel.jsx">`, `components/adaptive.jsx`, `components/playful.jsx`
- Removed `EDITMODE-BEGIN`/`EDITMODE-END` markers
- Replaced multi-direction `App` with a 1-line component that renders `<StudioSite>` directly
- Removed `useTweaks`, `<TweaksPanel>`, switcher UI

- [ ] **Step 2: Verify in browser**

If your local server from Task 1 is still running, just refresh the page. Otherwise:

```bash
cd /Users/abinash/Documents/Workspace/Tooling/AiroclipWebsite
python3 -m http.server 8000
```

Open `http://localhost:8000/`.

Expected:
- Studio homepage renders (dark background, animated wavy-line canvas viz, Studio nav)
- **No** floating direction switcher at the bottom of the screen
- **No** tweaks panel button
- URL is just `http://localhost:8000/` — no `?dir=studio` query param appended
- Console (F12) shows no errors. (You'll see Babel "transforming JSX" notices — that's normal and expected.)

If the page renders without the switcher and tweaks panel and the canvas animation runs, this task is done.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Strip Claude.ai authoring tools from homepage, lock to Studio

Removes the direction switcher, tweaks panel, EDITMODE markers, and
bundler thumbnail template that were Claude.ai's live-editing
infrastructure. The App component now renders StudioSite directly with
hardcoded brand color and no toggleable tweaks. Drops references to
adaptive.jsx and playful.jsx components and their stylesheets.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Recolor `careers.html` inline styles for dark theme

**Files:**
- Modify: `careers.html` (lines 17-65, the inline `<style>` block, and possibly a few JSX inline `style={{}}` attributes)

The page already inherits dark nav and footer from `adaptive.css` (Task 1). Now flip the page-specific inline styles.

- [ ] **Step 1: Replace the inline `<style>` block (lines 17-65)**

Replace the block from `<style>` to `</style>` (inclusive) with:

```html
<style>
  body { background: #07070a; }
  .careers-hero { padding: 100px 40px 60px; }
  .careers-hero .inner { max-width: 1280px; margin: 0 auto; }
  .careers-hero h1 { font-size: clamp(48px, 6.5vw, 96px); line-height: 0.98; letter-spacing: -0.035em; font-family: 'Instrument Serif', serif; font-weight: 400; max-width: 1100px; color: #fff; }
  .careers-hero h1 i { color: #6f8bff; font-style: italic; }
  .careers-hero p { margin-top: 28px; max-width: 620px; font-size: 19px; line-height: 1.55; color: rgba(255,255,255,0.72); }

  .values { padding: 60px 40px 100px; }
  .values .inner { max-width: 1280px; margin: 0 auto; }
  .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 40px; }
  .value { padding: 28px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; }
  .value .num { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #6f8bff; letter-spacing: 0.14em; }
  .value h3 { font-family: 'Instrument Serif', serif; font-size: 26px; line-height: 1.1; letter-spacing: -0.02em; margin: 14px 0 10px; color: #fff; }
  .value p { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.55; }

  .roles-section { padding: 80px 40px 120px; background: #0a0a12; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); }
  .roles-section .inner { max-width: 1280px; margin: 0 auto; }
  .roles-head { display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 40px; }
  .roles-head h2 { font-family: 'Instrument Serif', serif; font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em; line-height: 1.04; font-weight: 400; color: #fff; }
  .filters { display: flex; gap: 8px; flex-wrap: wrap; font-family: 'Inter Tight', sans-serif; }
  .filter { padding: 8px 14px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.14); font-size: 13px; cursor: pointer; transition: all 0.18s; color: rgba(255,255,255,0.78); background: transparent; }
  .filter:hover { border-color: #6f8bff; color: #6f8bff; }
  .filter.active { background: #1a40e8; color: #fff; border-color: #1a40e8; }

  .role-card { display: grid; grid-template-columns: 2fr 1fr 1fr 32px; align-items: center; padding: 24px 28px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; margin-bottom: 10px; transition: all 0.2s; cursor: pointer; }
  .role-card:hover { border-color: #6f8bff; transform: translateX(4px); background: rgba(255,255,255,0.06); }
  .role-card .rt { font-family: 'Inter Tight', sans-serif; font-size: 18px; font-weight: 500; color: #fff; }
  .role-card .rd { font-size: 13px; color: rgba(255,255,255,0.55); margin-top: 4px; }
  .role-card .rl, .role-card .rT { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.55); }
  .role-card .ra { color: #6f8bff; font-size: 18px; }

  .perks { padding: 100px 40px; background: #07070a; color: #fff; }
  .perks .inner { max-width: 1280px; margin: 0 auto; }
  .perks h2 { font-family: 'Instrument Serif', serif; font-size: clamp(36px, 4vw, 56px); font-weight: 400; line-height: 1.04; letter-spacing: -0.03em; max-width: 800px; }
  .perks h2 em { color: #6f8bff; font-style: italic; }
  .perks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.08); margin-top: 56px; border-radius: 14px; overflow: hidden; }
  .perk { padding: 32px 28px; background: #0a0a12; }
  .perk h4 { font-family: 'Inter Tight', sans-serif; font-size: 17px; font-weight: 500; margin-bottom: 10px; }
  .perk p { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.55; }
  .perk .ico { width: 36px; height: 36px; border-radius: 8px; background: rgba(111,139,255,0.18); color: #6f8bff; display: grid; place-items: center; margin-bottom: 18px; }

  @media (max-width: 900px) {
    .careers-hero, .values, .roles-section, .perks { padding: 60px 24px; }
    .values-grid, .perks-grid { grid-template-columns: 1fr 1fr; }
    .role-card { grid-template-columns: 1fr; gap: 8px; }
    .role-card .ra { display: none; }
  }
</style>
```

Summary of changes:
- `body` background `#fafaf7` → `#07070a`
- All headings (`h1`, `h3`, `h2`) gain `color: #fff`
- All body text colors: `#2a2a35` → `rgba(255,255,255,0.72)`, `#6b6b78` → `rgba(255,255,255,0.55)`
- All card backgrounds: `#fff` → `rgba(255,255,255,0.04)`
- All card borders: `rgba(15,15,20,0.08)` → `rgba(255,255,255,0.08)`
- Brand accent links shifted from `#1a40e8` (deep blue, lower contrast on dark) → `#6f8bff` (lighter blue, better contrast on dark) where they appear as small/text accents. The `.filter.active` button keeps `#1a40e8` since it's a filled button.
- `.roles-section` background: `#fff` → `#0a0a12` (slightly lighter than body for visual separation)

- [ ] **Step 2: Update inline `style={{color: '#1a40e8'}}` in JSX**

In `careers.html`, find this JSX line:
```jsx
<a href="careers.html" style={{color: '#1a40e8'}}>Careers</a>
```
Replace with:
```jsx
<a href="careers.html" style={{color: '#6f8bff'}}>Careers</a>
```

(Reason: `#1a40e8` against the dark nav is hard to read; `#6f8bff` is the same hue lifted for dark mode.)

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:8000/careers.html`.

Expected:
- Entire page is dark
- Hero headline reads white with a lighter blue italic accent ("millions of people")
- Four "values" cards have subtle translucent-white backgrounds, white headings, dim white body text
- Open roles section has a slightly different shade of dark (looks like a "sub-section")
- Role cards on hover lift slightly and brighten
- Perks section is solid dark with a 3-col grid; each perk has a blue icon
- Footer at the very bottom is dark (from Task 1)
- No light/cream-colored areas anywhere
- Console clean (F12)

- [ ] **Step 4: Commit**

```bash
git add careers.html
git commit -m "Recolor careers.html inline styles to dark theme

Flips body bg, card bgs, text colors, and accent blue from light-mode
values to dark equivalents. Roles section uses slightly-lighter shade
(#0a0a12) for visual separation. Brand text accents shift from #1a40e8
(deep blue, low contrast on dark) to #6f8bff for readability.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Recolor `privacy.html` inline styles for dark theme

**Files:**
- Modify: `privacy.html` (lines 13-30, the inline `<style>` block)

- [ ] **Step 1: Replace the inline `<style>` block (lines 13-30)**

Replace the block from `<style>` to `</style>` (inclusive) with:

```html
<style>
  body { background: #07070a; }
  .legal-wrap { max-width: 880px; margin: 0 auto; padding: 80px 40px 100px; }
  .legal-wrap h1 { font-family: 'Instrument Serif', serif; font-size: clamp(48px, 6vw, 80px); line-height: 1; letter-spacing: -0.03em; font-weight: 400; color: #fff; }
  .legal-wrap .meta { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.14em; margin: 18px 0 48px; }
  .legal-wrap h2 { font-family: 'Inter Tight', sans-serif; font-size: 22px; font-weight: 600; letter-spacing: -0.01em; margin: 48px 0 16px; color: #fff; }
  .legal-wrap h3 { font-family: 'Inter Tight', sans-serif; font-size: 16px; font-weight: 600; margin: 28px 0 10px; color: #fff; }
  .legal-wrap p, .legal-wrap li { font-size: 15px; line-height: 1.65; color: rgba(255,255,255,0.72); margin-bottom: 12px; }
  .legal-wrap ul, .legal-wrap ol { padding-left: 22px; margin-bottom: 16px; }
  .legal-wrap a { color: #6f8bff; text-decoration: underline; text-underline-offset: 3px; }
  .toc { padding: 24px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; margin-bottom: 48px; }
  .toc h4 { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(255,255,255,0.5); margin-bottom: 12px; font-weight: 500; }
  .toc ol { padding-left: 18px; margin: 0; }
  .toc li { font-size: 14px; margin-bottom: 6px; }
  .toc a { color: rgba(255,255,255,0.85); text-decoration: none; }
  .toc a:hover { color: #6f8bff; }
  @media (max-width: 700px) { .legal-wrap { padding: 60px 24px 80px; } }
</style>
```

Summary of changes:
- `body` background `#fafaf7` → `#07070a`
- Headings gain `color: #fff`
- Body text `#2a2a35` → `rgba(255,255,255,0.72)`, mono text `#6b6b78` → `rgba(255,255,255,0.5)`
- TOC card: white bg → `rgba(255,255,255,0.04)`, border light → `rgba(255,255,255,0.08)`
- Links `#1a40e8` → `#6f8bff` (lifted accent for dark mode)

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8000/privacy.html`.

Expected:
- Dark background throughout
- "Privacy Policy" title white serif at top
- "Last updated · ..." metadata in dimmed mono
- TOC card has subtle translucent-white background with 11 numbered links
- Body text white-ish, link text light blue
- Footer dark
- All TOC anchor links work (click "Information we collect", page jumps to `#s2`)
- Console clean

- [ ] **Step 3: Commit**

```bash
git add privacy.html
git commit -m "Recolor privacy.html inline styles to dark theme

Same conversion as careers: body, headings, body text, TOC card, and
link colors flipped from light to dark equivalents. Brand link accent
lifted from #1a40e8 to #6f8bff for readability on dark.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Recolor `terms.html` inline styles for dark theme

**Files:**
- Modify: `terms.html` (lines 13-29, the inline `<style>` block)

`terms.html` uses the same `.legal-wrap`/`.toc` style structure as `privacy.html` but is its own file with a near-identical inline style block. Apply the same recoloring.

- [ ] **Step 1: Read current state**

Read `terms.html` lines 13-29 to confirm the `<style>` block contents match the structure of `privacy.html`. (If they differ materially, adapt the replacement block accordingly.)

- [ ] **Step 2: Replace the inline `<style>` block**

Replace the block from `<style>` to `</style>` (inclusive) with the same block used for `privacy.html` in Task 4 Step 1.

If `terms.html` has any extra rules in its `<style>` block beyond what `privacy.html` had (e.g., a `.terms-specific-class { ... }`), preserve them with their colors flipped using the same mapping:
- `#fafaf7` → `#07070a`
- `#fff` (card bg) → `rgba(255,255,255,0.04)`
- `#0e0e14` (heading color) → `#fff`
- `#2a2a35` (body text) → `rgba(255,255,255,0.72)`
- `#6b6b78` (muted text) → `rgba(255,255,255,0.5)`
- `rgba(15,15,20,0.08)` (border) → `rgba(255,255,255,0.08)`
- `#1a40e8` (link) → `#6f8bff`

- [ ] **Step 3: Verify in browser**

Open `http://localhost:8000/terms.html`.

Expected: same as privacy verification — dark page, white headings, dim body, light-blue links, TOC card with translucent bg, working anchor links, dark footer.

- [ ] **Step 4: Commit**

```bash
git add terms.html
git commit -m "Recolor terms.html inline styles to dark theme

Mirrors the privacy.html dark-mode recolor since both pages share the
same .legal-wrap/.toc structure.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Delete unused dev files

**Files:**
- Delete: `components/adaptive.jsx`, `components/playful.jsx`, `styles/playful.css`, `tweaks-panel.jsx`, `design-canvas.jsx`, `Airoclip Site.html`, `Airoclip Site (standalone).html`

- [ ] **Step 1: Verify nothing references the files we're about to delete**

Run a sanity-check grep before deleting:

```bash
cd /Users/abinash/Documents/Workspace/Tooling/AiroclipWebsite
grep -rln --include='*.html' --include='*.jsx' --include='*.css' \
  -e 'adaptive\.jsx' -e 'playful\.jsx' -e 'playful\.css' \
  -e 'tweaks-panel' -e 'design-canvas' \
  -e 'Airoclip Site' \
  . 2>/dev/null | grep -v -E '(adaptive|playful|tweaks-panel|design-canvas)\.(jsx|css)$' | grep -v '^\./Airoclip Site'
```

Expected: empty output. (Self-references in the files being deleted are fine — those are about to vanish. We're checking that nothing *else* references them.)

If any other file is listed, stop and report it before deleting — likely a reference that needs to be cleaned up first.

- [ ] **Step 2: Delete the files**

```bash
cd /Users/abinash/Documents/Workspace/Tooling/AiroclipWebsite
rm components/adaptive.jsx
rm components/playful.jsx
rm styles/playful.css
rm tweaks-panel.jsx
rm design-canvas.jsx
rm "Airoclip Site.html"
rm "Airoclip Site (standalone).html"
```

- [ ] **Step 3: Verify the homepage still works**

Refresh `http://localhost:8000/`.

Expected: Studio homepage still renders identically. No 404s in the Network tab (DevTools → Network → reload). Console clean.

If there's a 404 for any of the deleted files, something in `index.html` Task 2 was missed — check that all `<script>` tags reference only `components/shared.jsx` and `components/studio.jsx`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Delete Claude.ai authoring artifacts and unused-direction code

Removes:
- components/adaptive.jsx, components/playful.jsx (unused directions)
- styles/playful.css (Adaptive's stylesheet stays as the shared dark
  secondary-page stylesheet; Playful's stylesheet is fully unused)
- tweaks-panel.jsx (Claude.ai authoring tool)
- design-canvas.jsx (Claude.ai canvas frame)
- Airoclip Site.html, Airoclip Site (standalone).html (the multi-direction
  preview builds; replaced by the cleaned index.html)

Verified via grep that no remaining file references these.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Add Studio-themed `404.html`

**Files:**
- Create: `404.html`

GitHub Pages serves `404.html` for any unmatched route. A studio-themed 404 with a link home keeps the experience consistent if someone follows a broken link.

- [ ] **Step 1: Create `404.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Not Found — Airoclip</title>
<meta name="description" content="The page you're looking for doesn't exist." />
<link rel="icon" type="image/png" href="assets/airoclip-logo.png" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    background: #07070a;
    color: #fff;
    font-family: 'Inter Tight', system-ui, sans-serif;
    display: grid;
    place-items: center;
    padding: 40px;
  }
  .wrap { text-align: center; max-width: 520px; }
  .mark {
    width: 56px; height: 56px;
    border-radius: 12px;
    background: #1a40e8;
    display: inline-grid;
    place-items: center;
    color: #fff;
    font-weight: 700;
    font-size: 24px;
    font-family: 'Space Grotesk', sans-serif;
    margin-bottom: 40px;
  }
  .code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: rgba(255,255,255,0.5);
    margin-bottom: 18px;
  }
  h1 {
    font-family: 'Instrument Serif', serif;
    font-weight: 400;
    font-size: clamp(40px, 6vw, 64px);
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 20px;
  }
  h1 i { color: #6f8bff; }
  p {
    font-size: 16px;
    line-height: 1.55;
    color: rgba(255,255,255,0.65);
    margin-bottom: 32px;
  }
  a.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 22px;
    border-radius: 8px;
    background: #1a40e8;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    transition: background 0.18s;
  }
  a.btn:hover { background: #6f8bff; }
</style>
</head>
<body>
<div class="wrap">
  <div class="mark">A</div>
  <div class="code">Error 404 · Page not found</div>
  <h1>This page <i>doesn't exist.</i></h1>
  <p>The page you're looking for may have moved, been renamed, or never existed in the first place. Head back home and find what you're after.</p>
  <a href="/" class="btn">Back to airoclip.com →</a>
</div>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:8000/404.html` directly.

Expected:
- Centered layout, dark background
- Blue square logo at top with "A"
- "Error 404 · Page not found" mono eyebrow
- Large serif "This page doesn't exist." (last two words italic, lighter blue)
- Body copy below
- Blue "Back to airoclip.com →" button
- Button hover lifts to lighter blue
- Console clean

Note: `python3 -m http.server` does **not** automatically serve `404.html` for unmatched routes (that's a GitHub Pages convention). You must open the file directly to verify in this dev setup.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "Add Studio-themed 404 page

GitHub Pages serves 404.html for any unmatched route. Self-contained
(no React, no shared CSS) so it loads instantly even if other assets
fail. Visual: Studio dark theme with airoclip logo mark, error code,
serif heading, and a button back home.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: End-to-end verification

**Files:** none modified — pure verification task. Any issues found get their own follow-up commits.

- [ ] **Step 1: Start the local server**

```bash
cd /Users/abinash/Documents/Workspace/Tooling/AiroclipWebsite
python3 -m http.server 8000
```

- [ ] **Step 2: Open each page and run the checklist**

For each URL below, open it in a browser and check:

1. `http://localhost:8000/` (home / Studio)
2. `http://localhost:8000/careers.html`
3. `http://localhost:8000/news.html`
4. `http://localhost:8000/privacy.html`
5. `http://localhost:8000/terms.html`
6. `http://localhost:8000/games/tap-hexa.html`
7. `http://localhost:8000/games/hexa-dreams.html`
8. `http://localhost:8000/404.html`
9. `http://localhost:8000/ads.txt` (text file, plain rendering)

Per page, verify:
- ✅ Page renders (not blank, no big red error)
- ✅ Background is dark (except games and ads.txt — games can have their own identity, ads.txt is plain text)
- ✅ Text is readable (no black-on-black or white-on-white)
- ✅ Nav links go where expected (test clicking through)
- ✅ Footer renders dark with all five columns
- ✅ Console has no errors (DevTools → Console; warnings about Babel transforming JSX in development are fine and expected)
- ✅ No 404s in DevTools → Network → reload. The only acceptable failures are for assets we know don't exist (e.g., the placeholder social-icon links `href="#"`)

- [ ] **Step 3: Test responsive layout**

For pages 1-5 above, resize the browser window to ~375px wide (use DevTools device toolbar, or just shrink the window).

Verify:
- ✅ Layout reflows; nothing overflows horizontally
- ✅ Nav links collapse / hide gracefully
- ✅ Cards stack into single column or 2x grid
- ✅ Text remains readable

- [ ] **Step 4: Cross-page nav check**

From the home page (`/`), click through:
- Studio nav: Technology / Games / Investors / Careers anchor links — they should scroll to in-page sections (or jump to `careers.html` / `news.html` if they're full-page links)
- Footer: Privacy → privacy.html, Terms → terms.html, ads.txt → ads.txt
- From careers, click footer Privacy → privacy.html → dark page renders
- From privacy, click TOC link "Section 5. Advertising & analytics" → page jumps to that anchor
- From privacy, click footer "Terms of Service" → terms.html

- [ ] **Step 5: Address any issues found**

If any verification step fails, fix it and commit each fix separately with a descriptive message:

```bash
git add <file>
git commit -m "Fix: <specific issue> on <page>"
```

If everything passes, no commit is needed for this task.

- [ ] **Step 6: Stop the local server**

`Ctrl-C` in the terminal running `python3 -m http.server`.

---

## Task 9: Push to Bitbucket

**Files:** none modified.

This is the final step of Phase 1. Phase 2 (GitHub move + Pages + DNS cutover) will be a separate plan when the user is ready.

- [ ] **Step 1: Confirm git status is clean**

```bash
cd /Users/abinash/Documents/Workspace/Tooling/AiroclipWebsite
git status
```

Expected: `nothing to commit, working tree clean`. If there are uncommitted changes from Task 8 fixes, commit them first.

- [ ] **Step 2: Get Bitbucket repo URL from user**

Ask the user for the SSH or HTTPS clone URL of the Bitbucket repo, e.g.:
- SSH: `git@bitbucket.org:<workspace>/<repo>.git`
- HTTPS: `https://<user>@bitbucket.org/<workspace>/<repo>.git`

If no Bitbucket repo exists yet, the user creates it via the Bitbucket UI (workspace → Create repository → empty repo, no README/`.gitignore` since we already have files).

- [ ] **Step 3: Add the remote**

```bash
cd /Users/abinash/Documents/Workspace/Tooling/AiroclipWebsite
git remote add origin <REPO_URL_FROM_USER>
git remote -v
```

Expected output:
```
origin  <REPO_URL>  (fetch)
origin  <REPO_URL>  (push)
```

- [ ] **Step 4: Push `main` to Bitbucket**

```bash
git push -u origin main
```

Expected: push completes without error. If authentication fails, the user needs to confirm SSH key is added to Bitbucket, or use HTTPS with an app password.

- [ ] **Step 5: Verify on Bitbucket**

Open the repo URL in a browser. Verify:
- All files are present (`index.html`, `careers.html`, `news.html`, `privacy.html`, `terms.html`, `404.html`, `ads.txt`, `assets/`, `components/`, `styles/`, `games/`, `uploads/`, `docs/`)
- Latest commit shows the recent work
- File counts look right (no missing dirs)

This task has no commit step — pushing to remote is the action.

---

## Phase 2 (deferred — not in this plan)

When the user is ready to flip airoclip.com from Canva to GitHub Pages:

1. Create the GitHub repo (push `main` from local, or mirror from Bitbucket)
2. Add `CNAME` file containing `airoclip.com`
3. Enable GitHub Pages in repo settings (deploy from `main`, root)
4. Add custom domain `airoclip.com` in Pages settings, enable HTTPS
5. At domain registrar: replace existing A/CNAME records with GitHub Pages IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) for apex and `<owner>.github.io` for `www`
6. Wait ~10-30 min for SSL cert provisioning
7. Verify `https://airoclip.com` renders the new site

This becomes its own plan in `docs/superpowers/plans/` when the time comes.
