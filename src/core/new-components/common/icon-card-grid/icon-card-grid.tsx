import { useLocale } from "next-intl";
import { localize } from "@/lib/localize";
import Icon from "../icon";
import RichText from "../rich-text";
import { IconCardGridProps } from "./icon-card-grid-props";

const columnClasses: Record<IconCardGridProps["columns"], string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

const tones: Record<
  NonNullable<IconCardGridProps["tone"]>,
  { card: string; icon: string; title: string; body: string }
> = {
  dark: {
    card: "border-line bg-white",
    icon: "bg-ivory text-blue",
    title: "text-blue",
    body: "text-muted",
  },
  light: {
    card: "border-white/20 bg-white/5",
    icon: "bg-white text-blue",
    title: "text-white",
    body: "text-on-blue-muted",
  },
};

export default function IconCardGrid({
  items,
  columns,
  tone = "dark",
}: IconCardGridProps) {
  const locale = useLocale();
  const colours = tones[tone];

  return (
    <ul
      className={`grid gap-6 sm:grid-cols-2 lg:gap-8 ${columnClasses[columns]}`}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className={`flex flex-col items-start gap-4 rounded-2xl border p-6 lg:p-7 ${colours.card}`}
        >
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-xl ${colours.icon}`}
          >
            <Icon name={item.icon} className="size-6" />
          </span>
          <h3
            className={`font-display text-title font-semibold hyphens-auto [overflow-wrap:anywhere] ${colours.title}`}
          >
            <RichText text={localize(item.title, locale)} locale={locale} />
          </h3>
          <p className={colours.body}>
            <RichText text={localize(item.body, locale)} locale={locale} />
          </p>
        </li>
      ))}
    </ul>
  );
}
