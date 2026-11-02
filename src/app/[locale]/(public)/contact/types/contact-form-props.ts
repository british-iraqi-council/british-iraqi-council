import type { Locale } from "@/core/i18n/routing";

export interface ContactFormProps {
  locale: Locale;
  subjects: readonly { value: string; label: string }[];
}
