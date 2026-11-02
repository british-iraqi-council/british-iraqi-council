import { ORGANISATION } from "@/content";
import { Emblem, Reveal, RichText } from "@/core/new-components/common";
import { highlightTerms } from "@/lib/highlight-terms";
import { localize } from "@/lib/localize";
import { HomeSectionProps } from "../types";

export default function StandingStrip({ locale }: HomeSectionProps) {
  const runs = highlightTerms(
    localize(ORGANISATION.standing, locale),
    ORGANISATION.institutions.map((institution) =>
      localize(institution, locale),
    ),
  );

  return (
    <div className="border-b border-line bg-white">
      <Reveal className="shell flex items-center gap-4 py-5">
        <Emblem className="size-9 text-blue" />
        <p className="text-ink">
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
      </Reveal>
    </div>
  );
}
