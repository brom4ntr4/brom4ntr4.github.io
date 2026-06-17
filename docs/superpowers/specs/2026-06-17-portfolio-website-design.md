# Portfolio Website — Design Spec

**Date:** 2026-06-17
**Owner:** Abdelghani Hammoud
**Repo:** `brom4ntr4.github.io` → served at **abdelghani.me** (GitHub Pages, CNAME already set)

## 1. Purpose

A personal-brand hub for **Abdelghani Hammoud** — a Madrid-based full-stack software engineer
(Web, AI & Systems) and founder of WeBerber. It introduces him, showcases his commercial
products visually, links to open-source/systems code, and provides ways to connect (GitHub,
LinkedIn, email, résumé). Audience: recruiters, clients, peers, collaborators. Trilingual
(EN / FR / ES) — matching his fluent languages.

## 2. Tech & Hosting

- **Static single-page site.** Hand-written `index.html`, `styles.css`, `main.js`. No build
  step, no framework, no bundler.
- Deploys as-is on GitHub Pages from this repo. Custom domain `abdelghani.me` (CNAME present).
- One external font request (Inter via Google Fonts). Everything else self-contained.
- No backend. Contact is a `mailto:` link (no form service).
- **Multilingual via client-side JS** (no build) — see section 4.

## 3. Visual Design

- **Direction:** Minimal & clean. Generous whitespace, restrained typography, numbered
  section labels (01–06), a subtle accent-line motif.
- **Base theme:** Light. **Accent:** Emerald `#059669` (tints `#ecfdf5`, `#d1fae5`,
  `#a7f3d0`; hover `#047857`).
- **Typography:** Inter (Google Fonts) + system-font fallback stack.
- **Dark mode:** Toggle in nav. Defaults to `prefers-color-scheme`, persists in
  `localStorage`. Dark palette ~`#0c0a09` bg / `#e7e5e4` text, emerald accent retained.
- **Responsive:** Mobile-first; grids collapse to single column; nav → hamburger on mobile.
- **Accessibility:** Semantic HTML5 landmarks, keyboard-navigable (incl. lightbox), visible
  focus states, sufficient contrast both themes, `alt` text on all images.

## 4. Internationalization (i18n)

- **Languages:** English (en), French (fr), Spanish (es).
- **Mechanism:** Client-side JS translation swap. Translatable elements carry
  `data-i18n="<key>"`; `translations.js` holds string maps per language. On change, `main.js`
  walks the DOM, replaces text/attributes, sets `<html lang>`, saves choice to `localStorage`.
- **Default:** First visit reads `navigator.language` → en/fr/es match, else English.
  Returning visits use the saved choice.
- **Switcher:** Compact `EN · FR · ES` control in the nav (active language emerald). Mobile too.
- **Coverage:** All visible copy (nav, hero, About, Work titles/descriptions, Open Source
  descriptions, Skills group labels, Experience entries, Contact, footer, `aria-label`s).
  Proper nouns (project names, tech tags, "GitHub", "LinkedIn") stay as-is.
- **Source of truth for FR/ES wording:** the user's résumé PDFs in the repo
  (`resume_fr.pdf`, `resume_es.pdf`) — verbatim for title, summary, experience, languages.
- **No build step** — translations live in a plain JS file the user edits by hand.

## 5. Page Structure (single scroll)

1. **Sticky nav** — `AH.` logo (emerald dot), anchor links (About / Work / Open Source /
   Skills / Experience / Contact), **language switcher (EN · FR · ES)**, dark-mode toggle.
   Smooth-scroll; hamburger on mobile.
2. **Hero** — accent eyebrow, large name "Abdelghani Hammoud", title tagline, sub-tagline of
   core tech, action buttons (View work · **Résumé ↓** · GitHub), circular **profile photo**,
   location "Madrid, Spain".
   - **Title:** "Full-Stack Software Engineer — Web, AI & Systems"
   - **Tech sub-line:** Next.js • TypeScript • Node.js • PostgreSQL • C/C++ & Linux
   - **Résumé ↓** is a dropdown offering **EN / FR / ES** (`resume_en.pdf`, `resume_fr.pdf`,
     `resume_es.pdf`).
3. **01 — About** — professional summary paragraph (real text, section 7) + a small
   "Languages: Spanish · English · French (fluent) · Arabic (native)" line.
4. **02 — Work** — visual showcase of **2 projects** (Moroccan Carpet, WeberberX). Responsive
   card grid; card = screenshot + title + short label/tags. Click → in-page **lightbox**:
   - Larger screenshot + thumbnail strip for multiple images
   - Title, description, tech tags
   - Optional "Visit live ↗" button (Moroccan Carpet only; WeberberX is internal, no link)
   - **No source-code links** — media-only
   - Keyboard-accessible (Esc closes, focus trap), closes on backdrop click
5. **03 — Open Source** — lighter grid linking selected GitHub repos (systems/C credibility).
   Each: name, one-line description, language tag, repo link. Set (editable):
   **Minishell**, **miniRT**, **Philosophers**, **fract-ol**, **ft_linear_regression**.
   Plus "More on GitHub →".
6. **04 — Skills** — pill grid grouped by category (real groups, section 7).
7. **05 — Experience** — vertical timeline (real entries, section 7).
8. **06 — Contact** — centered CTA, `mailto:` email link, GitHub & LinkedIn buttons.
   Phone is intentionally **not** shown (résumé only).
9. **Footer** — © 2026 Abdelghani Hammoud · abdelghani.me.

## 6. External Links / Known Data

- **GitHub (projects):** `https://github.com/m4ntr4r4m4`
- **LinkedIn:** `https://www.linkedin.com/in/abdelghani-hammoud/`
- **Email:** `abdelghani@weberber.com`
- **Location:** Madrid, Spain
- **Phone:** `+34 653 279 539` — *résumé only, NOT published on the site*
- **Résumé:** "Résumé ↓" dropdown → `/resume_en.pdf`, `/resume_fr.pdf`, `/resume_es.pdf`
  (already in repo).

## 7. Content Seed (from résumé)

Canonical EN below. FR/ES verbatim wording comes from `resume_fr.pdf` / `resume_es.pdf` and
goes into `translations.js`. Title/summary/experience/languages are stated in all 3 languages
in the résumés already.

**Hero title** — EN: "Full-Stack Software Engineer — Web, AI & Systems" · FR: "Ingénieur
logiciel Full-Stack — Web, IA & Systèmes" · ES: "Ingeniero de Software Full-Stack — Web, IA y
Sistemas".

**About / summary (EN):** "Full-stack software engineer who designs, builds, and operates
end-to-end e-commerce platforms: Next.js/React/TypeScript front-end, Node.js/Express back-end
with PostgreSQL/WooCommerce, AI integration (OpenAI, Gemini) for content and images, and
containerized deployment (Docker, Vercel, Cloudflare). Strong C/C++ systems fundamentals from
42 Madrid; comfortable working in English on international teams." (FR/ES verbatim from résumés.)

**Skills groups:**
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, next-intl (i18n/RTL), SSR, SEO
- **Backend & APIs:** Node.js, Express, REST APIs, OAuth 2.0, JWT, WordPress/WooCommerce, Stripe
- **AI & Data:** OpenAI, Google GenAI (Gemini), content & image generation, Python (Pandas, NumPy), ETL, n8n
- **Systems & Low-Level (C/C++):** Unix/Linux systems programming, memory management, concurrency & multithreading, processes & signals, sockets, algorithms
- **DevOps & Infrastructure:** Docker, CI/CD (GitHub Actions), Vercel, Cloudflare (Workers/KV), Nginx, TrueNAS, Git
- **Databases:** PostgreSQL, MySQL/MariaDB, Redis

(Group *labels* are translated; the tech items themselves stay as proper nouns.)

**Work showcase:**
- **Moroccan Carpet** — headless e-commerce store · live: `https://moroccan-carpet.com`
  - Tags: Next.js 16, React 19, TypeScript, Tailwind v4, WooCommerce, Stripe, Vercel, Cloudflare
  - EN desc: "A headless multilingual storefront for handmade Moroccan rugs — 8 languages with
    full Arabic RTL, an OpenAI translation pipeline, and SEO (sitemaps, hreflang, JSON-LD).
    Stripe checkout with Apple/Google Pay and server-side price verification, plus multichannel
    abandoned-cart recovery and product-page CRO."
- **WeberberX** — inventory management & multi-marketplace publishing · *internal tool, no live link*
  - Tags: Next.js 15, TypeScript, Express, Node 24, PostgreSQL 15, Docker, Redis, Nginx, TrueNAS
  - EN desc: "An inventory-management and multi-marketplace publishing platform. Etsy &
    WooCommerce integration (OAuth 2.0, resilient inventory sync), an AI pipeline generating
    product copy and images (OpenAI/Gemini) as background jobs, JWT auth, sales tracking, QR
    codes, and PDF export — running on a self-hosted Linux/Docker backend."

(FR/ES showcase descriptions authored in `translations.js`, sourced from the résumé bullets.)

**Experience timeline (most-recent first):**
1. **Founder & Full-Stack Software Engineer** — WeBerber (Morocco / Remote) · 2017–2025 —
   "Sole engineer for the company's e-commerce stack and internal tooling across two production
   platforms (Moroccan Carpet, WeberberX)."
2. **Software Engineering** — 42 Madrid · Fundación Telefónica · 2021–2025 — "Common Core plus
   advanced track, with specializations in Data, Algorithms & AI."
3. **Entrepreneurship Specialization** — ESCP Business School · 2024 — "Venture creation:
   business modeling, fundraising, and go-to-market, applied to scaling WeBerber."
4. **Sound Engineering (Engineering Degree)** — ESAV Marrakech · 2015–2018 — "Music recording,
   mixing, and production, plus post-production sound for film."

**Languages:** Spanish (fluent) · English (fluent) · French (fluent) · Arabic (native).

## 8. Content the user still supplies

- Profile photo (`assets/photo.jpg`)
- Screenshots for the 2 showcase projects (`assets/projects/...`)
- FR/ES translations for synthesized project descriptions (everything else verbatim from résumés)
- (Résumé PDFs already added: `resume_en.pdf`, `resume_fr.pdf`, `resume_es.pdf`)

## 9. File Layout

```
/
├── index.html          # all markup / sections, data-i18n attributes
├── styles.css          # all styles incl. light & dark themes, responsive
├── main.js             # lang switch, dark-mode toggle, mobile nav,
│                       #   smooth scroll, scroll-reveal, lightbox, résumé menu
├── translations.js     # EN/FR/ES string maps (hand-edited)
├── assets/
│   ├── photo.jpg       # profile photo (placeholder)
│   ├── projects/       # showcase screenshots (placeholders)
│   ├── favicon.svg
│   └── og-image.png    # Open Graph preview (placeholder)
├── resume_en.pdf       # present
├── resume_fr.pdf       # present
├── resume_es.pdf       # present
├── CNAME               # abdelghani.me (existing)
└── README.md
```

## 10. Extras / Polish

- Smooth-scroll nav; active-section highlight (nice-to-have).
- Scroll-reveal fade/slide on sections (respects `prefers-reduced-motion`).
- SEO + social: `<title>`, meta description, Open Graph + Twitter Card tags, favicon.
- Lighthouse-friendly: minimal JS, no heavy libraries, lazy-load images.

## 11. Explicitly Out of Scope (YAGNI)

- No CMS, no blog. No contact-form backend. No build pipeline / JS framework.
- No live GitHub API fetching (open-source list hand-maintained).
- No per-language separate URLs (client-side swap only).
- No analytics. Phone not published.

## 12. Success Criteria

- Fast, polished on mobile & desktop, light & dark.
- Language switcher swaps all visible copy EN/FR/ES and persists.
- All links work; résumé dropdown serves the correct PDF per language.
- Showcase lightbox works with mouse, touch, and keyboard.
- Real résumé content reflected (hero, about, skills, experience, projects).
- Deploys cleanly to GitHub Pages at abdelghani.me with no build step.
