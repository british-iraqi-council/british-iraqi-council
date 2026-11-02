import { getTranslations } from "next-intl/server";
import { BENEFITS } from "@/content";
import {
  IconCardGrid,
  Section,
  SectionHeading,
} from "@/core/new-components/common";
import { MembershipSectionProps } from "../types";

export default async function Benefits({ locale }: MembershipSectionProps) {
  const t = await getTranslations({
    locale,
    namespace: "membership.benefits",
  });

  return (
    <Section id="benefits">
      <div className="reveal flex flex-col gap-10">
        <SectionHeading title={t("title")} lede={t("lede")} />
        <IconCardGrid items={BENEFITS} columns={4} />
      </div>
    </Section>
  );
}
