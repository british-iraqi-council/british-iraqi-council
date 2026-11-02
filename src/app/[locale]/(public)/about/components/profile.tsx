import { getTranslations } from "next-intl/server";
import { TWO_CITIES_IMAGES } from "@/core/constants/images";
import {
  RichText,
  Section,
  SectionHeading,
  SplitPhotoFrame,
} from "@/core/new-components/common";
import { AboutSectionProps } from "../types";

const PARAGRAPHS = ["p1", "p2", "p3"] as const;

export default async function Profile({ locale }: AboutSectionProps) {
  const t = await getTranslations({ locale, namespace: "about.who" });

  return (
    <Section id="who-we-are">
      <div className="reveal flex flex-col gap-10 lg:gap-12">
        <SectionHeading title={t("title")} />
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex max-w-[68ch] flex-col gap-4">
            {PARAGRAPHS.map((key, index) => (
              <p key={key} className={index === 0 ? "text-lead" : undefined}>
                <RichText text={t(key)} locale={locale} />
              </p>
            ))}
          </div>
          <SplitPhotoFrame
            images={TWO_CITIES_IMAGES}
            sizes="(min-width: 112.5rem) 22rem, (min-width: 64rem) 20vw, 50vw"
            className="h-72 sm:h-96"
          />
        </div>
      </div>
    </Section>
  );
}
