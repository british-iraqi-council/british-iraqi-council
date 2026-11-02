export const firstInvalidField = <K extends string>(
  fields: readonly K[],
  errors: Partial<Record<K, string>>,
): K | undefined => fields.find((field) => Boolean(errors[field]));

export const focusControl = (form: HTMLFormElement, name: string): void => {
  const target = form.querySelector<HTMLElement>(`[name="${name}"]`);
  if (!target) {
    return;
  }
  target.focus({ preventScroll: true });
  (target.closest("label") ?? target).scrollIntoView({ block: "center" });
};
