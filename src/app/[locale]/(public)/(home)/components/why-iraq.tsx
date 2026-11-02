import { getTranslations } from "next-intl/server";
import { WHY_IRAQ } from "@/content";
import {
  IconCardGrid,
  Section,
  SectionHeading,
} from "@/core/new-components/common";
import { HomeSectionProps } from "../types";

export default async function WhyIraq({ locale }: HomeSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.whyIraq" });

  return (
    <Section>
      <div className="reveal flex flex-col gap-10 lg:gap-12">
        <SectionHeading title={t("title")} lede={t("lede")} />
        <IconCardGrid items={WHY_IRAQ} columns={4} />
      </div>
    </Section>
  );
}
