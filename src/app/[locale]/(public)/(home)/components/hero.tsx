import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HERO_IMAGES } from "@/core/constants/images";
import { Button, RichText } from "@/core/new-components/common";
import { localize } from "@/lib/localize";
import { HomeSectionProps } from "../types";

const HALVES = [
  { key: "iraq", image: HERO_IMAGES.iraq, position: "object-[60%_50%]" },
  { key: "uk", image: HERO_IMAGES.uk, position: "object-[40%_50%]" },
] as const;

export default async function Hero({ locale }: HomeSectionProps) {
  const other = locale === "ar" ? "en" : "ar";
  const t = await getTranslations({ locale, namespace: "home.hero" });
  const tOther = await getTranslations({
    locale: other,
    namespace: "home.hero",
  });

  return (
    <section className="relative isolate -mt-20 flex flex-col overflow-hidden bg-blue-deep sm:min-h-[38rem] sm:justify-end lg:-mt-24 lg:min-h-[42rem]">
      <div className="relative h-64 sm:absolute sm:inset-0 sm:-z-10 sm:h-auto">
        <div className="absolute inset-0 grid grid-cols-2">
          {HALVES.map(({ key, image, position }) => (
            <div key={key} className="relative">
              <Image
                src={image.src}
                alt={localize(image.alt, locale)}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="50vw"
                className={`object-cover ${position}`}
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="hero-veil absolute inset-0 rtl:hero-veil-mirrored"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-20 bottom-0 mx-auto w-1 bg-red sm:top-0"
        />
      </div>

      <div className="shell pt-10 pb-14 sm:pt-36 sm:pb-16 lg:pt-44 lg:pb-20">
        <div
          id="content"
          tabIndex={-1}
          className="on-blue flex max-w-[44rem] flex-col items-start focus:outline-none xl:max-w-[calc(50vw_-_max(var(--shell-pad),(100vw_-_var(--shell-max))_/_2_+_var(--shell-pad))_-_2rem)]"
        >
          <p
            lang={other}
            dir={other === "ar" ? "rtl" : "ltr"}
            className={`text-lg text-white sm:text-xl ${other === "ar" ? "font-arabic-display" : "font-brand font-semibold"}`}
          >
            {tOther("title")}
          </p>
          <h1 className="mt-2 font-display text-hero font-semibold text-white hyphens-auto sm:hyphens-manual [overflow-wrap:anywhere]">
            <RichText text={t("title")} locale={locale} />
          </h1>
          <span aria-hidden="true" className="mt-6 rule-red" />
          <p className="mt-6 max-w-[36rem] text-lead text-white">
            <RichText text={t("sentence")} locale={locale} />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/about" variant="white">
              {t("learnMore")}
            </Button>
            <Button href="/membership#tiers" variant="red">
              {t("becomeMember")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
