import type { TierId } from "@/content";
import type { Locale } from "@/core/i18n/routing";

export interface FormOption {
  value: string;
  label: string;
}

export interface TierOption {
  id: TierId;
  name: string;
  tagline: string;
}

export interface ApplicationFormProps {
  locale: Locale;
  tiers: readonly TierOption[];
  sectors: readonly FormOption[];
  companySizes: readonly FormOption[];
  countries: readonly FormOption[];
}
