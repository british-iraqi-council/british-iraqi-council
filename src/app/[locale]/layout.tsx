import "../tailwind.css";
import { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { getLangDir } from "rtl-detect";
import type { Metadata } from "next";
import { ORGANISATION } from "@/content";
import { routing } from "@/core/i18n/routing";
import { amiri, cormorant, inter, plexArabic } from "@/core/config/fonts";
import { SITE_URL } from "@/core/constants/site";
import { localize } from "@/lib/localize";
import { openGraphLocale } from "@/lib/open-graph-locale";
import { organizationSchema } from "@/lib/organization-schema";
import { pickMessages } from "@/lib/pick-messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const description = localize(ORGANISATION.description, locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("siteName"), template: `%s | ${t("siteName")}` },
    description,
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("siteName"),
      description,
      locale: openGraphLocale(locale),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = getLangDir(locale);
  const messages = await getMessages();
  const shellMessages = pickMessages(messages, [
    "common",
    "nav",
    "languageSwitcher",
    "footer",
    "notFound",
  ]);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cormorant.variable} ${amiri.variable} ${inter.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-ivory font-sans text-ink antialiased"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationSchema(locale, SITE_URL, `${SITE_URL}/apple-icon`),
            ).replace(/</g, "\\u003c"),
          }}
        />
        <NextIntlClientProvider messages={shellMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
