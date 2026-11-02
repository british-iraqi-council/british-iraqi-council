import { describe, expect, it } from "vitest";
import { contactItems } from "@/lib/contact-items";

describe("contactItems", () => {
  it("returns nothing when no detail is confirmed", () => {
    expect(contactItems({ social: [] }, "en")).toEqual([]);
  });
  it("links a phone number with only its digits and plus sign", () => {
    expect(
      contactItems({ phone: "+964 790 000 0000", social: [] }, "en"),
    ).toEqual([
      { kind: "phone", text: "+964 790 000 0000", href: "tel:+9647900000000" },
    ]);
  });
  it("links an email address to the same address", () => {
    expect(contactItems({ email: "a@b.iq", social: [] }, "ar")[0]).toEqual({
      kind: "email",
      text: "a@b.iq",
      href: "mailto:a@b.iq",
    });
  });
  it("shows the address in the page language with no link", () => {
    expect(
      contactItems(
        { address: { ar: "بغداد", en: "Baghdad" }, social: [] },
        "ar",
      )[0],
    ).toEqual({ kind: "address", text: "بغداد" });
  });
  it("orders the details address, phone, email, hours", () => {
    const kinds = contactItems(
      {
        hours: { ar: "ساعات", en: "Hours" },
        email: "a@b.iq",
        phone: "+964 1",
        address: { ar: "بغداد", en: "Baghdad" },
        social: [],
      },
      "en",
    ).map((item) => item.kind);
    expect(kinds).toEqual(["address", "phone", "email", "hours"]);
  });
});
