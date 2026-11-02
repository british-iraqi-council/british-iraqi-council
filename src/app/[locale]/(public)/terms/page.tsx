import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/core/new-components/common";
import { buildPageMetadata } from "@/lib/build-page-metadata";
import { TermsPageProps } from "./types";

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "terms", "/terms");
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalPage namespace="terms" />;
}
