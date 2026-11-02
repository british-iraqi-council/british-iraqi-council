"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/core/i18n/navigation";
import { LanguageSwitcherProps } from "./language-switcher-props";

const tones: Record<LanguageSwitcherProps["tone"], string> = {
  light: "text-white hover:bg-white hover:text-blue",
  dark: "text-blue hover:bg-ivory",
};

export default function LanguageSwitcher({
  tone,
  onNavigate,
  className,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");
  const next = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={pathname}
      locale={next}
      hrefLang={next}
      onClick={onNavigate}
      className={[
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-base font-medium transition-colors duration-150",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Languages aria-hidden="true" className="size-4.5" strokeWidth={1.75} />
      <span className="sr-only">{t("label")}: </span>
      <span
        lang={next}
        dir={next === "ar" ? "rtl" : "ltr"}
        className={next === "ar" ? "font-arabic" : "font-latin"}
      >
        {next === "ar" ? t("ar") : t("en")}
      </span>
    </Link>
  );
}
