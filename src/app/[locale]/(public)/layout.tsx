import { setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/core/new-components/common";
import { PublicLayoutProps } from "./types";

export default async function PublicLayout({
  children,
  params,
}: PublicLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SiteShell>{children}</SiteShell>;
}
