# IBBC website

Arabic-first, bilingual (Arabic and English) website for the Iraqi–British Business Council, formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce and ratified by the Ministry of Commerce. Next.js 16 App Router, Tailwind v4, next-intl v4.

## Routes

```
/ar, /en    Home (temporary heading while the site is built)
```

`/` redirects to `/ar`; unprefixed paths such as `/about` redirect to `/ar/about`. Planned pages: Home, About, Membership (and apply), Contact, Privacy, Terms.

## Layer map

```
messages/            ar.json, en.json
src/app/[locale]/    layout, (public) routes, catch-all, not-found
src/core/i18n/       routing, request config, navigation
src/lib/             localize, split-ltr-runs, pick-messages
src/proxy.ts         next-intl middleware
scripts/smoke.mjs    smoke checks against a running build
tests/               vitest unit tests
docs/                design spec and identity reference
```

## Commands

```bash
npm run dev        # http://localhost:3000/ar
npm run build
npm run lint
npm run format
npm test
npm run smoke      # needs a running build: npx next start -p 3100
npm run gitcheck   # lint, format, test, clean build
```

## Waiting on the council

- Logo files (SVG) and the full identity deck
- Fonts and exact colours
- The domain
- People: board, honorary advisors, executive team (names, roles, photos)
- Partners and supporters, with logos and permission
- Contact details: address, phone, email, office hours, social accounts
- Where form submissions should go
- Legal review of the privacy policy and terms

## Draft copy for review

None yet. Each task that adds descriptive wording lists it here.
