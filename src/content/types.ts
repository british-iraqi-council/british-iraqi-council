import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/localize";

export type { Localized };

export type IconName =
  | "trending-up"
  | "handshake"
  | "globe"
  | "landmark"
  | "megaphone"
  | "book-open"
  | "zap"
  | "building"
  | "wheat"
  | "graduation-cap"
  | "heart-pulse"
  | "cpu"
  | "key-round"
  | "eye"
  | "users";

export interface IconCard {
  id: string;
  icon: IconName;
  title: Localized;
  body: Localized;
}

export interface Person {
  id: string;
  name: Localized;
  role: Localized;
  organisation?: Localized;
  photo?: StaticImageData;
  url?: string;
}

export interface Partner {
  id: string;
  kind: "partner" | "supporter";
  name: string;
  logo: StaticImageData;
  url?: string;
}

export type TierId = "bronze" | "silver" | "gold";

export interface Tier {
  id: TierId;
  name: Localized;
  tagline: Localized;
  added: Localized[];
}

export interface WhyJoinRow {
  id: string;
  title: Localized;
  body: Localized;
  image: StaticImageData;
  imageAlt: Localized;
}

export type SocialNetwork =
  "linkedin" | "x" | "facebook" | "instagram" | "youtube";

export interface ContactDetails {
  address?: Localized;
  phone?: string;
  email?: string;
  hours?: Localized;
  social: { network: SocialNetwork; url: string }[];
}

export interface Option<T extends string> {
  value: T;
  label: Localized;
}

export interface Organisation {
  name: Localized;
  short: "IBBC";
  standing: Localized;
  institutions: Localized[];
  description: Localized;
  contact: ContactDetails;
}

export type ContactSubject =
  "general" | "membership" | "partnership" | "media" | "other";

export type ApplicationSector =
  | "energy"
  | "construction"
  | "trade"
  | "finance"
  | "technology"
  | "health"
  | "education"
  | "agriculture"
  | "transport"
  | "manufacturing"
  | "services"
  | "other";

export type CompanySize = "1-10" | "11-50" | "51-250" | "251-1000" | "1000+";

export type Country = "iraq" | "uk" | "other";
