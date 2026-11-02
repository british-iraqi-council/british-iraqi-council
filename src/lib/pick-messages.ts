import type { AbstractIntlMessages } from "next-intl";

const readNamespace = (
  messages: AbstractIntlMessages,
  segments: readonly string[],
): AbstractIntlMessages | string | undefined =>
  segments.reduce<AbstractIntlMessages | string | undefined>(
    (value, segment) =>
      typeof value === "object" && value !== null ? value[segment] : undefined,
    messages,
  );

const writeNamespace = (
  target: AbstractIntlMessages,
  segments: readonly string[],
  value: AbstractIntlMessages | string,
): void => {
  const [key, ...rest] = segments;

  if (rest.length === 0) {
    target[key] = value;
    return;
  }

  const existing = target[key];
  const child: AbstractIntlMessages =
    typeof existing === "object" && existing !== null ? existing : {};
  target[key] = child;
  writeNamespace(child, rest, value);
};

export const pickMessages = (
  messages: AbstractIntlMessages,
  namespaces: readonly string[],
): AbstractIntlMessages => {
  const picked: AbstractIntlMessages = {};

  for (const namespace of namespaces) {
    const segments = namespace.split(".");
    const value = readNamespace(messages, segments);

    if (value !== undefined) {
      writeNamespace(picked, segments, value);
    }
  }

  return picked;
};
