import { ImageResponse } from "next/og";
import { ORGANISATION } from "@/content";
import { SOCIAL_IMAGE_SIZE } from "@/core/constants/social-image";
import { routing } from "@/core/i18n/routing";
import {
  EMBLEM_BANDS,
  EMBLEM_NOTCH,
  EMBLEM_VIEW_BOX,
} from "@/core/new-components/common/emblem/emblem-paths";

export const alt = `${ORGANISATION.name.en} (${ORGANISATION.short})`;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 72,
        padding: "0 96px",
        background: "#0B2470",
        color: "#FFFFFF",
      }}
    >
      <svg width="260" height="260" viewBox={EMBLEM_VIEW_BOX}>
        <path fill="#FFFFFF" d={EMBLEM_BANDS} />
        <path fill="#C8102E" d={EMBLEM_NOTCH} />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            fontSize: 132,
            letterSpacing: 6,
            lineHeight: 1,
          }}
        >
          {ORGANISATION.short}
        </div>
        <div style={{ width: 120, height: 8, background: "#C8102E" }} />
        <div style={{ fontSize: 50, lineHeight: 1.2, maxWidth: 680 }}>
          {ORGANISATION.name.en}
        </div>
      </div>
    </div>,
    size,
  );
}
