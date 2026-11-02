import { getTranslations } from "next-intl/server";
import { FLAGPOLE_IMAGES } from "@/core/constants/images";
import {
  Button,
  RichText,
  Section,
  SectionHeading,
  SplitPhotoFrame,
} from "@/core/new-components/common";
import { HomeSectionProps } from "../types";

export default async function WhoWeAre({ locale }: HomeSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.who" });

  return (
    <Section>
      <div className="reveal grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-10 lg:gap-12">
          <SectionHeading title={t("title")} />
          <div className="flex flex-col items-start gap-6">
            <p className="max-w-[60ch] text-lead text-muted">
              <RichText text={t("body")} locale={locale} />
            </p>
            <Button href="/about" variant="blue">
              {t("readMore")}
            </Button>
          </div>
        </div>
        <SplitPhotoFrame
          images={FLAGPOLE_IMAGES}
          sizes="(min-width: 112.5rem) 22rem, (min-width: 64rem) 20vw, 50vw"
          className="h-72 sm:h-96 lg:h-[28rem]"
        />
      </div>
    </Section>
  );
}
