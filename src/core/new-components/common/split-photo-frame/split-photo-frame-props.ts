import type { Photo } from "@/content";

export interface SplitPhoto extends Photo {
  position?: string;
}

export interface SplitPhotoFrameProps {
  images: readonly [SplitPhoto, SplitPhoto];
  sizes: string;
  className?: string;
}
