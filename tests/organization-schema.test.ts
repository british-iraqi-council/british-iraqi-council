import { describe, expect, it } from "vitest";
import { organizationSchema } from "@/lib/organization-schema";

describe("organizationSchema", () => {
  const s = organizationSchema(
    "en",
    "https://example.org",
    "https://example.org/logo.png",
  );
  it("names the council in the page language first", () => {
    expect(s["@type"]).toBe("Organization");
    expect(s.name).toBe("Iraqi–British Business Council");
    expect(s.alternateName).toBe("مجلس الأعمال العراقي البريطاني");
  });
  it("swaps the names on the Arabic page", () => {
    const ar = organizationSchema(
      "ar",
      "https://example.org",
      "https://example.org/logo.png",
    );
    expect(ar.name).toBe("مجلس الأعمال العراقي البريطاني");
    expect(ar.alternateName).toBe("Iraqi–British Business Council");
    expect(ar.url).toBe("https://example.org/ar");
  });
  it("carries only the contact details the council has confirmed", () => {
    expect(s.telephone).toBe("+964 790 199 9998");
    expect(s).not.toHaveProperty("email");
    expect(s).not.toHaveProperty("address");
  });
});
