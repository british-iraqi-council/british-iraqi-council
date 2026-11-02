import { describe, expect, it } from "vitest";
import ar from "../messages/ar.json";
import en from "../messages/en.json";
import { readLegalSections } from "@/lib/read-legal-sections";

describe("readLegalSections", () => {
  it("returns well-formed sections", () => {
    const sections = [{ title: "A", paragraphs: ["One.", "Two."] }];
    expect(readLegalSections(sections)).toEqual(sections);
  });

  it("rejects a missing list, an empty list and malformed sections", () => {
    expect(() => readLegalSections(undefined)).toThrow();
    expect(() => readLegalSections([])).toThrow();
    expect(() => readLegalSections([{ title: "A", paragraphs: [] }])).toThrow();
    expect(() => readLegalSections([{ paragraphs: ["One."] }])).toThrow();
  });

  for (const page of ["privacy", "terms"] as const) {
    it(`reads the ${page} sections in both languages, with matching shapes`, () => {
      const arabic = readLegalSections(ar[page].sections);
      const english = readLegalSections(en[page].sections);
      expect(arabic.map((s) => s.paragraphs.length)).toEqual(
        english.map((s) => s.paragraphs.length),
      );
    });
  }
});
