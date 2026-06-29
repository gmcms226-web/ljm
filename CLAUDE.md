# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

이정민 애견미용학원 (Lee Jeongmin Dog Grooming Academy) — a static multi-page website for a dog grooming school in Daejeon, Korea. No build step, no package manager.

## Running the Site

```bash
npx serve .
```

Or use VS Code Live Server. Firebase Auth and the Naver Maps embed require a served origin (not `file://`). The OpenWeatherMap widget works on any origin.

## Architecture

**Static site, no framework.** Five HTML pages share a duplicated header/footer structure — there is no templating engine, so header and footer markup is copy-pasted into each file. Changes to the header or footer must be applied to all five pages:

- `index.html` — homepage
- `about.html` — 학원소개 (academy intro)
- `notice.html` — 공지사항 (notices)
- `gallery.html` — 학생실습 (student practice gallery)
- `location.html` — 오시는 길 (directions)

**CSS** lives in `assets/css/` and is split per-concern. Every page loads only the CSS it needs. Shared files: `reset.css`, `common.css`, `header.css`, `footer.css`. Page/section files: `hero.css`, `quick-menu.css`, `support.css`, `teacher.css`, `slider.css`, `course.css`, `contact.css`, `about.css`, `notice.css`, `gallery.css`, `location.css`.

`common.css` defines all CSS custom properties — edit variables there, not inline:

- Colors: `--color-primary` (#f4a7b9), `--color-primary-dark`, `--color-primary-light`, `--color-dark`, `--color-text`, etc.
- Layout: `--max-width: 1200px`, `--side-padding: 80px`
- Fonts: `--font-title` (YeogiOttaeJalnan, for headings), `--font-base` (LineSeed, for body)
- Type scale: `--fs-xs` through `--fs-display` (12px–56px)
- Spacing scale: `--sp-4: 8px` through `--sp-section: 60px`

**JavaScript** lives in `assets/js/`:
- `common.js` — runs on every page: image fallback placeholders, scroll-reveal for course cards (IntersectionObserver), paw-print click effect, top button, mobile hamburger menu, login modal open/close
- `swiper-init.js` — Swiper v11 config for the practice photo slider and the academy facility slider; the `academyData[]` array (11 entries) must stay in sync with the 11 `swiper-slide` divs in the academy slider section of `index.html`
- `weather.js` — fetches live Daejeon weather from OpenWeatherMap every 30 minutes; set `USE_REAL_API = false` to use dummy data
- `firebase-auth.js` — ES module; handles Google OAuth popup and email/password login+signup via Firebase Auth v12; updates header login/logout state via `onAuthStateChanged`
- `gallery.js` — Swiper for the gallery review slider + scroll-reveal for gallery grid items (`.gallery-reveal` → `.is-visible`)
- `location-map.js` — Naver Maps embed centered on academy coordinates (36.328682, 127.423904); shows user's geolocation marker and calculates haversine distance

**Script load order on `index.html`:** Swiper CDN → `swiper-init.js` → `common.js` → `weather.js` → `firebase-auth.js` (ES module). Because `type="module"` defers automatically, `firebase-auth.js` always runs after all plain `<script>` tags regardless of its position in the HTML.

**External CDNs loaded at runtime:**
- Swiper v11 (`cdn.jsdelivr.net`)
- Firebase JS SDK v12 (`gstatic.com`) — loaded as ES module
- Naver Maps API (`location.html` only)
- Google Fonts / noonfonts via `@font-face` in `common.css`

## Key Conventions

- BEM naming throughout: `.block__element--modifier`
- The `.inner` wrapper class provides `max-width: 1200px` and `padding: 0 80px` (20px on mobile) — wrap content in it for consistent horizontal margins
- Two scroll-reveal patterns exist: `.reveal-up` + `.is-visible` (course cards in `common.js`, plays in sequence with staggered timers; reverses on scroll-out) and `.gallery-reveal` + `.is-visible` (gallery grid in `gallery.js`, one-way reveal via IntersectionObserver — never hides once shown)
- `firebase-auth.js` is loaded with `type="module"`; all other scripts are plain `<script>` tags loaded at the bottom of `<body>`
- The floating chatbot widget (`.chatbot`) toggles `.active` to show/hide `.chatbot__panel`; its styles live in `common.css`
- Mobile menu overlay uses `.active` class (toggled by `common.js`)

## Modal Class Conflicts

**`#loginModal`** is controlled by two separate scripts with different class names:
- `common.js` opens it with `.is-open` and closes it by removing `.is-open`
- `firebase-auth.js` closes it by removing `.active` (a no-op, since the modal was never opened with `.active`)

This means after a successful Firebase login or Google login, the modal does **not** close automatically — `firebase-auth.js` must remove `.is-open` (not `.active`) from `#loginModal` to close it. The signup modal (`#signupModal`) correctly uses `.active` throughout `firebase-auth.js`.

**Logged-in click conflict:** `firebase-auth.js` sets `link.onclick = logoutHandler` on each `.login-open` button when a user is logged in, but `common.js` registered its modal-open handler via `addEventListener`. Setting `onclick` does not override `addEventListener` listeners — both run on click. This means clicking the header login button while logged in opens the login modal *and* shows the logout confirm dialog simultaneously.

## Image Directories

- `assets/images/pracitce/` (transposed 'i' and 'c') — used by the homepage practice slider (`index.html`), files `1.jpg` through `12.jpg`
- `assets/images/gallery/` — used by the gallery page grid (`gallery.html`), files `practice-01.jpg` through `practice-14.jpg` (images 09–11 use a different typo: `pratice-09.jpg`, missing the 'c' entirely)
- `assets/images/academy/` — used by the academy facility slider, files `academy-01.jpg` through `academy-11.jpg`; count must match `academyData[]` in `swiper-init.js`

Keep `<img>` src paths consistent with the actual filenames on disk until the directories are renamed.

## Known Issues

- `index.html` contains a **duplicate `#signupModal` div** (the markup appears twice, at lines 593 and 631). The second instance shadows the first; the close button on the first instance is unreachable.
- `gallery.html` loads `common.js` **twice** and references a non-existent `assets/js/header.js`. The extra script tags at the bottom of `<body>` should be cleaned up.
- `gallery.html` does **not** include `firebase-auth.js`, so the login modal on that page has no Firebase integration — the login button opens the modal but authentication will not function.
- `gallery.html` mobile menu links to `course.html`, which does not exist as a page.
- `about.html` loads `footer.css` twice.
- The contact form (present on `index.html` and `gallery.html`) has no submission handler — it is a static UI only.

## External API Keys

- **OpenWeatherMap** — key is in `assets/js/weather.js` (`API_KEY`). Toggle `USE_REAL_API` to `true`/`false`
- **Firebase** — config object is inline in `assets/js/firebase-auth.js` (project: `ljm-8d094`)
- **Naver Maps** — API script tag is in `location.html` head; key is in the script `src` URL
