"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/core/i18n/navigation";
import { MAIN_NAV } from "@/core/constants/navigation";
import { isActivePath } from "@/lib/is-active-path";
import Brand from "../brand";
import Button from "../button";
import LanguageSwitcher from "../language-switcher";
import { MobileMenuProps } from "./site-header-props";

const FOCUSABLE =
  'a[href], button:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

export default function MobileMenu({
  open,
  onClose,
  triggerRef,
}: MobileMenuProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const trigger = triggerRef.current;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const items = sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 size-full bg-ink/45"
      />
      <div
        id="site-menu"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("menuLabel")}
        className="relative max-h-dvh overflow-y-auto rounded-b-3xl bg-white pb-6 shadow-xl"
      >
        <div className="shell flex flex-col gap-6">
          <div className="flex h-20 items-center justify-between gap-4">
            <Link href="/" onClick={onClose} className="shrink-0 rounded-sm">
              <Brand tone="dark" />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t("closeMenu")}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-blue text-blue transition-colors duration-150 hover:bg-ivory"
            >
              <X aria-hidden="true" className="size-5.5" strokeWidth={1.75} />
            </button>
          </div>

          <ul className="flex flex-col gap-1">
            {MAIN_NAV.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-base font-medium transition-colors duration-150 hover:bg-ivory ${active ? "bg-ivory text-blue" : "text-ink"}`}
                  >
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="h-0.5 w-4 shrink-0 bg-red"
                      />
                    ) : null}
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-3 border-t border-line pt-6">
            <LanguageSwitcher
              tone="dark"
              onNavigate={onClose}
              className="w-full border border-blue"
            />
            <Button
              href="/contact"
              variant="red"
              onClick={onClose}
              className="w-full"
            >
              {t("contactUs")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
