import { getTranslations } from "next-intl/server";
import { OBJECTIVES } from "@/content";
import {
  IconCardGrid,
  Section,
  SectionHeading,
} from "@/core/new-components/common";
import { HomeSectionProps } from "../types";

export default async function Objectives({ locale }: HomeSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.objectives" });

  return (
    <Section>
      <div className="reveal flex flex-col gap-10">
        <SectionHeading title={t("title")} lede={t("lede")} />
        <IconCardGrid items={OBJECTIVES} columns={3} />
      </div>
    </Section>
  );
}
