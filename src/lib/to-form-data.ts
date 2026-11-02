export function toFormData(
  payload: Record<string, string | File | undefined>,
): FormData {
  const body = new FormData();

  for (const [key, value] of Object.entries(payload)) {
    if (value instanceof File) {
      body.append(key, value, value.name);
    } else if (typeof value === "string" && value !== "") {
      body.append(key, value);
    }
  }

  return body;
}
