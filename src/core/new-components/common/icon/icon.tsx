import {
  BookOpen,
  Building2,
  Cpu,
  Eye,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  KeyRound,
  Landmark,
  type LucideIcon,
  Megaphone,
  TrendingUp,
  Users,
  Wheat,
  Zap,
} from "lucide-react";
import type { IconName } from "@/content";
import { IconProps } from "./icon-props";

const ICONS: Record<IconName, LucideIcon> = {
  "trending-up": TrendingUp,
  handshake: Handshake,
  globe: Globe,
  landmark: Landmark,
  megaphone: Megaphone,
  "book-open": BookOpen,
  zap: Zap,
  building: Building2,
  wheat: Wheat,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
  cpu: Cpu,
  "key-round": KeyRound,
  eye: Eye,
  users: Users,
};

export default function Icon({ name, className }: IconProps) {
  const Glyph = ICONS[name];

  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      strokeWidth={1.75}
      className={className}
    />
  );
}
