# IBBC Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship the first release of the Iraqi–British Business Council website: Arabic-first, bilingual, in the IBBC identity, with Home, About, Membership, Apply, Contact, Privacy and Terms.

**Architecture:** A Next.js 16 App Router site statically generated per locale under `src/app/[locale]/(public)/`, ported from the sibling Al-Dallah project's structure (next-intl routing and proxy, `{ ar, en }` content data, `RichText` direction isolation, `Result<T>` repositories). Sections whose facts are not yet supplied are modelled as empty data and render nothing. Both forms are server actions posting `multipart/form-data` to endpoints that do not exist yet, so they fail honestly.

**Tech Stack:** Next.js 16, React 19, TypeScript 5 strict, Tailwind CSS 4, next-intl 4, Zod 4, lucide-react, rtl-detect, Vitest 3 (unit tests), Node 24.

**Spec:** `docs/superpowers/specs/2026-11-02-ibbc-website-design.md`. Read it in full before Task 1. Companions: `docs/jbbc-reference.md`; the approved hero mockup `.superpowers/brainstorm/1551-1793621964/content/home-a-photos.html`; the sibling project at `C:\Users\user\Desktop\Projects\aldallah-group-landingpage` (called **Al-Dallah** below), whose `CLAUDE.md` traps apply here too.

## Global Constraints

- Name: `IBBC`, `Iraqi–British Business Council`, `مجلس الأعمال العراقي البريطاني` (Iraq first, en dash in the English).
- Standing line, English: "Formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce, and ratified by the Ministry of Commerce." Arabic: "تأسس المجلس في العراق بموافقة اتحاد الغرف التجارية العراقية ومصادقة وزارة التجارة."
- Locales `ar` (default) and `en`; `/` redirects to `/ar`; every page exists in both.
- **No placeholders, ever**: nothing in brackets, no dummy names, no sample logos. A section with no confirmed data renders nothing, and its menu entry and anchor go with it.
- **No invented facts**: no person, member company, partner, address, phone number, figure, date or event that the project lead has not supplied. Today none are supplied: board, advisors, team, partners and every contact detail are empty.
- **No JBBC copy**: no JBBC sentence, maroon colour, wave banner pattern, Brown typeface or London-landmark photo band.
- Colours (hex, defined in `src/app/tailwind.css` only): blue `#0B2470`, blue-deep `#071A55`, red `#C8102E`, ivory `#F3EEE4`, white `#FFFFFF`, ink `#14204A`, muted `#545B78`, line `#E4DCCB`. The only other colour tokens are the ones Tasks 4 and 7 add (`on-blue-muted`, `tier-*`). Red is an accent only, never a large background, and never text below 18px. Text is never coloured with opacity. (Superseded 2026-11-02: red is the Iraqi flag red `#CE1126`.)
- Fonts via `next/font/google`: Cormorant SC 600 (English headings), Amiri 400/700 (Arabic headings), Inter (English body), IBM Plex Sans Arabic 400/500/600 (Arabic body). Arabic never gets small caps or letter-spacing.
- The hero title is the largest text on the page at every width; form inputs are 16px; tier feature text is at least 15px.
- Logical properties only (`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`); never `left`/`right` utilities.
- Al-Dallah conventions: no code comments; no `any`, `@ts-ignore` or `React.FC`; Server Components by default, `"use client"` on leaves only; kebab-case files, PascalCase components; props types in `types/<component>-props.ts` inside page folders and flat beside shared components; repositories keep `<name>_repo.ts` / `<name>_impl.ts`.
- Every content string with a Latin or numeric run renders through `RichText`.
- `setRequestLocale(locale)` in every layout and page; every route shows `●` (SSG) in the build output.
- Commit messages carry **no** `Co-Authored-By` trailer (the project lead's standing rule for their repos).
- Work on branch `feat/first-release`; `main` is reached only through a pull request.

## Review Focus

1. **Arabic text with embedded Latin or digits** ("IBBC", "PDF", "4 MB", years): must read in the right order. Pinned by `split-ltr-runs` tests in Task 1 and the unisolated-run walk in Task 12.
2. **A form submitted with one invalid field**: every value the visitor typed, including the file, must survive. Pinned by the manual check steps in Tasks 9 and 10 (submit through `startTransition`, as Al-Dallah's trap describes).
3. **`/membership/apply` opened with no tier, or with `?tier=platinum`**: the page must render with no tier selected, never crash or pre-select something wrong. Pinned by `parseTier` tests in Task 3.
4. **Long words at 360px** ("Telecommunications", the standing line, Arabic institution names): no horizontal overflow. Pinned by the overflow sweep in Task 12 and `[overflow-wrap:anywhere]` on titles.
5. **Unprefixed URLs** (`/about`, `/membership/apply`): must redirect to `/ar/...`, not 404 (the proxy matcher trap). Pinned by `scripts/smoke.mjs` from Task 1.

---

## File Structure

```
british-iraqi-council/                 repository root (existing folder; docs/ already here)
├── AGENTS.md  CLAUDE.md  README.md
├── package.json  tsconfig.json  next.config.ts  postcss.config.mjs  eslint.config.mjs
├── vitest.config.ts  .prettierrc.json  .prettierignore  .gitignore  .nvmrc
├── messages/ar.json  messages/en.json
├── scripts/smoke.mjs                  HTTP smoke checks against a running build
├── scripts/audit-contrast.js          copied from Al-Dallah
├── docs/reference/identity/ibbc-identity-sample.jpeg   the identity image, for matching the emblem
└── src/
    ├── proxy.ts
    ├── app/
    │   ├── tailwind.css               the only place colours, fonts and the type scale are defined
    │   ├── icon.svg  apple-icon.tsx   from the emblem
    │   ├── not-found.tsx  sitemap.ts  robots.ts
    │   └── [locale]/
    │       ├── layout.tsx  not-found.tsx  opengraph-image.tsx  [...rest]/page.tsx
    │       └── (public)/
    │           ├── layout.tsx
    │           ├── (home)/            page.tsx page-client.tsx components/
    │           ├── about/             page.tsx page-client.tsx components/
    │           ├── membership/        page.tsx page-client.tsx components/
    │           │   └── apply/         page.tsx page-client.tsx components/ actions/ schemas/ types/
    │           ├── contact/           page.tsx page-client.tsx components/ actions/ schemas/ types/
    │           ├── privacy/  terms/   page.tsx (shared LegalPage component)
    ├── assets/images/stock/           flag close-ups, why-join photos, CREDITS.md
    ├── content/                       typed { ar, en } data; types.ts; index.ts
    ├── core/
    │   ├── config/fonts.ts
    │   ├── constants/                 site.ts navigation.ts endpoints.ts base-url.ts images.ts
    │   ├── i18n/                      routing.ts request.ts navigation.ts
    │   ├── services/api-services.ts
    │   ├── types/results/             results.ts failures.ts
    │   └── new-components/common/     shared UI, one folder per component
    ├── lib/                           pure helpers (tested)
    └── repositories/contact/  repositories/membership/
tests/                                 Vitest unit tests (*.test.ts)
```

---

### Task 1: Repository, toolchain, routing and smoke harness

**Files:**

- Create: everything under "root config" in the tree; `messages/{ar,en}.json` (namespaces `common` and `nav` only for now); `src/proxy.ts`; `src/core/i18n/{routing,request,navigation}.ts`; `src/lib/{localize,split-ltr-runs,pick-messages}.ts`; `src/app/[locale]/layout.tsx`; `src/app/[locale]/(public)/layout.tsx` with `types/public-layout-props.ts`; `src/app/[locale]/(public)/(home)/page.tsx` (temporary: renders the council name in an `h1`); `src/app/[locale]/[...rest]/page.tsx`; `src/app/[locale]/not-found.tsx`; `src/app/not-found.tsx`; `scripts/smoke.mjs`; `CLAUDE.md`; `README.md`; `AGENTS.md`.
- Copy: `docs/reference/identity/ibbc-identity-sample.jpeg` from `C:\Users\user\Downloads\WhatsApp Image 2026-11-02 at 5.18.11 AM.jpeg`.
- Test: `tests/split-ltr-runs.test.ts`, `tests/localize.test.ts`

**Interfaces:**

- Produces: `routing` and `type Locale = "ar" | "en"` from `@/core/i18n/routing`; `Link`, `usePathname`, `getPathname` from `@/core/i18n/navigation`; `interface Localized { ar: string; en: string }` and `localize(value: Localized, locale: string): string` from `@/lib/localize`; `splitLtrRuns(text: string): TextRun[]` from `@/lib/split-ltr-runs`; `pickMessages` from `@/lib/pick-messages`; npm scripts `dev`, `build`, `start`, `lint`, `format`, `test`, `smoke`, `gitcheck`.

- [ ] **Step 1: Initialise git on the existing folder from the remote**

```bash
cd C:/Users/user/Desktop/Projects/british-iraqi-council
git init
git remote add origin https://github.com/british-iraqi-council/british-iraqi-council.git
git fetch origin
git reset origin/main
git checkout -- README.md
git checkout -b feat/first-release
```

Expected: `git status` shows `docs/` untracked and nothing deleted. Write `.gitignore` as Al-Dallah's, but **without** the `docs/superpowers/` line (docs are committed here) and keeping `.superpowers/`, `.playwright-mcp/`, `.claude/`, `.vercel`.

- [ ] **Step 2: Port the toolchain**

Copy from Al-Dallah and adapt names: `package.json` (name `ibbc-website`, description from the spec's section 1, same `dependencies` minus `gsap`, `@gsap/react` and `lenis`; add devDependency `vitest@^3`; scripts as Al-Dallah plus `"test": "vitest run"` and `"smoke": "node scripts/smoke.mjs"`, and `gitcheck` = lint, format, test, clean build), `tsconfig.json`, `next.config.ts` (keep `turbopack.root` and `serverActions.bodySizeLimit: "5mb"`; no redirects), `postcss.config.mjs`, `eslint.config.mjs`, `.prettierrc.json`, `.prettierignore` (drop the `docs/client/` lines), `.nvmrc` (`24`). Add `vitest.config.ts` with `test.environment: "node"`, `test.include: ["tests/**/*.test.ts"]`, and `resolve.alias: { "@": <abs path to src> }`. Run `npm install`.

- [ ] **Step 3: Write the failing unit tests**

Copy `src/lib/split-ltr-runs.ts`'s behaviour into tests first:

```ts
import { describe, expect, it } from "vitest";
import { splitLtrRuns } from "@/lib/split-ltr-runs";

describe("splitLtrRuns", () => {
  it("isolates the Latin acronym inside Arabic", () => {
    expect(splitLtrRuns("مجلس IBBC للأعمال")).toEqual([
      { text: "مجلس ", ltr: false },
      { text: "IBBC", ltr: true },
      { text: " للأعمال", ltr: false },
    ]);
  });
  it("keeps a size with its unit as one run", () => {
    expect(splitLtrRuns("الحد الأقصى 4 MB").at(-1)).toEqual({
      text: "4 MB",
      ltr: true,
    });
  });
  it("returns one non-LTR run for pure Arabic", () => {
    expect(splitLtrRuns("العراق")).toEqual([{ text: "العراق", ltr: false }]);
  });
});
```

`tests/localize.test.ts`: `localize({ ar: "أ", en: "A" }, "ar")` is `"أ"`, `"en"` gives `"A"`.

- [ ] **Step 4: Run them to verify they fail**

Run: `npm test`. Expected: FAIL, cannot resolve `@/lib/split-ltr-runs`.

- [ ] **Step 5: Copy `localize.ts`, `split-ltr-runs.ts`, `pick-messages.ts` and the three `i18n` files verbatim from Al-Dallah; copy `src/proxy.ts` verbatim (the matcher keeps the double backslash `.*\\..*`).**

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`. Expected: PASS (4 tests).

- [ ] **Step 7: Write `scripts/smoke.mjs` and the minimal app**

`smoke.mjs` uses `fetch` against `process.env.BASE_URL ?? "http://localhost:3100"` with `redirect: "manual"`, collects failures, prints them and exits 1 if any. Checks:

- `GET /` and `GET /about` answer 307/308 with `location` ending `/ar` and `/ar/about`.
- For each locale and each path in `const PATHS = [""]` (later tasks append), status 200; the HTML has `<html lang="ar" dir="rtl"` or `<html lang="en" dir="ltr"`.
- With `<script>` and `<style>` blocks removed and then every tag removed (attributes hold Tailwind classes such as `[overflow-wrap:anywhere]`), the remaining text contains none of `[`, `]`, `undefined`, `TODO`, `lorem`.
- `GET /ar/does-not-exist` answers 404.

Minimal app: the locale layout as Al-Dallah's `src/app/[locale]/layout.tsx` without the fonts, `ogImage` and JSON-LD for now (they arrive in Tasks 2 and 11); `(public)/layout.tsx` as Al-Dallah's but rendering `<main id="content">{children}</main>` until Task 4; the temporary home page renders `common.siteName`; `[...rest]` and both `not-found` files ported (the root one restyled in Task 11). `messages`: `common.siteName` = "مجلس الأعمال العراقي البريطاني" / "Iraqi–British Business Council", `common.siteShort` = "IBBC".

- [ ] **Step 8: Build, start and smoke**

Run: `npm run build` (expect `●` for `/[locale]`), then `npx next start -p 3100` in the background, then `npm run smoke`. Expected: `smoke: all checks passed`.

- [ ] **Step 9: Write `CLAUDE.md`, `README.md`, `AGENTS.md`**

`AGENTS.md`: copy Al-Dallah's. `CLAUDE.md`: imports `@AGENTS.md` and `@README.md`, then states, from the spec: the content rules (no placeholders, omit empty sections, no invented facts, no JBBC copy, draft copy goes live and is reviewed later), the colour and font tokens, the hero rule (Iraq on the reading-start side), and the Al-Dallah traps that apply (proxy matcher, `setRequestLocale`, RTL isolation, form reset, server-action locale, contrast against the darkest surface, text over photographs measured against pixels, background-tab and early-measurement artifacts). `README.md`: routes, layer map, commands, and a **"Waiting on the council"** list (logo files, fonts and exact colours, domain, people, partners, contact details, form destination, legal review) plus a **"Draft copy for review"** list, both kept current by later tasks.

- [ ] **Step 10: Commit**

```bash
npm run lint && npm run format && git add -A
git commit -m "Set up the IBBC site: toolchain, locale routing and smoke checks"
```

---

### Task 2: Theme tokens and fonts

**Files:**

- Create: `src/app/tailwind.css`, `src/core/config/fonts.ts`
- Modify: `src/app/[locale]/layout.tsx` (font variables on `<html>`, `bg-ivory text-ink font-sans` on `<body>`)
- Test: `tests/tokens.test.ts`

**Interfaces:**

- Produces: Tailwind colours `blue`, `blue-deep`, `red`, `ivory`, `white`, `ink`, `muted`, `line`; font utilities `font-sans` (body, per locale) and `font-display` (headings, per locale); text steps `text-hero`, `text-display`, `text-headline`, `text-title`, `text-lead`; utilities `shell` (the one container), `rule-red` (the short red rule under titles), `reveal` (scroll entrance), `bidi-isolate`; font exports `cormorant`, `amiri`, `inter`, `plexArabic`.

- [ ] **Step 1: Write the failing contrast test**

`tests/tokens.test.ts` reads `src/app/tailwind.css`, extracts every `--color-<name>: #rrggbb;`, computes WCAG contrast, and asserts:

```ts
expect(ratio("ink", "ivory")).toBeGreaterThanOrEqual(7);
expect(ratio("muted", "ivory")).toBeGreaterThanOrEqual(4.5);
expect(ratio("muted", "white")).toBeGreaterThanOrEqual(4.5);
expect(ratio("blue", "ivory")).toBeGreaterThanOrEqual(7);
expect(ratio("white", "blue")).toBeGreaterThanOrEqual(7);
expect(ratio("white", "red")).toBeGreaterThanOrEqual(4.5);
expect(ratio("white", "blue-deep")).toBeGreaterThanOrEqual(7);
```

and that the eight token values equal the Global Constraints hex values exactly.

- [ ] **Step 2: Run it to verify it fails** — `npm test`; expected FAIL (file not found).

- [ ] **Step 3: Write `tailwind.css` and `fonts.ts`**

`@import "tailwindcss";`, `@theme` with the eight colours as hex, the five text steps as `clamp()` (hero 44→76px, display 36→60px, headline 28→42px, title 18→22px, lead 17→19px), `--font-sans: var(--font-inter)`, `--font-display: var(--font-cormorant)`. Unlayered rules at the end of the file: `html[lang="ar"] { --font-sans: var(--font-plex-arabic); --font-display: var(--font-amiri); }`; `html[lang="ar"] *:not([dir="ltr"]):not([dir="ltr"] *) { letter-spacing: 0 }`; Arabic line-heights as Al-Dallah's (body 1.75, headings 1.35–1.5). `@utility shell` = full width, `padding-inline` 16/24/40px at base/640/1024, `max-width: 84rem`, `margin-inline: auto`. `@utility rule-red` = `width:4.5rem;height:3px;background:var(--color-red)`. `@utility reveal` = a 600ms fade-and-rise driven by `animation-timeline: view()` with `animation-range: entry 0% entry 40%`, wrapped in `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`, so content is fully visible wherever it is unsupported. `bidi-isolate` as Al-Dallah's. `fonts.ts`: four `next/font/google` instances with `variable` names `--font-cormorant`, `--font-amiri`, `--font-inter`, `--font-plex-arabic`, `display: "swap"`, subsets `latin` (Cormorant, Inter) and `arabic` + `latin` (Amiri, Plex). (Superseded 2026-11-02: the container and type scale now follow the Baghdad Expo site; see CLAUDE.md and spec §6.2–6.3.)

- [ ] **Step 4: Run tests** — `npm test`; expected PASS.

- [ ] **Step 5: Build and smoke** — `npm run build && npm run smoke` (with the server restarted); expected pass.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "Add the IBBC colour, type and font tokens"`

---

### Task 3: Content data and pure helpers

**Files:**

- Create: `src/content/{types,organisation,people,partners,objectives,why-iraq,benefits,tiers,committees,application-options,index}.ts` (`why-join.ts` arrives in Task 7 with its photographs); `src/lib/{about-sections,contact-items,parse-tier,organization-schema}.ts`; `src/core/constants/{site,navigation}.ts`
- Test: `tests/about-sections.test.ts`, `tests/contact-items.test.ts`, `tests/parse-tier.test.ts`, `tests/organization-schema.test.ts`, `tests/content.test.ts`

**Interfaces:**

- Produces (in `src/content/types.ts`):

```ts
export type IconName =
  | "trending-up"
  | "handshake"
  | "globe"
  | "landmark"
  | "megaphone"
  | "book-open"
  | "zap"
  | "building"
  | "wheat"
  | "graduation-cap"
  | "heart-pulse"
  | "cpu"
  | "key-round"
  | "eye"
  | "users";
export interface IconCard {
  id: string;
  icon: IconName;
  title: Localized;
  body: Localized;
}
export interface Person {
  id: string;
  name: Localized;
  role: Localized;
  organisation?: Localized;
  photo?: StaticImageData;
  url?: string;
}
export interface Partner {
  id: string;
  kind: "partner" | "supporter";
  name: string;
  logo: StaticImageData;
  url?: string;
}
export type TierId = "bronze" | "silver" | "gold";
export interface Tier {
  id: TierId;
  name: Localized;
  tagline: Localized;
  added: Localized[];
}
export interface WhyJoinRow {
  id: string;
  title: Localized;
  body: Localized;
  image: StaticImageData;
  imageAlt: Localized;
}
export type SocialNetwork =
  "linkedin" | "x" | "facebook" | "instagram" | "youtube";
export interface ContactDetails {
  address?: Localized;
  phone?: string;
  email?: string;
  hours?: Localized;
  social: { network: SocialNetwork; url: string }[];
}
export interface Option<T extends string> {
  value: T;
  label: Localized;
}
```

- Produces (exports from `@/content`): `ORGANISATION: { name: Localized; short: "IBBC"; standing: Localized; description: Localized; contact: ContactDetails }` with `contact = { social: [] }`; `BOARD`, `ADVISORS`, `TEAM`: `readonly Person[]` (all `[]`); `PARTNERS: readonly Partner[]` (`[]`); `OBJECTIVES` (6 `IconCard`), `WHY_IRAQ` (4 `IconCard`), `BENEFITS` (4 `IconCard`), `TIERS: readonly Tier[]` (bronze, silver, gold, in that order), `COMMITTEES: readonly Localized[]`, `CONTACT_SUBJECTS`, `APPLICATION_SECTORS`, `COMPANY_SIZES`, `COUNTRIES` as `readonly Option<...>[]`.
- Produces (helpers): `aboutSections(people: { board: readonly Person[]; advisors: readonly Person[]; team: readonly Person[] }): AboutSectionId[]` where `type AboutSectionId = "who-we-are" | "standing" | "objectives" | "board" | "advisors" | "team"`; `contactItems(contact: ContactDetails, locale: Locale): ContactItem[]` where `interface ContactItem { kind: "address" | "phone" | "email" | "hours"; text: string; href?: string }`; `parseTier(value: string | null | undefined): TierId | undefined`; `organizationSchema(locale: Locale, siteUrl: string, logoUrl: string): Record<string, unknown>`; `SITE_URL: string`; `MAIN_NAV: readonly { href: string; key: string }[]`.

- [ ] **Step 1: Write the failing tests**

```ts
// about-sections.test.ts
expect(aboutSections({ board: [], advisors: [], team: [] })).toEqual([
  "who-we-are",
  "standing",
  "objectives",
]);
expect(
  aboutSections({ board: [person], advisors: [], team: [person] }),
).toEqual(["who-we-are", "standing", "objectives", "board", "team"]);

// contact-items.test.ts
expect(contactItems({ social: [] }, "en")).toEqual([]);
expect(contactItems({ phone: "+964 790 000 0000", social: [] }, "en")).toEqual([
  { kind: "phone", text: "+964 790 000 0000", href: "tel:+9647900000000" },
]);
expect(contactItems({ email: "a@b.iq", social: [] }, "ar")[0]).toEqual({
  kind: "email",
  text: "a@b.iq",
  href: "mailto:a@b.iq",
});
expect(
  contactItems(
    { address: { ar: "بغداد", en: "Baghdad" }, social: [] },
    "ar",
  )[0],
).toEqual({ kind: "address", text: "بغداد" });

// parse-tier.test.ts
expect(parseTier("gold")).toBe("gold");
expect(parseTier("GOLD")).toBeUndefined();
expect(parseTier("platinum")).toBeUndefined();
expect(parseTier(null)).toBeUndefined();
expect(parseTier(undefined)).toBeUndefined();

// organization-schema.test.ts
const s = organizationSchema(
  "en",
  "https://example.org",
  "https://example.org/logo.png",
);
expect(s["@type"]).toBe("Organization");
expect(s.name).toBe("Iraqi–British Business Council");
expect(s.alternateName).toBe("مجلس الأعمال العراقي البريطاني");
expect(s).not.toHaveProperty("telephone");
expect(s).not.toHaveProperty("email");
expect(s).not.toHaveProperty("address");

// content.test.ts: walks every exported collection and asserts
//   every Localized has non-empty, trimmed ar and en;
//   ids are unique within each collection;
//   TIERS.map(t => t.id) equals ["bronze", "silver", "gold"];
//   OBJECTIVES.length === 6, WHY_IRAQ.length === 4, BENEFITS.length === 4;
//   BOARD, ADVISORS, TEAM and PARTNERS are empty (a change here must be deliberate);
//   no string anywhere contains "[" or "]".
```

The test fixture `person` is built inside the test file.

- [ ] **Step 2: Run them to verify they fail** — `npm test`; expected FAIL (modules missing).

- [ ] **Step 3: Implement the types, data and helpers**

Draft copy is written fresh for Iraq, in both languages, from the spec's sections 1 and 5 (never JBBC's sentences). `OBJECTIVES` follow spec 5.1 item 5 in that order with icons trending-up, handshake, globe, landmark, megaphone, book-open; `WHY_IRAQ` is four tiles (the spec asks for three or four): energy, infrastructure and construction, agriculture, technology, with icons zap, building, wheat, cpu, and no figures or claims that need a source; `BENEFITS` are Access, Visibility, Advocacy, Networking with icons key-round, eye, megaphone, users, each with its own sentence; `TIERS[].added` follow spec 5.3 item 4 (gold and silver list only what they add); `COMMITTEES` are five draft sector committees; `CONTACT_SUBJECTS` values `general | membership | partnership | media | other`; `APPLICATION_SECTORS` values `energy | construction | trade | finance | technology | health | education | agriculture | transport | manufacturing | services | other`; `COMPANY_SIZES` values `1-10 | 11-50 | 51-250 | 251-1000 | 1000+`; `COUNTRIES` values `iraq | uk | other`. `contactItems` returns items in the order address, phone, email, hours; phone `href` is `tel:` plus the phone with everything except digits and `+` removed. `organizationSchema` includes `telephone`, `email` and `address` only when `ORGANISATION.contact` has them. `SITE_URL` = `process.env.NEXT_PUBLIC_SITE_URL`, else `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` when set, else `http://localhost:3000`. `MAIN_NAV` = home `/`, about `/about`, membership `/membership`, contact `/contact`. Add every draft item to README's "Draft copy for review".

- [ ] **Step 4: Run tests** — `npm test`; expected PASS.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "Add IBBC content data and the helpers that hide unsupplied sections"`

---

### Task 4: Brand mark and site chrome

**Files:**

- Create in `src/core/new-components/common/`: `emblem/`, `brand/` (emblem + "IBBC" + the name in both scripts), `button/`, `ltr-run/`, `rich-text/`, `section/`, `section-heading/`, `page-heading/`, `icon/` (maps `IconName` to lucide), `language-switcher/`, `site-header/` (`site-header.tsx`, `header-links.tsx`, `mobile-menu.tsx`), `site-footer/`, `site-shell/`, `index.ts`; each folder with its flat `<name>-props.ts` and `index.ts`.
- Create: `src/app/icon.svg`, `src/app/apple-icon.tsx`
- Modify: `src/app/[locale]/(public)/layout.tsx` (render `SiteShell`); `src/app/[locale]/layout.tsx` (shell message namespaces `common`, `nav`, `languageSwitcher`, `footer`); `messages/*.json`.

**Interfaces:**

- Consumes: `MAIN_NAV`, `ORGANISATION`, `contactItems`, tokens from Tasks 2–3.
- Produces: `Emblem({ className, title? })` (SVG, `currentColor` for the rings, red `#C8102E` notch); `Brand({ tone: "light" | "dark" })`; `Button({ href, variant: "red" | "white" | "blue" | "outline-light", children, external? })`; `RichText({ text, locale })`; `LtrRun`; `Section({ id?, className?, children })` (`<section>` with `shell`); `SectionHeading({ id?, title, lede?, align?: "start" | "center", tone?: "dark" | "light" })` renders `h2.font-display text-headline` + `rule-red`; `PageHeading({ title, lede?, children? })` (the blue band, `id="content"` on its text block, `tabIndex={-1}`); `Icon({ name: IconName, className })`; `SiteShell({ children })`.

- [ ] **Step 1: Draw the emblem**

Open `docs/reference/identity/ibbc-identity-sample.jpeg` and the mockup's `#emblem2` symbol. Draw `emblem.tsx` as a single `viewBox="0 0 100 100"` SVG: an outer octagon band, an inner octagonal ring broken into four segments, a central ring, and the red notch on the outer band's top edge toward the end, matched to the sample's proportions. Save the same artwork as `src/app/icon.svg` (blue `#0B2470` on transparent). `apple-icon.tsx` uses `ImageResponse` (180×180, ivory ground, blue emblem). Check by rendering both side by side with the sample at 44px and 200px; the silhouette and the notch position must read as the same mark.

- [ ] **Step 2: Port the primitives**

`ltr-run` and `rich-text`: verbatim from Al-Dallah. `button`: Al-Dallah's `button.tsx` API with these variants instead of the glow ones: red (`bg-red text-white`), white (`bg-white text-blue`), blue (`bg-blue text-white`), outline-light (a white border, white text); pills `rounded-full px-6 py-2.5 text-sm font-semibold min-h-11`, a visible focus ring. `page-heading`: blue band, `shell` inside, `h1.font-display text-display text-white`, `rule-red`, the lede in `text-lead text-on-blue-muted`. Add `--color-on-blue-muted: #C9D0EA` to `tailwind.css` and `expect(ratio("on-blue-muted", "blue")).toBeGreaterThanOrEqual(7)` to `tests/tokens.test.ts`. Every `h1`/`h2` title in `PageHeading`, `SectionHeading` and cards takes `hyphens-auto [overflow-wrap:anywhere]`.

- [ ] **Step 3: Port the header**

Start from Al-Dallah's `site-header.tsx`, `header-links.tsx` and its in-file menu. Keep: transparent with white text over the Home hero while scrolled under 60px and the menu is closed; otherwise a solid white bar with a `line` bottom border; the menu below `lg` as a white sheet with `aria-modal`, focus trap, Escape, scroll lock, closing at 64rem. Change: `Brand` on the start side; links from `MAIN_NAV` **excluding** contact, each with a red 2px underline on hover and on `aria-current="page"`; at the end the language switch and a red "Contact us" `Button` to `/contact`. The mobile menu lists all four `MAIN_NAV` links, the language switch and the Contact button. The skip link targets `#content`.

- [ ] **Step 4: Build the footer**

`site-footer.tsx`: a `bg-blue` band, `shell`: `Brand tone="light"`; a quick-links column from `MAIN_NAV`; a contact column rendered **only if** `contactItems(ORGANISATION.contact, locale).length > 0`, with `href` items as links; social icons only if `ORGANISATION.contact.social` is non-empty; a bottom row with Privacy and Terms links and `© {year} {siteName}` (year from `new Date().getFullYear()` at build).

- [ ] **Step 5: Wire the shell, build and smoke**

`site-shell.tsx`: skip link, `SiteHeader`, `<main>` as a flex column with `gap-16 lg:gap-24 pb-16 lg:pb-24` (the only source of vertical rhythm between top-level blocks), `SiteFooter`. The temporary Home `h1` moves inside a `PageHeading`, so `#content` exists. Run `npm test && npm run build && npm run smoke`; expected pass.

- [ ] **Step 6: Check in the browser** at 360 and 1440 in both locales: the header switches state on scroll on Home only, the menu traps focus and closes on Escape, the footer has no contact column. Commit: `git add -A && git commit -m "Add the IBBC emblem, header, footer and shared components"`

---

### Task 5: Home page

**Files:**

- Create in `src/app/[locale]/(public)/(home)/`: `page.tsx` (replace the temporary one), `page-client.tsx`, `loading.tsx`, `components/{hero,standing-strip,who-we-are,vision-mission,objectives,why-iraq,membership-band,partners,index}.tsx`, `types/` for any props.
- Create: `src/assets/images/stock/{iraq-flag-closeup.jpg,uk-flag-closeup.jpg,CREDITS.md}`; `src/core/constants/images.ts` (`HERO_IMAGES = { iraq: { src, alt: Localized }, uk: { src, alt: Localized } }`).
- Modify: `messages/*.json` (`home.*`), `scripts/smoke.mjs` (no new path; add: the `/ar` and `/en` HTML each contain the standing line in their language).

**Interfaces:**

- Consumes: `Section`, `SectionHeading`, `Button`, `RichText`, `Icon`, `Emblem` (Task 4); `ORGANISATION`, `OBJECTIVES`, `WHY_IRAQ`, `PARTNERS` (Task 3).
- Produces: `IconCardGrid({ items: readonly IconCard[], columns: 3 | 4, tone?: "light" | "dark" })` in `src/core/new-components/common/icon-card-grid/`, used by Home, About (Task 6) and Membership (Task 7): white `rounded-2xl` cards with a `line` edge, the icon in a small ivory square, the title in `font-display text-title text-blue`, the body in `text-muted`; one column below 640px, two to 1024px, then `columns`.

- [ ] **Step 1: Add the smoke expectation and see it fail** — add the standing-line check; run `npm run build && npm run smoke`; expected FAIL on that check.

- [ ] **Step 2: Fetch and credit the photographs**

Download at 2400px wide: `https://images.unsplash.com/photo-1675855547471-4898466f11e2?w=2400&q=80&fm=jpg` → `iraq-flag-closeup.jpg`; `https://images.unsplash.com/photo-1628598917536-a95fd30a6f58?w=2400&q=80&fm=jpg` → `uk-flag-closeup.jpg`. `CREDITS.md` lists photographer (engin akyurt; chris robert), the Unsplash page URLs from the spec section 6.5, and "Unsplash License". Alt text describes "Close-up of the Iraqi flag in fabric" / "Close-up of the British flag in fabric" and the Arabic equivalents.

- [ ] **Step 3: Build the hero** to match `home-a-photos.html`: a `relative` box `min-h-[38rem] lg:min-h-[42rem]` that pulls up under the header like Al-Dallah's (`-mt-20 lg:-mt-24`); two `next/image` halves in a two-column grid in DOM order Iraq then UK (so Arabic places Iraq on the right automatically); a 4px `bg-red` seam centred on the boundary above the veil; the veil as the mockup's three gradients, mirrored in RTL with the `rtl:` variant; the text block at the reading-start bottom with `id="content"` and `tabIndex={-1}`: the other-language line (`lang` set to that language), `h1.font-display text-hero`, `rule-red`, the sentence in `text-lead`, `Button` white "Learn more" → `/about`, red "Become a member" → `/membership#tiers`. Below 640px the halves stack (Iraq on top), each 50% of the hero height, and the veil darkens the lower half for the text. Headline copy: en "Where Iraqi enterprise meets British business", ar "حيث تلتقي المؤسسات العراقية بالأعمال البريطانية".

- [ ] **Step 4: Build the remaining sections in the spec's order** (5.1 items 2–8): `StandingStrip` (white band, `Emblem`, the standing line with both institution names in `font-semibold text-blue`); `WhoWeAre` (paragraph, blue "Read more" → `/about`, beside the same flag pair in a `rounded-2xl` frame with the red seam); `VisionMission` (a `bg-blue` band, `SectionHeading tone="light" align="center"`, two cards with `border-white/20 bg-white/5` and `text-white` / `text-on-blue-muted`); `Objectives` (`IconCardGrid columns={3}`); `WhyIraq` (`IconCardGrid columns={4}`); `MembershipBand` (a `bg-blue-deep` band, one sentence, red "Apply now" → `/membership#tiers`); `Partners` returns `null` when `PARTNERS` is empty. Every section carries the `reveal` utility on its inner content, not on the heading text block of the hero.

- [ ] **Step 5: Metadata** — `page.tsx` exports `generateMetadata` via `buildPageMetadata(locale, "home.meta", "")` (ported in Task 11; until then return `{ title: { absolute: t("home.meta.title") }, description: t("home.meta.description") }` directly).

- [ ] **Step 6: Verify** — `npm test && npm run build && npm run smoke`: expected pass. In the browser at 360, 768, 1440 and 1920 in both locales: Iraq is on the reading-start side; the hero title is the largest text; no horizontal scroll; there is no Partners section.

- [ ] **Step 7: Commit** — `git add -A && git commit -m "Build the IBBC home page"`

---

### Task 6: About page

**Files:**

- Create in `src/app/[locale]/(public)/about/`: `page.tsx`, `page-client.tsx`, `loading.tsx`, `components/{profile,standing,people-section,index}.tsx`; `src/core/new-components/common/index-pills/` (ported from Al-Dallah, `mobileOnly` removed).
- Modify: `messages/*.json` (`about.*`), `scripts/smoke.mjs` (`PATHS` += `"/about"`; and: `/en/about` contains `id="objectives"` and does **not** contain `id="board"`).

**Interfaces:**

- Consumes: `aboutSections`, `BOARD`, `ADVISORS`, `TEAM`, `OBJECTIVES`, `IconCardGrid`, `PageHeading`, `SectionHeading`.
- Produces: `PeopleSection({ id: "board" | "advisors" | "team", title, people: readonly Person[] })`, returning `null` for an empty list.

- [ ] **Step 1: Extend the smoke script and run it** — expected FAIL (`/ar/about` 404).

- [ ] **Step 2: Implement** — `PageHeading` with `IndexPills` built from `aboutSections(...)` (labels from `about.sections.<id>`); `Profile` (`#who-we-are`, three or four draft paragraphs capped at `max-w-[68ch]`); `Standing` (`#standing`, the standing line as a lead, naming both bodies, no logos); `#objectives` with `IconCardGrid`; three `PeopleSection`s. Person cards (for when data arrives): photo in a 4:5 frame or a neutral `lucide` `UserRound` silhouette on `line`, name in `font-display text-title`, role in `text-blue font-medium`, organisation in `text-muted`, optional link. Grid 1/2/3/4 columns at base/640/1024/1280.

- [ ] **Step 3: Verify** — `npm test && npm run build && npm run smoke`; expected pass. Browser: the pills list exactly Who we are, Official standing, Objectives, and each scrolls to its section clear of the header.

- [ ] **Step 4: Commit** — `git add -A && git commit -m "Build the About page"`

---

### Task 7: Membership page

**Files:**

- Create in `src/app/[locale]/(public)/membership/`: `page.tsx`, `page-client.tsx`, `loading.tsx`, `components/{why-join,benefits,tiers,tier-card,index}.tsx`.
- Create: `src/content/why-join.ts`; four photographs in `src/assets/images/stock/` with entries in `CREDITS.md`.
- Modify: `messages/*.json` (`membership.*`), `scripts/smoke.mjs` (`PATHS` += `"/membership"`; and: the page contains three links whose `href` ends `/membership/apply?tier=bronze`, `...silver`, `...gold`).

**Interfaces:**

- Consumes: `TIERS`, `BENEFITS`, `COMMITTEES`, `IconCardGrid`, `Button`.
- Produces: `WHY_JOIN` (Task 3's type).

- [ ] **Step 1: Extend the smoke script and run it** — expected FAIL.

- [ ] **Step 2: Choose the four photographs** for Trade growth, Investment opportunities, Sector committees, Events and networking: free Unsplash photographs of business meetings, Baghdad, London, ports or industry; no logos, no military or protest scenes, nothing that implies IBBC's own events. Record each in `CREDITS.md`; alt text describes the scene generically.

- [ ] **Step 3: Implement** — `PageHeading` with pills Why join, Benefits, Tiers; `#why-join`: an intro paragraph then four alternating image/text rows (image `rounded-2xl`, order flips on even rows via `lg:order-last`), the committees row listing `COMMITTEES` as small `line`-bordered chips; `#benefits`: `IconCardGrid columns={4}`; `#tiers`: three `TierCard`s, each a white card with a 4px top edge in its metal colour (bronze `#B0743F`, silver `#8A8F99`, gold `#B8932E`, added to `tailwind.css` as `--color-tier-*` and used only for that edge and a small dot), name in `font-display text-headline text-blue`, tagline, "Everything in {previous tier}, plus" for silver and gold, the `added` list with check icons at `text-[15px]`, and a full-width blue `Button` "Apply" → `/membership/apply?tier=<id>`.

- [ ] **Step 4: Verify** — `npm test && npm run build && npm run smoke`; expected pass. Browser at 360: tier cards stack, feature text measures 15px or more.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "Build the Membership page with tiers"`

---

### Task 8: Form plumbing: services, repositories and schemas

**Files:**

- Create: `src/core/types/results/{results,failures,index}.ts`, `src/core/services/{api-services,index}.ts`, `src/core/constants/{endpoints,base-url}.ts` (all ported verbatim from Al-Dallah; `endpoints.ts` holds `CONTACT_ENDPOINT = "/ContactUs/SendContactUsMessage"` and `APPLICATION_ENDPOINT = "/Membership/SubmitApplication"`); `src/repositories/contact/{contact_repo,contact_impl,types,index}.ts`; `src/repositories/membership/{membership_repo,membership_impl,types,index}.ts`; `src/lib/{to-form-data,parse-form-errors}.ts`; `src/app/[locale]/(public)/contact/schemas/{contact-schema,index}.ts`; `src/app/[locale]/(public)/membership/apply/schemas/{application-schema,index}.ts`.
- Modify: `messages/*.json` (`error.unexpectedError`, `forms.errors.*` for every error key below).
- Test: `tests/contact-schema.test.ts`, `tests/application-schema.test.ts`, `tests/to-form-data.test.ts`

**Interfaces:**

- Produces: `contactRepo.send(payload: ContactPayload): Promise<Result<ResultType<null>>>`; `membershipRepo.apply(payload: ApplicationPayload): Promise<Result<ResultType<null>>>`; `toFormData(payload: Record<string, string | File | undefined>): FormData` (skips empty strings and `undefined`); `parseFormErrors<K extends string>(error: ZodError, fields: readonly K[], translate: (key: string) => string): Partial<Record<K, string>>`; `contactSchema`, `type ContactValues`, `CONTACT_FIELDS`; `applicationSchema`, `type ApplicationValues`, `APPLICATION_FIELDS`, `ATTACHMENT_MAX_BYTES = 4 * 1024 * 1024`; `type ContactField = (typeof CONTACT_FIELDS)[number]` and `type ApplicationField = (typeof APPLICATION_FIELDS)[number]` exported beside their schemas; `type FormActionState<K extends string> = { status: "idle" } | { status: "invalid"; errors: Partial<Record<K, string>> } | { status: "error"; message: string } | { status: "success"; message: string }` in `src/core/types/form-action-state.ts`.

- [ ] **Step 1: Write the failing schema tests**

```ts
// contact-schema.test.ts
const valid = {
  name: "Ali Hassan",
  email: "ali@example.iq",
  subject: "general",
  message: "We would like to learn more.",
};
expect(contactSchema.safeParse(valid).success).toBe(true);
expect(
  contactSchema.safeParse({ ...valid, company: "", phone: "" }).success,
).toBe(true);
expect(issue(contactSchema, { ...valid, name: "A" })).toEqual({
  name: "nameRequired",
});
expect(issue(contactSchema, { ...valid, email: "nope" })).toEqual({
  email: "emailInvalid",
});
expect(issue(contactSchema, { ...valid, subject: "spam" })).toEqual({
  subject: "subjectRequired",
});
expect(issue(contactSchema, { ...valid, message: "short" })).toEqual({
  message: "messageTooShort",
});
expect(issue(contactSchema, { ...valid, phone: "123" })).toEqual({
  phone: "phoneInvalid",
});

// application-schema.test.ts
const base = {
  companyName: "Tigris Trading",
  sector: "trade",
  country: "iraq",
  fullName: "Sara Kareem",
  email: "sara@tigris.iq",
  phone: "+964 770 000 0000",
  tier: "silver",
  consent: "on",
};
expect(applicationSchema.safeParse(base).success).toBe(true);
expect(issue(applicationSchema, { ...base, tier: "platinum" })).toEqual({
  tier: "tierRequired",
});
expect(issue(applicationSchema, { ...base, consent: undefined })).toEqual({
  consent: "consentRequired",
});
expect(issue(applicationSchema, { ...base, website: "not a url" })).toEqual({
  website: "websiteInvalid",
});
expect(
  issue(applicationSchema, {
    ...base,
    attachment: new File(["x"], "profile.docx"),
  }),
).toEqual({ attachment: "attachmentType" });
expect(
  issue(applicationSchema, {
    ...base,
    attachment: new File([new Uint8Array(4 * 1024 * 1024 + 1)], "p.pdf", {
      type: "application/pdf",
    }),
  }),
).toEqual({ attachment: "attachmentTooLarge" });
expect(
  applicationSchema.safeParse({
    ...base,
    attachment: new File(["%PDF"], "p.pdf", { type: "application/pdf" }),
  }).success,
).toBe(true);

// to-form-data.test.ts
const fd = toFormData({
  a: "1",
  b: "",
  c: undefined,
  d: new File(["x"], "f.pdf"),
});
expect([...fd.keys()]).toEqual(["a", "d"]);
```

`issue(schema, input)` is a local helper returning `{ [path[0]]: message }` for the first issue per field.

- [ ] **Step 2: Run them to verify they fail** — `npm test`; expected FAIL.

- [ ] **Step 3: Implement** — schemas in Zod 4 with these fields and error keys. Contact: `name` 2–120 (`nameRequired`, `nameTooLong`), `company` optional ≤160, `email` (`emailInvalid`), `phone` optional, when present 7–24 (`phoneInvalid`), `subject` enum of `CONTACT_SUBJECTS` values (`subjectRequired`), `message` 10–2000 (`messageTooShort`, `messageTooLong`). Application: `companyName` 2–160, `sector` enum (`sectorRequired`), `country` enum (`countryRequired`), `city` optional ≤80, `website` optional URL (`websiteInvalid`), `companySize` optional enum, `fullName` 2–120, `position` optional ≤120, `email`, `phone` 7–24 (`phoneRequired`), `tier` enum `bronze|silver|gold` (`tierRequired`), `heardFrom` optional ≤160, `message` optional ≤2000, `attachment` optional PDF by extension and MIME (`application/pdf` or empty) ≤4 MB (`attachmentType`, `attachmentTooLarge`), `consent` literal `"on"` (`consentRequired`). Empty optional strings are treated as absent (`z.preprocess` to `undefined`). Repositories follow Al-Dallah's `contact_impl.ts` using `toFormData`.

- [ ] **Step 4: Run tests** — `npm test`; expected PASS.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "Add form schemas, repositories and the request service"`

---

### Task 9: Contact page and form

**Files:**

- Create in `src/app/[locale]/(public)/contact/`: `page.tsx`, `page-client.tsx`, `loading.tsx`, `components/{contact-details,contact-form,index}.tsx`, `actions/{send-message,index}.ts`, `types/{contact-form-props,index}.ts`; `src/core/new-components/common/form-field/` (label, control slot, hint, error; `id`/`aria-describedby`/`aria-invalid` wiring) shared with Task 10.
- Modify: `messages/*.json` (`contact.*`, `forms.*` labels, placeholders and messages), `scripts/smoke.mjs` (`PATHS` += `"/contact"`; and: the page has no `href="tel:` and no `href="mailto:`, and has a `<form`).

**Interfaces:**

- Consumes: `contactSchema`, `CONTACT_FIELDS`, `parseFormErrors`, `contactRepo`, `FormActionState`, `contactItems`, `CONTACT_SUBJECTS`.
- Produces: `sendMessage(prev: FormActionState<ContactField>, formData: FormData): Promise<FormActionState<ContactField>>`; `FormField({ id, label, required?, hint?, error?, children })`.

- [ ] **Step 1: Extend the smoke script and run it** — expected FAIL.

- [ ] **Step 2: Implement the action** as Al-Dallah's `send-enquiry.ts`: read the hidden `locale` field and validate it against `routing.locales`; if the hidden honeypot field `nickname` is non-empty, return `{ status: "success", message }` without calling the repository; validate; on failure translate errors with `forms.errors`; call `contactRepo.send`; any failure returns `{ status: "error", message: t("forms.unsentMessage") }`, worded honestly ("We couldn't send your message right now. Please try again later." / its Arabic), never as a success.

- [ ] **Step 3: Implement the page** — `PageHeading`; when `contactItems(...)` is empty the page shows a one-sentence intro and the form card alone, centred at `max-w-2xl`; otherwise the details card beside the form (from `lg`). The form follows Al-Dallah's `enquiry-form.tsx`: `useActionState`, `onSubmit` that prevents default and calls `formAction` inside `startTransition`, `action={formAction}` kept for no-JS, reset only on success, inline errors, a status region with `role="status"`/`aria-live="polite"`. Fields: name*, company, email*, phone, subject* (select, `appearance-none` with a chevron), message* (fixed height). All controls `text-base` (16px), `rounded-xl`, white, with a `border-muted` edge (above 3:1 on white, as Task 2's test already guarantees) and a blue focus ring. No map: it is added when the council confirms an address, and README's "Waiting on the council" list says so. Honeypot: a `sr-only` labelled input `nickname` with `tabIndex={-1}` and `autoComplete="off"`, inside an `aria-hidden` wrapper.

- [ ] **Step 4: Verify** — `npm test && npm run build && npm run smoke`; expected pass. In the browser, both locales: submit empty → every required field shows its error; fill all but email, submit → the other values remain; fill correctly, submit → the honest unsent message appears and the values remain.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "Build the Contact page and form"`

---

### Task 10: Membership application

**Files:**

- Create in `src/app/[locale]/(public)/membership/apply/`: `page.tsx`, `page-client.tsx`, `loading.tsx`, `components/{application-form,index}.tsx`, `actions/{send-application,index}.ts`, `types/{application-form-props,index}.ts`.
- Modify: `messages/*.json` (`apply.*`), `scripts/smoke.mjs` (`PATHS` += `"/membership/apply"`; and: the HTML contains `name="tier"` three times and `name="consent"`).

**Interfaces:**

- Consumes: `applicationSchema`, `APPLICATION_FIELDS`, `parseTier`, `membershipRepo`, `FormField`, `TIERS`, `APPLICATION_SECTORS`, `COMPANY_SIZES`, `COUNTRIES`, `ATTACHMENT_MAX_BYTES`.
- Produces: `sendApplication(prev: FormActionState<ApplicationField>, formData: FormData): Promise<FormActionState<ApplicationField>>`.

- [ ] **Step 1: Extend the smoke script and run it** — expected FAIL.

- [ ] **Step 2: Implement the action** — same pattern as Task 9's, with `membershipRepo.apply`.

- [ ] **Step 3: Implement the page and form** — `page.tsx` stays static: it must not read `searchParams`. `ApplicationForm` is a client component that reads the tier with `useSearchParams()` and `parseTier`, and `page-client.tsx` wraps it in `<Suspense>` (otherwise the route leaves static generation). Three fieldsets with `legend`s (Company, Contact person, Membership); the tier as three radio cards defaulting to the parsed tier or none; the attachment as Al-Dallah's dashed drop zone (`<label>` wrapping an `sr-only` file input, `accept=".pdf"`, size and type checked on change against `ATTACHMENT_MAX_BYTES`, showing the chosen file name); the consent checkbox with a link to `/privacy`; the honeypot; submit through `startTransition` as in Task 9.

- [ ] **Step 4: Verify** — `npm test && npm run build && npm run smoke`; the build table shows `●` for `/[locale]/membership/apply`. Browser: `/en/membership/apply?tier=gold` pre-selects Gold; `?tier=platinum` and no query select nothing; a 5 MB PDF is rejected on change; one invalid field keeps every other value and the chosen file; a valid submit shows the honest unsent message.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "Build the membership application"`

---

### Task 11: Legal pages, metadata, sitemap, robots, social image, 404

**Files:**

- Create: `src/app/[locale]/(public)/{privacy,terms}/page.tsx`; `src/core/new-components/common/legal-page/` (`LegalPage({ namespace })` rendering `PageHeading` and a prose column of `h2` + paragraphs from messages); `src/lib/{build-page-metadata,build-alternates}.ts` (ported, using the social image below); `src/app/[locale]/opengraph-image.tsx`; `src/app/sitemap.ts`; `src/app/robots.ts`.
- Modify: `src/app/[locale]/layout.tsx` (metadata as Al-Dallah's, `locale` `ar_IQ`/`en_GB`; the JSON-LD block from `organizationSchema`); every page's `generateMetadata` → `buildPageMetadata`; `src/app/not-found.tsx` and `src/app/[locale]/not-found.tsx` restyled in the IBBC tokens (blue `404` in `font-display`, a line in each language, a blue pill home); `messages/*.json` (`privacy.*`, `terms.*`, `notFound.*`, `*.meta`); `scripts/smoke.mjs` (`PATHS` += `"/privacy"`, `"/terms"`; and: `/sitemap.xml` lists 14 URLs; `/robots.txt` disallows `/` when `VERCEL_ENV` is not `production`; each page's HTML has a `<link rel="alternate" hreflang="ar"` and `hreflang="en"`).

**Interfaces:**

- Consumes: `organizationSchema`, `SITE_URL`, `Emblem`.
- Produces: `buildPageMetadata(locale: string, namespace: string, path: string): Promise<Metadata>`.

- [ ] **Step 1: Extend the smoke script and run it** — expected FAIL.

- [ ] **Step 2: Write the legal drafts** — Privacy covers: who we are, what the contact form and the application collect (the fields from Task 8), why, how long it is kept (state as "only as long as needed to handle the request or membership", no invented periods), who it is shared with (no one, except as required by law), cookies (none beyond those needed to run the site), rights and how to exercise them (through the contact form while no email is published). Terms covers: use of the site, content ownership, accuracy, external links, membership applications subject to the council's approval, changes to the terms. Both open with "Last updated" set to the build's first release date. Add both to README's "Draft copy for review" with "needs legal review".

- [ ] **Step 3: Implement metadata, sitemap, robots and the social image** — sitemap from the seven paths × two locales; robots as Al-Dallah's; `opengraph-image.tsx` with `ImageResponse` 1200×630: blue ground, the white emblem (inline SVG paths), "IBBC" and "Iraqi–British Business Council" in white, a red rule. The layout uses it via the file convention, and `buildPageMetadata` stops importing a PNG.

- [ ] **Step 4: Verify** — `npm test && npm run build && npm run smoke`; expected pass; every route `●`.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "Add legal pages, metadata, sitemap, robots and the 404"`

---

### Task 12: Verification sweep, docs and pull request

**Files:**

- Create: `scripts/audit-contrast.js` (copied from Al-Dallah).
- Modify: `CLAUDE.md`, `README.md` (final routes, components, the two lists), anything the sweep finds.

- [ ] **Step 1: Gate** — `npm run gitcheck` passes up to `next start` (port conflicts at the final step are not failures); then `npx next start -p 3100` and `npm run smoke` pass.

- [ ] **Step 2: Contrast** — inject `scripts/audit-contrast.js` into each of the seven pages × two locales at 360, 768 and 1440 (Playwright MCP, `addScriptTag`), after waiting for `readyState === "complete"`, decoding images and forcing inline `opacity: 1` on `.reveal` elements; expected `failures: 0`. Hide the header first (it is transparent over the hero).

- [ ] **Step 3: Hero against pixels** — at 360, 768, 1440 and 1920 in both locales, record each hero text box with `Range.getClientRects()`, set the hero text to `transparent` with `transition: none`, take a **viewport** screenshot, and take the brightest pixel in each box. Required: title and other-language line ≥ 3:1 (large text), paragraph and button labels ≥ 4.5:1 against white text. If any fails, deepen the veil where that text sits and re-measure; record the final numbers in `CLAUDE.md`.

- [ ] **Step 4: Arabic direction** — on every `/ar` page, walk the text nodes of `main` and the footer for `[A-Za-z0-9]` without a `dir="ltr"` ancestor; expected list empty (the other-language `lang="en"` line in the hero is exempt only if it carries `dir="ltr"`).

- [ ] **Step 5: Overflow** — at 360px on every page in both locales, `document.documentElement.scrollWidth === 360` and no element has `scrollWidth > clientWidth` among headings and buttons.

- [ ] **Step 6: Keyboard** — Tab from the top of each page: the skip link appears first and lands on `#content`; focus is visible on every control; the mobile menu traps focus, closes on Escape and returns focus to its button.

- [ ] **Step 7: Content audit** — read every page in both locales against the Global Constraints: no placeholder, no invented fact, no JBBC sentence (compare against `docs/jbbc-reference.md`), no stock photo implied to be IBBC's own. Update the README lists.

- [ ] **Step 8: Commit and push**

```bash
git add -A && git commit -m "Verify the first release and document the project"
git push -u origin feat/first-release
```

- [ ] **Step 9: Open the pull request** into `main` on GitHub (the `gh` CLI is not installed here; open it from the URL `git push` prints, or install `gh`). Title "First release of the IBBC website"; body: what is in the release, what is waiting on the council (README list), the verification results from Steps 1–6, ending with the attribution line required for PR descriptions.
