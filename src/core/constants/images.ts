import type { StaticImageData } from "next/image";
import type { Photo } from "@/content";
import baghdadAerial from "@/assets/images/stock/baghdad-aerial-tigris.jpg";
import baghdadTower from "@/assets/images/stock/baghdad-cbi-tower.jpg";
import baghdadDusk from "@/assets/images/stock/baghdad-towers-dusk.jpg";
import basraBridge from "@/assets/images/stock/basra-bridge.jpg";
import conferenceHall from "@/assets/images/stock/conference-audience-hall.jpg";
import lattice from "@/assets/images/stock/geometric-lattice.jpg";
import handshakeDesk from "@/assets/images/stock/handshake-desk.jpg";
import handshakeOutdoors from "@/assets/images/stock/handshake-outdoors.jpg";
import iraqFlag from "@/assets/images/stock/iraq-flag-closeup.jpg";
import iraqFlagPole from "@/assets/images/stock/iraq-flag-pole-basra.jpg";
import londonAerial from "@/assets/images/stock/london-aerial-thames.jpg";
import ukFlag from "@/assets/images/stock/uk-flag-closeup.jpg";
import ukFlagPole from "@/assets/images/stock/uk-flag-pole.jpg";

export type StockImage = Photo;

export interface FramedPhoto extends Photo {
  position: string;
}

export interface BannerPhoto {
  src: StaticImageData;
  position: string;
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

export const FLAGPOLE_IMAGES: readonly [FramedPhoto, FramedPhoto] = [
  {
    src: iraqFlagPole,
    position: "object-[50%_28%]",
    alt: {
      ar: "العلم العراقي على سارية عند الواجهة المائية في البصرة",
      en: "The Iraqi flag on a flagpole by the waterfront in Basra",
    },
  },
  {
    src: ukFlagPole,
    position: "object-[30%_50%]",
    alt: {
      ar: "العلم البريطاني يرفرف على سارية تحت سماء زرقاء",
      en: "The British flag flying from a flagpole against a blue sky",
    },
  },
];

export const TWO_CITIES_IMAGES: readonly [FramedPhoto, FramedPhoto] = [
  {
    src: baghdadAerial,
    position: "object-[72%_50%]",
    alt: {
      ar: "منظر جوي لبغداد وجسر فوق نهر دجلة",
      en: "An aerial view of Baghdad with a bridge over the Tigris",
    },
  },
  {
    src: londonAerial,
    position: "object-[40%_60%]",
    alt: {
      ar: "منظر جوي للندن ونهر التايمز",
      en: "An aerial view of London and the River Thames",
    },
  },
];

export const BANNER_IMAGES = {
  visionMission: { src: baghdadDusk, position: "object-[50%_45%]" },
  membershipBand: { src: conferenceHall, position: "object-[50%_40%]" },
  about: { src: baghdadTower, position: "object-[50%_40%]" },
  membership: { src: handshakeDesk, position: "object-[50%_45%]" },
  apply: { src: handshakeOutdoors, position: "object-[50%_55%]" },
  contact: { src: basraBridge, position: "object-[50%_45%]" },
  legal: { src: lattice, position: "object-center" },
} as const satisfies Record<string, BannerPhoto>;
