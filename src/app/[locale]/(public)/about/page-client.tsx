import { getTranslations } from "next-intl/server";
import { ADVISORS, BOARD, TEAM } from "@/content";
import { BANNER_IMAGES } from "@/core/constants/images";
import { IndexPills, PageHeading } from "@/core/new-components/common";
import { aboutSections } from "@/lib/about-sections";
import { Objectives, PeopleSection, Profile, Standing } from "./components";
import { AboutSectionProps } from "./types";

export default async function AboutPageClient({ locale }: AboutSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });
  const pills = aboutSections({
    board: BOARD,
    advisors: ADVISORS,
    team: TEAM,
  }).map((id) => ({ id, label: t(`sections.${id}`) }));

  return (
    <>
      <PageHeading
        title={t("heading.title")}
        lede={t("heading.lede")}
        image={BANNER_IMAGES.about.src}
        imagePosition={BANNER_IMAGES.about.position}
      >
        <IndexPills items={pills} title={t("indexLabel")} locale={locale} />
      </PageHeading>
      <Profile locale={locale} />
      <Standing locale={locale} />
      <Objectives locale={locale} />
      <PeopleSection id="board" title={t("sections.board")} people={BOARD} />
      <PeopleSection
        id="advisors"
        title={t("sections.advisors")}
        people={ADVISORS}
      />
      <PeopleSection id="team" title={t("sections.team")} people={TEAM} />
    </>
  );
}
