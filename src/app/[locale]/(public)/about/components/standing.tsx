import { getTranslations } from "next-intl/server";
import { ORGANISATION } from "@/content";
import {
  Icon,
  RichText,
  Section,
  SectionHeading,
} from "@/core/new-components/common";
import { highlightTerms } from "@/lib/highlight-terms";
import { localize } from "@/lib/localize";
import { AboutSectionProps } from "../types";

const ROLES = ["approval", "ratification"] as const;

export default async function Standing({ locale }: AboutSectionProps) {
  const t = await getTranslations({ locale, namespace: "about.standing" });
  const institutions = ORGANISATION.institutions.map((institution) =>
    localize(institution, locale),
  );
  const bodies = ROLES.flatMap((role, index) => {
    const name = institutions[index];
    return name ? [{ role, name }] : [];
  });
  const runs = highlightTerms(
    localize(ORGANISATION.standing, locale),
    institutions,
  );

  return (
    <Section id="standing">
      <div className="reveal flex flex-col gap-10 lg:gap-12">
        <SectionHeading title={t("title")} />
        <div className="flex max-w-[68ch] flex-col gap-4">
          <p className="text-lead text-ink">
            {runs.map((run, index) =>
              run.highlight ? (
                <strong key={index} className="font-semibold text-blue">
                  <RichText text={run.text} locale={locale} />
                </strong>
              ) : (
                <RichText key={index} text={run.text} locale={locale} />
              ),
            )}
          </p>
          <p className="text-muted">
            <RichText text={t("body")} locale={locale} />
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {bodies.map(({ role, name }) => (
            <li
              key={role}
              className="flex items-start gap-4 rounded-2xl border border-line bg-white p-6 lg:p-7"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ivory text-blue">
                <Icon name="landmark" className="size-6" />
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-sm font-medium text-muted">{t(role)}</p>
                <p className="font-display text-title font-semibold text-blue hyphens-auto [overflow-wrap:anywhere]">
                  <RichText text={name} locale={locale} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
