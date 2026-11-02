export interface HighlightRun {
  text: string;
  highlight: boolean;
}

export const highlightTerms = (
  text: string,
  terms: readonly string[],
): HighlightRun[] => {
  const runs: HighlightRun[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const next = terms
      .filter((term) => term.length > 0)
      .map((term) => ({ term, index: text.indexOf(term, cursor) }))
      .filter((hit) => hit.index >= 0)
      .sort((a, b) => a.index - b.index || b.term.length - a.term.length)[0];

    if (!next) {
      runs.push({ text: text.slice(cursor), highlight: false });
      break;
    }
    if (next.index > cursor) {
      runs.push({ text: text.slice(cursor, next.index), highlight: false });
    }
    runs.push({ text: next.term, highlight: true });
    cursor = next.index + next.term.length;
  }

  return runs;
};
