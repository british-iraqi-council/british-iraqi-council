import { getTranslations } from "next-intl/server";
import { Button, RichText } from "@/core/new-components/common";
import { HomeSectionProps } from "../types";

export default async function MembershipBand({ locale }: HomeSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.membership" });

  return (
    <section className="on-blue bg-blue-deep">
      <div className="shell reveal flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <h2 className="max-w-[34ch] font-display text-headline font-semibold text-white hyphens-auto [overflow-wrap:anywhere]">
          <RichText text={t("title")} locale={locale} />
        </h2>
        <Button href="/membership#tiers" variant="red" className="shrink-0">
          {t("apply")}
        </Button>
      </div>
    </section>
  );
}
