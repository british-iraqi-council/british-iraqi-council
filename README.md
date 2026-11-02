# IBBC website

Arabic-first, bilingual (Arabic and English) website for the Iraqi–British Business Council, formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce and ratified by the Ministry of Commerce. Next.js 16 App Router, Tailwind v4, next-intl v4.

## Routes

```
/ar, /en    Home: hero, standing strip, who we are, vision and mission,
            objectives, why Iraq, membership band, the "Approved and ratified
            by" band (partners once supplied)
/about      About: page heading with in-page pills, who we are, official
            standing, objectives, the Board (one member so far; honorary
            advisors and executive team once supplied, each with its pill)
/membership Membership: page heading with in-page pills, why join (four
            image and text rows, with the sector committees), benefits,
            the three tiers, each with an Apply link to /membership/apply,
            then the "Approved and ratified by" band
/membership/apply
            Membership application (?tier= pre-selects a tier)
/contact    Contact details card (phone so far) beside the form
/privacy    Privacy policy (draft, needs legal review)
/terms      Terms of use (draft, needs legal review)
(any other) Branded 404 in the visitor's language
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
src/core/config/     fonts via next/font/google
src/core/constants/  site URL, API base URL, form endpoints, main navigation,
                     hero images and alt text, social image size
src/core/i18n/       routing, request config, navigation
src/core/new-components/common/
                     shared UI (see below)
src/core/services/   api-services (multipart POST returning Result<T>)
src/core/types/      Result<T>, failures, form action state
src/repositories/    contact and membership: <name>_repo.ts, <name>_impl.ts
src/lib/             localize, split-ltr-runs, isolate-ltr-runs, highlight-terms,
                     pick-messages, about-sections, contact-items, parse-tier,
                     parse-form-errors, to-form-data, zod-helpers, is-active-path,
                     organization-schema, build-page-metadata, build-alternates,
                     open-graph-locale, read-legal-sections
src/proxy.ts         next-intl middleware
scripts/smoke.mjs    smoke checks against a running build
scripts/audit-contrast.js
                     browser contrast audit (inject into a page, call
                     auditContrast(document))
tests/               vitest unit tests
docs/                design spec and identity reference
```

## Layout

The container, spacing and section-heading sizes follow the team's Baghdad Expo site, at the project lead's request (2026-11-02). Every block sits in the `shell` utility (`src/app/tailwind.css`): up to 1800px wide with 24, 40, 80 and 112px side padding, exposed as `--shell-max` and `--shell-pad`. `<main>` alone spaces the top-level blocks, 96px apart and 128px from 1024px. Section titles run 36 to 60px, inner-page titles 44 to 72px and the Home title 48 to 76px. CLAUDE.md has the details.

## Shared components

`src/core/new-components/common/`, each folder exporting the component and its flat `<name>-props.ts`.

```
site-shell/        Skip link, header, <main> and footer around every page
site-header/       Fixed header: transparent over the Home hero, white elsewhere;
                   links and Contact pill from lg, a focus-trapping menu below it
site-footer/       Blue footer: brand, standing line, quick links, legal links,
                   contact column (the phone so far); social links once supplied
institutions-band/ "Approved and ratified by" band naming the two Iraqi
                   institutions, on Home and Membership
brand/             Emblem with the IBBC wordmark and the council's name
emblem/            The octagonal emblem with its red notch (inline SVG)
button/            Pills: red, white, blue, outline-light
language-switcher/ Switches to the other language, keeping the path and query
page-heading/      Blue band at the top of every inner page: title, red rule,
                   lede, optional in-page pills; carries #content
section/           Section with the standard inset
section-heading/   Section title with an optional lede, dark or light
index-pills/       In-page index as pills (About, Membership)
icon-card-grid/    Cards with an icon, title and sentence (objectives, Why Iraq,
                   benefits)
icon/              Maps a content icon name to its lucide icon
form-field/        Label, hint, error and described-by wiring; CONTROL_CLASS
legal-page/        Privacy and terms pages from their message sections
rich-text/         Isolates every Latin or numeric run in a content string
ltr-run/           One isolated left-to-right run
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

## Deploy and environment

The site is built for Vercel on Node 24 (`engines` in `package.json`, `.nvmrc`). Every page is prerendered, so the variables below are read at build time: changing one needs a new deployment.

- `NEXT_PUBLIC_SITE_URL`: the site's public address, such as `https://www.example.org`, used for canonical URLs, `hreflang` alternates, the sitemap, Open Graph links and the schema.org block. A trailing slash is removed. When it is not set, the site uses `https://` plus `VERCEL_PROJECT_PRODUCTION_URL` (set by Vercel), and `http://localhost:3000` outside Vercel. Set it once the domain is confirmed.
- `NEXT_PUBLIC_BASE_URL`: the base address of the API that receives the two forms; the paths in `src/core/constants/endpoints.ts` are added after `/api`. Next.js writes its value into the build, so changing it needs a redeploy. While it is unset, or while the endpoints do not exist, both forms tell the visitor that the message could not be sent.
- `VERCEL_ENV` (set by Vercel): `/robots.txt` allows crawling only when it is `production`. Preview deployments and local builds ask crawlers to stay out, and `npm run smoke` expects the same unless `VERCEL_ENV=production`.

## Waiting on the council

None of these blocks the launch. Each one, when it arrives, switches on the part of the site that waits for it.

- Logo files (SVG) and the full identity deck; the emblem on the site is a drawn match of the identity image
- Fonts and exact colours; the fonts in use are stand-ins
- The domain (the site's canonical URLs, sitemap and Open Graph links follow `NEXT_PUBLIC_SITE_URL`)
- Confirmation of the two details taken from the business card in the identity deck: Sohaib Mohammed Abdullah as Vice Chairman (on About) and +964 790 199 9998 as the council's phone (on Contact, in the footer and in the schema.org block). Remove them from `src/content/people.ts` and `src/content/organisation.ts` if the card was a design mock-up, and update the checks that assert them: `scripts/smoke.mjs` (the `tel:+9647901999998` check and the board-present check), `tests/content.test.ts` (the BOARD ids) and `tests/organization-schema.test.ts` (the telephone)
- People: the rest of the board, honorary advisors, executive team (names, roles, organisations, photos, links), and a photo of the Vice Chairman. Each About section and its pill appear once its people are supplied
- Partners and supporters, with logos and permission. The Home section appears once supplied
- Contact details still missing: address, email, office hours, social accounts. Each appears in the Contact details card, the footer and the schema.org block once supplied
- Map on the Contact page (needs a confirmed address)
- Logos of the Federation of Iraqi Chambers of Commerce and the Ministry of Commerce, only if the council supplies them with permission; until then both are named in text
- Where form submissions should go: both forms post to endpoints that do not exist yet (`src/core/constants/endpoints.ts`, with `NEXT_PUBLIC_BASE_URL`) and tell the visitor honestly that the message could not be sent
- Confirmation, or changes, for the draft copy below, in particular the tiers and their features, the sector committees, the Why Iraq sectors, the vision, the mission and the objectives
- Confirmation that Arabic is the default language
- The council's own photographs, to replace the stock frames over time (all current photographs are stock, credited in `src/assets/images/stock/CREDITS.md`)
- For the later phase: member companies for the directory, events, and news
- Legal review of the privacy policy and terms. Two points need it in particular: the privacy text says the council shares the data with no one, which must be revisited once a hosting or processing provider or a form endpoint is in place; and the privacy text names the contact form as the channel for data requests, which cannot deliver anything until the form endpoint exists. A working phone now exists, so the privacy text could name it alongside the contact form for data requests

## Draft copy for review

Written for this build in Arabic and English, live as written, pending the council's review. Each task that adds descriptive wording lists it here.

- `ORGANISATION.description` (`src/content/organisation.ts`): the one-sentence site description, also used in metadata and the schema.org block
- `OBJECTIVES` (`src/content/objectives.ts`): the six objectives, titles and sentences
- `WHY_IRAQ` (`src/content/why-iraq.ts`): four sector tiles (energy; construction and infrastructure; agriculture and food; technology), titles and sentences, each framed as a partnership between Iraqi and British companies
- `BENEFITS` (`src/content/benefits.ts`): Access, Visibility, Advocacy, Networking, each with its sentence
- `TIERS` (`src/content/tiers.ts`): Bronze, Silver and Gold, their names, taglines and features (Silver and Gold list only what they add)
- `COMMITTEES` (`src/content/committees.ts`): five sector committees
- `home.*` (`messages/ar.json`, `messages/en.json`): the Home page's wording: the hero headline and sentence ("Where Iraqi enterprise meets British business"), button labels, the "Who we are" paragraph, the vision and mission, the objectives and Why Iraq ledes, the membership band sentence, the partners headings, and the Home page title and description
- `about.*` (`messages/ar.json`, `messages/en.json`): the About page's wording: the page title, lede and description, the in-page pill labels, the three "Who we are" paragraphs, the sentence after the standing line and the "Approval" and "Ratification" labels on the two institution cards, the objectives lede, the people section titles and the "View profile" link
- `WHY_JOIN` (`src/content/why-join.ts`): the four Why join rows (trade growth, investment opportunities, sector committees, events and networking), their titles and sentences, and the alt text of their four stock photographs
- `membership.*` (`messages/ar.json`, `messages/en.json`): the Membership page's wording: the page title, lede and description, the in-page pill labels, the Why join introduction, the benefits and tiers titles and ledes, the "Everything in {tier}, plus" line, and the "Apply" label with its screen-reader suffix
- `contact.*` (`messages/ar.json`, `messages/en.json`): the Contact page's wording: the page title, lede and description, the introduction sentence, the form labels and placeholders, the summary shown when fields need correcting, and the success and "could not send" messages
- `contact.form.title` (`messages/ar.json`, `messages/en.json`): the visually hidden form heading ("Send a message")
- `contact.details.*` (`messages/ar.json`, `messages/en.json`): the contact details card's title and labels
- `institutions.*` (`messages/ar.json`, `messages/en.json`): the "Approved and ratified by" band's title and its Approval and Ratification labels
- `apply.*` (`messages/ar.json`, `messages/en.json`): the application page's wording: the page title, lede and description, the three group titles, the field labels and hints, the consent sentence, the "Remove file" button, the "opens in a new tab" cue read to screen readers after the privacy policy link, the summary shown when fields need correcting, and the success and "could not send" messages. Two lines describe how the council handles applications and need its confirmation: the tier hint ("You can change tier later by talking it through with the council") and the success message ("the council will be in touch")
- `forms.errors.*` (`messages/ar.json`, `messages/en.json`): the validation messages of both forms
- `privacy.*` and `terms.*` (`messages/ar.json`, `messages/en.json`): the privacy policy and terms of use, with their titles, ledes, descriptions and "Last updated" lines. **Needs legal review** before launch (see the two points under "Waiting on the council")
- Tier feature wording: three features were reworded so that no tier label shares a five-word run with JBBC's feature labels: "An entry in the council's directory of members once it opens" (Bronze), "Priority invitations to high-level gatherings and roundtables" (Silver) and "Following up opportunities and partnerships" (Gold)
- Wording about the council's standing: the site describes the council as formed in Iraq with the approval of Iraqi institutions, and its official standing as standing in Iraq only (`home.who.body`, `about.standing.body`, `membership.whyJoin.intro`, the Advocacy benefit and the investment row of Why join). Any wider claim needs the council's confirmation
- `notFound.*` (`messages/ar.json`, `messages/en.json`): the 404 wording, also used by the standalone `src/app/not-found.tsx`
- Hero image alt text (`src/core/constants/images.ts`)
- `CONTACT_SUBJECTS`, `APPLICATION_SECTORS`, `COMPANY_SIZES`, `COUNTRIES` (`src/content/application-options.ts`): the labels of the form select lists
