import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HERO_IMAGES } from "@/core/constants/images";
import {
  Button,
  RichText,
  Section,
  SectionHeading,
} from "@/core/new-components/common";
import { HomeSectionProps } from "../types";

const FRAME = [
  { key: "iraq", image: HERO_IMAGES.iraq, position: "object-[70%_50%]" },
  { key: "uk", image: HERO_IMAGES.uk, position: "object-[35%_50%]" },
] as const;

export default async function WhoWeAre({ locale }: HomeSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.who" });

  return (
    <Section>
      <div className="reveal grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="flex flex-col items-start gap-6">
          <SectionHeading title={t("title")} />
          <p className="max-w-[60ch] text-lead text-muted">
            <RichText text={t("body")} locale={locale} />
          </p>
          <Button href="/about" variant="blue">
            {t("readMore")}
          </Button>
        </div>
        <div className="relative grid h-64 grid-cols-2 overflow-hidden rounded-2xl sm:h-80">
          {FRAME.map(({ key, image, position }) => (
            <div key={key} className="relative">
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 64rem) 22vw, 50vw"
                className={`object-cover ${position}`}
              />
            </div>
          ))}
          <span
            aria-hidden="true"
            className="absolute inset-0 mx-auto w-1 bg-red"
          />
        </div>
      </div>
    </Section>
  );
}
