import type { HTMLAttributes, ReactNode } from "react";

export type RevealVariant = "rise" | "frame" | "sequence" | "stagger";

export interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "ul" | "ol" | "li" | "h2" | "header" | "figure";
  variant?: RevealVariant;
  delay?: number;
  children?: ReactNode;
}
