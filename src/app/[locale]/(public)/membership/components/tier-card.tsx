import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { TierId } from "@/content";
import { Button, RichText } from "@/core/new-components/common";
import { localize } from "@/lib/localize";
import { TierCardProps } from "../types";

const TIER_COLOURS: Record<TierId, string> = {
  bronze: "bg-tier-bronze",
  silver: "bg-tier-silver",
  gold: "bg-tier-gold",
};

export default async function TierCard({
  tier,
  previous,
  locale,
}: TierCardProps) {
  const t = await getTranslations({ locale, namespace: "membership.tiers" });
  const name = localize(tier.name, locale);
  const colour = TIER_COLOURS[tier.id];

  return (
    <li className="card-lift relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1 ${colour}`}
      />
      <div className="flex flex-1 flex-col gap-6 p-6 pt-8 lg:p-8 lg:pt-10">
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-3 font-display text-title font-semibold text-blue hyphens-auto [overflow-wrap:anywhere]">
            <span
              aria-hidden="true"
              className={`size-2.5 shrink-0 rounded-full ${colour}`}
            />
            <span className="min-w-0">
              <RichText text={name} locale={locale} />
            </span>
          </h3>
          <p className="text-muted">
            <RichText text={localize(tier.tagline, locale)} locale={locale} />
          </p>
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-6">
          {previous ? (
            <p className="text-[15px] font-semibold text-ink">
              <RichText
                text={t("includes", { tier: localize(previous.name, locale) })}
                locale={locale}
              />
            </p>
          ) : null}
          <ul className="flex flex-col gap-3">
            {tier.added.map((feature) => (
              <li
                key={feature.en}
                className="flex items-start gap-3 text-[15px] text-ink"
              >
                <Check
                  aria-hidden="true"
                  focusable="false"
                  strokeWidth={2}
                  className="mt-[0.3em] size-4 shrink-0 text-blue"
                />
                <span className="min-w-0">
                  <RichText text={localize(feature, locale)} locale={locale} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          href={`/membership/apply?tier=${tier.id}`}
          variant="blue"
          className="mt-auto w-full"
        >
          {t("apply")}{" "}
          <span className="sr-only">{t("applyFor", { tier: name })}</span>
        </Button>
      </div>
    </li>
  );
}
