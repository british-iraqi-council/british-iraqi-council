import { splitLtrRuns } from "./split-ltr-runs";

const FIRST_STRONG_ISOLATE = "⁨";
const POP_DIRECTIONAL_ISOLATE = "⁩";

export const isolateLtrRuns = (text: string): string =>
  splitLtrRuns(text)
    .map((run) =>
      run.ltr
        ? `${FIRST_STRONG_ISOLATE}${run.text}${POP_DIRECTIONAL_ISOLATE}`
        : run.text,
    )
    .join("");
