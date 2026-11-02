import {
  Amiri,
  Cormorant_SC,
  IBM_Plex_Sans_Arabic,
  Inter,
} from "next/font/google";

export const cormorant = Cormorant_SC({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-cormorant",
  display: "swap",
});

export const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
});
