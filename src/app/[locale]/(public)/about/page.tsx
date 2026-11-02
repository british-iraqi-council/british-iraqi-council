import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutPageClient from "./page-client";
import { AboutPageProps } from "./types";

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageClient locale={locale} />;
}
