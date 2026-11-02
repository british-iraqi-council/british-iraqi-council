import type { FramedPhoto } from "@/content";

export interface SplitPhotoFrameProps {
  images: readonly [FramedPhoto, FramedPhoto];
  sizes: string;
  className?: string;
}
