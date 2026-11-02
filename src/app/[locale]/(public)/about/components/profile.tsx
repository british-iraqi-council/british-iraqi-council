import { getTranslations } from "next-intl/server";
import {
  RichText,
  Section,
  SectionHeading,
} from "@/core/new-components/common";
import { AboutSectionProps } from "../types";

const PARAGRAPHS = ["p1", "p2", "p3"] as const;

export default async function Profile({ locale }: AboutSectionProps) {
  const t = await getTranslations({ locale, namespace: "about.who" });

  return (
    <Section id="who-we-are">
      <div className="reveal flex flex-col gap-10 lg:gap-12">
        <SectionHeading title={t("title")} />
        <div className="flex max-w-[68ch] flex-col gap-4">
          {PARAGRAPHS.map((key, index) => (
            <p key={key} className={index === 0 ? "text-lead" : undefined}>
              <RichText text={t(key)} locale={locale} />
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
