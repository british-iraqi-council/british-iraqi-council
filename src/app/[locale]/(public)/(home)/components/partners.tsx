import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PARTNERS, type Partner } from "@/content";
import { Section, SectionHeading } from "@/core/new-components/common";
import { HomeSectionProps } from "../types";

const GROUPS: readonly {
  kind: Partner["kind"];
  label: "partners" | "supporters";
}[] = [
  { kind: "partner", label: "partners" },
  { kind: "supporter", label: "supporters" },
];

export default async function Partners({ locale }: HomeSectionProps) {
  if (PARTNERS.length === 0) {
    return null;
  }

  const t = await getTranslations({ locale, namespace: "home.partners" });
  const groups = GROUPS.map((group) => ({
    ...group,
    items: PARTNERS.filter((partner) => partner.kind === group.kind),
  })).filter((group) => group.items.length > 0);

  return (
    <Section>
      <div className="reveal flex flex-col gap-10">
        <SectionHeading title={t("title")} />
        {groups.map((group) => (
          <div key={group.kind} className="flex flex-col gap-5">
            <h3 className="font-display text-title font-semibold text-blue">
              {t(group.label)}
            </h3>
            <ul className="flex flex-wrap items-center gap-6">
              {group.items.map((partner) => {
                const logo = (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 w-auto object-contain"
                  />
                );
                return (
                  <li
                    key={partner.id}
                    className="rounded-2xl border border-line bg-white p-5"
                  >
                    {partner.url ? (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {logo}
                      </a>
                    ) : (
                      logo
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
