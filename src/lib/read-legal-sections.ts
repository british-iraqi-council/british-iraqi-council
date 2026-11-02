export interface LegalSection {
  title: string;
  paragraphs: string[];
}

const isLegalSection = (value: unknown): value is LegalSection => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const { title, paragraphs } = value as Record<string, unknown>;
  return (
    typeof title === "string" &&
    title.length > 0 &&
    Array.isArray(paragraphs) &&
    paragraphs.length > 0 &&
    paragraphs.every(
      (paragraph) => typeof paragraph === "string" && paragraph.length > 0,
    )
  );
};

export const readLegalSections = (value: unknown): LegalSection[] => {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("Legal page sections must be a non-empty list");
  }
  if (!value.every(isLegalSection)) {
    throw new Error(
      "Each legal section needs a title and at least one paragraph",
    );
  }
  return value;
};
