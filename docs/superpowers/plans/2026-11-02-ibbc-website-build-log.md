# SDD ledger — plan: docs/superpowers/plans/2026-11-02-ibbc-website.md

Spec: docs/superpowers/specs/2026-11-02-ibbc-website-design.md (reachable, read).
Branch: feat/first-release (from origin/main 3aca4d1). Local `master` renamed to `main`, tracking origin/main.

## Setup

- Task 1 Step 1 (git init, remote, reset to origin/main, branch feat/first-release) done by the controller as the workspace setup. HEAD 3aca4d1.
- Ruling: Task 1 Step 1 executed by the controller as setup — the repo had to exist before the SDD workspace could — costs nothing if wrong (identical commands to the plan).

## Pre-flight scan

| Pair / task              | Produces vs consumes                                                                                                                       | Finding                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| T1 → T2                  | T1 locale layout; T2 adds font variables to it                                                                                             | consistent                                                                                                                                  |
| T1 → T4                  | T1 `(public)/layout.tsx` renders `<main id="content">`; T4 replaces with SiteShell                                                         | consistent                                                                                                                                  |
| T2 → T4, T7              | tokens.test asserts the 8 base values; T4 adds on-blue-muted, T7 adds tier-*                                                               | consistent (test checks only the 8 by name)                                                                                                 |
| T3 → T5, T6, T7, T9, T10 | content types, ORGANISATION, aboutSections, contactItems, parseTier, option lists                                                          | consistent                                                                                                                                  |
| T3 ↔ T7                  | WhyJoinRow type in T3; WHY_JOIN data in T7; content.test walks exported collections                                                        | T7 must add WHY_JOIN to content.test's walk — carry in T7 dispatch                                                                          |
| T4 → T5                  | T4 puts temporary home h1 in PageHeading (#content); T5 hero owns #content                                                                 | consistent                                                                                                                                  |
| T4 → T5                  | SiteShell `<main>`; T5 hero pulls up with -mt-20 lg:-mt-24                                                                                 | GAP: T4 never gives `<main>` top padding for the fixed header (Al-Dallah: pt-20 lg:pt-24). Ruling below                                     |
| T5 → T6, T7              | IconCardGrid                                                                                                                               | consistent                                                                                                                                  |
| T5/T6/T7 → T11           | temporary metadata replaced by buildPageMetadata                                                                                           | consistent                                                                                                                                  |
| T8 → T9, T10             | schemas, repos, FormActionState, ContactField/ApplicationField                                                                             | T8 Files list omits `src/core/types/form-action-state.ts` that its Interfaces name. Ruling below                                            |
| T9 → T10                 | FormField                                                                                                                                  | consistent                                                                                                                                  |
| T10 self                 | form reads tier with useSearchParams inside Suspense; smoke expects `name="tier"` ×3 in static HTML                                        | CONFLICT: a Suspense-wrapped useSearchParams form renders only its fallback in the prerendered HTML, so the smoke check fails. Ruling below |
| T11 self                 | robots ported from Al-Dallah (allows when NODE_ENV=production and no VERCEL_ENV); smoke expects disallow when VERCEL_ENV is not production | CONFLICT under `next start` locally. Ruling below                                                                                           |
| T12 self                 | Steps 8–9 push and open a PR                                                                                                               | side effect outside the worktree. Ruling below                                                                                              |
| T1 self                  | tests vs code                                                                                                                              | consistent (regex verified by hand against both test strings)                                                                               |
| T2 self                  | consistent                                                                                                                                 |
| T3 self                  | consistent                                                                                                                                 |
| T4 self                  | consistent apart from the main padding gap                                                                                                 |
| T5 self                  | consistent                                                                                                                                 |
| T6 self                  | consistent                                                                                                                                 |
| T7 self                  | consistent (WHY_JOIN walk note)                                                                                                            |
| T8 self                  | file list gap only                                                                                                                         |
| T9 self                  | consistent                                                                                                                                 |
| T11 self                 | robots conflict only                                                                                                                       |

## Rulings

- Ruling: T4 SiteShell `<main>` gets `pt-20 lg:pt-24` (as Al-Dallah) so inner pages clear the fixed header, and the Home hero pulls up with `-mt-20 lg:-mt-24` — the plan's T5 pull-up only makes sense with it — costs a padding tweak if wrong.
- Ruling: T8 creates `src/core/types/form-action-state.ts` (named in its Interfaces) — file-list omission — costs nothing.
- Ruling: T10 does not use useSearchParams/Suspense; ApplicationForm renders fully in the static HTML and a `useEffect` reads `window.location.search` through `parseTier` on mount to pre-select the tier (controlled radios) — keeps the route static and the form in the HTML, satisfying the smoke check and no-JS use — cost if wrong: a brief unselected state before hydration.
- Ruling: T11 robots allow crawling only when `VERCEL_ENV === "production"`; everywhere else (local `next start`, previews) disallow — matches the smoke expectation and keeps previews unindexed — cost if wrong: none for launch, production on Vercel is still allowed.
- Ruling: T12 Steps 8–9 (push, pull request) are not dispatched; they run in finishing-a-development-branch after asking the project lead — a push to the shared remote is a stop-class side effect — cost: one confirmation.
- Ruling: T7 adds WHY_JOIN to tests/content.test.ts's collection walk — keeps the invariant test complete — costs nothing.

## Progress

Task 1: dispatched (implementer afaeb03801505483d, base 3aca4d1)
Task 1: minor (deferred): CLAUDE.md writes the proxy matcher as `.*\..*` in prose; should show the string-literal `.*\..*`
Task 1: minor (deferred): src/app/not-found.tsx hard-codes Arabic (Task 11 restyles it)
Task 1: minor (deferred): tsconfig include type-checks tests/ and vitest.config.ts in next build
Task 1: ⚠️ resolved by controller — commit has no trailer; identity jpeg byte-identical to the supplied file; docs/ changes are Prettier formatting of new files
Task 1: complete (commits 3aca4d1..f010bc0, review clean)
Task 2: dispatched (implementer a2ae8d65dd56a8852, base f010bc0)
Task 2: minor (deferred): tailwind.css font-variant-caps !important under ar is unneeded
Task 2: minor (deferred): Arabic hero line-height 1.35 equals display (Al-Dallah 1.25)
Task 2: minor (deferred): Arabic body line-height 1.75 applies only with a text-* class; body has none — carried into Task 4 (body line-height)
Task 2: minor (deferred): all four fonts load on both locales (small perf cost)
Task 2: minor (deferred): tokens.test regex last-wins on duplicates; no test pins the ar font swap or reveal guards
Task 2: complete (commits f010bc0..009abea, review clean)
Task 3: dispatched (base 009abea)
Task 3: note — Arabic COMPANY_SIZES labels contain digits; <option> cannot hold RichText — carry to Task 10 (isolate with Unicode FSI/PDI)
Task 3: minor (deferred): tier feature labels follow JBBC's labels (plan-mandated via spec 5.3) — flag to project lead for council rewording
Task 3: minor (deferred, FIX IN FINAL WAVE): Arabic polish — tiers.ts:60,65 "معرفة بالسوق مصمّمة" → "معلومات وتحليلات عن السوق مخصّصة لشركتك"; tiers.ts:38 "كبار الضيوف" → "كبار الشخصيات"; "الطاولات المستديرة" → "الموائد المستديرة" (tiers.ts:38, objectives.ts:18); objectives.ts:18 "تضع الأعضاء أمام" → "تجمع الأعضاء بـ"; objectives.ts:9 "وفي الأسواق الأبعد" → "وخارجهما"; benefits.ts:7 "الوصول" → "فرص الوصول"
Task 3: minor (deferred, FIX IN FINAL WAVE): why-iraq.ts tone casts Britain as giver of expertise (agriculture tile esp.) — reword as partnership, Iraq as the opportunity
Task 3: minor (deferred, FIX IN FINAL WAVE): organization-schema.ts:20 drop `inLanguage` (not an Organization property)
Task 3: minor (deferred): organization-schema present-field branch untested (vi.mock @/content)
Task 3: minor (deferred): tier ids kept in three places (TierId, TIER_IDS, TIERS)
Task 3: minor (deferred): copy consistency — subject "Partnership" vs "الشراكات"; "Infrastructure and construction" vs "Construction and infrastructure"; energy tile colon
Task 3: minor (deferred): organization-schema url double slash if siteUrl ends with /
Task 3: complete (commits 009abea..b55b7d7, review clean)
Task 4: dispatched (base b55b7d7)
Task 4: Ruling: emblem follows the identity image (two broken octagonal rings, hollow centre) rather than the brief/spec wording "central ring" — the project lead approved "the logo like the picture"; the image is the authority — cost if wrong: redraw one SVG
Task 4: minor (deferred): Brand uses off-scale sizes (text-3xl, text-xs; 12px Plex Arabic) — flag to project lead or make a brand token
Task 4: minor (deferred, FIX IN FINAL WAVE): mobile menu focus lost when it closes at 64rem (trigger is lg:hidden)
Task 4: minor (deferred, FIX IN FINAL WAVE): aria-controls="site-menu" points at nothing while closed
Task 4: minor (deferred, FIX IN FINAL WAVE): header nav and menu dialog share one accessible name
Task 4: minor (deferred → carried into Task 10): LanguageSwitcher drops the query string (loses ?tier)
Task 4: minor (deferred): red active underline ~2.4:1 over Home hero (spec-mandated colour; aria-current also set)
Task 4: minor (deferred, FIX IN FINAL WAVE): site-footer.tsx `as Locale` cast; narrow with hasLocale
Task 4: note — extras accepted: apple-icon added to proxy matcher exclusion (double backslash kept); standing line under footer brand (flag to project lead); social text pills; English name normal case in Brand (flag)
Task 4: complete (commits b55b7d7..54a14ea, review clean)
Task 5: dispatched (base 54a14ea)
Task 5: Ruling: no `loading.tsx` on any route (plan Tasks 5, 6, 7, 9, 10 list one) — with loading.tsx, Next streams the prerendered page body into a hidden div outside <main>, so content is invisible without JavaScript and the smoke check cannot scope to <main>; every route is fully static, so a loading skeleton adds nothing — cost if wrong: no skeleton during client-side navigation between static pages
Task 5: Ruling: hero deviates from the mockup for contrast (all hero text white, deeper veil, text block stops 2rem before the seam from 1024px) — spec 6.5 requires contrast against real pixels — cost if wrong: a veil retune
Task 5: note — accepted additions: ORGANISATION.institutions + highlightTerms helper (tested), --font-arabic-display token, IconCardGrid tone default "dark"
Task 5: Ruling: phone hero (<640px) changes from the plan's stacked 50/50 halves to a flag band on top (Iraq and UK side by side, Iraq at reading start, red seam between, light veil) with the text block below on solid blue-deep — the plan geometry put the seam through the title and hid the UK flag, breaking spec 6.5 "both flags still recognisable" — cost if wrong: a layout revert in one component
Task 5: Ruling: desktop veil over the Iraqi half lightened in its upper part (text sits at the bottom) so the Iraqi flag is recognisable, contrast re-measured — spec 6.5 "lighter elsewhere so both flags stay visible" outranks the reviewer's Minor grading — cost if wrong: a veil retune
Task 5: minor (deferred): hero text cap hard-codes shell geometry (hero.tsx:51); CLAUDE.md should say the box ends 2rem before the seam
Task 5: minor (deferred, FIX IN FINAL WAVE): objectives lede hard-codes "Six"/"ستة" (messages en/ar :61)
Task 5: minor (deferred): sm:text-xl off the named scale on the other-language line; no Arabic line-height override for it
Task 5: minor (deferred): partner links open new tab with no cue (dormant)
Task 5: minor (deferred): draft wording "official standing between the two economies" may imply UK recognition — flag for council review
Task 5: fix round 1/5 (2 addressed, 0 open — phone hero seam/flag; desktop Iraqi flag visibility; commits 15566f8..7085b4d)
Task 5: minor (deferred): CLAUDE.md:29 says "All hero text is white" but header name lines are on-blue-muted
Task 5: minor (deferred): title at 768px is 4.37:1 (passes 3:1 with little margin) — re-measure on any photo/veil change
Task 5: complete (commits 54a14ea..7085b4d, review clean after 1 fix round)
Task 6: dispatched (base 7085b4d)
Task 6: note — reviewer report lacked the formal Assessment line but gave spec ✅ and no Critical/Important; accepted as approved. ⚠️ resolved: `reveal` utility exists (Task 2); ● build reported by implementer
Task 6: minor (deferred, FIX IN FINAL WAVE): index-pills.tsx overflow-x-auto clips pill focus outline vertically on phones
Task 6: minor (deferred, FIX IN FINAL WAVE): person-card "View profile" new-tab link has no new-tab cue (dormant)
Task 6: minor (deferred): IndexPills locale prop / getLocale vs useLocale inconsistency
Task 6: minor (deferred, FIX IN FINAL WAVE): about.standing.body "established within Iraq's own institutions" / "جهة قائمة ضمن المؤسسات العراقية نفسها" overstates — use "established with the approval of Iraqi institutions"
Task 6: minor (deferred): standing.tsx Approval/Ratification labels depend on institutions order
Task 6: note — accepted: global scroll-padding-top 8rem; extra types files; async server page-client
Task 6: complete (commits 7085b4d..2d06dbe, review clean)
Task 7: dispatched (base 2d06dbe)
Task 7: ⚠️ resolved — content.test passes with WHY_JOIN image fields (implementer 38/38); single #content confirmed in implementer's browser check; IconCardGrid renders h3 (Task 5)
Task 7: minor (deferred, FIX IN FINAL WAVE): ar membership.whyJoin.intro "وسواء كنت شركة…أو" → "وسواء أكنتَ شركةً عراقية… أم شركةً بريطانية…"
Task 7: minor (deferred, FIX IN FINAL WAVE): soften service claims — why-join investment "Members learn of openings early"/"يطّلع الأعضاء على الفرص في وقت مبكر"; intro "knows the Iraqi market from within"
Task 7: minor (deferred): trade-growth photo is a Hong Kong port (honestly credited, weak topical fit)
Task 7: minor (deferred): why-join h3 ids on every row though only committees uses one
Task 7: minor (deferred): text-[15px] off-scale (plan-mandated)
Task 7: minor (deferred): tier-card async getTranslations ×3 vs sync useTranslations
Task 7: complete (commits 2d06dbe..e8171f9, review clean)
Task 8: dispatched (base e8171f9)
Task 8: minor (deferred, FIX IN FINAL WAVE): application-schema z.instanceof(File) without message key → raw Zod message passed to translate; parseFormErrors has no fallback for unknown keys
Task 8: minor (deferred): duplicate identical error messages (companyTooLong/companyNameTooLong, nameTooLong/fullNameTooLong)
Task 8: minor (deferred): no test that every schema error key exists in both locale files; extras (zero-size File, empty optionals in application, consent≠"on", parseFormErrors) untested
Task 8: minor (deferred): website z.url accepts any scheme
Task 8: fix round 1/5 (1 addressed, 0 open — schema helper duplication; commits fa920e4..ede7022)
Task 8: complete (commits e8171f9..ede7022, review clean after 1 fix round)
Task 9: dispatched (base ede7022)
Task 9: minor (deferred): success state never clears on resubmit (stale message)
Task 9: minor (deferred, FIX IN FINAL WAVE): contact.form.required message key unused (dead copy)
Task 9: minor (deferred): form-field.tsx uses useLocale without "use client" (works via client import; fragile)
Task 9: fix round 1/5 (1 addressed, 0 open — README map line; commits 8eaba15..5fa9833). Extra README line (contact card/footer column gating) matches behaviour verified in Task 4 and Task 9 reviews.
Task 9: complete (commits ede7022..5fa9833, review clean after 1 fix round)
Task 10: dispatched (base 5fa9833)
Task 10: ⚠️ resolved — ● for apply route, 5 MB rejection and ?tier=gold pre-select verified in implementer's build/browser checks
Task 10: minor (deferred, FIX IN FINAL WAVE): language-switcher effect depends only on [pathname] — stale query on query-only navigation; hash dropped
Task 10: minor (deferred, FIX IN FINAL WAVE): submit blocked by attachmentError returns silently (no focus move/status)
Task 10: minor (deferred): tier radiogroup lacks aria-invalid/aria-required
Task 10: minor (deferred): attachment labelled twice (FormField label + drop-zone label)
Task 10: minor (deferred): isPdf duplicates schema predicate; readField/readFile/readLocale + submit pattern copied from Contact
Task 10: minor (deferred, FIX IN FINAL WAVE): isolate-ltr-runs.ts + test embed raw U+2068/U+2069 — use \u2068/\u2069 escapes
Task 10: minor (deferred): text-[15px] one-off (consistent with tier-card); tier hydration flash (inherent to ruling)
Task 10: complete (commits 5fa9833..e5dfc76, review clean)
Task 11: dispatched (base e5dfc76)
Task 11: minor (deferred, FIX IN FINAL WAVE): legal drafts add uncommitted promises — "and then we delete it"/"ثم نحذفها"; "We do not use these records to identify you or build a profile"; licence grant "You may link… quote short passages… otherwise written permission"; "the council will discuss the terms of membership" — trim to the brief's outline
Task 11: minor (deferred → README note): privacy "shared with no one" becomes inaccurate once a processor/endpoint exists; rights channel is the contact form, which reports failure at launch — note in README legal-review line; tell project lead
Task 11: minor (deferred): "Last updated" hard-coded 2 November 2026 — reset at release
Task 11: minor (deferred): buildPageMetadata namespace typed as string; home title chosen by path === ""
Task 11: minor (deferred): seven paths duplicated in sitemap.ts and smoke.mjs; no x-default alternate; OG URL no cache-busting; OG alt English only
Task 11: complete (commits e5dfc76..ea9e621, review clean)
Task 12: dispatched (base ea9e621) — Steps 8-9 (push/PR) withheld per ruling
Task 12: minor (deferred): CLAUDE.md hero header reading excludes the emblem notch region — note it
Task 12: minor (deferred): control-class.ts focus:ring-blue/25 on text fields (border also turns blue) — note as accepted exception
Task 12: minor (deferred, FIX IN FINAL WAVE): unused message keys contact.formTitle and contact.form.required
Task 12: minor (deferred): CLAUDE.md verification routine lacks the sr-only off-screen caveat
Task 12: complete (commits ea9e621..9b78f40, review clean). Steps 8-9 withheld (push/PR) per ruling.
Final review: With fixes — 4 Important (form invalid-submit feedback; rejected attachment dead end; consent link loses application; copy overstates standing/promises) + pre-launch minors. Findings list: final-fix-findings.md
Ruling: Arabic UI uses the polite plural form of address throughout (قدّموا/اختاروا/شركتكم) — the site mixed singular and plural; plural is the respectful institutional register — cost if wrong: a copy sweep
Ruling: spec §8 client-side Zod not added; server validates all fields, client checks the attachment and (after the fix) focuses/announces errors — meets the user-facing intent — cost if wrong: add schema run in onSubmit
Ruling: "Last updated" stays 2 November 2026; check at deploy — cost: one date edit
Final fix wave: dispatched (fix base 9b78f40)
Final fix wave: re-review — all 20 findings ADDRESSED (commits 9b78f40..148fb75)
Final: parked — live region re-announces the stale "please correct" summary on resubmit while pending (forms) — Ruling: real, small, screen-reader only; recommended first follow-up (render summary only when !isPending) — not a second fix wave per process — cost: a misleading announcement until fixed
Final: parked — "Following up opportunities and partnerships" → add "on" — Ruling: copy polish for the council's review
Final: parked — aria-disabled submit keeps hover style while pending — Ruling: cosmetic
Final: parked — after a mouse submit focus may land on an sr-only tier radio without a visible ring — Ruling: keyboard path correct; acceptable
Final: parked — about.who.p2 "close knowledge of the Iraqi market" same family as softened claims — Ruling: flag to council review
Final: parked — ESLint should ignore .playwright-mcp/ (7 warnings from git-ignored sweep scripts) — Ruling: trivial tooling follow-up
