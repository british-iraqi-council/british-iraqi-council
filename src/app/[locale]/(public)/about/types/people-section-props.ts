import type { Person } from "@/content";
import type { AboutSectionId } from "@/lib/about-sections";

export type PeopleSectionId = Extract<
  AboutSectionId,
  "board" | "advisors" | "team"
>;

export interface PeopleSectionProps {
  id: PeopleSectionId;
  title: string;
  people: readonly Person[];
}
