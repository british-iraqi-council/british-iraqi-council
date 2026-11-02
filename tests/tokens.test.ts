import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/app/tailwind.css", "utf8");

const tokens: Record<string, string> = {};
for (const match of css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6});/g)) {
  tokens[match[1]] = match[2].toUpperCase();
}

const channel = (value: number) => {
  const s = value / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * channel((n >> 16) & 255) +
    0.7152 * channel((n >> 8) & 255) +
    0.0722 * channel(n & 255)
  );
};

const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(tokens[a]), luminance(tokens[b])].sort(
    (x, y) => y - x,
  );
  return (hi + 0.05) / (lo + 0.05);
};

describe("colour tokens", () => {
  it("holds the eight base values exactly", () => {
    expect(tokens.blue).toBe("#0B2470");
    expect(tokens["blue-deep"]).toBe("#071A55");
    expect(tokens.red).toBe("#C8102E");
    expect(tokens.ivory).toBe("#F3EEE4");
    expect(tokens.white).toBe("#FFFFFF");
    expect(tokens.ink).toBe("#14204A");
    expect(tokens.muted).toBe("#545B78");
    expect(tokens.line).toBe("#E4DCCB");
  });

  it("holds the three tier edge colours", () => {
    expect(tokens["tier-bronze"]).toBe("#B0743F");
    expect(tokens["tier-silver"]).toBe("#8A8F99");
    expect(tokens["tier-gold"]).toBe("#B8932E");
  });

  it("meets the contrast pairs", () => {
    expect(ratio("ink", "ivory")).toBeGreaterThanOrEqual(7);
    expect(ratio("muted", "ivory")).toBeGreaterThanOrEqual(4.5);
    expect(ratio("muted", "white")).toBeGreaterThanOrEqual(4.5);
    expect(ratio("blue", "ivory")).toBeGreaterThanOrEqual(7);
    expect(ratio("white", "blue")).toBeGreaterThanOrEqual(7);
    expect(ratio("white", "red")).toBeGreaterThanOrEqual(4.5);
    expect(ratio("white", "blue-deep")).toBeGreaterThanOrEqual(7);
    expect(ratio("on-blue-muted", "blue")).toBeGreaterThanOrEqual(7);
  });
});
