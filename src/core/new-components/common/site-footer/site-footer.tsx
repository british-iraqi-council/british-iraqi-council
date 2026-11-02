import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { ORGANISATION, type SocialNetwork } from "@/content";
import { Link } from "@/core/i18n/navigation";
import type { Locale } from "@/core/i18n/routing";
import { MAIN_NAV } from "@/core/constants/navigation";
import { contactItems, type ContactItem } from "@/lib/contact-items";
import { localize } from "@/lib/localize";
import Brand from "../brand";
import RichText from "../rich-text";

const CONTACT_ICONS: Record<ContactItem["kind"], LucideIcon> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

const SOCIAL_NAMES: Record<SocialNetwork, string> = {
  linkedin: "LinkedIn",
  x: "X",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
};

const linkClasses =
  "inline-flex min-h-11 items-center text-base text-white underline-offset-4 transition-colors duration-150 hover:underline lg:min-h-9";

const legalLinkClasses =
  "inline-flex min-h-11 items-center text-on-blue-muted underline-offset-4 transition-colors duration-150 hover:text-white hover:underline";

const LEGAL_LINKS = [
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
] as const;

const headingClasses = "font-display text-title font-semibold text-white";

export default async function SiteFooter() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const contact = contactItems(ORGANISATION.contact, locale);
  const social = ORGANISATION.contact.social;
  const year = new Date().getFullYear();

  return (
    <footer className="on-blue bg-blue text-white">
      <div
        className={`shell grid gap-12 py-16 lg:py-20 ${contact.length > 0 ? "lg:grid-cols-[1.6fr_1fr_1fr]" : "lg:grid-cols-[2fr_1fr]"}`}
      >
        <div className="flex flex-col items-start gap-6">
          <Brand tone="light" />
          <p className="max-w-[48ch] text-sm text-on-blue-muted">
            <RichText
              text={localize(ORGANISATION.standing, locale)}
              locale={locale}
            />
          </p>
          {social.length > 0 ? (
            <ul aria-label={t("social")} className="flex flex-wrap gap-2">
              {social.map((item) => (
                <li key={item.network}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    dir="ltr"
                    className="inline-flex min-h-11 items-center rounded-full border border-white px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-white hover:text-blue"
                  >
                    {SOCIAL_NAMES[item.network]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav aria-labelledby="footer-links" className="flex flex-col gap-4">
          <h2 id="footer-links" className={headingClasses}>
            {t("quickLinks")}
          </h2>
          <ul className="flex flex-col">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClasses}>
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {contact.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h2 className={headingClasses}>{t("contact")}</h2>
            <ul className="flex flex-col gap-3">
              {contact.map((item) => {
                const Glyph = CONTACT_ICONS[item.kind];
                const text = <RichText text={item.text} locale={locale} />;
                return (
                  <li key={item.kind} className="flex items-center gap-3">
                    <Glyph
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-4.5 shrink-0 text-on-blue-muted"
                    />
                    {item.href ? (
                      <a href={item.href} className={linkClasses}>
                        {text}
                      </a>
                    ) : (
                      <span className="text-base text-white">{text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="shell">
        <div className="flex flex-col gap-4 border-t border-white/20 py-6 text-sm text-on-blue-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            <RichText
              text={t("copyright", { year, siteName: tCommon("siteName") })}
              locale={locale}
            />
          </p>
          <nav aria-label={t("legal")}>
            <ul className="flex flex-wrap gap-x-6">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={legalLinkClasses}>
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
