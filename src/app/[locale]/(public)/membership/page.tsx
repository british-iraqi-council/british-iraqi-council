import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/build-page-metadata";
import MembershipPageClient from "./page-client";
import { MembershipPageProps } from "./types";

export async function generateMetadata({
  params,
}: MembershipPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "membership", "/membership");
}

export default async function MembershipPage({ params }: MembershipPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MembershipPageClient locale={locale} />;
}
