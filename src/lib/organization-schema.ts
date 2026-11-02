import { ORGANISATION } from "@/content";
import type { Locale } from "@/core/i18n/routing";
import { localize } from "@/lib/localize";

export const organizationSchema = (
  locale: Locale,
  siteUrl: string,
  logoUrl: string,
): Record<string, unknown> => {
  const { name, description, contact } = ORGANISATION;
  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: localize(name, locale),
    alternateName: localize(name, otherLocale),
    description: localize(description, locale),
    url: `${siteUrl}/${locale}`,
    logo: logoUrl,
    inLanguage: locale,
    ...(contact.address && { address: localize(contact.address, locale) }),
    ...(contact.phone && { telephone: contact.phone }),
    ...(contact.email && { email: contact.email }),
    ...(contact.social.length > 0 && {
      sameAs: contact.social.map((link) => link.url),
    }),
  };
};
