import type { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface PhotoBandProps {
  image: StaticImageData;
  imagePosition?: string;
  id?: string;
  className?: string;
  children: ReactNode;
}
