const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const PATHS = [
  "",
  "/about",
  "/membership",
  "/membership/apply",
  "/contact",
  "/privacy",
  "/terms",
];
const TIER_IDS = ["bronze", "silver", "gold"];
const LOCALES = [
  { code: "ar", dir: "rtl" },
  { code: "en", dir: "ltr" },
];
const STANDING = {
  ar: "تأسس المجلس في العراق بموافقة اتحاد الغرف التجارية العراقية ومصادقة وزارة التجارة.",
  en: "Formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce, and ratified by the Ministry of Commerce.",
};
const HERO_TITLE = {
  ar: "حيث تلتقي المؤسسات العراقية بالأعمال البريطانية",
  en: "Where Iraqi enterprise meets British business",
};
const FORBIDDEN = ["[", "]", "undefined", "TODO", "lorem"];

const failures = [];
const fail = (message) => failures.push(message);

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ");

const mainHtml = (html) => html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? "";

const plainText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const linkTags = (html) => html.match(/<link\s[^>]*>/gi) ?? [];

const hasAlternate = (html, language) =>
  linkTags(html).some((tag) => {
    const lower = tag.toLowerCase();
    return (
      lower.includes(' rel="alternate"') &&
      lower.includes(` hreflang="${language}"`)
    );
  });

const get = (path) => fetch(`${BASE_URL}${path}`, { redirect: "manual" });

const checkRedirect = async (from, toSuffix) => {
  const response = await get(from);
  const location = response.headers.get("location") ?? "";
  if (![307, 308].includes(response.status) || !location.endsWith(toSuffix)) {
    fail(
      `${from}: expected redirect to ${toSuffix}, got ${response.status} ${location}`,
    );
  }
};

await checkRedirect("/", "/ar");
await checkRedirect("/about", "/ar/about");
await checkRedirect("/membership", "/ar/membership");

for (const { code, dir } of LOCALES) {
  for (const path of PATHS) {
    const url = `/${code}${path}`;
    const response = await get(url);
    if (response.status !== 200) {
      fail(`${url}: status ${response.status}`);
      continue;
    }
    const html = await response.text();
    if (!html.includes(`<html lang="${code}" dir="${dir}"`)) {
      fail(`${url}: missing <html lang="${code}" dir="${dir}">`);
    }
    const text = visibleText(html);
    for (const language of ["ar", "en"]) {
      if (!hasAlternate(html, language)) {
        fail(`${url}: missing <link rel="alternate" hreflang="${language}">`);
      }
    }
    if (!/<meta[^>]*property="og:image"[^>]*content="[^"]+"/i.test(html)) {
      fail(`${url}: missing og:image`);
    }
    if (path === "") {
      const main = mainHtml(html);
      if (!plainText(main).includes(STANDING[code])) {
        fail(`${url}: <main> does not contain the standing line`);
      }
      const h1 = main.match(/<h1[\s\S]*?<\/h1>/i)?.[0] ?? "";
      if (plainText(h1) !== HERO_TITLE[code]) {
        fail(`${url}: <main> has no <h1> reading "${HERO_TITLE[code]}"`);
      }
    }
    if (path === "/about") {
      if (!html.includes('id="objectives"')) {
        fail(`${url}: missing id="objectives"`);
      }
      for (const id of ["board", "advisors", "team"]) {
        if (html.includes(`id="${id}"`) || html.includes(`href="#${id}"`)) {
          fail(`${url}: renders the empty "${id}" section or its pill`);
        }
      }
    }
    if (path === "/membership") {
      for (const id of ["why-join", "benefits", "tiers"]) {
        if (!html.includes(`id="${id}"`) || !html.includes(`href="#${id}"`)) {
          fail(`${url}: missing the "${id}" section or its pill`);
        }
      }
      const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map(
        (match) => match[1],
      );
      for (const tier of TIER_IDS) {
        const suffix = `/${code}/membership/apply?tier=${tier}`;
        const count = hrefs.filter((href) => href.endsWith(suffix)).length;
        if (count !== 1) {
          fail(`${url}: expected one link ending ${suffix}, found ${count}`);
        }
      }
    }
    if (path === "/membership/apply") {
      const tierInputs = html.match(/name="tier"/g)?.length ?? 0;
      if (tierInputs !== 3) {
        fail(`${url}: expected three name="tier" inputs, found ${tierInputs}`);
      }
      if (!html.includes('name="consent"')) {
        fail(`${url}: missing name="consent"`);
      }
    }
    if (path === "/contact") {
      if (html.includes('href="tel:') || html.includes('href="mailto:')) {
        fail(
          `${url}: has a tel: or mailto: link before any contact detail is confirmed`,
        );
      }
      if (!html.includes("<form")) {
        fail(`${url}: has no <form`);
      }
    }
    for (const token of FORBIDDEN) {
      if (text.toLowerCase().includes(token.toLowerCase())) {
        fail(`${url}: visible text contains "${token}"`);
      }
    }
  }
}

for (const [path, type] of [
  ["/icon.svg", "image/svg+xml"],
  ["/apple-icon", "image/png"],
  ["/ar/opengraph-image", "image/png"],
  ["/en/opengraph-image", "image/png"],
]) {
  const response = await get(path);
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 200 || !contentType.startsWith(type)) {
    fail(
      `${path}: expected 200 ${type}, got ${response.status} ${contentType}`,
    );
  }
}

const sitemap = await get("/sitemap.xml");
const sitemapUrls = (await sitemap.text()).match(/<loc>/g)?.length ?? 0;
if (sitemap.status !== 200 || sitemapUrls !== 14) {
  fail(
    `/sitemap.xml: expected 200 with 14 URLs, got ${sitemap.status} with ${sitemapUrls}`,
  );
}

const robots = await get("/robots.txt");
const robotsText = await robots.text();
const disallowsAll = /^Disallow: \/\s*$/m.test(robotsText);
const expectDisallow = process.env.VERCEL_ENV !== "production";
if (robots.status !== 200 || disallowsAll !== expectDisallow) {
  fail(
    `/robots.txt: expected ${expectDisallow ? "" : "no "}"Disallow: /", got ${robots.status} ${JSON.stringify(robotsText)}`,
  );
}

const missing = await get("/ar/does-not-exist");
if (missing.status !== 404) {
  fail(`/ar/does-not-exist: expected 404, got ${missing.status}`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("smoke: all checks passed");
