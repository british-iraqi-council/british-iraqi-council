# IBBC website: design

Date: 2026-11-02. Status: approved by the project lead on 2026-11-02.

Companion documents:

- `docs/jbbc-reference.md`: a full walkthrough of https://jbbc.jo, the site this one is modelled on, with screenshots in `docs/reference/jbbc-screens/`.
- The approved mockup: `.superpowers/brainstorm/1551-1793621964/content/home-a-photos.html` (open it in a browser; it loads its photographs and fonts from the web).
- The Al-Dallah Group site (`C:\Users\user\Desktop\Projects\aldallah-group-landingpage`), the sibling project whose stack, structure and conventions this one reuses.

---

## 1. What this is and why

IBBC, the **Iraqi–British Business Council** (**مجلس الأعمال العراقي البريطاني**), is a member-based council that promotes trade, investment and partnership between Iraq and the United Kingdom. It was **formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce (اتحاد الغرف التجارية العراقية) and ratified by the Ministry of Commerce (وزارة التجارة)**.

The council needs a public website. The project lead pointed at the Jordan British Business Council's site (jbbc.jo) as the model: the same kind of site, the same audience, the same jobs, told from Iraq's side. It must not be a copy. The structure and the kinds of sections carry over; the wording, the look and the details are IBBC's own, and the project lead has said the content may be changed wherever it serves IBBC better.

The site has three jobs:

1. **Explain the council** and why it can be trusted. Its official standing is its strongest card, and JBBC has nothing like it, so it sits near the top of Home and has its own place on About.
2. **Sell membership**: why join, the tiers, and a way to apply.
3. **Show activity**: partners and supporters now; events, a member directory and news later.

**Who visits:** Iraqi companies looking for British partners, investors and markets; British companies looking at Iraq; and officials and partner bodies checking who the council is. Each should leave knowing what IBBC does and how to join or get in touch.

**The story:** JBBC sells Jordan as Britain's gateway to the region. IBBC presents Iraq as the opportunity and the council as the trusted, officially backed bridge: British expertise and investment meeting Iraqi markets, and Iraqi companies reaching the UK. Draft headline: "Where Iraqi enterprise meets British business" / "حيث تلتقي المؤسسات العراقية بالأعمال البريطانية".

## 2. Goals, non-goals, anti-goals

**Goals**

- A bilingual site (Arabic default, English) with the first-release pages in section 5, in the brand identity.
- A membership path that works end to end: tier, then Apply, then a form that submits.
- Fix every JBBC problem listed in `jbbc-reference.md` section 6. In particular: an Apply button on each tier; correct `tel:` and `mailto:` links that match the text shown; one email address used consistently; no placeholder copy left live; real alt text; no content hidden by scroll animations; readable type on phones (no 9px lists, 16px form fields, a hero title larger than its paragraph).

**Non-goals for the first release**

- The member directory, events, news, member accounts, logins and payments. These come later and will be built in-house (no Glue Up or similar platform).
- A CMS. Content lives in the code, as on Al-Dallah.

**Anti-goals** (a failure even if everything works)

- **Looking like a JBBC copy.** No JBBC sentence, layout detail or asset is reused verbatim. The maroon palette, the wireframe "wave" banner pattern and the Brown typeface are JBBC's and stay out. London imagery is allowed sparingly (the About two-cities frame), since the project lead asked for imagery like the original website (2026-11-02); a full-width London-landmark band stays out.
- **Invented facts.** No board member, advisor, staff name, member company, partner, sponsor, address, phone number, figure, date or event is made up. Where the site needs one and the client has not supplied it, that part of the page is left out (section 7).
- **Off-brand look.** The identity is union blue, a spark of red and ivory. Red stays an accent; it never becomes a large background like JBBC's maroon.

## 3. Decisions made by the project lead

- **Name:** IBBC, Iraqi–British Business Council, مجلس الأعمال العراقي البريطاني. Iraq first, as in the identity.
- **Standing line:** formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce, ratified by the Ministry of Commerce.
- **Languages:** Arabic and English, every page in both.
- **Look:** the brand identity supplied on 2026-11-02 ("Union Blue. An Iraqi connection. A spark of red."): deep union blue, a red accent, a warm ivory ground, a serif wordmark in small capitals, an octagonal emblem with a red notch.
- **Home direction:** option A, the "classic photo hero" (chosen from three mockups).
- **Hero imagery:** two separate real photographs side by side, the Iraqi flag and the British flag, not a single flagpole scene. A drawn two-flagpole scene was tried and rejected.
- **Pages and phasing:** as in section 5, approved as written.
- **Content latitude:** the content follows JBBC's kinds of sections but may be changed as needed; it does not have to match one to one.
- **Directory, events and application handling** are built in-house later.
- **Skills:** the builder may use impeccable, ui-ux-pro-max and similar design skills during the build.
- **Live as soon as possible, no placeholders:** the site launches with what is confirmed. A section whose facts the council has not supplied is left out entirely and appears when the data arrives (section 7). Draft copy goes live as written and is revised as the council reviews it.
- **Forms send nowhere at first:** both forms post to an endpoint that does not exist yet and say honestly that the message could not be sent (section 8).
- **Logo:** the drawn emblem from the mockups is approved for launch, matched as closely as possible to the identity image (section 6.6).
- **Contact details:** the phone (+964 790 199 9998, from the business card in the identity deck, pending the council's confirmation) shows on Contact and in the footer; address, email, hours and social accounts are still awaited and appear when supplied.

## 4. Calls made by Claude (the project lead may overrule any of these)

- **Stack:** the same as Al-Dallah. Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, next-intl v4, Zod 4, lucide-react. GSAP (ScrollTrigger, `@gsap/react`) and Lenis, added on 2026-11-02 for the motion in section 6.7. Node 24.
- **Default locale:** Arabic. `/` redirects to `/ar`; `/en` is a full peer.
- **Hosting:** Vercel.
- **Fonts:** stand-ins until the identity's real fonts are known (section 6.2).
- **Forms:** both the contact form and the membership application post `multipart/form-data` to documented endpoints, as Al-Dallah's contact form does. Until a real endpoint is set they report failure honestly rather than pretending to send. Switching to email delivery or the council's own system is a one-line change in the repository layer.
- **Membership tiers:** Bronze, Silver and Gold, following JBBC's model, with draft features (section 5.3) pending the council's confirmation. No prices are shown; each tier says "Apply" and the price is discussed after application.
- **Draft copy:** Claude writes the Iraq-focused wording in both languages; it goes live and the council reviews it afterwards.
- **Repository:** the existing folder `C:\Users\user\Desktop\Projects\british-iraqi-council` becomes the git repository, with the Next.js app at its root and `docs/` kept as it is. `docs/` (including the JBBC screenshots) is committed; `.superpowers/` is ignored.
- **Remote** (supplied by the project lead): https://github.com/british-iraqi-council/british-iraqi-council.git. Its `main` holds one commit, an initial `README.md` containing only the title, so the local repository starts from that commit and the build replaces the README. Work happens on a branch and reaches `main` through a pull request, as on Al-Dallah.

## 5. Pages (first release)

Every page has the shared header and footer (section 6.4). Routes live under `[locale]/`.

### 5.1 Home `/`

In this order:

1. **Hero** (section 6.5): the two flag photographs with the red seam and blue veil; the Arabic and English headline (each locale shows its own language as the headline and may show the other as a small line above, as in the mockup), one sentence, "Learn more" (to About) and "Become a member" (to Membership, tiers).
2. **Standing strip:** a white band with the emblem and the standing line, bolding the two institutions.
3. **Who we are:** a short paragraph and "Read more", beside the same flag pair in a rounded frame.
4. **Vision and mission:** two cards. Draft vision: the leading bridge for trade and investment between Iraq and the UK. Draft mission: connect Iraqi and British companies and help them grow through introductions, market access and support.
5. **Objectives:** six cards with a small icon, a title and two lines. Adapted from JBBC's six, reworded for Iraq:
   - Grow members' business in Iraq, the UK and beyond
   - Make introductions: B2B meetings, trade missions, investment roundtables
   - Open markets: market insight and entry support in both directions
   - Speak for members to government bodies and trade authorities in both countries
   - Raise members' profile through events and the council's channels
   - Share knowledge: briefings, training and sector expertise
6. **Why Iraq** (new): a short section on the opportunity for British companies, as three or four sector tiles. The sectors are a draft for the council to confirm; write them as areas of interest (for example energy, infrastructure and construction, agriculture, education, health, technology), with no figures or claims that need sourcing.
7. **Membership band:** a blue band, one line, "Apply now".
8. **Partners and supporters:** two logo rows, shown only once the council supplies partners (section 7).
9. **"Approved and ratified by" band:** names the two Iraqi institutions, at the end of the page.

### 5.2 About `/about`

1. Page heading band (section 6.4).
2. **Who we are:** three or four paragraphs.
3. **Official standing:** its own section, with the Federation of Iraqi Chambers of Commerce and the Ministry of Commerce named. No logos of either body unless the council supplies them with permission.
4. **Objectives:** the six from Home, in full.
5. **Board of Directors**, **Honorary Advisors**, **Executive Team:** cards with a photo (or a neutral silhouette), name, role, organisation and an optional link. Each group appears only once its people are supplied (section 7). The Board shows the Vice Chairman, Sohaib Mohammed Abdullah (from the business card, pending confirmation). Use a responsive grid, not a carousel: four, three, two or one across.

The About menu links to each section by anchor (`#who-we-are`, `#standing`, `#objectives`, `#board`, `#advisors`, `#team`).

### 5.3 Membership `/membership`

1. Page heading band.
2. **Why join:** an intro paragraph, then alternating image and text rows: Trade growth; Investment opportunities; Sector committees (draft committee list for the council to confirm); Events and networking. Images are stock photographs that fit the brand (business meetings, Baghdad, London, ports and industry), never presented as IBBC's own.
3. **Benefits:** four cards (Access, Visibility, Advocacy, Networking), each with its own sentence.
4. **Tiers** (`#tiers`): three cards. Features build up tier by tier. Draft:
   - **Bronze:** networking events; B2B introductions; listing in the member directory (once it exists); invitations to council events; member offers; committee membership.
   - **Silver adds:** priority invitations to VIP events and roundtables; meetings with government and the public sector; committee leadership; market briefings; profile on the council's channels.
   - **Gold adds:** tailored market insight; prominent profile on the council's channels; a voice in advocacy and policy work; personal guidance; follow-up on leads and partnerships.

   Each card has an "Apply" button that opens the application with that tier pre-selected. Tier colours: bronze, silver and gold appear only as a thin top edge or small mark on each card, never as a full card colour, so the page stays blue and ivory. Feature text is at least 15px.

5. **"Approved and ratified by" band:** the same band as on Home, at the end of the page.
6. **Application** (`/membership/apply`, its own page): the form in section 8.2.

### 5.4 Contact `/contact`

Two blocks: the details card (address, phone, email, office hours, social links, each with an icon; links that match what they show) and the message form (section 8.1). Below them, a map of the office once the address is known; until then no map.

### 5.5 Legal: `/privacy` and `/terms`

Plain prose pages in both languages. Claude drafts them as a reasonable starting point covering the contact form, the membership application and cookies; they are marked as needing the council's legal review before launch. If the site sets no non-essential cookies, there is no cookie banner.

### 5.6 Not found

A branded 404 in both languages.

### Later phase (not in this build, but leave room)

Member directory, events (upcoming, past, event page), news. The header has no links to them until they exist. The data shapes may be sketched in `src/content/types.ts` if useful, but nothing is rendered.

## 6. Visual design

### 6.1 Colour

Sampled by eye from a photograph of the identity deck, so treat the exact values as provisional. When the identity files arrive, re-sample and update the tokens; they live in one place (`src/app/tailwind.css`), as on Al-Dallah.

| Token       | Value     | Use                                                                                                                                                                                                                                            |
| ----------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blue`      | `#0B2470` | Union blue: headings, bands, primary buttons on ivory, the logo                                                                                                                                                                                |
| `blue-deep` | `#071A55` | The hero veil and the darkest bands                                                                                                                                                                                                            |
| `red`       | `#CE1126` | The Iraqi flag red (changed from `#C8102E` at the project lead's request, 2026-11-02). The accent: the short rule under titles, the hero seam, the active nav underline, the "Become a member" and "Contact" buttons. Never a large background |
| `ivory`     | `#F3EEE4` | The page ground                                                                                                                                                                                                                                |
| `white`     | `#FFFFFF` | Cards and the standing strip                                                                                                                                                                                                                   |
| `ink`       | `#14204A` | Body text on light surfaces                                                                                                                                                                                                                    |
| `muted`     | `#545B78` | Secondary text                                                                                                                                                                                                                                 |
| `line`      | `#E4DCCB` | Hairlines and card edges                                                                                                                                                                                                                       |

Body text must meet WCAG AA on its surface (aim for AAA on body copy), checked against the darkest light surface (ivory), not white. Text on photographs is measured against the pixels (the hero), not the CSS background.

### 6.2 Typography

The identity shows a serif in small capitals for the wordmark and titles. Until its real fonts are known:

- **English headings:** Cormorant SC, weight 600.
- **Arabic headings:** Amiri, bold. Arabic never gets small caps or letter-spacing.
- **Body:** Inter (English) and IBM Plex Sans Arabic (Arabic).

All via `next/font/google`. Keep one type scale with no one-off sizes. The hero title is the largest text on the page at every width, and the hero paragraph is clearly smaller. Swap the families in one file when the identity's fonts arrive.

The heading sizes follow the team's Baghdad Expo site, at the project lead's request (2026-11-02): `text-hero` `clamp(3rem, 2.2rem + 3.2vw, 4.75rem)` (48 to 76px, line-height 1.05; kept below Expo's 88px so the English title stays within four lines), `text-display` `clamp(2.75rem, 1.9rem + 3.4vw, 4.5rem)` (44 to 72px, 1.08) for inner-page titles, and `text-headline` `clamp(2.25rem, 1.65rem + 2.4vw, 3.75rem)` (36 to 60px, 1.12) for section titles. Arabic keeps its own line-heights. The hero stays larger than the display, and the display than the headline, at every width.

### 6.3 Layout

- Ivory page; white cards with a thin `line` edge and a modest radius (about 12 to 16px); full-width photo bands under a blue veil for Vision and Mission and the membership band (section 6.8).
- Section titles: serif heading, then a short red rule (about 52 to 72px by 3px) below it, as in the identity deck.
- Pill buttons: white on blue, red for the main call to action, blue on ivory.
- One container width and side padding shared by every block, so edges line up. Following the Baghdad Expo site at the project lead's request (2026-11-02), the `shell` container is up to 1800px wide (`--shell-max`) with 24, 40, 80 and 112px side padding (`--shell-pad`, from 0, 640, 1024 and 1280px).
- Spacing follows the same site: 96px between top-level blocks, 128px from 1024px, set once on `<main>`; 40 to 48px between a section heading and its content; 24 to 32px between cards; the blue bands pad 64 to 80px vertically and the page heading 64 to 96px. Prose is capped in `ch`, never by the container.
- Logical properties only (start and end, never left and right), so Arabic mirrors correctly.

### 6.4 Header, page heading, footer

- **Header:** the emblem and "IBBC" with the full name in both scripts beneath, as in the mockup; links Home, About, Membership, Contact; the language switch; a red "Contact us" pill. On Home it sits transparent over the hero with white text; elsewhere and once scrolled it is a solid white bar. Below `lg`, a menu button opens a full menu that includes Contact and the language switch.
- **Page heading** on inner pages: a band with the page title, a red rule and a one-line lede over a stock photograph under a blue veil (section 6.8). No wave pattern.
- **Footer:** a blue band with the logo, quick links, contact details, social links, the legal links and the copyright.

### 6.5 Hero (Home)

As in the approved mockup `home-a-photos.html`:

- Two photographs filling the hero, each half its width: the Iraqi flag on the reading-start side (left in English, right in Arabic) and the British flag on the other.
- A 4px red seam where they meet, above the veil.
- A union-blue veil: deeper on the side and at the bottom where the text sits, lighter elsewhere so both flags stay visible. The mockup's values are a starting point; tune them so the white title and paragraph pass contrast against the actual pixels at 360, 768, 1440 and 1920 wide, in both languages.
- Text block on the reading-start side, at the bottom: the small other-language line, the serif title, the red rule, the sentence, two buttons.
- Height about 620 to 680px on desktop; on phones the photos stack or crop so both flags are still recognisable.

Photographs (free under the Unsplash licence; download and store them in the repo, with a credits file):

- Iraqi flag close-up by engin akyurt: https://unsplash.com/photos/a-close-up-of-the-flag-of-iraq-b5I551g6lnA
- British flag close-up by chris robert: https://unsplash.com/photos/blue-and-red-striped-textile-xybVWMjNNYU

### 6.6 Emblem

The project lead approved the drawn emblem from the mockups for launch. Draw it as a clean SVG: an outer octagon, a broken inner octagonal ring, a central ring, and the red notch at the top edge, matched as closely as possible to the identity image (`IBBC` wordmark beside it in the serif). Keep it in one component so the official logo files can replace it when they arrive. Favicon, Apple icon and Open Graph image are made from it.

### 6.7 Motion

Minimal: a short fade or rise as sections enter, disabled under reduced motion. Content must never depend on an animation to become visible.

Extended on 2026-11-02 at the project lead's request for "animation or smoothness": a CSS hero and page-heading entrance, section reveals on IntersectionObserver with staggered cards and settling photographs, a slow parallax on the hero and banner photographs, hover lifts, and Lenis smooth scrolling. CLAUDE.md ("Motion") holds the vocabulary and its rules.

### 6.8 Imagery

Added on 2026-11-02 at the project lead's request ("a lot more images … along the other pages and banners … a combination of flagpoles and other images"). Every photograph is free stock (Unsplash or Pexels), credited in `src/assets/images/stock/CREDITS.md`, and never presented as the council's own; the council's own photographs replace them when supplied. The hero is unchanged.

- **Page headings:** every inner page's heading sits over a photograph (`PageHeading` `image` and `imagePosition`) under a `blue-deep` veil, `photo-veil-start`: even (82 to 88%) below 1024px, and from 1024px a gradient from 92% on the reading-start side, behind the text, to 40% at the far edge, mirrored in Arabic. About: the Central Bank of Iraq tower in Baghdad. Membership: a handshake across a desk. Application: a handshake outdoors. Contact: the cable-stayed bridge in Basra. Privacy and Terms: a white and blue geometric lattice. The photographs behind text are decorative (`alt=""`) and only the headings' images load eagerly.
- **Photo bands** (`PhotoBand`): Vision and Mission over Baghdad's towers and cranes at dusk, and the Home membership band over a conference audience, under an even veil (`photo-veil`, 72 to 84%). The vision and mission cards are translucent `blue-deep` with a light blur.
- **Split frames** (`SplitPhotoFrame`): two photographs in a rounded frame with the 4px red seam, the first on the reading-start side. Home's Who we are shows the Iraqi flag on a flagpole by the Basra waterfront beside the British flag on a flagpole; About's Who we are shows Baghdad and the Tigris from the air beside London and the Thames, Baghdad first.
- **Why Iraq** cards carry a 16:10 photograph on top (refinery, tower crane, date palm, server aisle), with the icon overlapping its lower edge. The photograph is an optional `image` on the card data.
- **Why join:** the trade growth row shows a Basra waterfront with port cranes (replacing a Hong Kong port).
- Text over a photograph is measured against real viewport pixels at 360, 768, 1440 and 1920 wide in both languages; title-size text must reach 3:1 and everything else 4.5:1 (results in `CLAUDE.md`).

## 7. Content and missing information

- Arabic is the primary language. Both languages are written for this build, as drafts pending the council's review.
- Content lives as typed `{ ar, en }` data in `src/content/` and page prose in `messages/{ar,en}.json`, as on Al-Dallah.
- **Two kinds of unconfirmed content, kept apart:**
  - **Draft copy** is descriptive wording Claude writes and the council reviews: the hero and section text, vision, mission, objectives, Why Iraq sectors, Why Join rows, benefits, tier names and tier features, sector committee names, the application form's sector list, and the legal pages. It renders as normal text. A list of every draft item is kept in the README for the council's review.
  - **Confirmed facts** only the council can give: board, advisors and team (names, roles, photos, links), partners and supporters, address, phone, email, office hours, social links, the logo, and the domain.
- **No placeholders, ever.** Nothing in brackets, no dummy names, no sample logos.
- **A section with no confirmed data is omitted**, along with its menu entry and anchor:
  - Board, Honorary Advisors and Executive Team on About are each left out until their people are supplied; the About menu lists only the sections that render.
  - Partners and supporters on Home are left out until supplied.
  - On Contact, each detail (address, phone, email, office hours, social links) appears only once confirmed, as a working link where it is one. If none is confirmed, the page is the form alone, introduced by a sentence. The map appears with a confirmed address. The footer's contact column follows the same rule.
  - The schema.org `Organization` block carries only confirmed fields.
- The content data models these as optional or empty lists, and every component that renders them handles the empty case by rendering nothing.
- Image alt text describes the photograph and never presents stock as IBBC's own.
- Every Latin or numeric run inside Arabic text is isolated for correct direction (Al-Dallah's `RichText` and `LtrRun`).

## 8. Forms

Both forms: Zod validation on client and server; server actions; the locale passed in a hidden field (server actions do not receive it); state kept on validation errors (no reset until success); errors shown inline in the visitor's language; 16px inputs; a clear success message; an honest failure message while no endpoint is configured. Endpoints and the base URL come from environment variables. A honeypot field against spam.

### 8.1 Contact form

Name (required), company, email (required), phone, subject (general, membership, partnership, media, other), message (required, 10 to 2000 characters).

### 8.2 Membership application

- **Company:** company name (required), sector (required, a select list), country (Iraq, United Kingdom, other), city, website, company size (a select of ranges).
- **Contact person:** full name (required), position, email (required), phone (required).
- **Membership:** tier (required, pre-selected from the tier card), how did you hear about us, message.
- **Attachment:** optional company profile (PDF, up to 4 MB).
- Consent checkbox linking to the privacy policy (required).

## 9. Technical

- Mirror Al-Dallah's structure: `src/app/[locale]/(public)/<route>/` with `page.tsx`, `page-client.tsx`, `components/`, `actions/`, `schemas/`; shared components in `src/core/new-components/common/`; repositories returning `Result<T>`; `proxy.ts` for next-intl; static generation with `setRequestLocale` in every layout and page.
- Follow Al-Dallah's `CLAUDE.md` conventions and avoid its recorded traps (the proxy matcher, RTL isolation, form state, server-action locale, token solving against the darkest surface). Start the new repo with its own `CLAUDE.md` and `README.md` recording IBBC's rules.
- Metadata per page in both languages, an Open Graph image, `sitemap.ts`, `robots.ts`, and one schema.org `Organization` block built only from confirmed facts.
- No `public/` directory; images are imported statically.

## 10. Verification

- `lint`, format and a clean build; every route statically generated in both locales.
- Contrast audit on every page in both locales at 360, 768 and 1440 wide, plus the hero measured against real pixels.
- No horizontal overflow at 360px; no Latin or digit run in Arabic without direction isolation.
- Both forms: validation errors keep the entered values; the failure path shows the honest message.
- Keyboard: skip link, visible focus, the menu traps focus and closes on Escape.

## 11. Left to the builder

Exact spacing and type-scale steps; icon choices (lucide); the stock photographs for the Why Join rows and Why Iraq tiles (free licence, on brand, credited); the precise veil values; component breakdown; the draft wording itself within the story and limits above.

## 12. Still needed from the client

None of these blocks the launch. Each one, when it arrives, switches on the part of the site that waits for it.

- Logo files (SVG) and the full identity deck, including font names and exact colours.
- The domain.
- Board, honorary advisors, executive team: names, roles, photos, bios.
- Address, email, office hours, social accounts. The phone is supplied from the business card, pending confirmation.
- Partners and supporters, with logos and permission.
- Confirmation or changes to: tiers and their features, sector committees, the Why Iraq sectors, vision, mission, objectives.
- Where form submissions should go.
- Legal review of the privacy policy and terms.
