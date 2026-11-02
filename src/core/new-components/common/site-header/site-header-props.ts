import type { RefObject } from "react";
import type { NavItem } from "@/core/constants/navigation";

export interface HeaderLinksProps {
  items: readonly NavItem[];
  overHero: boolean;
}

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}
