import type { StaticImageData } from "next/image";
import type { Localized } from "@/content";
import iraqFlag from "@/assets/images/stock/iraq-flag-closeup.jpg";
import ukFlag from "@/assets/images/stock/uk-flag-closeup.jpg";

export interface StockImage {
  src: StaticImageData;
  alt: Localized;
}

export const HERO_IMAGES: { iraq: StockImage; uk: StockImage } = {
  iraq: {
    src: iraqFlag,
    alt: {
      ar: "صورة مقرّبة لقماش العلم العراقي",
      en: "Close-up of the Iraqi flag in fabric",
    },
  },
  uk: {
    src: ukFlag,
    alt: {
      ar: "صورة مقرّبة لقماش العلم البريطاني",
      en: "Close-up of the British flag in fabric",
    },
  },
};
