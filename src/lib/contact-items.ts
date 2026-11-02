import type { ContactDetails } from "@/content";
import type { Locale } from "@/core/i18n/routing";
import { localize } from "@/lib/localize";

export interface ContactItem {
  kind: "address" | "phone" | "email" | "hours";
  text: string;
  href?: string;
}

export const contactItems = (
  contact: ContactDetails,
  locale: Locale,
): ContactItem[] => {
  const items: ContactItem[] = [];
  if (contact.address) {
    items.push({ kind: "address", text: localize(contact.address, locale) });
  }
  if (contact.phone) {
    items.push({
      kind: "phone",
      text: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
    });
  }
  if (contact.email) {
    items.push({
      kind: "email",
      text: contact.email,
      href: `mailto:${contact.email}`,
    });
  }
  if (contact.hours) {
    items.push({ kind: "hours", text: localize(contact.hours, locale) });
  }
  return items;
};
