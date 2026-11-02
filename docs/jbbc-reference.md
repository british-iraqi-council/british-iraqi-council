# Reference site: Jordan British Business Council (jbbc.jo)

A walkthrough of https://jbbc.jo, taken on 2026-11-02, as the model for a British–Iraqi business council website. It records what the site contains, how each page is built, how it looks, and what to copy, improve or leave out for the Iraqi version.

Screenshots are in `reference/jbbc-screens/`: every page at desktop width (1440px), the member pop-up (`jbbc-directory-detail.jpg`), and phone width at 390px (`jbbc-mobile-*.jpg`).

Coverage: every page in the menus and footer, the member directory's pop-up, the Privacy Policy, Terms of Use and cookie pages, and the phone layout. The contact form was not submitted, so as not to send JBBC a real message.

---

## 1. What JBBC is

The Jordan British Business Council is a non-profit, member-based organisation that promotes trade, investment and business expansion between Jordan and the UK. The website is its public face and has three jobs:

1. **Explain the council**: who it is, its mission, vision and six objectives, and who sits on the board.
2. **Sell membership**: why join, three membership tiers, and a public directory of member companies.
3. **Show activity**: events, partners and supporters.

Tagline: **"Your Gateway to Regional Growth"** (the logo reads "JBBC / YOUR GATEWAY TO GROWTH").

---

## 2. Technology

| Part             | What JBBC uses                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| CMS              | Drupal 11                                                                                                        |
| CSS framework    | Bootstrap                                                                                                        |
| Sliders          | Swiper (hero, board carousel, "supported by" logos)                                                              |
| Scroll animation | AOS (fade-in on scroll)                                                                                          |
| Membership CRM   | **Glue Up** (`jbbc.glueup.com`). The member directory and the event list are Glue Up widgets embedded in iframes |
| Cookies          | Full EU-style consent banner (Settings / Deny all / Accept all)                                                  |
| Search           | Drupal advanced search page (`/advanced-search`), a single title field                                           |
| Agency           | Blue Ray For Web Solutions (credited in the footer)                                                              |
| Languages        | **English only**, LTR. No Arabic version                                                                         |

The Glue Up choice matters most: membership sign-up, payments, the member directory and event registration all live in Glue Up, so the website itself is mostly brochure pages. IBBC will build the directory, events and application itself instead (see section 9).

---

## 3. Sitemap and navigation

```
/home                     Home
/about-jbbc               About (one long page with anchors)
   #who-we-are
   #our-objectives
   #board-dierector       (sic: typo in their anchor)
   #executive-team
   #honorary-Board
/membership               Why Join
/membership-plan          Membership Plan (Bronze / Silver / Gold)
/member-directory         Member Directory (Glue Up iframe)
/upcoming-events          Events list (Glue Up iframe)
/event, /node/126         A single event page (Drupal)
/contact-us               Contact
/advanced-search          Search
/privacy-policy           Privacy notice
/terms-of-Use             Terms of use
/cookies/documentation    Cookie list (linked from the cookie banner)
```

**Header (two rows):**

- **Top utility bar** (light grey): search icon, LinkedIn icon, and a small maroon "Contact Us" button with a phone icon.
- **Main bar** (white): logo on the left; on the right, Home · About JBBC ▾ (Our Objectives, Board of Directors, Executive Team, Honorary Board Advisors) · Membership ▾ (Why Join, Membership Plan, Membership Directory) · Events. The active link is maroon with an underline.

**Footer (maroon, full width):**

1. Top row: white logo on the left; "Do you have any Questions?" with a white "Contact Us" pill on the right.
2. Two columns: **Quick Links** (Home, About, Membership, Events, Contact) and **Contact Us** (city, phone, email, each with a round white icon, then a LinkedIn icon).
3. Bottom row: Privacy Policy | Terms of Use on the left; agency credit and © year on the right.

**Every page except Home and Contact ends with the same two blocks**, just above the footer:

- **Partners**: centred logos (London Stock Exchange).
- **Supported by**: logo slider (Eversheds Sutherland, RUM Consult).

---

## 4. Page by page

### 4.1 Home (`/home`)

| #   | Section                                    | Content and layout                                                                                                                                                                                                                                                                                                                                               |
| --- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Hero slider** (2 slides, dot pagination) | Full-width photo of the two flags (Jordan and UK) side by side, with a dark overlay. Slide 1: title "Your Gateway to Regional Growth", one-sentence description, white "Learn More" and maroon "Become a Member" buttons. Slide 2: a featured event ("JBBC – UK Launch / House of Lords") with a description, "Learn More" (to the event) and "Become a Member". |
| 2   | **Introduction**                           | Heading, one paragraph, dark-grey "Read More" button on the left. On the right a circular flags photo with a maroon half-circle tab reading "WHO WE ARE" vertically.                                                                                                                                                                                             |
| 3   | **Vision & Mission**                       | Full-width maroon band, centred white heading, two white rounded cards side by side. Each card has a maroon circle icon (target for Mission, eye for Vision), a title and a paragraph.                                                                                                                                                                           |
| 4   | **Our Objectives**                         | Off-white background. Centred heading, an intro sentence with the council name in bold, then six white rounded cards in a 3×2 grid. Each card has a small grey square icon, a title and a justified paragraph.                                                                                                                                                   |
| 5   | **Call to action**                         | Grey band with a background image: "Boost Your Sales with JBBC", one sentence, white "Apply Now" pill (to Membership Plan).                                                                                                                                                                                                                                      |
| 6   | **Partners**                               | Logo(s), each linking out.                                                                                                                                                                                                                                                                                                                                       |
| 7   | **Supported by**                           | Logo slider.                                                                                                                                                                                                                                                                                                                                                     |

The six objectives (worth mirroring for Iraq):

1. Drive Commercial Growth for Members
2. Facilitate Business Connections and Deal Negotiations (B2B meetings, trade missions, investment roundtables)
3. Promote Market Access and Expansion
4. Advocate and Lobby for Member Interests
5. Enhance Visibility and Networking
6. Enable Knowledge Sharing and Capacity Building

### 4.2 About (`/about-jbbc`)

One long page that the About menu links into with anchors.

1. **Page banner**: maroon band with a faint white wireframe "wave" pattern on the left, white page title, breadcrumb "HOME >> About JBBC". Every inner page uses this same banner.
2. **Who We Are**: six short paragraphs (non-profit, bilateral platform, sectors covered: trade, finance, energy, education, technology, healthcare, tourism; trusted connector; trade missions and events) beside a rounded flags photo.
3. **Our Objectives**: the same six cards as Home.
4. **Board of Directors**: maroon band, a **carousel** of portrait cards with prev/next arrows (4 visible). Each card: photo, name, role on the board in maroon (Chairman, Vice Chairman, Treasurer, General Secretary, Board Member), job title / company, company website. Nine members.
5. **Honorary Board Advisors**: **royal blue** band (`#003EA7`, the UK flag blue) with three white cards: photo, name in blue, a longer bio, a "LinkedIn profile" link and a website.
6. **Executive Team**: white background, four cards: photo (grey silhouette placeholder when there is no photo), name, title in maroon (CEO, Marketing Director, Executive Manager, Communications Manager).
7. Partners, Supported by.

### 4.3 Why Join (`/membership`)

1. Banner "Why Join".
2. **"JBBC is Your Extended Business Development Team"**: a paragraph beside a rounded flags photo.
3. **Four alternating image/text rows** (zig-zag, alternating white and light-grey backgrounds), each with a rounded stock image:
   - Trade Growth
   - Investment Opportunities
   - Sectoral Committees (ICT and digital; education and skills; tourism and creative industries; advanced manufacturing and logistics; pharmaceuticals and life sciences)
   - Events & Networking
4. **Membership Benefits**: maroon band, four white cards in a row with small icons: Access, Visibility, Advocacy, Networking. (All four carry the same placeholder sentence on the live site.)
5. **"Ready to Become a Member?"**: full-width photo of the Houses of Parliament at dusk with an overlay, one line, white "Apply Now" pill.
6. Partners, Supported by.

### 4.4 Membership Plan (`/membership-plan`)

Three tier cards side by side, each with a coloured top edge and outline in its metal colour:

| Tier       | Colour    | Tagline                                                        | Features |
| ---------- | --------- | -------------------------------------------------------------- | -------- |
| **Bronze** | `#BC7C50` | Essential access and visibility within the UK–Jordan community | 8        |
| **Silver** | `#949494` | Enhanced business development, visibility, and influence       | 12       |
| **Gold**   | `#D4AF37` | Premium, highly personalized engagement and advocacy           | 18       |

Features accumulate tier by tier:

- **Bronze:** Networking Opportunities · B2B Introductions · Listing in the Member Directory · Business Visa Support · Member Discounts & Special Offers · Priority Invitations to VIP Events & Roundtables · Facilitated Meetings with Government & Public Sector · Committee Membership
- **Silver adds:** Committee Leadership · Market Insights (Basic) · Business Development Support · Basic Brand Visibility on Council Channels
- **Gold adds:** Market Insights (Tailored) · Enhanced Brand Visibility · Advocacy & Policy Voice · Personalized Guidance & Assistance · Intensive Follow-Up on Leads & Partnerships · Strategic Lobbying & Relations Support

There are **no prices and no apply button on the cards**. The "Apply Now" buttons elsewhere on the site all point here, so a visitor who decides to join has nowhere to go.

### 4.5 Member Directory (`/member-directory`)

- Embedded Glue Up widget: a "Company Members" tab, a search box, **Company Name** and **Industry** filters, an **A–Z letter index**, and a list grouped by letter. Each row: logo (or a maroon square with the initial), company name, industry in grey, outlined "More Information" button.
- **"More Information" opens a pop-up**, centred over the dimmed list, with a close (×) button. It holds:
  - the company logo in a white box overlapping the top edge
  - the company name and its industry
  - "Member since 2026"
  - an **About** section with the company profile, introduced by a label left over from the form ("Company Profile for Directory (200 words)")

  That is all: no website, contact person, phone, email, address, country or social links. A visitor who finds a member cannot reach them from the directory.

- 21 member companies across 15 industries when checked: Pharmaceuticals, Fashion & Apparel, Packaging & Containers, Mining & Metals, Agriculture, Banking, Education Management, Healthcare, Computer Software, Manufacturing, Automotive, Retail, Business Consulting, Logistics & Supply Chain, Other.
- Below it: a photo band (Buckingham Palace) with "Interested in Collaborating with JBBC?", "Become a Member" and "Contact Us" buttons.

**For IBBC's own directory** (built in-house), the same list, search, industry filter and A–Z index, plus a proper company page or pop-up with: logo, name in Arabic and English, industry, membership tier, member since, profile in both languages, website, country (Iraq / UK), city, and optionally a contact email. The member should be able to choose what is shown.

- Partners, Supported by.

### 4.6 Events (`/upcoming-events`, `/event`)

- The list page is a Glue Up event widget. On the day it was checked it was **empty**: a maroon line and a blank box, with no "no upcoming events" message.
- A single event page (`/node/126`) is a Drupal node: image, date (December 3, 2025), title, a facts row (Time 12:00 PM–5:00 PM · Location London · Attendees 100), and a description.

### 4.7 Contact (`/contact-us`)

Two white rounded cards side by side:

- **Get in Touch:** Address (342 Wasfi Al Tal St., Suite 401, Amman 11183), Phone, Email, each with a soft-pink rounded icon tile; a divider; **Office Hours** (Mon–Fri 9:00–5:00, Sat–Sun closed); LinkedIn icon.
- **Send Us a Message:** Name*, Company, Email*, Message*; full-width maroon "Send Message" pill; the note "We typically respond within 24-48 hours during business days."

No map.

The page **shows media@jbbc.jo but the link opens an email to info@jbbc.jo**, and the Terms of Use give a third address, info@jbbc.org.jo.

### 4.8 Legal pages

All three pages use the standard maroon banner and plain text.

- **Privacy Policy** (`/privacy-policy`), titled "Website Privacy Notice". Its sections:
  - When data is processed: website visits, forms, subscriptions, phone and email
  - What information is collected
  - Website cookies, with a link to the UK ICO cookie guidance
  - How data is used (never sold; consent asked before marketing; opt out by email)
  - Who it is shared with: affiliates, contractors, authorities, a future buyer
  - How long it is kept: up to 7 years after a contract; 1 year for enquiries, or 7 if there is a complaint; 5 years after litigation; 12 months for security data
  - Your rights
  - Intellectual property
  - Disclaimer
  - Contact information

  It reads as a UK/EU GDPR-style notice adapted for Jordan.

- **Terms of Use** (`/terms-of-Use`), "Last updated: November 10, 2025". It is short and has five numbered sections:
  1. Acceptance of terms
  2. Use of website content (view for personal use; no copying without permission)
  3. User responsibilities
  4. Third-party links
  5. Event registrations and membership (subject to extra guidelines and approval)

  It ends with a contact email.

- **Cookie documentation** (`/cookies/documentation`): a table of cookie name, expiry and description. It lists only two: the Drupal session cookie (1 month) and the consent cookie `cookiesjsr` (1 year).

For IBBC: a privacy notice and terms in Arabic and English, covering what the membership application and the member directory collect and publish (the JBBC notice predates any such features of its own). The wording needs the client's legal review; we should not write it as final.

---

## 5. Visual design

### Colour

| Role                             | Value                                              | Where                                                                                       |
| -------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Primary (maroon / burgundy)      | `#871E2D` (rgb 135 30 45)                          | Banners, Vision & Mission band, Board band, footer, primary buttons, active nav, card roles |
| Secondary (UK blue)              | `#003EA7`                                          | Honorary Advisors band only                                                                 |
| Page background (warm off-white) | `#FAF7F3`                                          | Partners area and body                                                                      |
| Light section background         | `#FAFAFA`                                          | Objectives, alternating rows                                                                |
| Body text                        | `#3B3B3B`                                          | Paragraphs                                                                                  |
| Dark grey                        | `#494446`                                          | Secondary buttons ("Read More"), utility icons                                              |
| Top bar grey                     | about `#E7E7E7`                                    | Utility bar                                                                                 |
| Tier colours                     | Bronze `#BC7C50`, Silver `#949494`, Gold `#D4AF37` | Membership plan only                                                                        |

The palette is taken from the Jordanian flag's red, with the UK blue as an accent. For Iraq, the equivalent would come from the Iraqi flag (red, white, black, with the green of the takbir) paired with the UK blue. That is a design decision to make with the client, not something to copy.

### Typography

- **Brown** (Brown Pro / Brown thin / Brown bold), a commercial geometric sans, for everything. Body is the thin cut at about 20px; section headings are about 40px, weight 600; page titles are about 45px bold. The logo and some labels use Gill Sans Nova Condensed.
- Brown has no Arabic. A bilingual Iraqi site needs one family that covers both scripts.

### Layout patterns

- Full-width coloured bands alternating with white or off-white sections.
- Centred section headings over card grids.
- White cards with large radius (about 24px), a thin border or soft shadow, generous padding.
- Rounded photos (about 24px) beside text.
- Zig-zag image/text rows for longer explanations.
- Photo bands with a dark overlay for calls to action (London landmarks: Parliament, Buckingham Palace).
- Pill buttons: maroon filled, white filled on dark, dark-grey filled, and maroon outline.
- Inner-page banner: maroon with a white wireframe wave on the left, title and breadcrumb.
- Fade-in on scroll throughout.

### Imagery

Flag photographs (Jordan + UK flags side by side) carry the brand: hero, Introduction, Who We Are, Why Join. Beyond the flags: London landmarks, generic business stock (people in suits, holographic "connect" scenes), and partner logos.

---

### Phone layout (checked at 390px)

- **Header:** the grey utility bar stays (search, LinkedIn, Contact Us). Below it, the logo on the left and a maroon three-line menu button on the right.
- **Menu:** the button turns into a maroon ×, and the links (Home, About JBBC ▾, Membership ▾, Events) drop down **inside the header, pushing the page down**. It is not an overlay. Links are left-aligned, the active one maroon and underlined; the submenus open with a caret. There is **no Contact link in the menu**, only the small button in the top bar.
- **Hero:** the flags photo fills the screen. The title shrinks to about 20px, **smaller than the paragraph under it**, so the heading reads as the minor line. The two buttons sit side by side.
- **Sections:** everything stacks into one column. Vision and Mission become two full-width cards with the icon above the text. The six objectives become one long column of cards. Justified paragraphs leave wide gaps on a narrow screen.
- **Carousels** (Swiper, no autoplay, no loop):
  - Board of Directors: 1 card per screen on phones, 3 from 768px, 4 from 1200px, with round white prev/next arrows over the photo.
  - Executive Team and the "Supported by" logos: the same pattern.
  - Honorary Advisors: 1 card up to 1200px, then 3.
- **Membership tiers:** the three cards stack (Bronze, Silver, Gold). Their feature lists are set at **9.4px**, too small to read on a phone (and small on desktop as well).
- **Contact:** the "Get in Touch" card sits above the form. Form fields use 14.9px text, so iPhones zoom in when a field is tapped (16px avoids that).
- **Footer:** logo and "Do you have any Questions?" side by side, then Quick Links and Contact Us in one column, then the legal links and credit.
- No sideways scrolling: the page fits the screen width.

---

## 6. Problems on the JBBC site (avoid these)

- **No Arabic.** For a Jordan–UK council this is the biggest gap, and for Iraq Arabic is essential.
- **No way to apply.** Every "Apply Now" goes to the plan page, which has no application button, form or link to the CRM.
- **The events list is a blank box** when there are no events. Show past events or a clear "no upcoming events" message.
- **Placeholder copy left live.** All four membership benefit cards share one sentence.
- **Poor image alt text:** "any", "1", "test". Screen readers also read the word "Image" before many pictures.
- **Broken phone link:** the footer uses `tell:` instead of `tel:`, so tapping the number does nothing.
- **Typo'd anchors:** `#board-dierector`, `/terms-of-Use`.
- **Content hidden by animation.** Sections stay invisible until scroll animations fire; a full-page capture or a slow device shows large blank areas.
- **Only one social channel** (LinkedIn), no news or publications section, no map on Contact.
- **Justified paragraphs** leave rivers of white space in narrow cards.
- **Three different email addresses:** media@jbbc.jo (shown), info@jbbc.jo (where the Contact page's link actually goes), info@jbbc.org.jo (Terms of Use).
- **The directory pop-up has no way to contact the member**, and shows a form label ("Company Profile for Directory (200 words)") as if it were content.
- **On phones:** the hero title is smaller than its paragraph; the menu has no Contact link; the membership feature lists are 9.4px; form fields under 16px make iPhones zoom.

---

## 7. What the Iraqi site should keep

The structure works and maps one-to-one:

| JBBC                                                                    | Iraqi version                                                                                               |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Hero with the two flags, tagline, "Learn More" and "Become a Member"    | Same, with the Iraqi and UK flags                                                                           |
| Introduction, Vision & Mission, Objectives (6 cards)                    | Same sections, the council's own wording                                                                    |
| About: Who We Are, Objectives, Board, Honorary Advisors, Executive Team | Same, with people supplied by the council                                                                   |
| Why Join: zig-zag rows, Sectoral Committees, Benefits, CTA band         | Same; committees for Iraq's priority sectors (to be supplied)                                               |
| Membership Plan: Bronze / Silver / Gold                                 | Same model if the council uses tiers, **plus prices or "Request a quote" and an Apply button on each card** |
| Member Directory with search, industry filter, A–Z                      | Same                                                                                                        |
| Events list and event page                                              | Same, with a past-events archive                                                                            |
| Contact: details, office hours, form                                    | Same, plus a map and possibly two offices (Baghdad / London, or Erbil / Basra, as applicable)               |
| Partners and Supported by on every page                                 | Same                                                                                                        |
| Maroon footer with question prompt, quick links, contact                | Same pattern, the council's colour                                                                          |

## 8. Recommended additions for Iraq

1. **Arabic first, English second** (RTL and LTR), with a language switch in the header.
2. **A working membership path:** an application form (company, contact, sector, tier, message, optional documents) or a direct link into the membership CRM.
3. **News / Insights** section: announcements, trade-mission reports and market notes. JBBC has nowhere to publish these.
4. **Past events** archive with photos, so the Events page is never empty.
5. **Sector pages or a sectors grid** for Iraq's main opportunity areas (to be confirmed by the council; nothing to be assumed).
6. **More contact channels:** WhatsApp, X, Facebook, Instagram as the council uses them; a map; `tel:` links that work.
7. Accessible images, a skip link, visible focus, and content that does not depend on scroll animations to appear.

## 9. Decisions made

- **Name:** IBBC, **Iraqi–British Business Council**, **مجلس الأعمال العراقي البريطاني** in Arabic, Iraq first, as in the brand identity.
- **Standing:** formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce (اتحاد الغرف التجارية العراقية) and ratified by the Ministry of Commerce (وزارة التجارة).
- **Brand identity (supplied 2026-11-02):** "Union Blue. An Iraqi connection. A spark of red." Deep union blue as the main colour, a small red accent, a warm ivory ground, a serif wordmark with its own lettering (small capitals), and an octagonal emblem with a red notch at the top.
- **Languages: Arabic and English**, Arabic right-to-left and English left-to-right, with a language switch in the header. Every page and all content exist in both. The default language is still to be confirmed; Arabic is recommended.
- **Membership system: built ourselves.** No Glue Up or other membership platform. The member directory (search, industry filter, A–Z), events (list, event page, past archive) and the membership application are part of our build, done in a later phase.
- **Colour theme:** from the brand identity above. JBBC's colours in section 5 are reference only.

## 10. Content still needed from the client

- Logo files (vector) and the full identity deck, and the domain.
- Tagline, introduction, vision, mission and objectives (Arabic and English).
- Board, honorary advisors and executive team: names, roles, photos, bios, links.
- Membership tiers, features and prices; how members apply and pay.
- Member companies for the directory (name, logo, industry, description, website).
- Sectoral committees.
- Events, past and upcoming.
- Partners and supporters, with logos and permission to show them.
- Office address(es), phone, email, office hours, social accounts.
- Privacy policy and terms of use.
- Photography: flag images and the council's own event photos (avoid relying only on stock).
