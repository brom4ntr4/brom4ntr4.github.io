# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Abdelghani Hammoud's trilingual (EN/FR/ES) personal portfolio as a static, no-build site deployed on GitHub Pages at abdelghani.me.

**Architecture:** Three files do the work — `index.html` (semantic markup with `data-i18n` keys), `styles.css` (CSS-custom-property design system with light/dark themes), `main.js` (theme toggle, mobile nav, language switch, lightbox, scroll-reveal). `translations.js` holds EN/FR/ES string maps. No framework, no bundler, no package.json.

**Tech Stack:** Hand-written HTML5 / CSS3 / vanilla ES6 JavaScript. Inter via Google Fonts. GitHub Pages hosting.

**Testing note:** Per spec §11 this is a no-build site with **no test runner** (adding one would violate the no-dependencies constraint). Verification is therefore done via a local server + browser + DevTools console checks, with explicit console assertions for JS logic. This adaptation is intentional and approved by the spec.

**Spec:** `docs/superpowers/specs/2026-06-17-portfolio-website-design.md`

---

## Conventions (read once, applies to all tasks)

**Local preview:** From repo root run `python3 -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000`. Leave it running across all tasks. After each change, hard-refresh (Ctrl/Cmd+Shift+R). The DevTools Console must stay error-free.

**IDs / classes / keys are fixed contracts** used across tasks:
- localStorage keys: `theme` (`light`|`dark`), `lang` (`en`|`fr`|`es`).
- i18n: any element with `data-i18n="key"` gets its `textContent` set from the active language map. `data-i18n-aria="key"` sets `aria-label`. `data-i18n-html="key"` sets `innerHTML` (used where copy contains inline markup — none currently, reserved). Untranslated proper nouns (tech tags, project names, "GitHub", "LinkedIn") carry no `data-i18n`.
- Section ids: `about`, `work`, `opensource`, `skills`, `experience`, `contact`.
- JS init functions (all called on `DOMContentLoaded`): `initI18n()`, `initTheme()`, `initNav()`, `initResumeMenu()`, `initLightbox()`, `initReveal()`.

**Commit style:** no Co-Authored-By trailer (owner preference). Conventional-commit prefixes.

---

## Task 1: Scaffold — files, design tokens, base layout shell

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `main.js`
- Create: `translations.js`
- Create: `assets/.gitkeep`
- Modify: `README.md`

- [ ] **Step 1: Create `index.html` shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abdelghani Hammoud — Full-Stack Software Engineer</title>
  <meta name="description" content="Abdelghani Hammoud — full-stack software engineer (Web, AI & Systems) in Madrid. Next.js, TypeScript, Node.js, PostgreSQL, C/C++.">
  <meta name="author" content="Abdelghani Hammoud">

  <!-- Open Graph / Twitter -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Abdelghani Hammoud — Full-Stack Software Engineer">
  <meta property="og:description" content="Full-stack software engineer (Web, AI & Systems) in Madrid.">
  <meta property="og:url" content="https://abdelghani.me">
  <meta property="og:image" content="https://abdelghani.me/assets/og-image.png">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">

  <!-- Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">

  <link rel="stylesheet" href="/styles.css">
  <script defer src="/translations.js"></script>
  <script defer src="/main.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-nav" id="top"><!-- nav: Task 2 --></header>

  <main id="main">
    <!-- hero: Task 4 -->
    <!-- about: Task 5 -->
    <!-- work: Task 6 -->
    <!-- opensource: Task 7 -->
    <!-- skills: Task 8 -->
    <!-- experience: Task 9 -->
    <!-- contact: Task 10 -->
  </main>

  <footer class="site-footer"><!-- footer: Task 10 --></footer>
</body>
</html>
```

- [ ] **Step 2: Create `styles.css` with reset + design tokens**

```css
/* ===== Reset ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-padding-top: 80px; -webkit-text-size-adjust: 100%; }
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; border: none; background: none; color: inherit; }
ul { list-style: none; }

/* ===== Tokens (light) ===== */
:root {
  --bg: #ffffff;
  --bg-alt: #fafaf9;
  --surface: #ffffff;
  --border: #e7e5e4;
  --text: #1c1917;
  --text-muted: #57534e;
  --text-subtle: #78716c;
  --accent: #059669;
  --accent-hover: #047857;
  --accent-soft: #ecfdf5;
  --accent-tint: #d1fae5;
  --shadow: 0 10px 40px rgba(0,0,0,.08);
  --radius: 12px;
  --radius-sm: 8px;
  --maxw: 1080px;
  --pad: clamp(1.25rem, 5vw, 2.5rem);
  --font: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --t: 200ms ease;
}
[data-theme="dark"] {
  --bg: #0c0a09;
  --bg-alt: #1c1917;
  --surface: #161311;
  --border: #292524;
  --text: #e7e5e4;
  --text-muted: #a8a29e;
  --text-subtle: #78716c;
  --accent: #10b981;
  --accent-hover: #34d399;
  --accent-soft: rgba(16,185,129,.12);
  --accent-tint: rgba(16,185,129,.20);
  --shadow: 0 10px 40px rgba(0,0,0,.5);
}

/* ===== Base ===== */
body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  transition: background var(--t), color var(--t);
}
h1, h2, h3 { line-height: 1.1; letter-spacing: -0.02em; font-weight: 800; }
.container { max-width: var(--maxw); margin: 0 auto; padding-left: var(--pad); padding-right: var(--pad); }
.section { padding: clamp(3.5rem, 8vw, 6rem) 0; }
.section-alt { background: var(--bg-alt); }
.section-head { display: flex; align-items: baseline; gap: .75rem; margin-bottom: 2rem; }
.section-num { color: var(--accent); font-weight: 700; font-size: .85rem; letter-spacing: .1em; }
.section-head h2 { font-size: clamp(1.5rem, 4vw, 2rem); }
.eyebrow { color: var(--accent); text-transform: uppercase; letter-spacing: .16em; font-size: .8rem; font-weight: 600; }
.skip-link {
  position: absolute; left: -9999px; top: 0; z-index: 100;
  background: var(--accent); color: #fff; padding: .6rem 1rem; border-radius: 0 0 var(--radius-sm) 0;
}
.skip-link:focus { left: 0; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 3px; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { transition: none !important; animation: none !important; }
}
```

- [ ] **Step 3: Create `translations.js` stub**

```js
// EN/FR/ES string maps. Filled in Task 11.
const translations = { en: {}, fr: {}, es: {} };
```

- [ ] **Step 4: Create `main.js` stub**

```js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // init functions wired up in later tasks
});
```

- [ ] **Step 5: Create `assets/.gitkeep` and update README**

Run:
```bash
mkdir -p assets && touch assets/.gitkeep
printf '# abdelghani.me\n\nPersonal portfolio of Abdelghani Hammoud — full-stack software engineer (Web, AI & Systems).\nStatic site (HTML/CSS/JS), trilingual (EN/FR/ES), deployed on GitHub Pages.\n\n## Local preview\n\n    python3 -m http.server 8000 --bind 127.0.0.1\n\nThen open http://127.0.0.1:8000\n' > README.md
```

- [ ] **Step 6: Verify**

Run `python3 -m http.server 8000 --bind 127.0.0.1`, open `http://127.0.0.1:8000`.
Expected: blank page, Inter font request succeeds, **zero console errors**. View source shows the shell.

- [ ] **Step 7: Commit**

```bash
git add index.html styles.css main.js translations.js assets/.gitkeep README.md
git commit -m "chore: scaffold portfolio shell and design tokens"
```

---

## Task 2: Sticky nav + mobile menu + smooth scroll

**Files:**
- Modify: `index.html` (fill `<header class="site-nav">`)
- Modify: `styles.css` (append nav styles)
- Modify: `main.js` (add `initNav`)

- [ ] **Step 1: Fill the nav in `index.html`** (replace the `<header class="site-nav" id="top">` line)

```html
<header class="site-nav" id="top">
  <div class="container nav-inner">
    <a href="#top" class="brand" aria-label="Abdelghani Hammoud — home">AH<span>.</span></a>

    <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>

    <nav class="nav-menu" id="nav-menu" aria-label="Primary">
      <a href="#about" data-i18n="nav.about">About</a>
      <a href="#work" data-i18n="nav.work">Work</a>
      <a href="#opensource" data-i18n="nav.opensource">Open Source</a>
      <a href="#skills" data-i18n="nav.skills">Skills</a>
      <a href="#experience" data-i18n="nav.experience">Experience</a>
      <a href="#contact" data-i18n="nav.contact">Contact</a>

      <div class="lang-switch" role="group" aria-label="Language">
        <button data-lang="en" aria-pressed="true">EN</button>
        <button data-lang="fr" aria-pressed="false">FR</button>
        <button data-lang="es" aria-pressed="false">ES</button>
      </div>

      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
        <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </button>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Append nav styles to `styles.css`**

```css
/* ===== Nav ===== */
.site-nav {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.brand { font-weight: 800; font-size: 1.15rem; letter-spacing: -.02em; }
.brand span { color: var(--accent); }
.nav-menu { display: flex; align-items: center; gap: 1.4rem; }
.nav-menu > a { font-size: .9rem; color: var(--text-muted); transition: color var(--t); }
.nav-menu > a:hover { color: var(--accent); }
.lang-switch { display: flex; gap: .15rem; border: 1px solid var(--border); border-radius: 999px; padding: .15rem; }
.lang-switch button { font-size: .72rem; font-weight: 600; padding: .25rem .55rem; border-radius: 999px; color: var(--text-subtle); transition: var(--t); }
.lang-switch button[aria-pressed="true"] { background: var(--accent); color: #fff; }
.theme-toggle { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 999px; border: 1px solid var(--border); color: var(--text-muted); transition: var(--t); }
.theme-toggle:hover { color: var(--accent); border-color: var(--accent); }
.theme-toggle .icon-moon { display: none; }
[data-theme="dark"] .theme-toggle .icon-sun { display: none; }
[data-theme="dark"] .theme-toggle .icon-moon { display: block; }
.nav-toggle { display: none; flex-direction: column; gap: 5px; width: 40px; height: 40px; align-items: center; justify-content: center; }
.nav-toggle span { width: 22px; height: 2px; background: var(--text); border-radius: 2px; transition: var(--t); }
.nav-toggle[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.nav-toggle[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 820px) {
  .nav-toggle { display: flex; }
  .nav-menu {
    position: fixed; inset: 64px 0 auto 0;
    flex-direction: column; align-items: flex-start; gap: 1rem;
    background: var(--bg); border-bottom: 1px solid var(--border);
    padding: 1.5rem var(--pad); transform: translateY(-120%);
    transition: transform 250ms ease; box-shadow: var(--shadow);
  }
  .nav-menu.open { transform: translateY(0); }
  .lang-switch { margin-top: .5rem; }
}
```

- [ ] **Step 3: Add `initNav` to `main.js`** (replace the DOMContentLoaded body)

```js
document.addEventListener('DOMContentLoaded', () => {
  initNav();
});

function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close mobile menu after clicking a section link
  menu.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
```

- [ ] **Step 4: Verify**

Hard-refresh. Desktop: nav shows brand, links, EN/FR/ES, theme button. Resize < 820px: hamburger appears, click opens/closes the menu, icon animates to an X. Console clean. (Links won't scroll yet — sections come later.)

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css main.js
git commit -m "feat: sticky nav with mobile menu and language/theme controls"
```

---

## Task 3: Dark-mode theme toggle

**Files:**
- Modify: `main.js` (add `initTheme`)

- [ ] **Step 1: Add `initTheme` and call it** (in `main.js`, add `initTheme();` inside DOMContentLoaded before `initNav();`, then add the function)

```js
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}
```

- [ ] **Step 2: Verify**

Hard-refresh. Click the theme button → whole page flips between light/dark, sun/moon icon swaps. Reload → choice persists. In DevTools console run:
```js
localStorage.getItem('theme')
```
Expected: matches the visible theme (`"dark"` or `"light"`). Console clean.

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: dark-mode toggle with system default and persistence"
```

---

## Task 4: Hero section + résumé dropdown

**Files:**
- Modify: `index.html` (add hero markup in `<main>`)
- Modify: `styles.css` (append hero + button styles)
- Modify: `main.js` (add `initResumeMenu`)
- Create: `assets/photo.jpg` (placeholder)

- [ ] **Step 1: Create a placeholder photo**

Run (generates a simple gray placeholder so layout is visible; owner replaces later):
```bash
printf '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%23d1fae5"/><text x="50%%" y="50%%" font-family="sans-serif" font-size="22" fill="%23059669" text-anchor="middle" dominant-baseline="middle">your photo</text></svg>' > assets/photo.svg
```
Use `assets/photo.svg` in markup below (owner can swap for a real `photo.jpg` and update the `src`).

- [ ] **Step 2: Add hero markup** (replace `<!-- hero: Task 4 -->`)

```html
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-text">
      <p class="eyebrow" data-i18n="hero.eyebrow">Software Engineer</p>
      <h1 class="hero-name">Abdelghani Hammoud</h1>
      <p class="hero-title" data-i18n="hero.title">Full-Stack Software Engineer — Web, AI &amp; Systems</p>
      <p class="hero-tech">Next.js • TypeScript • Node.js • PostgreSQL • C/C++ &amp; Linux</p>
      <p class="hero-loc">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span data-i18n="hero.location">Madrid, Spain</span>
      </p>

      <div class="hero-actions">
        <a href="#work" class="btn btn-primary" data-i18n="hero.viewWork">View work</a>

        <div class="resume-menu">
          <button class="btn btn-ghost" id="resume-btn" aria-haspopup="true" aria-expanded="false" data-i18n-aria="hero.resumeAria">
            <span data-i18n="hero.resume">Résumé</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <ul class="resume-list" id="resume-list" hidden>
            <li><a href="/resume_en.pdf" target="_blank" rel="noopener">English</a></li>
            <li><a href="/resume_fr.pdf" target="_blank" rel="noopener">Français</a></li>
            <li><a href="/resume_es.pdf" target="_blank" rel="noopener">Español</a></li>
          </ul>
        </div>

        <a href="https://github.com/m4ntr4r4m4" class="btn btn-ghost" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>

    <div class="hero-photo">
      <img src="/assets/photo.svg" alt="Abdelghani Hammoud" width="240" height="240">
    </div>
  </div>
</section>
```

- [ ] **Step 3: Append hero + button styles to `styles.css`**

```css
/* ===== Buttons ===== */
.btn { display: inline-flex; align-items: center; gap: .4rem; font-size: .9rem; font-weight: 600; padding: .7rem 1.3rem; border-radius: var(--radius-sm); transition: var(--t); }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: var(--accent-hover); }
.btn-ghost { border: 1px solid var(--border); color: var(--text); }
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

/* ===== Hero ===== */
.hero { padding: clamp(3rem, 9vw, 6.5rem) 0; }
.hero-inner { display: grid; grid-template-columns: 1fr auto; gap: clamp(2rem, 6vw, 4rem); align-items: center; }
.hero-name { font-size: clamp(2.4rem, 7vw, 4rem); margin: .6rem 0 .3rem; }
.hero-name::after { content: ""; display: block; width: 48px; height: 4px; background: var(--accent); border-radius: 2px; margin-top: 1rem; }
.hero-title { font-size: clamp(1.05rem, 2.6vw, 1.4rem); font-weight: 600; color: var(--text); margin-bottom: .5rem; }
.hero-tech { color: var(--text-subtle); font-size: .95rem; margin-bottom: .9rem; }
.hero-loc { display: inline-flex; align-items: center; gap: .35rem; color: var(--text-muted); font-size: .9rem; margin-bottom: 1.6rem; }
.hero-actions { display: flex; flex-wrap: wrap; gap: .7rem; }
.hero-photo img { width: clamp(160px, 28vw, 240px); height: clamp(160px, 28vw, 240px); border-radius: 50%; object-fit: cover; border: 4px solid var(--accent); box-shadow: var(--shadow); }

/* résumé dropdown */
.resume-menu { position: relative; }
.resume-list { position: absolute; top: calc(100% + .4rem); left: 0; min-width: 160px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); box-shadow: var(--shadow); padding: .35rem; z-index: 20; }
.resume-list a { display: block; padding: .55rem .8rem; border-radius: 6px; font-size: .9rem; }
.resume-list a:hover { background: var(--accent-soft); color: var(--accent); }

@media (max-width: 820px) {
  .hero-inner { grid-template-columns: 1fr; text-align: left; }
  .hero-photo { order: -1; }
  .hero-name::after { margin-left: 0; }
}
```

- [ ] **Step 4: Add `initResumeMenu` to `main.js`** (call it in DOMContentLoaded; add function)

```js
function initResumeMenu() {
  const btn = document.getElementById('resume-btn');
  const list = document.getElementById('resume-list');
  if (!btn || !list) return;

  const close = () => { list.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = list.hidden;
    list.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => { if (!list.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}
```

- [ ] **Step 5: Verify**

Hard-refresh. Hero shows name with emerald underline, title, tech line, Madrid location, photo placeholder, three buttons. Click **Résumé** → dropdown opens with English/Français/Español; clicking outside or Esc closes it; each link opens the matching PDF in a new tab. "View work" anchors to #work. Light/dark both look right. Mobile: photo on top, text below. Console clean.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css main.js assets/photo.svg
git commit -m "feat: hero section with résumé language dropdown"
```

---

## Task 5: About section

**Files:**
- Modify: `index.html` (add about markup)
- Modify: `styles.css` (append about styles)

- [ ] **Step 1: Add about markup** (replace `<!-- about: Task 5 -->`)

```html
<section class="section section-alt" id="about">
  <div class="container">
    <div class="section-head"><span class="section-num">01</span><h2 data-i18n="about.heading">About</h2></div>
    <p class="about-body" data-i18n="about.body">Full-stack software engineer who designs, builds, and operates end-to-end e-commerce platforms: Next.js/React/TypeScript front-end, Node.js/Express back-end with PostgreSQL/WooCommerce, AI integration (OpenAI, Gemini) for content and images, and containerized deployment (Docker, Vercel, Cloudflare). Strong C/C++ systems fundamentals from 42 Madrid; comfortable working in English on international teams.</p>
    <p class="about-langs"><strong data-i18n="about.langLabel">Languages</strong>: <span data-i18n="about.langValue">Spanish · English · French (fluent) · Arabic (native)</span></p>
  </div>
</section>
```

- [ ] **Step 2: Append about styles**

```css
/* ===== About ===== */
.about-body { max-width: 70ch; font-size: 1.08rem; color: var(--text-muted); }
.about-langs { margin-top: 1.2rem; color: var(--text-muted); font-size: .95rem; }
.about-langs strong { color: var(--text); }
```

- [ ] **Step 3: Verify**

Hard-refresh. "01 — About" header (emerald number), readable summary paragraph capped at a comfortable measure, languages line below. Nav "About" link scrolls here with offset. Console clean.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: about section"
```

---

## Task 6: Work showcase + lightbox

**Files:**
- Modify: `index.html` (add work markup + lightbox)
- Modify: `styles.css` (append work + lightbox styles)
- Modify: `main.js` (add `initLightbox`)
- Create: `assets/projects/` placeholders

- [ ] **Step 1: Create screenshot placeholders**

```bash
mkdir -p assets/projects
for p in moroccan-carpet weberberx; do
  for n in 1 2 3; do
    printf '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750"><rect width="1200" height="750" fill="%23ecfdf5"/><text x="50%%" y="50%%" font-family="sans-serif" font-size="40" fill="%23059669" text-anchor="middle" dominant-baseline="middle">'"$p $n"'</text></svg>' > "assets/projects/$p-$n.svg"
  done
done
```

- [ ] **Step 2: Add work section + lightbox markup** (replace `<!-- work: Task 6 -->`)

```html
<section class="section" id="work">
  <div class="container">
    <div class="section-head"><span class="section-num">02</span><h2 data-i18n="work.heading">Selected Work</h2></div>
    <p class="section-sub" data-i18n="work.subtitle">Commercial products I designed and shipped end-to-end.</p>

    <div class="work-grid">
      <article class="work-card" tabindex="0" role="button" aria-label="Moroccan Carpet"
        data-title="Moroccan Carpet" data-tagline-key="work.mc.tagline" data-desc-key="work.mc.desc"
        data-tags="Next.js 16,React 19,TypeScript,Tailwind v4,WooCommerce,Stripe,Vercel,Cloudflare"
        data-images="/assets/projects/moroccan-carpet-1.svg,/assets/projects/moroccan-carpet-2.svg,/assets/projects/moroccan-carpet-3.svg"
        data-live="https://moroccan-carpet.com">
        <div class="work-thumb"><img src="/assets/projects/moroccan-carpet-1.svg" alt="Moroccan Carpet screenshot" loading="lazy"></div>
        <div class="work-body">
          <h3>Moroccan Carpet</h3>
          <p data-i18n="work.mc.tagline">Headless multilingual e-commerce</p>
        </div>
      </article>

      <article class="work-card" tabindex="0" role="button" aria-label="WeberberX"
        data-title="WeberberX" data-tagline-key="work.wx.tagline" data-desc-key="work.wx.desc"
        data-tags="Next.js 15,TypeScript,Express,Node 24,PostgreSQL 15,Docker,Redis,Nginx,TrueNAS"
        data-images="/assets/projects/weberberx-1.svg,/assets/projects/weberberx-2.svg,/assets/projects/weberberx-3.svg"
        data-live="">
        <div class="work-thumb"><img src="/assets/projects/weberberx-1.svg" alt="WeberberX screenshot" loading="lazy"></div>
        <div class="work-body">
          <h3>WeberberX</h3>
          <p data-i18n="work.wx.tagline">Inventory &amp; multi-marketplace publishing</p>
        </div>
      </article>
    </div>
  </div>

  <div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-labelledby="lb-title">
    <div class="lightbox-backdrop" data-close></div>
    <div class="lightbox-panel">
      <button class="lightbox-close" data-close aria-label="Close" data-i18n-aria="work.close">&times;</button>
      <div class="lightbox-stage"><img id="lb-img" src="" alt=""></div>
      <div class="lightbox-thumbs" id="lb-thumbs"></div>
      <div class="lightbox-info">
        <h3 id="lb-title"></h3>
        <p id="lb-tagline" class="lightbox-tagline"></p>
        <div id="lb-tags" class="tags"></div>
        <p id="lb-desc" class="lightbox-desc"></p>
        <a id="lb-live" class="btn btn-primary" target="_blank" rel="noopener" data-i18n="work.visit">Visit live</a>
        <span id="lb-internal" class="lightbox-internal" data-i18n="work.internal" hidden>Internal tool</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Append work + lightbox styles**

```css
/* ===== Section sub ===== */
.section-sub { color: var(--text-muted); margin: -1.2rem 0 2rem; }

/* ===== Work ===== */
.work-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.work-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; cursor: pointer; transition: transform var(--t), box-shadow var(--t), border-color var(--t); }
.work-card:hover, .work-card:focus-visible { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--accent); }
.work-thumb { aspect-ratio: 16/10; overflow: hidden; }
.work-thumb img { width: 100%; height: 100%; object-fit: cover; }
.work-body { padding: 1.1rem 1.3rem 1.4rem; }
.work-body h3 { font-size: 1.2rem; margin-bottom: .25rem; }
.work-body p { color: var(--text-muted); font-size: .9rem; }
.tags { display: flex; flex-wrap: wrap; gap: .4rem; }
.tags span { font-size: .72rem; background: var(--accent-soft); color: var(--accent); border-radius: 5px; padding: .2rem .55rem; }

/* ===== Lightbox ===== */
.lightbox { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: var(--pad); }
.lightbox-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.7); backdrop-filter: blur(2px); }
.lightbox-panel { position: relative; z-index: 1; background: var(--surface); border-radius: var(--radius); max-width: 720px; width: 100%; max-height: 90vh; overflow: auto; box-shadow: var(--shadow); }
.lightbox-close { position: absolute; top: .6rem; right: .6rem; z-index: 2; width: 34px; height: 34px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); font-size: 1.3rem; line-height: 1; display: grid; place-items: center; }
.lightbox-stage { aspect-ratio: 16/10; background: var(--bg-alt); }
.lightbox-stage img { width: 100%; height: 100%; object-fit: cover; }
.lightbox-thumbs { display: flex; gap: .5rem; padding: .7rem; }
.lightbox-thumbs img { width: 64px; height: 42px; object-fit: cover; border-radius: 5px; cursor: pointer; opacity: .6; border: 2px solid transparent; }
.lightbox-thumbs img.active, .lightbox-thumbs img:hover { opacity: 1; border-color: var(--accent); }
.lightbox-info { padding: 0 1.4rem 1.6rem; }
.lightbox-info h3 { font-size: 1.4rem; }
.lightbox-tagline { color: var(--accent); font-weight: 600; font-size: .9rem; margin: .2rem 0 .8rem; }
.lightbox-info .tags { margin-bottom: 1rem; }
.lightbox-desc { color: var(--text-muted); margin-bottom: 1.2rem; }
.lightbox-internal { color: var(--text-subtle); font-size: .85rem; font-style: italic; }
body.lb-open { overflow: hidden; }
```

- [ ] **Step 4: Add `initLightbox` to `main.js`** (call it; add function). It reads `data-*` from the clicked card and the active language map (via global `window.__lang` set in Task 11; falls back to English text already in DOM).

```js
function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const img = document.getElementById('lb-img');
  const thumbs = document.getElementById('lb-thumbs');
  const titleEl = document.getElementById('lb-title');
  const taglineEl = document.getElementById('lb-tagline');
  const tagsEl = document.getElementById('lb-tags');
  const descEl = document.getElementById('lb-desc');
  const liveEl = document.getElementById('lb-live');
  const internalEl = document.getElementById('lb-internal');
  let lastFocus = null;

  const t = (key) => {
    const lang = window.__lang || 'en';
    return (window.translations?.[lang]?.[key]) ?? (window.translations?.en?.[key]) ?? '';
  };

  function open(card) {
    lastFocus = document.activeElement;
    const images = card.dataset.images.split(',');
    const tags = card.dataset.tags.split(',');

    titleEl.textContent = card.dataset.title;
    taglineEl.textContent = t(card.dataset.taglineKey);
    descEl.textContent = t(card.dataset.descKey);
    tagsEl.innerHTML = tags.map(x => `<span>${x}</span>`).join('');

    img.src = images[0]; img.alt = card.dataset.title;
    thumbs.innerHTML = images.map((src, i) =>
      `<img src="${src}" alt="" class="${i === 0 ? 'active' : ''}" data-src="${src}">`).join('');
    thumbs.querySelectorAll('img').forEach(th => th.addEventListener('click', () => {
      img.src = th.dataset.src;
      thumbs.querySelectorAll('img').forEach(x => x.classList.remove('active'));
      th.classList.add('active');
    }));

    if (card.dataset.live) {
      liveEl.href = card.dataset.live; liveEl.hidden = false; internalEl.hidden = true;
    } else {
      liveEl.hidden = true; internalEl.hidden = false;
    }

    lb.hidden = false; document.body.classList.add('lb-open');
    lb.querySelector('.lightbox-close').focus();
  }

  function close() {
    lb.hidden = true; document.body.classList.remove('lb-open');
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => open(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
    });
  });
  lb.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.hidden) close(); });

  // focus trap
  lb.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || lb.hidden) return;
    const f = lb.querySelectorAll('a[href], button:not([hidden]), img[data-src]');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}
```

Also expose translations globally for the lightbox — in `translations.js` change the declaration to also set `window.translations = translations;` (append that line at the end of the file in Task 11; for now the lightbox falls back to DOM English which is fine until Task 11).

- [ ] **Step 5: Verify**

Hard-refresh. Two project cards in a responsive grid; hover lifts them. Click **Moroccan Carpet** → lightbox opens: big image, 3 thumbnails (clicking swaps the main image, active one ringed), title, tagline, tag chips, description, **Visit live** button → moroccan-carpet.com. Click **WeberberX** → same but **no** Visit-live button, shows "Internal tool" instead. Esc / backdrop / × all close. Tab stays trapped inside the dialog. Console clean.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css main.js assets/projects
git commit -m "feat: work showcase with accessible lightbox"
```

---

## Task 7: Open Source section

**Files:**
- Modify: `index.html` (add opensource markup)
- Modify: `styles.css` (append repo styles)

- [ ] **Step 1: Add opensource markup** (replace `<!-- opensource: Task 7 -->`)

```html
<section class="section section-alt" id="opensource">
  <div class="container">
    <div class="section-head"><span class="section-num">03</span><h2 data-i18n="opensource.heading">Open Source</h2></div>
    <p class="section-sub" data-i18n="opensource.subtitle">Systems &amp; low-level work from 42.</p>

    <div class="repos">
      <a class="repo-card" href="https://github.com/m4ntr4r4m4/Minishell" target="_blank" rel="noopener">
        <div class="repo-head"><h3>Minishell</h3><span class="lang-dot">C</span></div>
        <p data-i18n="repo.minishell">A Unix shell — parsing, pipes, redirections, builtins, signals.</p>
      </a>
      <a class="repo-card" href="https://github.com/m4ntr4r4m4/MINIRT_PA" target="_blank" rel="noopener">
        <div class="repo-head"><h3>miniRT</h3><span class="lang-dot">C</span></div>
        <p data-i18n="repo.minirt">A ray tracer rendering 3D scenes with lighting and shadows.</p>
      </a>
      <a class="repo-card" href="https://github.com/m4ntr4r4m4/philosophers-42" target="_blank" rel="noopener">
        <div class="repo-head"><h3>Philosophers</h3><span class="lang-dot">C</span></div>
        <p data-i18n="repo.philosophers">Dining-philosophers concurrency with threads and mutexes.</p>
      </a>
      <a class="repo-card" href="https://github.com/m4ntr4r4m4/fractol" target="_blank" rel="noopener">
        <div class="repo-head"><h3>fract-ol</h3><span class="lang-dot">C</span></div>
        <p data-i18n="repo.fractol">An interactive fractal renderer (Mandelbrot, Julia).</p>
      </a>
      <a class="repo-card" href="https://github.com/m4ntr4r4m4/ft_linear_regression" target="_blank" rel="noopener">
        <div class="repo-head"><h3>ft_linear_regression</h3><span class="lang-dot">Python</span></div>
        <p data-i18n="repo.linreg">Linear regression implemented from scratch in Python.</p>
      </a>
    </div>

    <a class="more-link" href="https://github.com/m4ntr4r4m4" target="_blank" rel="noopener" data-i18n="opensource.more">More on GitHub →</a>
  </div>
</section>
```

- [ ] **Step 2: Append repo styles**

```css
/* ===== Open Source ===== */
.repos { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
.repo-card { display: block; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.1rem 1.2rem; transition: var(--t); }
.repo-card:hover { border-color: var(--accent); transform: translateY(-3px); box-shadow: var(--shadow); }
.repo-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: .4rem; }
.repo-head h3 { font-size: 1rem; }
.lang-dot { font-size: .72rem; color: var(--accent); background: var(--accent-soft); border-radius: 999px; padding: .15rem .6rem; }
.repo-card p { color: var(--text-muted); font-size: .88rem; }
.more-link { display: inline-block; margin-top: 1.5rem; color: var(--accent); font-weight: 600; }
.more-link:hover { text-decoration: underline; }
```

- [ ] **Step 3: Verify**

Hard-refresh. "03 — Open Source" with 5 repo cards (name + language chip + one-liner), hover lifts them, each opens the correct GitHub repo in a new tab; "More on GitHub →" opens the profile. Console clean.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: open source section"
```

---

## Task 8: Skills section

**Files:**
- Modify: `index.html` (add skills markup)
- Modify: `styles.css` (append skills styles)

- [ ] **Step 1: Add skills markup** (replace `<!-- skills: Task 8 -->`)

```html
<section class="section" id="skills">
  <div class="container">
    <div class="section-head"><span class="section-num">04</span><h2 data-i18n="skills.heading">Skills</h2></div>
    <div class="skill-groups">
      <div class="skill-group">
        <h3 data-i18n="skills.frontend">Frontend</h3>
        <ul class="pills"><li>Next.js</li><li>React</li><li>TypeScript</li><li>Tailwind CSS</li><li>next-intl</li><li>SSR</li><li>SEO</li></ul>
      </div>
      <div class="skill-group">
        <h3 data-i18n="skills.backend">Backend &amp; APIs</h3>
        <ul class="pills"><li>Node.js</li><li>Express</li><li>REST</li><li>OAuth 2.0</li><li>JWT</li><li>WooCommerce</li><li>Stripe</li></ul>
      </div>
      <div class="skill-group">
        <h3 data-i18n="skills.ai">AI &amp; Data</h3>
        <ul class="pills"><li>OpenAI</li><li>Gemini</li><li>Python</li><li>Pandas</li><li>NumPy</li><li>ETL</li><li>n8n</li></ul>
      </div>
      <div class="skill-group">
        <h3 data-i18n="skills.systems">Systems &amp; Low-Level (C/C++)</h3>
        <ul class="pills"><li>Unix/Linux</li><li>Memory management</li><li>Concurrency</li><li>Multithreading</li><li>Sockets</li><li>Algorithms</li></ul>
      </div>
      <div class="skill-group">
        <h3 data-i18n="skills.devops">DevOps &amp; Infrastructure</h3>
        <ul class="pills"><li>Docker</li><li>GitHub Actions</li><li>Vercel</li><li>Cloudflare</li><li>Nginx</li><li>TrueNAS</li><li>Git</li></ul>
      </div>
      <div class="skill-group">
        <h3 data-i18n="skills.databases">Databases</h3>
        <ul class="pills"><li>PostgreSQL</li><li>MySQL/MariaDB</li><li>Redis</li></ul>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append skills styles**

```css
/* ===== Skills ===== */
.skill-groups { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.6rem; }
.skill-group h3 { font-size: .8rem; text-transform: uppercase; letter-spacing: .12em; color: var(--accent); margin-bottom: .8rem; }
.pills { display: flex; flex-wrap: wrap; gap: .5rem; }
.pills li { font-size: .85rem; border: 1px solid var(--border); border-radius: 999px; padding: .4rem .9rem; color: var(--text-muted); transition: var(--t); }
.pills li:hover { border-color: var(--accent); color: var(--accent); }
```

- [ ] **Step 3: Verify**

Hard-refresh. "04 — Skills" with 6 groups, each an emerald uppercase label over a wrap of pills; pills highlight on hover. Responsive columns. Console clean.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: skills section"
```

---

## Task 9: Experience timeline

**Files:**
- Modify: `index.html` (add experience markup)
- Modify: `styles.css` (append timeline styles)

- [ ] **Step 1: Add experience markup** (replace `<!-- experience: Task 9 -->`)

```html
<section class="section section-alt" id="experience">
  <div class="container">
    <div class="section-head"><span class="section-num">05</span><h2 data-i18n="experience.heading">Experience</h2></div>
    <ol class="timeline">
      <li class="timeline-item">
        <div class="timeline-meta"><span class="timeline-date">2017 – 2025</span></div>
        <h3 data-i18n="exp.weberber.role">Founder &amp; Full-Stack Software Engineer</h3>
        <p class="timeline-org" data-i18n="exp.weberber.org">WeBerber — Morocco / Remote</p>
        <p class="timeline-desc" data-i18n="exp.weberber.desc">Sole engineer for the company's e-commerce stack and internal tooling across two production platforms (Moroccan Carpet, WeberberX).</p>
      </li>
      <li class="timeline-item">
        <div class="timeline-meta"><span class="timeline-date">2021 – 2025</span></div>
        <h3 data-i18n="exp.42.role">Software Engineering</h3>
        <p class="timeline-org" data-i18n="exp.42.org">42 Madrid · Fundación Telefónica</p>
        <p class="timeline-desc" data-i18n="exp.42.desc">Common Core plus advanced track, with specializations in Data, Algorithms &amp; AI.</p>
      </li>
      <li class="timeline-item">
        <div class="timeline-meta"><span class="timeline-date">2024</span></div>
        <h3 data-i18n="exp.escp.role">Entrepreneurship Specialization</h3>
        <p class="timeline-org" data-i18n="exp.escp.org">ESCP Business School</p>
        <p class="timeline-desc" data-i18n="exp.escp.desc">Venture creation: business modeling, fundraising, and go-to-market, applied to scaling WeBerber.</p>
      </li>
      <li class="timeline-item">
        <div class="timeline-meta"><span class="timeline-date">2015 – 2018</span></div>
        <h3 data-i18n="exp.esav.role">Sound Engineering — Engineering Degree</h3>
        <p class="timeline-org" data-i18n="exp.esav.org">ESAV Marrakech</p>
        <p class="timeline-desc" data-i18n="exp.esav.desc">Music recording, mixing, and production, plus post-production sound for film.</p>
      </li>
    </ol>
  </div>
</section>
```

- [ ] **Step 2: Append timeline styles**

```css
/* ===== Timeline ===== */
.timeline { position: relative; border-left: 2px solid var(--border); margin-left: .5rem; padding-left: 1.6rem; display: flex; flex-direction: column; gap: 2rem; }
.timeline-item { position: relative; }
.timeline-item::before { content: ""; position: absolute; left: calc(-1.6rem - 6px); top: .45rem; width: 11px; height: 11px; border-radius: 50%; background: var(--accent); border: 2px solid var(--bg-alt); }
.timeline-date { font-size: .8rem; font-weight: 600; color: var(--accent); }
.timeline-item h3 { font-size: 1.1rem; margin: .25rem 0 .15rem; }
.timeline-org { color: var(--text-muted); font-size: .92rem; font-weight: 500; }
.timeline-desc { color: var(--text-muted); font-size: .92rem; margin-top: .35rem; max-width: 65ch; }
```

- [ ] **Step 3: Verify**

Hard-refresh. "05 — Experience" with 4 entries on a vertical emerald-dotted line, most-recent first, each with date, role, org, blurb. Dots align on the line in both themes. Console clean.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: experience timeline"
```

---

## Task 10: Contact + footer

**Files:**
- Modify: `index.html` (add contact + footer)
- Modify: `styles.css` (append contact/footer styles)

- [ ] **Step 1: Add contact markup** (replace `<!-- contact: Task 10 -->`)

```html
<section class="section contact" id="contact">
  <div class="container contact-inner">
    <span class="section-num" data-i18n="nav.contact" style="display:block;margin-bottom:.5rem">Contact</span>
    <h2 class="contact-cta" data-i18n="contact.cta">Let's build something.</h2>
    <p class="contact-body" data-i18n="contact.body">Open to roles and collaborations. The fastest way to reach me is email.</p>
    <div class="contact-actions">
      <a class="btn btn-primary" href="mailto:abdelghani@weberber.com" data-i18n="contact.email">Email me</a>
      <a class="btn btn-ghost" href="https://www.linkedin.com/in/abdelghani-hammoud/" target="_blank" rel="noopener">LinkedIn</a>
      <a class="btn btn-ghost" href="https://github.com/m4ntr4r4m4" target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add footer markup** (replace `<!-- footer: Task 10 -->`)

```html
<footer class="site-footer">
  <div class="container">© 2026 Abdelghani Hammoud · abdelghani.me</div>
</footer>
```

- [ ] **Step 3: Append contact/footer styles**

```css
/* ===== Contact ===== */
.contact { text-align: center; }
.contact-inner { max-width: 640px; }
.contact .section-num { color: var(--accent); text-transform: uppercase; letter-spacing: .12em; font-size: .8rem; }
.contact-cta { font-size: clamp(1.8rem, 5vw, 2.6rem); margin-bottom: .8rem; }
.contact-body { color: var(--text-muted); margin-bottom: 1.6rem; }
.contact-actions { display: flex; flex-wrap: wrap; gap: .7rem; justify-content: center; }

/* ===== Footer ===== */
.site-footer { border-top: 1px solid var(--border); padding: 1.6rem 0; text-align: center; color: var(--text-subtle); font-size: .85rem; }
```

- [ ] **Step 4: Verify**

Hard-refresh. Centered contact CTA, body line, three buttons — "Email me" opens mail client to abdelghani@weberber.com, LinkedIn/GitHub open in new tabs. Footer line at the bottom. Console clean. All six nav links now scroll to their sections.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "feat: contact section and footer"
```

---

## Task 11: i18n engine + translations + switcher

**Files:**
- Modify: `translations.js` (full EN/FR/ES maps + `window` export)
- Modify: `main.js` (add `initI18n`, call it FIRST)

- [ ] **Step 1: Replace `translations.js` with the full maps**

```js
const translations = {
  en: {
    "nav.about": "About", "nav.work": "Work", "nav.opensource": "Open Source",
    "nav.skills": "Skills", "nav.experience": "Experience", "nav.contact": "Contact",
    "hero.eyebrow": "Software Engineer",
    "hero.title": "Full-Stack Software Engineer — Web, AI & Systems",
    "hero.location": "Madrid, Spain",
    "hero.viewWork": "View work", "hero.resume": "Résumé", "hero.resumeAria": "Download résumé",
    "about.heading": "About",
    "about.body": "Full-stack software engineer who designs, builds, and operates end-to-end e-commerce platforms: Next.js/React/TypeScript front-end, Node.js/Express back-end with PostgreSQL/WooCommerce, AI integration (OpenAI, Gemini) for content and images, and containerized deployment (Docker, Vercel, Cloudflare). Strong C/C++ systems fundamentals from 42 Madrid; comfortable working in English on international teams.",
    "about.langLabel": "Languages",
    "about.langValue": "Spanish · English · French (fluent) · Arabic (native)",
    "work.heading": "Selected Work",
    "work.subtitle": "Commercial products I designed and shipped end-to-end.",
    "work.visit": "Visit live", "work.internal": "Internal tool", "work.close": "Close",
    "work.mc.tagline": "Headless multilingual e-commerce",
    "work.mc.desc": "A headless multilingual storefront for handmade Moroccan rugs — 8 languages with full Arabic RTL, an OpenAI translation pipeline, and SEO (sitemaps, hreflang, JSON-LD). Stripe checkout with Apple/Google Pay and server-side price verification, plus multichannel abandoned-cart recovery and product-page CRO.",
    "work.wx.tagline": "Inventory & multi-marketplace publishing",
    "work.wx.desc": "An inventory-management and multi-marketplace publishing platform. Etsy & WooCommerce integration (OAuth 2.0, resilient inventory sync), an AI pipeline generating product copy and images (OpenAI/Gemini) as background jobs, JWT auth, sales tracking, QR codes, and PDF export — running on a self-hosted Linux/Docker backend.",
    "opensource.heading": "Open Source",
    "opensource.subtitle": "Systems & low-level work from 42.",
    "opensource.more": "More on GitHub →",
    "repo.minishell": "A Unix shell — parsing, pipes, redirections, builtins, signals.",
    "repo.minirt": "A ray tracer rendering 3D scenes with lighting and shadows.",
    "repo.philosophers": "Dining-philosophers concurrency with threads and mutexes.",
    "repo.fractol": "An interactive fractal renderer (Mandelbrot, Julia).",
    "repo.linreg": "Linear regression implemented from scratch in Python.",
    "skills.heading": "Skills", "skills.frontend": "Frontend", "skills.backend": "Backend & APIs",
    "skills.ai": "AI & Data", "skills.systems": "Systems & Low-Level (C/C++)",
    "skills.devops": "DevOps & Infrastructure", "skills.databases": "Databases",
    "experience.heading": "Experience",
    "exp.weberber.role": "Founder & Full-Stack Software Engineer",
    "exp.weberber.org": "WeBerber — Morocco / Remote",
    "exp.weberber.desc": "Sole engineer for the company's e-commerce stack and internal tooling across two production platforms (Moroccan Carpet, WeberberX).",
    "exp.42.role": "Software Engineering", "exp.42.org": "42 Madrid · Fundación Telefónica",
    "exp.42.desc": "Common Core plus advanced track, with specializations in Data, Algorithms & AI.",
    "exp.escp.role": "Entrepreneurship Specialization", "exp.escp.org": "ESCP Business School",
    "exp.escp.desc": "Venture creation: business modeling, fundraising, and go-to-market, applied to scaling WeBerber.",
    "exp.esav.role": "Sound Engineering — Engineering Degree", "exp.esav.org": "ESAV Marrakech",
    "exp.esav.desc": "Music recording, mixing, and production, plus post-production sound for film.",
    "contact.cta": "Let's build something.",
    "contact.body": "Open to roles and collaborations. The fastest way to reach me is email.",
    "contact.email": "Email me"
  },
  fr: {
    "nav.about": "À propos", "nav.work": "Projets", "nav.opensource": "Open Source",
    "nav.skills": "Compétences", "nav.experience": "Expérience", "nav.contact": "Contact",
    "hero.eyebrow": "Ingénieur logiciel",
    "hero.title": "Ingénieur logiciel Full-Stack — Web, IA & Systèmes",
    "hero.location": "Madrid, Espagne",
    "hero.viewWork": "Voir les projets", "hero.resume": "CV", "hero.resumeAria": "Télécharger le CV",
    "about.heading": "À propos",
    "about.body": "Ingénieur logiciel full-stack qui conçoit, développe et exploite des plateformes e-commerce de bout en bout : front-end Next.js/React/TypeScript, back-end Node.js/Express avec PostgreSQL/WooCommerce, intégration d'IA (OpenAI, Gemini) pour le contenu et les images, et déploiement conteneurisé (Docker, Vercel, Cloudflare). Solides fondamentaux systèmes en C/C++ de 42 Madrid ; à l'aise en anglais au sein d'équipes internationales.",
    "about.langLabel": "Langues",
    "about.langValue": "Espagnol · Anglais · Français (courant) · Arabe (langue maternelle)",
    "work.heading": "Projets sélectionnés",
    "work.subtitle": "Produits commerciaux que j'ai conçus et livrés de bout en bout.",
    "work.visit": "Voir le site", "work.internal": "Outil interne", "work.close": "Fermer",
    "work.mc.tagline": "E-commerce headless multilingue",
    "work.mc.desc": "Une boutique headless multilingue pour des tapis marocains faits main — 8 langues avec arabe RTL complet, un pipeline de traduction OpenAI et le SEO (sitemaps, hreflang, JSON-LD). Checkout Stripe avec Apple/Google Pay et revérification des prix côté serveur, plus récupération de paniers abandonnés multicanale et optimisation CRO de la page produit.",
    "work.wx.tagline": "Inventaire & publication multi-marketplace",
    "work.wx.desc": "Une plateforme de gestion d'inventaire et de publication multi-marketplace. Intégration Etsy & WooCommerce (OAuth 2.0, synchronisation d'inventaire résiliente), un pipeline d'IA générant le contenu produit et les images (OpenAI/Gemini) en tâches de fond, authentification JWT, suivi des ventes, codes QR et export PDF — sur un backend Linux/Docker auto-hébergé.",
    "opensource.heading": "Open Source",
    "opensource.subtitle": "Travaux systèmes & bas niveau de 42.",
    "opensource.more": "Plus sur GitHub →",
    "repo.minishell": "Un shell Unix — parsing, pipes, redirections, builtins, signaux.",
    "repo.minirt": "Un ray tracer rendant des scènes 3D avec éclairage et ombres.",
    "repo.philosophers": "Concurrence des philosophes avec threads et mutex.",
    "repo.fractol": "Un renderer de fractales interactif (Mandelbrot, Julia).",
    "repo.linreg": "Régression linéaire implémentée de zéro en Python.",
    "skills.heading": "Compétences", "skills.frontend": "Frontend", "skills.backend": "Backend & API",
    "skills.ai": "IA & Données", "skills.systems": "Systèmes & Bas niveau (C/C++)",
    "skills.devops": "DevOps & Infrastructure", "skills.databases": "Bases de données",
    "experience.heading": "Expérience",
    "exp.weberber.role": "Fondateur & Ingénieur logiciel Full-Stack",
    "exp.weberber.org": "WeBerber — Maroc / À distance",
    "exp.weberber.desc": "Seul ingénieur de toute la stack e-commerce et de l'outillage interne, sur deux plateformes en production (Moroccan Carpet, WeberberX).",
    "exp.42.role": "Ingénierie logicielle", "exp.42.org": "42 Madrid · Fundación Telefónica",
    "exp.42.desc": "Common Core et tronc avancé, avec spécialisations en Data, Algorithmes & IA.",
    "exp.escp.role": "Spécialisation en Entrepreneuriat", "exp.escp.org": "ESCP Business School",
    "exp.escp.desc": "Création d'entreprise : modélisation économique, levée de fonds et go-to-market, appliqué au développement de WeBerber.",
    "exp.esav.role": "Ingénierie du son — Diplôme d'Ingénieur", "exp.esav.org": "ESAV Marrakech",
    "exp.esav.desc": "Enregistrement, mixage et production musicale, ainsi que le son en post-production pour le cinéma.",
    "contact.cta": "Construisons quelque chose.",
    "contact.body": "Ouvert aux opportunités et collaborations. Le plus rapide pour me joindre, c'est l'e-mail.",
    "contact.email": "M'écrire"
  },
  es: {
    "nav.about": "Sobre mí", "nav.work": "Proyectos", "nav.opensource": "Open Source",
    "nav.skills": "Habilidades", "nav.experience": "Experiencia", "nav.contact": "Contacto",
    "hero.eyebrow": "Ingeniero de software",
    "hero.title": "Ingeniero de Software Full-Stack — Web, IA y Sistemas",
    "hero.location": "Madrid, España",
    "hero.viewWork": "Ver proyectos", "hero.resume": "CV", "hero.resumeAria": "Descargar CV",
    "about.heading": "Sobre mí",
    "about.body": "Ingeniero de software full-stack que diseña, desarrolla y opera plataformas de e-commerce de extremo a extremo: front-end Next.js/React/TypeScript, back-end Node.js/Express con PostgreSQL/WooCommerce, integración de IA (OpenAI, Gemini) para contenido e imágenes, y despliegue en contenedores (Docker, Vercel, Cloudflare). Sólidos fundamentos de sistemas en C/C++ de 42 Madrid; cómodo trabajando en inglés en equipos internacionales.",
    "about.langLabel": "Idiomas",
    "about.langValue": "Español · Inglés · Francés (fluido) · Árabe (lengua materna)",
    "work.heading": "Proyectos destacados",
    "work.subtitle": "Productos comerciales que diseñé y entregué de extremo a extremo.",
    "work.visit": "Visitar sitio", "work.internal": "Herramienta interna", "work.close": "Cerrar",
    "work.mc.tagline": "E-commerce headless multilingüe",
    "work.mc.desc": "Una tienda headless multilingüe de alfombras marroquíes hechas a mano — 8 idiomas con árabe RTL completo, un pipeline de traducción con OpenAI y SEO (sitemaps, hreflang, JSON-LD). Checkout de Stripe con Apple/Google Pay y reverificación de precios en el servidor, además de recuperación de carritos abandonados multicanal y optimización CRO de la página de producto.",
    "work.wx.tagline": "Inventario y publicación multi-marketplace",
    "work.wx.desc": "Una plataforma de gestión de inventario y publicación multi-marketplace. Integración con Etsy y WooCommerce (OAuth 2.0, sincronización de inventario resiliente), un pipeline de IA que genera contenido e imágenes de producto (OpenAI/Gemini) en segundo plano, autenticación JWT, seguimiento de ventas, códigos QR y exportación a PDF — sobre un backend Linux/Docker autoalojado.",
    "opensource.heading": "Open Source",
    "opensource.subtitle": "Trabajo de sistemas y bajo nivel de 42.",
    "opensource.more": "Más en GitHub →",
    "repo.minishell": "Un shell de Unix — parsing, pipes, redirecciones, builtins, señales.",
    "repo.minirt": "Un ray tracer que renderiza escenas 3D con iluminación y sombras.",
    "repo.philosophers": "Concurrencia de los filósofos con hilos y mutex.",
    "repo.fractol": "Un renderizador de fractales interactivo (Mandelbrot, Julia).",
    "repo.linreg": "Regresión lineal implementada desde cero en Python.",
    "skills.heading": "Habilidades", "skills.frontend": "Frontend", "skills.backend": "Backend y API",
    "skills.ai": "IA y Datos", "skills.systems": "Sistemas y Bajo Nivel (C/C++)",
    "skills.devops": "DevOps e Infraestructura", "skills.databases": "Bases de datos",
    "experience.heading": "Experiencia",
    "exp.weberber.role": "Fundador e Ingeniero de Software Full-Stack",
    "exp.weberber.org": "WeBerber — Marruecos / En remoto",
    "exp.weberber.desc": "Único ingeniero a cargo de todo el stack de e-commerce y las herramientas internas, en dos plataformas en producción (Moroccan Carpet, WeberberX).",
    "exp.42.role": "Ingeniería de Software", "exp.42.org": "42 Madrid · Fundación Telefónica",
    "exp.42.desc": "Common Core y parte avanzada, con especializaciones en Data, Algoritmos e IA.",
    "exp.escp.role": "Especialización en Emprendimiento", "exp.escp.org": "ESCP Business School",
    "exp.escp.desc": "Creación de empresas: modelo de negocio, financiación y estrategia go-to-market, aplicado al crecimiento de WeBerber.",
    "exp.esav.role": "Ingeniería de Sonido — Título de Ingeniero", "exp.esav.org": "ESAV Marrakech",
    "exp.esav.desc": "Grabación, mezcla y producción musical, además de sonido de postproducción para cine.",
    "contact.cta": "Construyamos algo.",
    "contact.body": "Abierto a oportunidades y colaboraciones. La forma más rápida de contactarme es el correo.",
    "contact.email": "Escríbeme"
  }
};
window.translations = translations;
```

- [ ] **Step 2: Add `initI18n` to `main.js`** (call it FIRST in DOMContentLoaded, before the others)

```js
function initI18n() {
  const supported = ['en', 'fr', 'es'];
  const saved = localStorage.getItem('lang');
  const browser = (navigator.language || 'en').slice(0, 2);
  const lang = supported.includes(saved) ? saved : (supported.includes(browser) ? browser : 'en');
  apply(lang);

  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => apply(btn.dataset.lang));
  });

  function apply(lang) {
    const map = window.translations[lang] || window.translations.en;
    window.__lang = lang;
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = map[el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const v = map[el.getAttribute('data-i18n-aria')];
      if (v != null) el.setAttribute('aria-label', v);
    });

    document.querySelectorAll('.lang-switch button').forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
  }
}
```

DOMContentLoaded should now read:
```js
document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initTheme();
  initNav();
  initResumeMenu();
  initLightbox();
});
```

- [ ] **Step 3: Verify**

Hard-refresh. Click **FR** → every section's copy switches to French, active button turns emerald, `<html lang>` becomes `fr`. Click **ES** → Spanish. Open a project lightbox while in FR/ES → tagline + description appear in that language. Reload → last language persists. In console:
```js
document.documentElement.lang  // "fr"/"es"/"en" matching the active button
localStorage.getItem('lang')
```
No untranslated leftovers in nav/hero/sections. Console clean.

- [ ] **Step 4: Commit**

```bash
git add translations.js main.js
git commit -m "feat: EN/FR/ES i18n engine with persistence and switcher"
```

---

## Task 12: Scroll-reveal animations

**Files:**
- Modify: `styles.css` (append reveal styles)
- Modify: `main.js` (add `initReveal`)

- [ ] **Step 1: Append reveal styles**

```css
/* ===== Scroll reveal ===== */
.reveal { opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease; }
.reveal.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; } }
```

- [ ] **Step 2: Add `initReveal` to `main.js`** (call it last in DOMContentLoaded; add function). It tags each section and observes it.

```js
function initReveal() {
  const els = document.querySelectorAll('main .section, .hero');
  els.forEach(el => el.classList.add('reveal'));
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}
```

- [ ] **Step 3: Verify**

Hard-refresh and scroll down: each section fades/slides in once as it enters the viewport. With OS "reduce motion" on, everything is visible immediately (no animation). Console clean.

- [ ] **Step 4: Commit**

```bash
git add styles.css main.js
git commit -m "feat: scroll-reveal animations with reduced-motion fallback"
```

---

## Task 13: Favicon, OG image, résumé PDFs, final QA

**Files:**
- Create: `assets/favicon.svg`
- Create: `assets/og-image.svg`
- Modify: `index.html` (point OG image to the svg)
- Stage: `resume_en.pdf`, `resume_fr.pdf`, `resume_es.pdf` (already present)

- [ ] **Step 1: Create favicon**

```bash
printf '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%23059669"/><text x="50" y="50" font-family="Inter,sans-serif" font-size="46" font-weight="800" fill="%23ffffff" text-anchor="middle" dominant-baseline="central">AH</text></svg>' > assets/favicon.svg
```

- [ ] **Step 2: Create an OG image placeholder**

```bash
printf '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="%230c0a09"/><text x="80" y="300" font-family="Inter,sans-serif" font-size="64" font-weight="800" fill="%23ffffff">Abdelghani Hammoud</text><text x="80" y="370" font-family="Inter,sans-serif" font-size="34" fill="%2310b981">Full-Stack Software Engineer — Web, AI &amp; Systems</text></svg>' > assets/og-image.svg
```

- [ ] **Step 3: Point OG image to the svg** in `index.html`

Change `content="https://abdelghani.me/assets/og-image.png"` → `content="https://abdelghani.me/assets/og-image.svg"`.

- [ ] **Step 4: Full QA pass** (no code — verify against spec §12)

Check in `http://127.0.0.1:8000`:
- [ ] Favicon shows in the tab.
- [ ] Light & dark both look correct across all sections.
- [ ] EN/FR/ES each fully translate; choice persists across reload.
- [ ] Résumé dropdown opens all three PDFs.
- [ ] Lightbox: open/close, thumbnails, Visit-live (MC) vs Internal (WX), keyboard (Esc, Tab trap).
- [ ] Mobile (DevTools device toolbar, ~375px): hamburger menu works, hero stacks, grids single-column, no horizontal scroll.
- [ ] All external links open in new tabs; nav anchors scroll with offset.
- [ ] Console clean on load and during interactions.

- [ ] **Step 5: Commit**

```bash
git add assets/favicon.svg assets/og-image.svg index.html resume_en.pdf resume_fr.pdf resume_es.pdf
git commit -m "feat: favicon, OG image, résumé PDFs and final QA"
```

---

## Task 14: Owner content checklist (no code)

After the build, the owner replaces placeholders. Document this in `README.md` under a "Customize" heading and commit.

- [ ] **Step 1: Append a Customize section to `README.md`**

```bash
cat >> README.md <<'EOF'

## Customize (owner)

Replace these placeholders with real content:

- `assets/photo.svg` → a real photo. Add `assets/photo.jpg` and update the `src` in `index.html` (hero `<img>`).
- `assets/projects/moroccan-carpet-{1,2,3}.svg` → real Moroccan Carpet screenshots.
- `assets/projects/weberberx-{1,2,3}.svg` → real WeberberX screenshots.
- `assets/og-image.svg` → a designed social preview (1200×630). Update the OG `<meta>` if you switch to `.png`.
- Résumé PDFs (`resume_en.pdf`, `resume_fr.pdf`, `resume_es.pdf`) are already in place; replace when updated.
- Project descriptions/taglines live in `translations.js` (keys `work.mc.*`, `work.wx.*`).
EOF
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: owner customization checklist"
```

---

## Self-Review (completed during planning)

**Spec coverage:** §2 tech → Task 1. §3 visual/themes → Tasks 1–3. §4 i18n → Task 11. §5 nav → Task 2; hero/résumé → Task 4; about → 5; work/lightbox → 6; open source → 7; skills → 8; experience → 9; contact/footer → 10. §6 links/data → Tasks 4,7,10,11. §7 content seed → Tasks 4–11 + translations. §8 owner-supplied → Task 14. §9 file layout → all. §10 polish (reveal/SEO/favicon) → Tasks 12–13. §11 out-of-scope respected (no framework/build/form/analytics; phone omitted in Task 10). §12 success criteria → Task 13 QA.

**Placeholder scan:** No "TBD/TODO/handle appropriately" instructions; every code step has complete code. Image/PDF placeholders are intentional, generated by real commands, and tracked in Task 14.

**Type/contract consistency:** localStorage keys (`theme`, `lang`), `data-i18n`/`data-i18n-aria` attributes, section ids, the six `init*` functions, `.lang-switch button[data-lang]`, and lightbox `data-*` keys (`data-tagline-key`/`data-desc-key` → `work.mc.*`/`work.wx.*`) are used identically across HTML, CSS, and JS tasks. `window.translations` is set in Task 11 and consumed by the Task 6 lightbox (graceful English-DOM fallback before then).
