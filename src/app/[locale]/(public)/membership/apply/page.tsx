import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/build-page-metadata";
import ApplicationPageClient from "./page-client";
import { ApplicationPageProps } from "./types";

export async function generateMetadata({
  params,
}: ApplicationPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "apply", "/membership/apply");
}

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ApplicationPageClient locale={locale} />;
}
