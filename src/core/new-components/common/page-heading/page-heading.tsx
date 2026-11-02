import { useLocale } from "next-intl";
import RichText from "../rich-text";
import { PageHeadingProps } from "./page-heading-props";

export default function PageHeading({
  title,
  lede,
  children,
}: PageHeadingProps) {
  const locale = useLocale();

  return (
    <section className="on-blue bg-blue">
      <div
        id="content"
        tabIndex={-1}
        className="shell flex flex-col items-start gap-6 py-12 focus:outline-none lg:py-16"
      >
        <h1 className="max-w-[22ch] font-display text-display font-semibold text-white hyphens-auto [overflow-wrap:anywhere]">
          <RichText text={title} locale={locale} />
        </h1>
        <span aria-hidden="true" className="rule-red" />
        {lede ? (
          <p className="max-w-[62ch] text-lead text-on-blue-muted">
            <RichText text={lede} locale={locale} />
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
