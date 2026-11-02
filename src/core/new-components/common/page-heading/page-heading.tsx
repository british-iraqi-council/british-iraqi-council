import Image from "next/image";
import { useLocale } from "next-intl";
import RichText from "../rich-text";
import { PageHeadingProps } from "./page-heading-props";

export default function PageHeading({
  title,
  lede,
  image,
  imagePosition = "object-center",
  children,
}: PageHeadingProps) {
  const locale = useLocale();

  return (
    <section
      className={`on-blue relative isolate overflow-hidden ${image ? "bg-blue-deep" : "bg-blue"}`}
    >
      {image ? (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className={`object-cover ${imagePosition}`}
          />
          <div className="photo-veil-start absolute inset-0 rtl:photo-veil-mirrored" />
        </div>
      ) : null}
      <div
        id="content"
        tabIndex={-1}
        className="shell flex flex-col items-start gap-6 py-16 focus:outline-none lg:py-24"
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
