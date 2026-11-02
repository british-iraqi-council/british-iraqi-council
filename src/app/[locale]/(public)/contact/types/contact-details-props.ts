import type { ContactItem } from "@/lib/contact-items";

export interface ContactDetailsProps {
  items: readonly ContactItem[];
  locale: string;
}
