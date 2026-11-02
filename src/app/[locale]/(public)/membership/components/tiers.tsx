import { getTranslations } from "next-intl/server";
import { TIERS } from "@/content";
import { Section, SectionHeading } from "@/core/new-components/common";
import { MembershipSectionProps } from "../types";
import TierCard from "./tier-card";

export default async function Tiers({ locale }: MembershipSectionProps) {
  const t = await getTranslations({ locale, namespace: "membership.tiers" });

  return (
    <Section id="tiers">
      <div className="reveal flex flex-col gap-10">
        <SectionHeading title={t("title")} lede={t("lede")} />
        <ul className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, index) => (
            <TierCard
              key={tier.id}
              tier={tier}
              previous={TIERS[index - 1]}
              locale={locale}
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}
