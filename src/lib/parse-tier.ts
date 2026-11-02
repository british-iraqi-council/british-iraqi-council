import type { TierId } from "@/content";

const TIER_IDS: readonly TierId[] = ["bronze", "silver", "gold"];

const isTierId = (value: string): value is TierId =>
  (TIER_IDS as readonly string[]).includes(value);

export const parseTier = (
  value: string | null | undefined,
): TierId | undefined => (value && isTierId(value) ? value : undefined);
