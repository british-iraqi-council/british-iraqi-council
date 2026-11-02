import Image from "next/image";
import { useLocale } from "next-intl";
import Parallax from "../parallax";
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
          <Parallax
            from={0}
            to={5}
            start="top top"
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className={`enter-settle object-cover ${imagePosition} [--enter-duration:1400ms] [--enter-scale:1.04]`}
            />
          </Parallax>
          <div className="photo-veil-start absolute inset-0 rtl:photo-veil-mirrored" />
        </div>
      ) : null}
      <div
        id="content"
        tabIndex={-1}
        className="shell flex flex-col items-start gap-6 py-16 [--enter-base:120ms] [--enter-duration:800ms] focus:outline-none lg:py-24"
      >
        <h1 className="enter-rise max-w-[22ch] font-display text-display font-semibold text-white hyphens-auto [overflow-wrap:anywhere]">
          <RichText text={title} locale={locale} />
        </h1>
        <span
          aria-hidden="true"
          className="enter-draw-x rule-red [--enter-step:2]"
        />
        {lede ? (
          <p className="enter-rise max-w-[62ch] text-lead text-on-blue-muted [--enter-step:2]">
            <RichText text={lede} locale={locale} />
          </p>
        ) : null}
        {children ? (
          <div className="enter-fade self-stretch [--enter-step:5]">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
