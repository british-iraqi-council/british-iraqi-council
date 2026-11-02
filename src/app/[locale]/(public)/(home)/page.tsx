import { getTranslations, setRequestLocale } from "next-intl/server";
import { ORGANISATION } from "@/content";
import { PageHeading } from "@/core/new-components/common";
import { localize } from "@/lib/localize";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <div className="-mt-20 bg-blue pt-20 lg:-mt-24 lg:pt-24">
      <PageHeading
        title={t("siteName")}
        lede={localize(ORGANISATION.description, locale)}
      />
    </div>
  );
}
