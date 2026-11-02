import { getTranslations } from "next-intl/server";
import { OBJECTIVES } from "@/content";
import {
  IconCardGrid,
  Section,
  SectionHeading,
} from "@/core/new-components/common";
import { AboutSectionProps } from "../types";

export default async function Objectives({ locale }: AboutSectionProps) {
  const t = await getTranslations({ locale, namespace: "about.objectives" });

  return (
    <Section id="objectives">
      <div className="reveal flex flex-col gap-10">
        <SectionHeading title={t("title")} lede={t("lede")} />
        <IconCardGrid items={OBJECTIVES} columns={3} />
      </div>
    </Section>
  );
}
