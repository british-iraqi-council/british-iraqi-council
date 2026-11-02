import { getTranslations } from "next-intl/server";
import { BANNER_IMAGES } from "@/core/constants/images";
import {
  PhotoBand,
  Reveal,
  RichText,
  SectionHeading,
} from "@/core/new-components/common";
import { HomeSectionProps } from "../types";

const CARDS = [
  { key: "vision", title: "visionTitle", body: "vision" },
  { key: "mission", title: "missionTitle", body: "mission" },
] as const;

export default async function VisionMission({ locale }: HomeSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.visionMission" });

  return (
    <PhotoBand
      image={BANNER_IMAGES.visionMission.src}
      imagePosition={BANNER_IMAGES.visionMission.position}
      className="flex flex-col gap-10 lg:gap-12"
    >
      <SectionHeading title={t("title")} tone="light" align="center" />
      <Reveal variant="stagger" className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {CARDS.map((card) => (
          <article
            key={card.key}
            className="card-lift flex flex-col gap-4 rounded-2xl border border-white/20 bg-blue-deep/40 p-7 lg:p-10"
          >
            <h3 className="font-display text-title font-semibold text-white">
              <RichText text={t(card.title)} locale={locale} />
            </h3>
            <p className="text-lead text-on-blue-muted">
              <RichText text={t(card.body)} locale={locale} />
            </p>
          </article>
        ))}
      </Reveal>
    </PhotoBand>
  );
}
