import { splitLtrRuns } from "@/lib/split-ltr-runs";
import LtrRun from "../ltr-run";
import { RichTextProps } from "./rich-text-props";

export default function RichText({ text, locale }: RichTextProps) {
  if (locale !== "ar") {
    return <>{text}</>;
  }

  return (
    <>
      {splitLtrRuns(text).map((run, index) =>
        run.ltr ? <LtrRun key={index}>{run.text}</LtrRun> : run.text,
      )}
    </>
  );
}
