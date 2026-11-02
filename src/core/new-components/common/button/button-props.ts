import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  variant: "red" | "white" | "blue" | "outline-light";
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}
