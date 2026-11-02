import { ORGANISATION } from "@/content/organisation";
import Emblem from "../emblem";
import { BrandProps } from "./brand-props";

const tones: Record<BrandProps["tone"], { mark: string; name: string }> = {
  light: { mark: "text-white", name: "text-on-blue-muted" },
  dark: { mark: "text-blue", name: "text-muted" },
};

export default function Brand({ tone, className }: BrandProps) {
  const { mark, name } = tones[tone];
  const classes = ["flex items-center gap-3", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <Emblem className={`size-11 transition-colors duration-300 ${mark}`} />
      <span className="flex flex-col items-start">
        <span
          dir="ltr"
          lang="en"
          className={`font-brand text-3xl leading-none font-semibold transition-colors duration-300 ${mark}`}
        >
          {ORGANISATION.short}
        </span>
        <span
          dir="ltr"
          lang="en"
          className={`mt-1 font-latin text-xs leading-4 whitespace-nowrap transition-colors duration-300 ${name}`}
        >
          {ORGANISATION.name.en}
        </span>
        <span
          dir="rtl"
          lang="ar"
          className={`font-arabic text-xs leading-5 whitespace-nowrap transition-colors duration-300 ${name}`}
        >
          {ORGANISATION.name.ar}
        </span>
      </span>
    </span>
  );
}
