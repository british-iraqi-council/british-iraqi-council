import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ApplicationPageClient from "./page-client";
import { ApplicationPageProps } from "./types";

export async function generateMetadata({
  params,
}: ApplicationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "apply.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ApplicationPageClient locale={locale} />;
}
