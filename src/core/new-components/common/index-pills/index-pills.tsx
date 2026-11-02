import RichText from "../rich-text";
import { IndexPillsProps } from "./index-pills-props";

export default function IndexPills({ items, title, locale }: IndexPillsProps) {
  return (
    <nav aria-label={title} className="-mx-4 mt-2 self-stretch sm:mx-0">
      <ul className="-my-2 flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:my-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:py-0">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-on-blue-muted px-5 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:border-white hover:bg-white hover:text-blue"
            >
              <RichText text={item.label} locale={locale} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
