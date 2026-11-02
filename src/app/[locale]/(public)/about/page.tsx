import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/build-page-metadata";
import AboutPageClient from "./page-client";
import { AboutPageProps } from "./types";

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "about", "/about");
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageClient locale={locale} />;
}
