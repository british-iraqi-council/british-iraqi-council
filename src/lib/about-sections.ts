import type { Person } from "@/content";

export type AboutSectionId =
  "who-we-are" | "standing" | "objectives" | "board" | "advisors" | "team";

interface AboutPeople {
  board: readonly Person[];
  advisors: readonly Person[];
  team: readonly Person[];
}

export const aboutSections = ({
  board,
  advisors,
  team,
}: AboutPeople): AboutSectionId[] => [
  "who-we-are",
  "standing",
  "objectives",
  ...(board.length > 0 ? (["board"] as const) : []),
  ...(advisors.length > 0 ? (["advisors"] as const) : []),
  ...(team.length > 0 ? (["team"] as const) : []),
];
