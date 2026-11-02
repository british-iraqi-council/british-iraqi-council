export interface Localized {
  ar: string;
  en: string;
}

export const localize = (value: Localized, locale: string): string =>
  locale === "ar" ? value.ar : value.en;
