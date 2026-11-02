# IBBC website

Arabic-first, bilingual (Arabic and English) website for the Iraqi–British Business Council, formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce and ratified by the Ministry of Commerce. Next.js 16 App Router, Tailwind v4, next-intl v4.

## Routes

```
/ar, /en    Home: hero, standing strip, who we are, vision and mission,
            objectives, why Iraq, membership band (partners once supplied)
/about      About: page heading with in-page pills, who we are, official
            standing, objectives (board, honorary advisors and executive
            team once supplied, each with its pill)
/membership Membership: page heading with in-page pills, why join (four
            image and text rows, with the sector committees), benefits,
            the three tiers, each with an Apply link to /membership/apply
/membership/apply
            Membership application (?tier= pre-selects a tier)
/contact    Contact form (contact details once supplied)
/privacy    Privacy policy (draft, needs legal review)
/terms      Terms of use (draft, needs legal review)
```

`/` redirects to `/ar`; unprefixed paths such as `/about` redirect to `/ar/about`. Each page has its title, description, canonical and `hreflang` alternates; `/sitemap.xml` lists all fourteen URLs, and `/robots.txt` allows crawling only when `VERCEL_ENV` is `production`.

## Layer map

```
messages/            ar.json, en.json
src/app/             sitemap, robots, icons, standalone not-found
src/app/[locale]/    layout (metadata, schema.org block), (public) routes,
                     catch-all, not-found, opengraph-image
src/content/         typed { ar, en } content: organisation, people, partners,
                     objectives, why-iraq, why-join, benefits, tiers, committees,
                     form options
src/assets/images/   stock photographs (imported, never served from public/),
                     with stock/CREDITS.md
src/core/constants/  site URL, main navigation, hero images and alt text,
                     social image size
src/core/i18n/       routing, request config, navigation
src/lib/             localize, split-ltr-runs, highlight-terms, pick-messages,
                     about-sections, contact-items, parse-tier, organization-schema,
                     build-page-metadata, build-alternates, open-graph-locale,
                     read-legal-sections
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
- Map on the Contact page (needs a confirmed address)
- The Contact details card and the footer contact column appear once the council supplies contact details
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
- `about.*` (`messages/ar.json`, `messages/en.json`): the About page's wording: the page title, lede and description, the in-page pill labels, the three "Who we are" paragraphs, the sentence after the standing line and the "Approval" and "Ratification" labels on the two institution cards, the objectives lede, the people section titles and the "View profile" link
- `WHY_JOIN` (`src/content/why-join.ts`): the four Why join rows (trade growth, investment opportunities, sector committees, events and networking), their titles and sentences, and the alt text of their four stock photographs
- `membership.*` (`messages/ar.json`, `messages/en.json`): the Membership page's wording: the page title, lede and description, the in-page pill labels, the Why join introduction, the benefits and tiers titles and ledes, the "Everything in {tier}, plus" line, and the "Apply" label with its screen-reader suffix
- `privacy.*` and `terms.*` (`messages/ar.json`, `messages/en.json`): the privacy policy and terms of use, with their titles, ledes, descriptions and "Last updated" lines. **Needs legal review** before launch
- `notFound.*` (`messages/ar.json`, `messages/en.json`): the 404 wording, also used by the standalone `src/app/not-found.tsx`
- Hero image alt text (`src/core/constants/images.ts`)
- `CONTACT_SUBJECTS`, `APPLICATION_SECTORS`, `COMPANY_SIZES`, `COUNTRIES` (`src/content/application-options.ts`): the labels of the form select lists
