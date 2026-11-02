import { describe, expect, it } from "vitest";
import { isolateLtrRuns } from "@/lib/isolate-ltr-runs";

const FSI = "⁨";
const PDI = "⁩";

describe("isolateLtrRuns", () => {
  it("wraps each number in an isolate", () => {
    expect(isolateLtrRuns("من 1 إلى 10 موظفين")).toBe(
      `من ${FSI}1${PDI} إلى ${FSI}10${PDI} موظفين`,
    );
  });
  it("keeps a Latin word with its unit as one isolate", () => {
    expect(isolateLtrRuns("حتى 4 MB")).toBe(`حتى ${FSI}4 MB${PDI}`);
  });
  it("leaves pure Arabic untouched", () => {
    expect(isolateLtrRuns("العراق")).toBe("العراق");
  });
  it("isolates a lone Latin word", () => {
    expect(isolateLtrRuns("Iraq")).toBe(`${FSI}Iraq${PDI}`);
  });
});
