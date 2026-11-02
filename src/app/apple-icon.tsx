import { ImageResponse } from "next/og";
import {
  EMBLEM_BANDS,
  EMBLEM_NOTCH,
  EMBLEM_VIEW_BOX,
} from "@/core/new-components/common/emblem/emblem-paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F3EEE4",
      }}
    >
      <svg width="124" height="124" viewBox={EMBLEM_VIEW_BOX}>
        <path fill="#0B2470" d={EMBLEM_BANDS} />
        <path fill="#CE1126" d={EMBLEM_NOTCH} />
      </svg>
    </div>,
    size,
  );
}
