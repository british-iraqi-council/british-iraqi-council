import { describe, expect, it } from "vitest";
import type { ZodType } from "zod";
import { applicationSchema } from "@/app/[locale]/(public)/membership/apply/schemas";

function issue(schema: ZodType, input: unknown): Record<string, string> {
  const result = schema.safeParse(input);
  if (result.success) return {};
  const out: Record<string, string> = {};
  for (const i of result.error.issues) {
    const key = String(i.path[0]);
    if (!(key in out)) out[key] = i.message;
  }
  return out;
}

const base = {
  companyName: "Tigris Trading",
  sector: "trade",
  country: "iraq",
  fullName: "Sara Kareem",
  email: "sara@tigris.iq",
  phone: "+964 770 000 0000",
  tier: "silver",
  consent: "on",
};

describe("applicationSchema", () => {
  it("accepts a valid application", () => {
    expect(applicationSchema.safeParse(base).success).toBe(true);
  });
  it("rejects an unknown tier", () => {
    expect(issue(applicationSchema, { ...base, tier: "platinum" })).toEqual({
      tier: "tierRequired",
    });
  });
  it("requires consent", () => {
    expect(issue(applicationSchema, { ...base, consent: undefined })).toEqual({
      consent: "consentRequired",
    });
  });
  it("rejects an invalid website", () => {
    expect(issue(applicationSchema, { ...base, website: "not a url" })).toEqual(
      { website: "websiteInvalid" },
    );
  });
  it("rejects a javascript: website", () => {
    expect(
      issue(applicationSchema, { ...base, website: "javascript:alert(1)" }),
    ).toEqual({ website: "websiteInvalid" });
  });
  it("rejects an ftp website", () => {
    expect(
      issue(applicationSchema, { ...base, website: "ftp://example.com" }),
    ).toEqual({ website: "websiteInvalid" });
  });
  it("accepts an http or https website", () => {
    expect(
      applicationSchema.safeParse({ ...base, website: "https://tigris.iq" })
        .success,
    ).toBe(true);
    expect(
      applicationSchema.safeParse({ ...base, website: "http://tigris.iq" })
        .success,
    ).toBe(true);
  });
  it("rejects a non-PDF attachment", () => {
    expect(
      issue(applicationSchema, {
        ...base,
        attachment: new File(["x"], "profile.docx"),
      }),
    ).toEqual({ attachment: "attachmentType" });
  });
  it("rejects an oversized attachment", () => {
    expect(
      issue(applicationSchema, {
        ...base,
        attachment: new File([new Uint8Array(4 * 1024 * 1024 + 1)], "p.pdf", {
          type: "application/pdf",
        }),
      }),
    ).toEqual({ attachment: "attachmentTooLarge" });
  });
  it("accepts a PDF", () => {
    expect(
      applicationSchema.safeParse({
        ...base,
        attachment: new File(["%PDF"], "p.pdf", { type: "application/pdf" }),
      }).success,
    ).toBe(true);
  });
});
