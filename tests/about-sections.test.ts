import { describe, expect, it } from "vitest";
import type { Person } from "@/content";
import { aboutSections } from "@/lib/about-sections";

const person: Person = {
  id: "test-person",
  name: { ar: "اسم", en: "Name" },
  role: { ar: "دور", en: "Role" },
};

describe("aboutSections", () => {
  it("lists only the fixed sections when no people are supplied", () => {
    expect(aboutSections({ board: [], advisors: [], team: [] })).toEqual([
      "who-we-are",
      "standing",
      "objectives",
    ]);
  });
  it("adds each people section only once it has someone in it", () => {
    expect(
      aboutSections({ board: [person], advisors: [], team: [person] }),
    ).toEqual(["who-we-are", "standing", "objectives", "board", "team"]);
  });
});
