import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { COMMITTEES, WHY_JOIN } from "@/content";
import {
  RichText,
  Section,
  SectionHeading,
} from "@/core/new-components/common";
import { localize } from "@/lib/localize";
import { MembershipSectionProps } from "../types";

export default async function WhyJoin({ locale }: MembershipSectionProps) {
  const t = await getTranslations({ locale, namespace: "membership.whyJoin" });

  return (
    <Section id="why-join">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="reveal">
          <SectionHeading title={t("title")} lede={t("intro")} />
        </div>
        <ul className="flex flex-col gap-12 lg:gap-16">
          {WHY_JOIN.map((row, index) => (
            <li
              key={row.id}
              className="reveal grid items-center gap-6 lg:grid-cols-2 lg:gap-12"
            >
              <div
                className={`relative aspect-[3/2] overflow-hidden rounded-2xl bg-line ${index % 2 === 1 ? "lg:order-last" : ""}`}
              >
                <Image
                  src={row.image}
                  alt={localize(row.imageAlt, locale)}
                  fill
                  sizes="(min-width: 84rem) 40rem, (min-width: 64rem) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <h3
                  id={`why-join-${row.id}`}
                  className="font-display text-title font-semibold text-blue hyphens-auto [overflow-wrap:anywhere]"
                >
                  <RichText
                    text={localize(row.title, locale)}
                    locale={locale}
                  />
                </h3>
                <p className="max-w-[60ch] text-muted">
                  <RichText text={localize(row.body, locale)} locale={locale} />
                </p>
                {row.id === "committees" ? (
                  <ul
                    aria-labelledby={`why-join-${row.id}`}
                    className="flex flex-wrap gap-2"
                  >
                    {COMMITTEES.map((committee) => (
                      <li
                        key={committee.en}
                        className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink"
                      >
                        <RichText
                          text={localize(committee, locale)}
                          locale={locale}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
