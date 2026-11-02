import type { ReactNode } from "react";

export interface ParallaxProps {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  start?: "top top" | "top bottom";
}
