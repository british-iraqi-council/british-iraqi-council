import type { ZodError } from "zod";

export function parseFormErrors<K extends string>(
  error: ZodError,
  fields: readonly K[],
  translate: (key: string) => string,
): Partial<Record<K, string>> {
  const errors: Partial<Record<K, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    const known = fields.find((candidate) => candidate === field);
    if (known !== undefined && !(known in errors)) {
      errors[known] = translate(issue.message);
    }
  }

  return errors;
}
