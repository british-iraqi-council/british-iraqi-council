# IBBC website

Arabic-first, bilingual (Arabic and English) website for the Iraqi–British Business Council, formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce and ratified by the Ministry of Commerce. Next.js 16 App Router, Tailwind v4, next-intl v4.

## Routes

```
/ar, /en    Home: hero, standing strip, who we are, vision and mission,
            objectives, why Iraq, membership band (partners once supplied)
```

`/` redirects to `/ar`; unprefixed paths such as `/about` redirect to `/ar/about`. Planned pages: Home, About, Membership (and apply), Contact, Privacy, Terms.

## Layer map

```
messages/            ar.json, en.json
src/app/[locale]/    layout, (public) routes, catch-all, not-found
src/content/         typed { ar, en } content: organisation, people, partners,
                     objectives, why-iraq, benefits, tiers, committees, form options
src/assets/images/   stock photographs (imported, never served from public/),
                     with stock/CREDITS.md
src/core/constants/  site URL, main navigation, hero images and alt text
src/core/i18n/       routing, request config, navigation
src/lib/             localize, split-ltr-runs, highlight-terms, pick-messages,
                     about-sections, contact-items, parse-tier, organization-schema
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

Written for this build in Arabic and English, live as written, pending the council's review. Each task that adds descriptive wording lists it here.

- `ORGANISATION.description` (`src/content/organisation.ts`): the one-sentence site description, also used in metadata and the schema.org block
- `OBJECTIVES` (`src/content/objectives.ts`): the six objectives, titles and sentences
- `WHY_IRAQ` (`src/content/why-iraq.ts`): four sector tiles (energy; infrastructure and construction; agriculture and food; technology), titles and sentences
- `BENEFITS` (`src/content/benefits.ts`): Access, Visibility, Advocacy, Networking, each with its sentence
- `TIERS` (`src/content/tiers.ts`): Bronze, Silver and Gold, their names, taglines and features (Silver and Gold list only what they add)
- `COMMITTEES` (`src/content/committees.ts`): five sector committees
- `home.*` (`messages/ar.json`, `messages/en.json`): the Home page's wording: the hero headline and sentence ("Where Iraqi enterprise meets British business"), button labels, the "Who we are" paragraph, the vision and mission, the objectives and Why Iraq ledes, the membership band sentence, the partners headings, and the Home page title and description
- Hero image alt text (`src/core/constants/images.ts`)
- `CONTACT_SUBJECTS`, `APPLICATION_SECTORS`, `COMPANY_SIZES`, `COUNTRIES` (`src/content/application-options.ts`): the labels of the form select lists
