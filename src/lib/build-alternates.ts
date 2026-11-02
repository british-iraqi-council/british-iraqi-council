import { SITE_URL } from "@/core/constants/site";
import type { Locale } from "@/core/i18n/routing";

export interface LocaleAlternates {
  canonical: string;
  languages: Record<Locale, string>;
}

export const buildAlternates = (
  locale: string,
  path: string,
): LocaleAlternates => ({
  canonical: `${SITE_URL}/${locale}${path}`,
  languages: {
    ar: `${SITE_URL}/ar${path}`,
    en: `${SITE_URL}/en${path}`,
  },
});
