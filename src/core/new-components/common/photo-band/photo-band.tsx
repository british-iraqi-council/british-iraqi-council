import Image from "next/image";
import { PhotoBandProps } from "./photo-band-props";

export default function PhotoBand({
  image,
  imagePosition = "object-center",
  id,
  className = "",
  children,
}: PhotoBandProps) {
  return (
    <section
      id={id}
      className="on-blue relative isolate overflow-hidden bg-blue-deep"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className={`object-cover ${imagePosition}`}
        />
        <div className="photo-veil absolute inset-0" />
      </div>
      <div className={`shell py-16 lg:py-20 ${className}`}>{children}</div>
    </section>
  );
}
