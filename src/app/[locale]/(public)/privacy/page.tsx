import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/core/new-components/common";
import { buildPageMetadata } from "@/lib/build-page-metadata";
import { PrivacyPageProps } from "./types";

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "privacy", "/privacy");
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalPage namespace="privacy" />;
}
