import { EMBLEM_BANDS, EMBLEM_NOTCH, EMBLEM_VIEW_BOX } from "./emblem-paths";
import { EmblemProps } from "./emblem-props";

export default function Emblem({ className, title }: EmblemProps) {
  const classes = ["shrink-0", className].filter(Boolean).join(" ");

  return (
    <svg
      viewBox={EMBLEM_VIEW_BOX}
      className={classes}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path fill="currentColor" d={EMBLEM_BANDS} />
      <path className="fill-red" d={EMBLEM_NOTCH} />
    </svg>
  );
}
