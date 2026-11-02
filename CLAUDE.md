# CLAUDE.md

This file guides Claude Code in this repository.

@AGENTS.md
@README.md

Arabic-first (RTL) bilingual website for the Iraqi–British Business Council (IBBC), built on Next.js 16 App Router, Tailwind v4 and next-intl v4. The design spec is `docs/superpowers/specs/2026-11-02-ibbc-website-design.md`. The sibling `aldallah-group-landingpage` is the source of the toolchain and conventions.

## Content rules

- **No placeholders, ever.** Nothing in brackets, no dummy names, no sample logos.
- **A section with no confirmed data renders nothing**, and its menu entry and anchor go with it. Supplied today: the Vice Chairman, Sohaib Mohammed Abdullah, and the phone +964 790 199 9998, both from the business card in the identity deck and pending the council's confirmation. Everything else (advisors, team, partners, address, email, hours, social) stays omitted until supplied.
- **No invented facts.** No person, member company, partner, address, phone number, figure, date or event that the project lead has not supplied.
- **No JBBC copy.** No JBBC sentence, maroon colour, wave banner pattern, Brown typeface or London-landmark photo band.
- **Draft copy goes live and is reviewed later.** Descriptive wording written for this build is listed in the README under "Draft copy for review". Confirmed facts are a separate kind and only the council can give them.
- Name: `IBBC`, `Iraqi–British Business Council` (Iraq first, en dash), `مجلس الأعمال العراقي البريطاني`.
- Image alt text describes the photograph and never presents stock as the council's own.

## Design tokens

Colours are defined only in `src/app/tailwind.css`: blue `#0B2470`, blue-deep `#071A55`, red `#CE1126` (the Iraqi flag red, at the project lead's request), ivory `#F3EEE4`, white `#FFFFFF`, ink `#14204A`, muted `#545B78`, line `#E4DCCB`. Red is an accent only, never a large background and never text below 18px. Text is never coloured with opacity.

Layout and type follow the team's Baghdad Expo site, at the project lead's request (2026-11-02). The `shell` utility is the one container: up to `--shell-max` (112.5rem, 1800px) wide, with `--shell-pad` side padding of 24px, 40px from 640px, 80px from 1024px and 112px from 1280px. Both are custom properties on `html`, so anything that must line up with the container (the hero text cap) derives from them instead of copying numbers. `<main>` is the only source of space between top-level blocks: `gap-24 lg:gap-32` and the same bottom padding (96 and 128px); no top-level block adds outer `py` or `mt`. Inside a block, a `SectionHeading` sits `gap-10 lg:gap-12` above its content, card grids use `gap-6 lg:gap-8`, the blue bands pad `py-16 lg:py-20` and `PageHeading` `py-16 lg:py-24`. Prose is capped in `ch` per block, never by the container. The scale is `text-hero` 48 to 88px (Home title only), `text-display` 44 to 72px (inner-page titles), `text-headline` 36 to 60px (section titles), and the hero is larger than the display, and the display than the headline, at every width.

Fonts through `next/font/google`: Cormorant SC 600 (English headings), Amiri 400/700 (Arabic headings), Inter (English body), IBM Plex Sans Arabic 400/500/600 (Arabic body). Arabic never gets small caps or letter-spacing. The hero title is the largest text at every width; form inputs are 16px; tier feature text is at least 15px.

## Hero rule

The Iraqi flag sits on the reading-start side (right in Arabic, left in English) and the British flag on the other, with a red seam between them.

## Traps carried over from Al-Dallah

- **The proxy matcher needs a double backslash** (`.*\\..*` in the string literal in `src/proxy.ts`, which the regex receives as `.*\..*`). With a single one the lookahead rejects every non-empty path: unprefixed URLs like `/about` 404 instead of redirecting. Lint, types and build stay green. `scripts/smoke.mjs` checks `/about` redirects to `/ar/about`.
- **`setRequestLocale` in every layout and every page**, or the subtree silently leaves static generation. Check for `●` in the build's route table.
- **Never render a content string raw on an Arabic page.** Latin and numeric runs ("IBBC", "PDF", "4 MB", years) go through `RichText` and `LtrRun` so they read in the right order. Check by walking the text nodes of `html[lang=ar] main` for `[A-Za-z0-9]` without a `dir="ltr"` ancestor. An `<option>` cannot hold an element, so select labels go through `isolateLtrRuns` (U+2068 and U+2069 around each run) instead; the walk lists them, and each run must sit between those two marks.
- **The enquiry forms submit through `startTransition`, not the bare `action`.** React 19 resets an uncontrolled form after every server action, including one that returns validation errors, so a mistyped field lost every value and the attachment. Build `FormData` in `onSubmit`, call `formAction` inside `startTransition`, reset by hand only on success, and keep `action={formAction}` for the no-JavaScript path.
- **Server actions do not receive `[locale]`.** Read a hidden `locale` field and validate it against `routing.locales`.
- **Contrast is solved against the darkest surface** a text colour sits on, not the lightest.
- **Text over a photograph cannot be audited from CSS.** Measure the text boxes against real viewport-screenshot pixels, at 360, 768, 1440 and 1920 wide in both languages.
- **Hero layout and contrast (2026-11-02).** Below 640px the hero is a 16rem flag band (Iraq on the reading-start side, the red seam starting below the header so it never crosses the header name) above the text on solid `blue-deep`; from 640px the flags fill the hero with the text over them. Both flags must stay recognisable: the veil (`hero-veil`, mirrored by swapping two custom properties with `rtl:hero-veil-mirrored`, in `tailwind.css`) is deep only at the header strip and behind the lower text, and light over the upper flags. It is solved against the brightest pixel behind each text box, one gradient set per breakpoint. All hero text is white: `on-blue-muted` falls to 3.7:1 where a line crosses the red seam (at 640 to 1023px the text block spans both halves); white is 5.63:1 on the seam (computed after the switch to the Iraqi flag red `#CE1126` on 2026-11-02; the other values were measured on the old red and white-on-red still passes 4.5:1). From 1024px the text block ends 2rem before the seam; its cap is `50vw` minus the shell's start edge (`max(var(--shell-pad), (100vw - var(--shell-max)) / 2 + var(--shell-pad))`) minus 2rem. Lowest values after the Expo layout change (2026-11-02), at 360, 768, 1440 and 1920 in both languages: title 4.02:1 (`/ar` at 768, hero-size text, bar 3:1), other-language line 5.63:1 (`/ar` at 768), sentence 5.57:1 (`/ar` at 768), header name 8.08:1 (`/ar` at 768), header links 8.28:1 (`/ar` at 1920); the white button label (13.99:1) and the red button label, language switch and Contact pill (5.63:1) are computed on their own fills. At 360 the text sits on solid `blue-deep` (16.3:1). Re-measure whenever the photographs, the veil or the hero text move.
- **No `loading.tsx` in any route.** It makes the prerendered body stream into a hidden `<div>` outside `<main>`, so the content stays invisible until JavaScript runs; `scripts/smoke.mjs` checks the Home `h1` and standing line are inside `<main>` in the static HTML.
- **A backgrounded tab reports a broken page.** React's streaming reveal waits for `requestAnimationFrame`. Foreground the tab before measuring.
- **Measuring too early reports a broken page.** Wait for `readyState === "complete"`, decode images with a capped wait, and force `Reveal` content to opacity 1 before measuring.
- **Titles must let their text shrink.** Long words overflow 360px screens without any box sticking out: use `hyphens-auto [overflow-wrap:anywhere]` and check `scrollWidth > clientWidth`.
- **Arabic is a connected script and never takes letter-spacing.**
- **A visually hidden control shows its focus on the visible wrapper, as the site's blue outline.** The tier cards and the attachment drop zone on `/membership/apply` wrap `sr-only` inputs. A 25% blue ring there was barely visible on white, and on a checked tier card it replaced the solid selection ring, so focus made the card look less selected. They use `has-[:focus-visible]:outline-2 outline-offset-3 outline-blue`, matching the base `:focus-visible` rule.
- **Measure 360px overflow with the scrollbar hidden.** A desktop browser window 360 wide lays the page out at 345px beside its scrollbar, so `scrollWidth === 360` never holds. Add `html { scrollbar-width: none }` before measuring. The About pills scroll sideways inside their own `overflow-x-auto` row by design.
- **The contrast audit cannot see the transparent header over the Home hero.** Hide the header before running `scripts/audit-contrast.js` on Home and measure it against hero pixels instead.

## Conventions

No code comments. No `any`, no `@ts-ignore`, no `React.FC`. Server Components by default, `"use client"` on leaves only. Logical properties only (`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`), never `left`/`right` utilities. Files and folders are `kebab-case`, components `PascalCase`. Prop types live in `types/<component>-props.ts` inside page folders and flat beside shared components. Repositories keep `<name>_repo.ts` and `<name>_impl.ts`.

Commit messages carry no `Co-Authored-By` trailer. Work happens on `feat/first-release`; `main` is reached only through a pull request.

## Verification

`npm run gitcheck` (lint, format, test, clean build), then `npx next start -p 3100` and `npm run smoke`. Unit tests are `vitest` under `tests/`.

In the browser, against the running build, on all seven pages in both languages: `scripts/audit-contrast.js` (a browser script copied from Al-Dallah: inject it with Playwright's `addScriptTag({ path })` and call `auditContrast(document)`, which returns `{ total, failures, belowAAA }`) at 360, 768 and 1440 wide, expecting no failures; the hero pixel measurement above; the Arabic direction walk; the 360px overflow check; and a keyboard pass (the skip link first and landing on `#content`, visible focus on every control, the mobile menu trapping focus, closing on Escape and returning focus to its button). The first release passed all of these on 2026-11-02.
