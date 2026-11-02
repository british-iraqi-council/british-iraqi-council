import { setRequestLocale } from "next-intl/server";
import { PublicLayoutProps } from "./types";

export default async function PublicLayout({
  children,
  params,
}: PublicLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="content" tabIndex={-1}>
      {children}
    </main>
  );
}
