import { describe, expect, it } from "vitest";
import type { ZodType } from "zod";
import { contactSchema } from "@/app/[locale]/(public)/contact/schemas";

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

const valid = {
  name: "Ali Hassan",
  email: "ali@example.iq",
  subject: "general",
  message: "We would like to learn more.",
};

describe("contactSchema", () => {
  it("accepts a valid enquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it("treats empty optional fields as absent", () => {
    expect(
      contactSchema.safeParse({ ...valid, company: "", phone: "" }).success,
    ).toBe(true);
  });
  it("reports one key per invalid field", () => {
    expect(issue(contactSchema, { ...valid, name: "A" })).toEqual({
      name: "nameRequired",
    });
    expect(issue(contactSchema, { ...valid, email: "nope" })).toEqual({
      email: "emailInvalid",
    });
    expect(issue(contactSchema, { ...valid, subject: "spam" })).toEqual({
      subject: "subjectRequired",
    });
    expect(issue(contactSchema, { ...valid, message: "short" })).toEqual({
      message: "messageTooShort",
    });
    expect(issue(contactSchema, { ...valid, phone: "123" })).toEqual({
      phone: "phoneInvalid",
    });
  });
});
