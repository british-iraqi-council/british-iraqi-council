import type { MetadataRoute } from "next";
import { routing } from "@/core/i18n/routing";
import { buildAlternates } from "@/lib/build-alternates";

const PATHS = [
  "",
  "/about",
  "/membership",
  "/membership/apply",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    PATHS.map((path) => {
      const { canonical, languages } = buildAlternates(locale, path);
      return {
        url: canonical,
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.7,
        alternates: { languages },
      };
    }),
  );
}
