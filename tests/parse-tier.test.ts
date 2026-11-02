import { describe, expect, it } from "vitest";
import { parseTier } from "@/lib/parse-tier";

describe("parseTier", () => {
  it("accepts a known tier", () => {
    expect(parseTier("gold")).toBe("gold");
  });
  it("rejects a tier in the wrong case", () => {
    expect(parseTier("GOLD")).toBeUndefined();
  });
  it("rejects an unknown tier", () => {
    expect(parseTier("platinum")).toBeUndefined();
  });
  it("rejects a missing value", () => {
    expect(parseTier(null)).toBeUndefined();
    expect(parseTier(undefined)).toBeUndefined();
  });
});
