import { LtrRunProps } from "./ltr-run-props";

export default function LtrRun({ children, className }: LtrRunProps) {
  const classes = ["bidi-isolate", className].filter(Boolean).join(" ");

  return (
    <span dir="ltr" className={classes}>
      {children}
    </span>
  );
}
