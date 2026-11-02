export type FormActionState<K extends string> =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<K, string>> }
  | { status: "error"; message: string }
  | { status: "success"; message: string };
