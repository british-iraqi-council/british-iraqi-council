import { describe, expect, it } from "vitest";
import { localize } from "@/lib/localize";

describe("localize", () => {
  it("picks the value for the locale", () => {
    const value = { ar: "أ", en: "A" };
    expect(localize(value, "ar")).toBe("أ");
    expect(localize(value, "en")).toBe("A");
  });
});
