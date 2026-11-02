import { describe, expect, it } from "vitest";
import * as content from "@/content";
import {
  ADVISORS,
  BENEFITS,
  BOARD,
  OBJECTIVES,
  PARTNERS,
  TEAM,
  TIERS,
  WHY_IRAQ,
  WHY_JOIN,
} from "@/content";

const isLocalized = (value: object): boolean => {
  const keys = Object.keys(value).sort();
  return keys.length === 2 && keys[0] === "ar" && keys[1] === "en";
};

const collectStrings = (value: unknown, out: string[]): string[] => {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
};

const collectLocalized = (
  value: unknown,
  out: Record<string, unknown>[],
): Record<string, unknown>[] => {
  if (Array.isArray(value)) value.forEach((v) => collectLocalized(v, out));
  else if (value && typeof value === "object") {
    if (isLocalized(value)) out.push(value as Record<string, unknown>);
    else Object.values(value).forEach((v) => collectLocalized(v, out));
  }
  return out;
};

const exported = Object.entries(content);

describe("content", () => {
  it("exports collections to check", () => {
    expect(exported.length).toBeGreaterThan(10);
  });

  it("gives every localized value a trimmed Arabic and English text", () => {
    const values = collectLocalized(
      exported.map(([, value]) => value),
      [],
    );
    expect(values.length).toBeGreaterThan(50);
    for (const value of values) {
      for (const text of [value.ar, value.en]) {
        expect(typeof text).toBe("string");
        expect((text as string).length).toBeGreaterThan(0);
        expect(text).toBe((text as string).trim());
      }
    }
  });

  it("keeps ids and option values unique within each collection", () => {
    for (const [name, value] of exported) {
      if (!Array.isArray(value)) continue;
      for (const key of ["id", "value"]) {
        const keys = value
          .map((item) =>
            item && typeof item === "object"
              ? (item as Record<string, unknown>)[key]
              : undefined,
          )
          .filter((v) => v !== undefined);
        expect(new Set(keys).size, `${name}.${key}`).toBe(keys.length);
      }
    }
  });

  it("orders the tiers bronze, silver, gold", () => {
    expect(TIERS.map((t) => t.id)).toEqual(["bronze", "silver", "gold"]);
  });

  it("has six objectives, four Why Iraq tiles and four benefits", () => {
    expect(OBJECTIVES.length).toBe(6);
    expect(WHY_IRAQ.length).toBe(4);
    expect(BENEFITS.length).toBe(4);
  });

  it("has the four Why join rows, each with an image", () => {
    expect(WHY_JOIN.map((row) => row.id)).toEqual([
      "trade",
      "investment",
      "committees",
      "events",
    ]);
    for (const row of WHY_JOIN) {
      expect(row.image).toBeTruthy();
    }
  });

  it("holds no people or partners until the council supplies them", () => {
    expect(BOARD).toEqual([]);
    expect(ADVISORS).toEqual([]);
    expect(TEAM).toEqual([]);
    expect(PARTNERS).toEqual([]);
  });

  it("has no bracketed placeholder anywhere", () => {
    const strings = collectStrings(
      exported.map(([, value]) => value),
      [],
    );
    for (const text of strings) {
      expect(text, text).not.toMatch(/[[\]]/);
    }
  });
});
