import { getTranslations } from "next-intl/server";
import { BANNER_IMAGES } from "@/core/constants/images";
import {
  Button,
  PhotoBand,
  Reveal,
  RichText,
} from "@/core/new-components/common";
import { HomeSectionProps } from "../types";

export default async function MembershipBand({ locale }: HomeSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.membership" });

  return (
    <PhotoBand
      image={BANNER_IMAGES.membershipBand.src}
      imagePosition={BANNER_IMAGES.membershipBand.position}
      className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between"
    >
      <Reveal
        as="h2"
        className="max-w-[34ch] font-display text-headline font-semibold text-white hyphens-auto [overflow-wrap:anywhere]"
      >
        <RichText text={t("title")} locale={locale} />
      </Reveal>
      <Reveal delay={0.12} className="shrink-0">
        <Button href="/membership#tiers" variant="red">
          {t("apply")}
        </Button>
      </Reveal>
    </PhotoBand>
  );
}
