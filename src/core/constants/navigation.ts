export interface NavItem {
  href: string;
  key: string;
}

export const MAIN_NAV: readonly NavItem[] = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/membership", key: "membership" },
  { href: "/contact", key: "contact" },
];
