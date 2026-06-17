# abdelghani.me

Personal portfolio of Abdelghani Hammoud — full-stack software engineer (Web, AI & Systems).
Static site (HTML/CSS/JS), trilingual (EN/FR/ES), deployed on GitHub Pages.

## Local preview

    python3 -m http.server 8000 --bind 127.0.0.1

Then open http://127.0.0.1:8000

## Customize (owner)

Replace these placeholders with real content:

- `assets/photo.svg` → a real photo. Add `assets/photo.jpg` and update the `src` in `index.html` (hero `<img>`).
- `assets/projects/moroccan-carpet-{1,2,3}.svg` → real Moroccan Carpet screenshots.
- `assets/projects/weberberx-{1,2,3}.svg` → real WeberberX screenshots.
- `assets/og-image.svg` → a designed social preview (1200×630). Update the OG `<meta>` in `index.html` if you switch to `.png`.
- Résumé PDFs (`resume_en.pdf`, `resume_fr.pdf`, `resume_es.pdf`) are already in place; replace when updated.
- Project descriptions/taglines live in `translations.js` (keys `work.mc.*`, `work.wx.*`).

## Structure

- `index.html` — markup and section content (uses `data-i18n` keys for translatable text).
- `styles.css` — design system (light/dark themes via CSS variables) and responsive layout.
- `main.js` — language switch, dark-mode toggle, mobile nav, lightbox, scroll-reveal.
- `translations.js` — EN/FR/ES string maps.
