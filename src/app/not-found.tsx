import ar from "../../messages/ar.json";
import en from "../../messages/en.json";
import { routing } from "@/core/i18n/routing";

const BLUE = "#0B2470";
const RED = "#C8102E";
const IVORY = "#F3EEE4";
const WHITE = "#FFFFFF";
const INK = "#14204A";
const MUTED = "#545B78";

export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale} dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "1.5rem",
          padding: "3rem 1.5rem",
          boxSizing: "border-box",
          background: IVORY,
          color: INK,
          fontFamily: '"Segoe UI", Tahoma, system-ui, sans-serif',
          lineHeight: 1.75,
        }}
      >
        <title>{`404 | ${ar.common.siteName}`}</title>
        <p
          dir="ltr"
          style={{
            margin: 0,
            fontFamily: "Georgia, serif",
            fontSize: "3.75rem",
            fontWeight: 600,
            lineHeight: 1,
            color: BLUE,
          }}
        >
          404
        </p>
        <span
          aria-hidden="true"
          style={{ width: "4.5rem", height: "3px", background: RED }}
        />
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: 700,
            lineHeight: 1.4,
            color: BLUE,
          }}
        >
          {ar.notFound.title}
        </h1>
        <p style={{ margin: 0, maxWidth: "52ch", fontSize: "1.125rem" }}>
          {ar.notFound.body}
        </p>
        <p
          lang="en"
          dir="ltr"
          style={{ margin: 0, maxWidth: "52ch", color: MUTED }}
        >
          {`${en.notFound.title}. ${en.notFound.body}`}
        </p>
        <a
          href={`/${routing.defaultLocale}`}
          style={{
            display: "inline-flex",
            minHeight: "2.75rem",
            alignItems: "center",
            padding: "0 1.5rem",
            borderRadius: "9999px",
            background: BLUE,
            color: WHITE,
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {ar.notFound.home}
        </a>
      </body>
    </html>
  );
}
