# Adityaraj Bagwan — Portfolio

Personal portfolio: an editorial-styled, motion-driven single-page site for a
Flutter and full-stack engineer.

**Live:** https://adityaraj-portfolio.web.app

## Design system

| | |
|---|---|
| Display | Instrument Serif (roman + italic accents) |
| UI / body | Inter Tight |
| Meta / labels | JetBrains Mono |
| Palette | Warm near-black ink, champagne-saffron accent, sky + mint secondaries |
| Themes | Dark and a true paper light theme, pre-applied before first paint |

All colour, type, spacing, radius and easing values live as custom properties
in `src/styles/tokens.css`. Nothing downstream hard-codes a colour.

## Motion

- **Smooth scroll** — Lenis drives the real scroll position, so every
  scroll-linked Framer Motion hook works unchanged. Disabled automatically
  under `prefers-reduced-motion`.
- **One motion language** — easings, springs and entrance variants are defined
  once in `src/lib/motion.js` and shared by every section.
- **Primitives** in `src/components/ui/` — masked line reveals, kinetic
  split-text, magnetic hover, pointer tilt with a tracking sheen, an infinite
  marquee and an eased number counter.
- **Backdrop** — drifting aurora fields, an engineering grid, a cursor
  spotlight and film grain, composed purely in CSS. No WebGL, no preloader.

## Structure

```
src/
  data/           all site content — the only place facts live
    profile.js      identity, stats, about, experience, nav
    work.js         projects, skills, certifications, cloud badges
  lib/
    SmoothScroll.jsx  Lenis provider + scrollTo context
    motion.js         shared easings and variants
    hooks.js          media query, active section, copy, spotlight, lock
  styles/
    tokens.css      design tokens and both themes
    base.css        reset, typography, utility primitives
    components.css  backdrop, cursor, nav, buttons, chips, marquee
    sections.css    per-section layout
  components/
    ui/             reusable motion primitives
    Hero · Work · About · Experience · Skills · Credentials · Contact
    Backdrop · Cursor · ScrollProgress · Navbar · ThemeToggle · ResumePage
```

Components are presentational. To change any copy, project, skill or
credential, edit `src/data/` and nothing else.

## Commands

```bash
npm install
npm run dev      # vite dev server
npm run build    # production build to dist/
npm run preview  # serve the built output
npm run lint     # eslint
```

## Deploy

Firebase Hosting, configured in `firebase.json` (SPA rewrites to
`index.html`):

```bash
npm run build && firebase deploy
```

## Notes

- Images in `src/assets/*.webp` are optimised derivatives of the original
  uploads, which are kept alongside them for reference. Vite only bundles
  what is imported.
- Accessibility: all motion respects `prefers-reduced-motion`, the custom
  cursor only engages on fine pointers, and interactive regions carry labels.
