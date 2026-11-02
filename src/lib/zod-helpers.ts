import { z } from "zod";

export const emptyToUndefined = (value: unknown) =>
  value === "" ? undefined : value;

export const valuesOf = <T extends string>(items: readonly { value: T }[]) =>
  items.map((item) => item.value) as [T, ...T[]];

export const emailField = z
  .string("emailInvalid")
  .trim()
  .pipe(z.email("emailInvalid"));
