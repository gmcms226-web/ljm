# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

이정민 애견미용학원 (Lee Jeongmin Dog Grooming Academy) — a static multi-page website for a dog grooming school in Daejeon, Korea. No build step, no framework.

## Running the Site

```bash
npx serve .
```

Or use VS Code Live Server. Firebase Auth and the Naver Maps embed require a served origin (not `file://`). The OpenWeatherMap widget works on any origin.

## Architecture

**Static site, no framework.** Eight HTML pages share a duplicated header/footer structure — there is no templating engine, so header and footer markup is copy-pasted into each file. Changes to the header or footer must be applied to all eight pages:

- `index.html` — homepage
- `about.html` — 학원소개 (academy intro)
- `notice.html` — 공지사항 (notices list)
- `notice-01.html`, `notice-02.html`, `notice-03.html` — individual notice detail pages; load `notice-detail.css` instead of `notice.css`; link back to `notice.html`
- `gallery.html` — 학생실습 (student practice gallery)
- `location.html` — 오시는 길 (directions)

**CSS** lives in `assets/css/` and is split per-concern. Every page loads only the CSS it needs. Shared files: `reset.css`, `common.css`, `header.css`, `footer.css`. Page/section files: `hero.css`, `quick-menu.css`, `support.css`, `teacher.css`, `slider.css`, `course.css`, `contact.css`, `about.css`, `notice.css`, `notice-detail.css`, `gallery.css`, `location.css`.

`common.css` defines all CSS custom properties — edit variables there, not inline:

- Colors: `--color-primary` (#f4a7b9), `--color-primary-dark`, `--color-primary-light`, `--color-dark`, `--color-text`, etc.
- Point colors: `--color-point-lavender`, `--color-point-mint`, `--color-point-peach` (each with a `-light` tint variant)
- Layout: `--max-width: 1200px`, `--side-padding: 80px`
- Fonts: `--font-title` (YeogiOttaeJalnan, for headings), `--font-base` (LineSeed, for body)
- Type scale: `--fs-xs` through `--fs-display` (12px–56px)
- Spacing scale: `--sp-4: 8px` through `--sp-section: 60px`

**JavaScript** lives in `assets/js/`:
- `common.js` — runs on every page: image fallback placeholders, paw-print click effect, top button, mobile hamburger menu, login modal open/close, contact course-button toggle. Also contains dead `.reveal-up` scroll-reveal code that targets a class not used in any current HTML — the actual course card animation is inline in `index.html`.
- `swiper-init.js` — Swiper v11 config for the practice photo slider and the academy facility slider; the `academyData[]` array (11 entries) must stay in sync with the 11 `swiper-slide` divs in the academy slider section of `index.html`
- `weather.js` — fetches live Daejeon weather from OpenWeatherMap every 30 minutes; set `USE_REAL_API = false` to use dummy data
- `firebase-auth.js` — ES module; handles Google OAuth popup and email/password login+signup via Firebase Auth v12; also writes user records to Firestore (`users` collection, fields: `name`, `phone`, `email`, `createdAt`); supports ID/password recovery via `#findModal`; updates header login/logout state via `onAuthStateChanged`
- `gallery.js` — Swiper for the `.galleryReviewSlider` (student review carousel at top of gallery page) + scroll-reveal for gallery grid items (`.gallery-reveal` → `.is-visible` via IntersectionObserver, one-way, never hides)
- `location-map.js` — Naver Maps embed centered on academy coordinates (36.328682, 127.423904); shows user's geolocation marker and calculates haversine distance

**Script load order on `index.html`:** Swiper CDN → `swiper-init.js` → `common.js` → `weather.js` → `firebase-auth.js` (ES module).

**Script load order on `gallery.html`:** Swiper CDN → `gallery.js` → `common.js` → `firebase-auth.js` (ES module). No `swiper-init.js` or `weather.js`.

**Script load order on notice detail pages:** `common.js` → `firebase-auth.js` (ES module). No Swiper.

Because `type="module"` defers automatically, `firebase-auth.js` always runs after all plain `<script>` tags regardless of its position in the HTML.

**External CDNs loaded at runtime:**
- Swiper v11 (`cdn.jsdelivr.net`)
- Firebase JS SDK v12 (`gstatic.com`) — loaded as ES module
- Naver Maps API (`location.html` only)
- Google Fonts / noonfonts via `@font-face` in `common.css`

## Key Conventions

- BEM naming throughout: `.block__element--modifier`
- The `.inner` wrapper class provides `max-width: 1200px` and `padding: 0 80px` (20px on mobile) — wrap content in it for consistent horizontal margins
- `firebase-auth.js` is loaded with `type="module"`; all other scripts are plain `<script>` tags loaded at the bottom of `<body>`
- The floating chatbot widget (`.chatbot`) toggles `.active` to show/hide `.chatbot__panel`; its styles live in `common.css`
- Mobile menu overlay uses `.active` class (toggled by `common.js`)
- The course card click/reveal animation (`.card` → `.is-visible`) is an inline `<script>` at the bottom of `index.html`, not in any external JS file
- Root-level `favicon.png` is referenced by all pages

## Modal System

There are four modals, each with distinct class conventions:

| Modal | Element | Open class | Controlled by |
|---|---|---|---|
| Login | `#loginModal` | `.is-open` | `common.js` (open) + `firebase-auth.js` (close via `closeLoginModal()`) |
| Sign-up | `#signupModal` | `.active` | `firebase-auth.js` throughout |
| Find ID/PW | `#findModal` | `.is-open` | `firebase-auth.js` throughout |
| Consultation confirm | `#consultModal` | `.is-open` | Inline script in `index.html` and `gallery.html` |

The logout handler in `firebase-auth.js` uses capture-phase `addEventListener` with `stopImmediatePropagation()` to prevent the `common.js` modal-open listener from also firing when the user is logged in.

## Image Directories

- `assets/images/pracitce/` (transposed 'i' and 'c') — used by the homepage practice slider (`index.html`), files `1.jpg` through `12.jpg`
- `assets/images/gallery/` — used by the gallery page grid (`gallery.html`), files `practice-01.jpg` through `practice-14.jpg` (images 09–11 use a different typo: `pratice-09.jpg`, missing the 'c' entirely)
- `assets/images/academy/` — used by the academy facility slider, files `academy-01.jpg` through `academy-11.jpg`; count must match `academyData[]` in `swiper-init.js`
- `assets/images/teachers/` — used by the teacher section on `index.html`, files `teacher-kang.jpg`, `teacher-son.jpg`, `teacher-kim.jpg`, `teacher-lee.png`

Keep `<img>` src paths consistent with the actual filenames on disk until the directories are renamed.

## Testing

`@playwright/test` is installed as a dev dependency but no config file or test specs exist yet.

## Known Issues

- `about.html` loads `footer.css` twice.
- The contact form (present on `index.html` and `gallery.html`) has a submission handler that opens `#consultModal`, but does **not** actually send data anywhere — it is purely a UI confirmation.

## External API Keys

- **OpenWeatherMap** — key is in `assets/js/weather.js` (`API_KEY`). Toggle `USE_REAL_API` to `true`/`false`
- **Firebase** — config object is inline in `assets/js/firebase-auth.js` (project: `ljm-8d094`)
- **Naver Maps** — API script tag is in `location.html` head; key is in the script `src` URL
