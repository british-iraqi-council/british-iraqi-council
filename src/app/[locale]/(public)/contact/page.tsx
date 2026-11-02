import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactPageClient from "./page-client";
import { ContactPageProps } from "./types";

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPageClient locale={locale} />;
}
