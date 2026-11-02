import type { IconCard } from "@/content";

export interface IconCardGridProps {
  items: readonly IconCard[];
  columns: 3 | 4;
  tone?: "light" | "dark";
}
