'use strict';
document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initTheme();
  initNav();
  initResumeMenu();
  initLightbox();
  initReveal();
});

function initReveal() {
  const els = document.querySelectorAll('main .section, main .press, .hero');
  els.forEach(el => el.classList.add('reveal'));
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

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
    tagsEl.replaceChildren(...tags.map(x => {
      const s = document.createElement('span');
      s.textContent = x;
      return s;
    }));

    img.src = images[0]; img.alt = card.dataset.title;
    thumbs.replaceChildren(...images.map((src, i) => {
      const th = document.createElement('img');
      th.src = src; th.alt = ''; th.dataset.src = src;
      if (i === 0) th.classList.add('active');
      th.addEventListener('click', () => {
        img.src = src;
        thumbs.querySelectorAll('img').forEach(x => x.classList.remove('active'));
        th.classList.add('active');
      });
      return th;
    }));

    if (card.dataset.live) {
      liveEl.href = card.dataset.live; liveEl.hidden = false; internalEl.hidden = true;
    } else {
      const labelKey = card.dataset.nolabel || 'work.internal';
      internalEl.setAttribute('data-i18n', labelKey);
      internalEl.textContent = t(labelKey);
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

function initTheme() {
  const root = document.documentElement;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const systemTheme = () => (mq.matches ? 'dark' : 'light');

  // Follow the system automatically unless the visitor set an explicit override.
  root.setAttribute('data-theme', localStorage.getItem('theme') || systemTheme());

  // Live-update when the OS switches light/dark, while still in auto mode.
  mq.addEventListener('change', () => {
    if (!localStorage.getItem('theme')) root.setAttribute('data-theme', systemTheme());
  });

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next); // explicit manual override
  });
}

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
