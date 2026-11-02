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
import { routing } from "@/core/i18n/routing";
import { pickMessages } from "@/lib/pick-messages";
import { amiri, cormorant, inter, plexArabic } from "@/core/config/fonts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: { default: t("siteName"), template: `%s | ${t("siteName")}` },
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
  const shellMessages = pickMessages(messages, ["common", "nav", "notFound"]);

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
        <NextIntlClientProvider messages={shellMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
