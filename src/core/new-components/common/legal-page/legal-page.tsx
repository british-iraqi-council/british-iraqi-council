import { getLocale, getTranslations } from "next-intl/server";
import { BANNER_IMAGES } from "@/core/constants/images";
import { readLegalSections } from "@/lib/read-legal-sections";
import PageHeading from "../page-heading";
import RichText from "../rich-text";
import Section from "../section";
import { LegalPageProps } from "./legal-page-props";

export default async function LegalPage({ namespace }: LegalPageProps) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace });
  const sections = readLegalSections(t.raw("sections"));

  return (
    <>
      <PageHeading
        title={t("heading.title")}
        lede={t("heading.lede")}
        image={BANNER_IMAGES.legal.src}
        imagePosition={BANNER_IMAGES.legal.position}
      />
      <Section>
        <div className="flex max-w-[68ch] flex-col gap-10">
          <p className="text-sm font-medium text-muted">
            <RichText text={t("updated")} locale={locale} />
          </p>
          {sections.map((section, index) => {
            const headingId = `${namespace}-section-${index + 1}`;
            return (
              <section
                key={headingId}
                aria-labelledby={headingId}
                className="flex flex-col gap-4"
              >
                <h2
                  id={headingId}
                  className="font-display text-title font-semibold text-blue hyphens-auto [overflow-wrap:anywhere]"
                >
                  <RichText text={section.title} locale={locale} />
                </h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>
                    <RichText text={paragraph} locale={locale} />
                  </p>
                ))}
              </section>
            );
          })}
        </div>
      </Section>
    </>
  );
}
