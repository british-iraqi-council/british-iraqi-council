import type { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface PageHeadingProps {
  title: string;
  lede?: string;
  image?: StaticImageData;
  imagePosition?: string;
  children?: ReactNode;
}
