import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/build-page-metadata";
import ContactPageClient from "./page-client";
import { ContactPageProps } from "./types";

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPageClient locale={locale} />;
}
