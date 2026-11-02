import Image from "next/image";
import { useLocale } from "next-intl";
import { localize } from "@/lib/localize";
import { SplitPhotoFrameProps } from "./split-photo-frame-props";

export default function SplitPhotoFrame({
  images,
  sizes,
  className = "",
}: SplitPhotoFrameProps) {
  const locale = useLocale();

  return (
    <div
      className={`relative grid grid-cols-2 overflow-hidden rounded-2xl bg-line ${className}`}
    >
      {images.map((image) => (
        <div key={image.src.src} className="relative">
          <Image
            src={image.src}
            alt={localize(image.alt, locale)}
            fill
            sizes={sizes}
            className={`object-cover ${image.position ?? "object-center"}`}
          />
        </div>
      ))}
      <span
        aria-hidden="true"
        className="absolute inset-0 mx-auto w-1 bg-red"
      />
    </div>
  );
}
