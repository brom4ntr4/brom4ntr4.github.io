# Portfolio Website — Design Spec

**Date:** 2026-06-17
**Owner:** Abdelghani Hammoud
**Repo:** `brom4ntr4.github.io` → served at **abdelghani.me** (GitHub Pages, CNAME already set)

## 1. Purpose

A personal-brand hub ("this is me") for Abdelghani Hammoud, a software engineer / 42 School
student. It introduces him, showcases selected work visually, links to open-source code, and
provides ways to connect (GitHub, LinkedIn, email, resume). General audience — recruiters,
peers, and potential collaborators alike.

## 2. Tech & Hosting

- **Static single-page site.** Hand-written `index.html`, `styles.css`, `main.js`. No build
  step, no framework, no bundler.
- Deploys as-is on GitHub Pages from this repo. Custom domain `abdelghani.me` (CNAME present).
- One external font request (Inter via Google Fonts). Everything else self-contained.
- No backend. Contact is a `mailto:` link (no form service).

## 3. Visual Design

- **Direction:** Minimal & clean. Generous whitespace, restrained typography, numbered
  section labels (01–06), a subtle accent-line motif.
- **Base theme:** Light.
- **Accent color:** Emerald `#059669` (with tints `#ecfdf5`, `#d1fae5`, `#a7f3d0` for
  backgrounds/borders; darker `#047857` for hover).
- **Typography:** Inter (Google Fonts), with a system-font fallback stack.
- **Dark mode:** Toggle in the nav. Defaults to `prefers-color-scheme` on first visit, then
  persists the user's choice in `localStorage`. Dark palette is a near-neutral dark
  (e.g. `#0c0a09` bg, `#e7e5e4` text) keeping emerald as the accent.
- **Responsive:** Mobile-first; grids collapse to single column; nav collapses to a toggle
  menu on small screens.
- **Accessibility:** Semantic HTML5 landmarks, keyboard-navigable (including the lightbox),
  visible focus states, sufficient contrast in both themes, `alt` text on all images.

## 4. Page Structure (single scroll)

1. **Sticky nav** — `AH.` logo (emerald dot), anchor links (About / Work / Open Source /
   Skills / Experience / Contact), dark-mode toggle. Smooth-scroll to sections. Collapses to a
   hamburger menu on mobile.
2. **Hero** — accent eyebrow ("Software Engineer"), large name, one-line tagline, action
   buttons (View work · Resume ↓ · GitHub), and a **circular profile photo**.
3. **01 — About** — short bio paragraph. *(placeholder text, user edits)*
4. **02 — Work** — visual showcase of **2 projects**. Responsive card grid; each card shows a
   screenshot, title, and short label/tags. Clicking a card opens an in-page **lightbox**:
   - Larger screenshot + a thumbnail strip for multiple images
   - Title, description, tech tags
   - Optional "Visit live ↗" button (opens user-provided URL in a new tab)
   - **No source-code links** — this section is media-only
   - Lightbox is keyboard-accessible (Esc to close, focus trap) and closes on backdrop click
5. **03 — Open Source** — a lighter list/grid linking selected GitHub repos for people who
   want to see code. Each item: name, one-line description, language tag, link to the repo.
   Initial set (editable): **Minishell**, **miniRT**, **Philosophers**, **fract-ol**,
   **ft_linear_regression**. Plus a "More on GitHub →" link to the profile.
6. **04 — Skills** — pill grid grouped by category (Languages, Frameworks/Tools, etc.).
7. **05 — Experience** — vertical timeline (e.g. 42 School + any roles). *(placeholder
   entries, user edits)*
8. **06 — Contact** — centered CTA, `mailto:` email link, GitHub & LinkedIn buttons.
9. **Footer** — © 2026 Abdelghani Hammoud · abdelghani.me.

## 5. External Links / Known Data

- **GitHub (projects account):** `https://github.com/m4ntr4r4m4`
- **LinkedIn:** `https://www.linkedin.com/in/abdelghani-hammoud/`
- **Email:** `abdelghanihammoud2@gmail.com`
- **Resume:** "Resume ↓" button links to `/resume.pdf` (user will add the file to the repo).

## 6. Content Strategy

Build the full structure with real known data (name, links, email, the 5 open-source repos)
and **clearly-marked placeholders** the user swaps in:

- Bio paragraph (About)
- Profile photo (`assets/photo.jpg` or similar)
- 2 showcase projects: screenshots, titles, descriptions, tech tags, live URLs
- Experience timeline entries
- `resume.pdf`

Placeholders use obvious sample text/images and HTML comments (`<!-- TODO: ... -->`) so they
are easy to find and replace.

## 7. File Layout

```
/
├── index.html          # all markup / sections
├── styles.css          # all styles incl. light & dark themes, responsive
├── main.js             # dark-mode toggle, mobile nav, smooth scroll,
│                       #   scroll-reveal, lightbox
├── assets/
│   ├── photo.jpg       # profile photo (placeholder)
│   ├── projects/       # showcase screenshots (placeholders)
│   ├── favicon.svg
│   └── og-image.png    # Open Graph preview (placeholder)
├── resume.pdf          # placeholder
├── CNAME               # abdelghani.me (existing)
└── README.md
```

## 8. Extras / Polish

- Smooth-scroll navigation; active-section highlight in nav (optional, nice-to-have).
- Scroll-reveal fade/slide animations on sections (respects `prefers-reduced-motion`).
- SEO + social: `<title>`, meta description, Open Graph + Twitter Card tags, favicon.
- Lighthouse-friendly: minimal JS, no heavy libraries, lazy-load images.

## 9. Explicitly Out of Scope (YAGNI)

- No CMS, no blog (can be added later via Jekyll if ever needed).
- No contact-form backend / Formspree.
- No build pipeline, no JS framework.
- No live GitHub API fetching (open-source list is hand-maintained).
- No analytics (can add later if wanted).

## 10. Success Criteria

- Loads fast and looks polished on mobile and desktop, light and dark.
- All known links work; placeholders are obvious and easy to replace.
- Showcase lightbox works with mouse, touch, and keyboard.
- Deploys cleanly to GitHub Pages at abdelghani.me with no build step.
