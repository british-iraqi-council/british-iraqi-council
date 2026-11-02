import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomePageClient from "./page-client";
import { HomePageProps } from "./types";

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });

  return {
    title: { absolute: t("title") },
    description: t("description"),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageClient locale={locale} />;
}
