import { getTranslations } from "next-intl/server";
import { ORGANISATION } from "@/content";
import { localize } from "@/lib/localize";
import Icon from "../icon";
import RichText from "../rich-text";
import Section from "../section";
import SectionHeading from "../section-heading";
import { InstitutionsBandProps } from "./institutions-band-props";

const ROLES = ["approval", "ratification"] as const;

export default async function InstitutionsBand({
  locale,
}: InstitutionsBandProps) {
  const t = await getTranslations({ locale, namespace: "institutions" });
  const bodies = ROLES.flatMap((role, index) => {
    const institution = ORGANISATION.institutions[index];
    return institution ? [{ role, name: localize(institution, locale) }] : [];
  });

  if (bodies.length === 0) {
    return null;
  }

  return (
    <Section>
      <div className="reveal flex flex-col gap-10 lg:gap-12">
        <SectionHeading title={t("title")} />
        <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {bodies.map(({ role, name }) => (
            <li
              key={role}
              className="flex items-center gap-4 rounded-2xl border border-line bg-white p-6 lg:p-7"
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
