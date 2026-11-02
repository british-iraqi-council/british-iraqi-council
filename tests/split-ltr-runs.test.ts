import { describe, expect, it } from "vitest";
import { splitLtrRuns } from "@/lib/split-ltr-runs";

describe("splitLtrRuns", () => {
  it("isolates the Latin acronym inside Arabic", () => {
    expect(splitLtrRuns("مجلس IBBC للأعمال")).toEqual([
      { text: "مجلس ", ltr: false },
      { text: "IBBC", ltr: true },
      { text: " للأعمال", ltr: false },
    ]);
  });
  it("keeps a size with its unit as one run", () => {
    expect(splitLtrRuns("الحد الأقصى 4 MB").at(-1)).toEqual({
      text: "4 MB",
      ltr: true,
    });
  });
  it("returns one non-LTR run for pure Arabic", () => {
    expect(splitLtrRuns("العراق")).toEqual([{ text: "العراق", ltr: false }]);
  });
});
