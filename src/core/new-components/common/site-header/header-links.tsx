"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/core/i18n/navigation";
import { isActivePath } from "@/lib/is-active-path";
import { HeaderLinksProps } from "./site-header-props";

const underline = [
  "after:absolute after:inset-x-2 after:bottom-1.5 after:h-0.5 after:origin-center after:bg-red",
  "after:transition-transform after:duration-300 after:ease-out motion-reduce:after:transition-none",
].join(" ");

const linkClasses = (active: boolean, overHero: boolean) =>
  [
    "relative inline-flex min-h-11 items-center px-2 text-base font-medium whitespace-nowrap transition-colors duration-150",
    underline,
    overHero ? "text-white" : active ? "text-blue" : "text-ink hover:text-blue",
    active
      ? "after:scale-x-100"
      : "after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100",
  ].join(" ");

export default function HeaderLinks({ items, overHero }: HeaderLinksProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-2 xl:gap-4">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={linkClasses(active, overHero)}
            >
              {t(item.key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
