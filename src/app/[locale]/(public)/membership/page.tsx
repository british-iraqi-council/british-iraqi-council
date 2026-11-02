import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MembershipPageClient from "./page-client";
import { MembershipPageProps } from "./types";

export async function generateMetadata({
  params,
}: MembershipPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "membership.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MembershipPage({ params }: MembershipPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MembershipPageClient locale={locale} />;
}
