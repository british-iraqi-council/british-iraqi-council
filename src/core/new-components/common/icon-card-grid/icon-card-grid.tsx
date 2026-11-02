import Image from "next/image";
import { useLocale } from "next-intl";
import { localize } from "@/lib/localize";
import Icon from "../icon";
import Reveal from "../reveal";
import RichText from "../rich-text";
import { IconCardGridProps } from "./icon-card-grid-props";

const columnClasses: Record<IconCardGridProps["columns"], string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

const imageSizes: Record<IconCardGridProps["columns"], string> = {
  3: "(min-width: 112.5rem) 33rem, (min-width: 64rem) 28vw, (min-width: 40rem) 45vw, 100vw",
  4: "(min-width: 112.5rem) 24rem, (min-width: 64rem) 21vw, (min-width: 40rem) 45vw, 100vw",
};

const tones: Record<
  NonNullable<IconCardGridProps["tone"]>,
  { card: string; icon: string; ring: string; title: string; body: string }
> = {
  dark: {
    card: "border-line bg-white",
    icon: "bg-ivory text-blue",
    ring: "ring-white",
    title: "text-blue",
    body: "text-muted",
  },
  light: {
    card: "border-white/20 bg-white/5",
    icon: "bg-white text-blue",
    ring: "ring-blue",
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
    <Reveal
      as="ul"
      variant="stagger"
      className={`grid gap-6 sm:grid-cols-2 lg:gap-8 ${columnClasses[columns]}`}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className={`group card-lift flex flex-col overflow-hidden rounded-2xl border ${colours.card}`}
        >
          {item.image ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-line">
              <Image
                src={item.image.src}
                alt={localize(item.image.alt, locale)}
                fill
                sizes={imageSizes[columns]}
                data-reveal-zoom
                className="object-cover duration-700 ease-out-quint motion-safe:transition-[scale] motion-safe:group-hover:scale-105"
              />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col items-start gap-4 p-6 lg:p-7">
            <span
              className={`relative grid size-12 shrink-0 place-items-center rounded-xl ${colours.icon} ${item.image ? `-mt-12 ring-4 lg:-mt-13 ${colours.ring}` : ""}`}
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
          </div>
        </li>
      ))}
    </Reveal>
  );
}
