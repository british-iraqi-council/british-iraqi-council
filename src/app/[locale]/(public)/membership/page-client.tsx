import { getTranslations } from "next-intl/server";
import { IndexPills, PageHeading } from "@/core/new-components/common";
import { Benefits, Tiers, WhyJoin } from "./components";
import { MembershipSectionProps } from "./types";

const SECTIONS = ["why-join", "benefits", "tiers"] as const;

export default async function MembershipPageClient({
  locale,
}: MembershipSectionProps) {
  const t = await getTranslations({ locale, namespace: "membership" });
  const pills = SECTIONS.map((id) => ({ id, label: t(`sections.${id}`) }));

  return (
    <>
      <PageHeading title={t("heading.title")} lede={t("heading.lede")}>
        <IndexPills items={pills} title={t("indexLabel")} locale={locale} />
      </PageHeading>
      <WhyJoin locale={locale} />
      <Benefits locale={locale} />
      <Tiers locale={locale} />
    </>
  );
}
