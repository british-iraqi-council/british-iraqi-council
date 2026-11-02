import { getTranslations } from "next-intl/server";
import { RichText, SectionHeading } from "@/core/new-components/common";
import { HomeSectionProps } from "../types";

const CARDS = [
  { key: "vision", title: "visionTitle", body: "vision" },
  { key: "mission", title: "missionTitle", body: "mission" },
] as const;

export default async function VisionMission({ locale }: HomeSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.visionMission" });

  return (
    <section className="on-blue bg-blue">
      <div className="shell reveal flex flex-col gap-12 py-16 lg:py-24">
        <SectionHeading title={t("title")} tone="light" align="center" />
        <div className="grid gap-6 md:grid-cols-2">
          {CARDS.map((card) => (
            <article
              key={card.key}
              className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/5 p-7 lg:p-10"
            >
              <h3 className="font-display text-title font-semibold text-white">
                <RichText text={t(card.title)} locale={locale} />
              </h3>
              <p className="text-lead text-on-blue-muted">
                <RichText text={t(card.body)} locale={locale} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
