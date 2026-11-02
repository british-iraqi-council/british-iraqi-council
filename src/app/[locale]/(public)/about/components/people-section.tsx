import { getLocale, getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/core/new-components/common";
import { PeopleSectionProps } from "../types";
import PersonCard from "./person-card";

export default async function PeopleSection({
  id,
  title,
  people,
}: PeopleSectionProps) {
  if (people.length === 0) {
    return null;
  }

  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "about.people" });

  return (
    <Section id={id}>
      <div className="reveal flex flex-col gap-10">
        <SectionHeading title={title} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              locale={locale}
              profileLabel={t("profile")}
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}
