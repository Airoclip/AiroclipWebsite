# Airoclip Website Launch — Design Spec

**Date:** 2026-05-01
**Status:** Draft, pending user approval

## Goal

Take the Claude.ai artifact export currently in this repo and ship it as the production `airoclip.com` site. The current site is a Canva-hosted placeholder; this replaces it.

## Scope

- Production-ready static site, **eventually** hosted on **GitHub Pages**, custom domain `airoclip.com`
- Single design direction: **A · Studio** (dark theme, blue accent `#1a40e8`)
- All pages restyled to Studio for visual consistency
- Future page additions are a "drop a file, push, done" workflow — no build pipeline, no CMS
- No backend, no auth, no forms

### Phasing

The work is split into two phases:

- **Phase 1 — Build (now):** clean up the artifact, restyle pages, finalize the static site, push to **Bitbucket** as the interim source of truth. The Canva site stays live throughout.
- **Phase 2 — Host (later):** mirror/move the repo to GitHub, configure Pages, add `CNAME`, flip DNS. Triggered by the user when ready.

This spec covers both phases but the implementation plan should make Phase 1 fully shippable on its own — the site should be a complete, verified-working bundle of files at the end of Phase 1, even if not yet public.

## Non-goals

- Multi-direction live switcher (was a Claude.ai authoring tool, not a product feature)
- Live tweaks panel (same)
- Pre-compiled JS bundle / Vite / esbuild build step (deferred — Babel CDN is fine at this traffic level; revisit if first paint becomes a real issue)
- Adding new copy, news entries, or open roles (separate work)
- Analytics, sitemap, robots.txt (can add later in 5 min when needed)

## Information architecture

| URL | File | Status |
|---|---|---|
| `/` | `index.html` | **Modify** — strip switcher/tweaks/dev tooling, lock to Studio |
| `/careers` | `careers.html` | **Restyle** — currently Adaptive (light), needs Studio (dark) |
| `/news` | `news.html` | **Keep** — already Studio-themed |
| `/privacy` | `privacy.html` | **Restyle** — currently Adaptive (light), needs Studio (dark) |
| `/terms` | `terms.html` | **Restyle** — currently Adaptive (light), needs Studio (dark) |
| `/games/tap-hexa` | `games/tap-hexa.html` | **Keep** as-is (game pages can have their own visual identity) |
| `/games/hexa-dreams` | `games/hexa-dreams.html` | **Keep** as-is |
| `/ads.txt` | `ads.txt` | **Keep** — placeholder content, edit when an ad partner is onboarded |

GitHub Pages serves `careers.html` at `/careers` automatically (Jekyll's default behavior strips `.html` from clean URLs). Verify this works in practice before flipping DNS; if it doesn't, fall back to folder structure (`careers/index.html`).

## Architecture

The site is plain static HTML/CSS/JS. The homepage uses React 18 via UMD CDN with **in-browser Babel transformation** of JSX. Other pages are pure HTML/CSS.

**Why keep Babel CDN instead of pre-compiling:**
- Zero build step — edits are just `git push`
- ~200-400ms slower first paint vs. precompiled, acceptable at company-site traffic
- Removes the risk of "I forgot to rebuild before pushing"
- We can always pre-compile later if/when it matters; the JSX source doesn't change

**Files in the homepage React app (kept):**
- `index.html` — entry, loads React/Babel CDN, includes Studio's stylesheets and components, mounts `<StudioSite>` directly (no switcher, no tweaks, hardcoded brand color)
- `components/shared.jsx` — Logo and other primitives shared across pages
- `components/studio.jsx` — Studio direction's full-page React component (hero, viz canvas, sections, footer)
- `styles/shared.css` — base/reset styles
- `styles/studio.css` — Studio-specific styles

## Files to delete

These are Claude.ai authoring artifacts or other-direction code, not used in production:

- `components/adaptive.jsx`
- `components/playful.jsx`
- `styles/adaptive.css`
- `styles/playful.css`
- `tweaks-panel.jsx`
- `design-canvas.jsx`
- `Airoclip Site (standalone).html` (2.2MB self-contained version with all 3 directions, was for sharing/preview)
- `Airoclip Site.html` (the full multi-direction switcher version, replaced by the cleaned `index.html`)
- `uploads/` — appears to be working-files/screenshots from the Claude.ai authoring session, not needed in the live site. Verify before deleting; move anything still needed into `assets/`.

## Files to modify

### `index.html`
- Remove the dev-only `<style>` block for `.dir-switch`
- Remove `<template id="__bundler_thumbnail">` (Claude.ai bundler artifact)
- Remove `<script src="tweaks-panel.jsx">` and the `components/adaptive.jsx`, `components/playful.jsx` script tags
- Replace the inline `App` component:
  - Drop `useTweaks`, `TweakSection`, `TweakRadio`, `TweakToggle`, `TweakText`, `TweakColor`, `<TweaksPanel>`
  - Drop the direction switcher UI
  - Drop the `?dir=` URL sync
  - Render `<StudioSite tweaks={{ showFunding: false, brandColor: '#1a40e8', tagline: null }} />` directly
- Remove the `EDITMODE-BEGIN`/`EDITMODE-END` markers (Claude.ai-only)
- Keep the body background as `#07070a` (Studio dark)

### `careers.html`, `privacy.html`, `terms.html`
- Swap `<link rel="stylesheet" href="styles/adaptive.css">` → `styles/studio.css`
- Update inline `<style>` block: replace light-mode colors with Studio dark equivalents
  - Background: `#fafaf7` → `#07070a`
  - Card backgrounds: `#fff` → `rgba(255,255,255,0.04)` with `border: 1px solid rgba(255,255,255,0.08)`
  - Body text: `#2a2a35` → `rgba(255,255,255,0.72)`
  - Muted text: `#6b6b78` → `rgba(255,255,255,0.5)`
  - Headings: `#0e0e14` → `#fff`
  - Accent stays `#1a40e8` (Studio's blue, also happens to be Adaptive's blue — convenient)
- Match `news.html`'s nav/footer treatment so all pages share the same chrome

### `tap-hexa.html`, `hexa-dreams.html`
- No changes. Game landing pages can have their own identity.

## Files to add

### `CNAME`
Single line: `airoclip.com`. GitHub Pages reads this to know the custom domain.

### `404.html`
Studio-themed 404 page. GitHub Pages serves this for unmatched routes. Minimal — logo, "Page not found", link home.

## Hosting setup

### GitHub Pages config
1. Push repo to `github.com/<owner>/<repo>` (must be public for free Pages, or paid for private)
2. Settings → Pages → Source: `Deploy from branch` → branch `main`, folder `/` (root)
3. Custom domain: `airoclip.com`, enable HTTPS (auto-provisions Let's Encrypt cert in ~10 min)

### DNS at the registrar (Canva is the current host — DNS is likely managed at the domain registrar, not Canva)
For apex domain `airoclip.com`, add A records to GitHub Pages IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
For `www.airoclip.com`, add a CNAME to `<owner>.github.io`.

The cutover is the **last step** so the Canva site stays up while we build and verify on a `*.github.io` URL first.

## How future edits work

After this ships, the editing workflow for the site owner is:
- **Edit text on careers page:** open `careers.html`, change copy, `git commit && git push`. Live in ~30 seconds.
- **Add a new page (`/tool`):** create `tool.html` based on one of the existing pages, push. Live immediately at `airoclip.com/tool`.
- **Update `ads.txt`:** edit the file, push.
- **Edit homepage hero copy:** open `components/studio.jsx`, change the JSX text, push. Babel re-transforms in the browser on next visit.

No build step, no deploy command, no AWS console.

## Decisions confirmed

- **Restyle careers/privacy/terms to Studio dark:** yes (approved with spec)
- **Source repo:** Bitbucket for Phase 1, GitHub for Phase 2

## Open questions / decisions for user

1. **`uploads/` directory** — anything in there that needs to stay live, or can it all be deleted? It looks like authoring scratch files (screenshots, xlsx coverage reports).
2. **Bitbucket repo** — does one already exist, or do we need to create it? (Workspace/repo name?)

## Risks / things to verify

- **Clean URL routing on GitHub Pages.** Confirm `airoclip.com/careers` (no `.html`) actually resolves before DNS cutover. If it doesn't, we use folder structure instead — small change.
- **Babel CDN reliability.** unpkg.com goes down occasionally. If that's a concern, host React/Babel locally in `vendor/` (one-time copy, no build step needed). Defer unless it bites.
- **DNS propagation** can take up to 24h though usually <1h. Plan the cutover at a time where a brief downtime window is acceptable.
- **SSL cert provisioning on GitHub Pages** can take 10-30 min after adding the custom domain. Site will show a cert error during that window.

## Out of scope (explicit)

- Pre-compiled JS bundle (Vite/esbuild) — deferred until performance demands it
- CMS or admin UI — direct file editing is the design intent
- Backend, auth, forms — none needed for v1
- Multi-language / i18n
- Dark/light mode toggle — site is dark-only by design
- Analytics — add later in 5 min via a `<script>` tag (Plausible recommended for privacy)
