import type { Tier } from "@/content";

export interface TierCardProps {
  tier: Tier;
  previous?: Tier;
  locale: string;
}
