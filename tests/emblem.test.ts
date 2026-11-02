import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  EMBLEM_BANDS,
  EMBLEM_NOTCH,
} from "@/core/new-components/common/emblem/emblem-paths";

const icon = readFileSync("src/app/icon.svg", "utf8");

describe("emblem artwork", () => {
  it("draws the favicon from the same paths as the component", () => {
    expect(icon).toContain(`d="${EMBLEM_BANDS}"`);
    expect(icon).toContain(`d="${EMBLEM_NOTCH}"`);
  });

  it("colours the favicon union blue with a red notch", () => {
    expect(icon).toContain('fill="#0B2470"');
    expect(icon).toContain('fill="#CE1126"');
  });
});
