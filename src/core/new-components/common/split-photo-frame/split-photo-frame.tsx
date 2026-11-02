import Image from "next/image";
import { useLocale } from "next-intl";
import { localize } from "@/lib/localize";
import Reveal from "../reveal";
import { SplitPhotoFrameProps } from "./split-photo-frame-props";

export default function SplitPhotoFrame({
  images,
  sizes,
  className = "",
}: SplitPhotoFrameProps) {
  const locale = useLocale();

  return (
    <Reveal
      variant="frame"
      className={`relative grid grid-cols-2 overflow-hidden rounded-2xl bg-line ${className}`}
    >
      {images.map((image) => (
        <div key={image.src.src} className="relative overflow-hidden">
          <Image
            src={image.src}
            alt={localize(image.alt, locale)}
            fill
            sizes={sizes}
            data-reveal-zoom
            className={`object-cover ${image.position ?? "object-center"}`}
          />
        </div>
      ))}
      <span
        aria-hidden="true"
        data-reveal-draw
        className="absolute inset-0 mx-auto w-1 origin-top bg-red"
      />
    </Reveal>
  );
}
