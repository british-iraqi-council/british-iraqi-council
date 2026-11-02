import { describe, expect, it } from "vitest";
import { isActivePath } from "@/lib/is-active-path";

describe("isActivePath", () => {
  it("marks home only on the home path", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/about", "/")).toBe(false);
  });

  it("marks a section and its sub-pages", () => {
    expect(isActivePath("/membership", "/membership")).toBe(true);
    expect(isActivePath("/membership/apply", "/membership")).toBe(true);
    expect(isActivePath("/membershipx", "/membership")).toBe(false);
  });
});
