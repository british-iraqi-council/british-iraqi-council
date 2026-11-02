import { AlertCircle } from "lucide-react";
import { useLocale } from "next-intl";
import RichText from "../rich-text";
import { FormFieldProps } from "./form-field-props";

export default function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: FormFieldProps) {
  const locale = useLocale();

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ms-1 text-ink">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          <RichText text={hint} locale={locale} />
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-start gap-2 text-sm font-medium text-ink"
        >
          <AlertCircle
            size={16}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-red"
          />
          <span>
            <RichText text={error} locale={locale} />
          </span>
        </p>
      ) : null}
    </div>
  );
}
