import { describe, expect, it } from "vitest";
import { ORGANISATION } from "@/content";
import { highlightTerms } from "@/lib/highlight-terms";
import { localize } from "@/lib/localize";

describe("highlightTerms", () => {
  it("returns the whole text unhighlighted when no term occurs", () => {
    expect(highlightTerms("plain text", ["absent"])).toEqual([
      { text: "plain text", highlight: false },
    ]);
  });

  it("marks every term in order and keeps the text between", () => {
    expect(highlightTerms("a X b Y c", ["Y", "X"])).toEqual([
      { text: "a ", highlight: false },
      { text: "X", highlight: true },
      { text: " b ", highlight: false },
      { text: "Y", highlight: true },
      { text: " c", highlight: false },
    ]);
  });

  it("ignores empty terms", () => {
    expect(highlightTerms("abc", [""])).toEqual([
      { text: "abc", highlight: false },
    ]);
  });

  for (const locale of ["ar", "en"]) {
    it(`finds both institutions in the ${locale} standing line`, () => {
      const text = localize(ORGANISATION.standing, locale);
      const terms = ORGANISATION.institutions.map((i) => localize(i, locale));
      const runs = highlightTerms(text, terms);
      expect(runs.map((r) => r.text).join("")).toBe(text);
      expect(runs.filter((r) => r.highlight).map((r) => r.text)).toEqual(terms);
    });
  }
});
