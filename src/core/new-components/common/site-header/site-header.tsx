"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/core/i18n/navigation";
import { MAIN_NAV } from "@/core/constants/navigation";
import Brand from "../brand";
import Button from "../button";
import LanguageSwitcher from "../language-switcher";
import HeaderLinks from "./header-links";
import MobileMenu from "./mobile-menu";

const CONTACT_HREF = "/contact";
const LINKS = MAIN_NAV.filter((item) => item.href !== CONTACT_HREF);
const SCROLL_THRESHOLD = 60;

export default function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const open = menuPath === pathname;
  const overHero = pathname === "/" && !scrolled && !open;
  const tone = overHero ? "light" : "dark";
  const closeMenu = useCallback(() => setMenuPath(null), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 h-20 border-b transition-colors duration-300 lg:h-24",
        overHero
          ? "on-blue border-transparent bg-transparent"
          : "border-line bg-white",
      ].join(" ")}
    >
      <nav
        aria-label={t("menuLabel")}
        className="shell flex h-full items-center gap-6"
      >
        <Link href="/" className="shrink-0 rounded-sm">
          <Brand tone={tone} />
        </Link>

        <div className="ms-auto hidden items-center gap-4 lg:flex xl:gap-6">
          <HeaderLinks items={LINKS} overHero={overHero} />
          <div className="flex items-center gap-2">
            <LanguageSwitcher tone={tone} />
            <Button href={CONTACT_HREF} variant="red">
              {t("contactUs")}
            </Button>
          </div>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuPath(pathname)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={t("openMenu")}
          className={[
            "ms-auto grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-300 lg:hidden",
            overHero
              ? "border-white text-white hover:bg-white hover:text-blue"
              : "border-blue text-blue hover:bg-ivory",
          ].join(" ")}
        >
          <Menu aria-hidden="true" className="size-5.5" strokeWidth={1.75} />
        </button>
      </nav>

      <MobileMenu open={open} onClose={closeMenu} triggerRef={menuButtonRef} />
    </header>
  );
}
