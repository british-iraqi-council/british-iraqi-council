export interface TextRun {
  text: string;
  ltr: boolean;
}

const LTR_RUN = /‎?[A-Za-z0-9+@](?:[A-Za-z0-9 .,:/\-+&@'’%_]*[A-Za-z0-9%])?/g;

export const splitLtrRuns = (text: string): TextRun[] => {
  const runs: TextRun[] = [];
  let cursor = 0;

  for (const match of text.matchAll(LTR_RUN)) {
    const start = match.index;
    if (start > cursor) {
      runs.push({ text: text.slice(cursor, start), ltr: false });
    }
    runs.push({ text: match[0], ltr: true });
    cursor = start + match[0].length;
  }

  if (cursor < text.length) {
    runs.push({ text: text.slice(cursor), ltr: false });
  }

  return runs;
};
