import { useLocale } from "next-intl";
import RichText from "../rich-text";
import { SectionHeadingProps } from "./section-heading-props";

const tones: Record<
  NonNullable<SectionHeadingProps["tone"]>,
  { title: string; lede: string }
> = {
  dark: { title: "text-blue", lede: "text-muted" },
  light: { title: "text-white", lede: "text-on-blue-muted" },
};

export default function SectionHeading({
  title,
  id,
  lede,
  align = "start",
  tone = "dark",
}: SectionHeadingProps) {
  const locale = useLocale();
  const colours = tones[tone];
  const centred = align === "center";

  return (
    <div
      className={`flex flex-col gap-5 ${centred ? "items-center text-center" : "items-start"}`}
    >
      <h2
        id={id}
        className={`max-w-[28ch] font-display text-headline font-semibold hyphens-auto [overflow-wrap:anywhere] ${colours.title}`}
      >
        <RichText text={title} locale={locale} />
      </h2>
      <span aria-hidden="true" className="rule-red" />
      {lede ? (
        <p className={`max-w-[62ch] text-lead ${colours.lede}`}>
          <RichText text={lede} locale={locale} />
        </p>
      ) : null}
    </div>
  );
}
