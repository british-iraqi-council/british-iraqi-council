import { describe, expect, it } from "vitest";
import { APPLICATION_FIELDS } from "@/app/[locale]/(public)/membership/apply/schemas";
import { CONTACT_FIELDS } from "@/app/[locale]/(public)/contact/schemas";
import { firstInvalidField } from "@/lib/focus-first-invalid";

describe("firstInvalidField", () => {
  it("follows the form's field order, not the order of the errors", () => {
    expect(
      firstInvalidField(APPLICATION_FIELDS, {
        consent: "consentRequired",
        tier: "tierRequired",
        email: "emailInvalid",
      }),
    ).toBe("email");
  });
  it("returns the first contact field with an error", () => {
    expect(
      firstInvalidField(CONTACT_FIELDS, {
        message: "messageTooShort",
        name: "nameRequired",
      }),
    ).toBe("name");
  });
  it("returns undefined when nothing is invalid", () => {
    expect(firstInvalidField(CONTACT_FIELDS, {})).toBeUndefined();
  });
});
