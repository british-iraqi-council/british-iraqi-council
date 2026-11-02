import { getTranslations } from "next-intl/server";
import { Link } from "@/core/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main id="content" tabIndex={-1}>
      <h1>{t("title")}</h1>
      <p>{t("body")}</p>
      <Link href="/">{t("home")}</Link>
    </main>
  );
}
