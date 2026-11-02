const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const PATHS = ["", "/about"];
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
]) {
  const response = await get(path);
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 200 || !contentType.startsWith(type)) {
    fail(
      `${path}: expected 200 ${type}, got ${response.status} ${contentType}`,
    );
  }
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
