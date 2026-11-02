"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, Check, ChevronDown } from "lucide-react";
import {
  CONTROL_CLASS,
  FormField,
  describedBy,
} from "@/core/new-components/common";
import type { FormActionState } from "@/core/types/form-action-state";
import { firstInvalidField, focusControl } from "@/lib/focus-first-invalid";
import { sendMessage } from "../actions";
import { CONTACT_FIELDS, type ContactField } from "../schemas";
import { ContactFormProps } from "../types";

const INITIAL_STATE: FormActionState<ContactField> = { status: "idle" };

export default function ContactForm({ locale, subjects }: ContactFormProps) {
  const t = useTranslations("contact.form");
  const titleId = useId();
  const [state, formAction, isPending] = useActionState(
    sendMessage,
    INITIAL_STATE,
  );
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
    if (state.status === "invalid" && formRef.current) {
      const field = firstInvalidField(CONTACT_FIELDS, state.errors);
      if (field) {
        focusControl(formRef.current, field);
      }
    }
  }, [state]);

  const errors: Partial<Record<ContactField, string>> =
    state.status === "invalid" ? state.errors : {};

  const control = (name: ContactField) => ({
    id: name,
    name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": describedBy(name, { error: errors[name] }),
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) {
      return;
    }
    setAttempt((count) => count + 1);
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={titleId}
      className="flex w-full flex-col gap-5 rounded-3xl border border-line bg-white p-6 shadow-[0_10px_40px_rgba(11,36,112,0.08)] sm:p-10"
    >
      <h2 id={titleId} className="sr-only">
        {t("title")}
      </h2>
      <input type="hidden" name="locale" value={locale} />

      <div aria-hidden="true" className="sr-only">
        <label htmlFor="nickname">{t("honeypotLabel")}</label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <FormField id="name" label={t("name")} required error={errors.name}>
          <input
            {...control("name")}
            type="text"
            autoComplete="name"
            required
            className={CONTROL_CLASS}
          />
        </FormField>
        <FormField id="company" label={t("company")} error={errors.company}>
          <input
            {...control("company")}
            type="text"
            autoComplete="organization"
            className={CONTROL_CLASS}
          />
        </FormField>
        <FormField id="email" label={t("email")} required error={errors.email}>
          <input
            {...control("email")}
            type="email"
            autoComplete="email"
            dir="ltr"
            required
            className={`${CONTROL_CLASS} text-start`}
          />
        </FormField>
        <FormField id="phone" label={t("phone")} error={errors.phone}>
          <input
            {...control("phone")}
            type="tel"
            autoComplete="tel"
            dir="ltr"
            className={`${CONTROL_CLASS} text-start`}
          />
        </FormField>
      </div>

      <FormField
        id="subject"
        label={t("subject")}
        required
        error={errors.subject}
      >
        <div className="relative">
          <select
            {...control("subject")}
            defaultValue=""
            required
            className={`${CONTROL_CLASS} appearance-none pe-11`}
          >
            <option value="" disabled>
              {t("subjectPlaceholder")}
            </option>
            {subjects.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </FormField>

      <FormField
        id="message"
        label={t("message")}
        required
        error={errors.message}
      >
        <textarea
          {...control("message")}
          rows={6}
          required
          placeholder={t("messagePlaceholder")}
          className={`${CONTROL_CLASS} h-40 resize-none`}
        />
      </FormField>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          aria-disabled={isPending}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-deep aria-disabled:cursor-not-allowed aria-disabled:opacity-60 motion-safe:active:scale-[0.97]"
        >
          {isPending ? t("submitting") : t("submit")}
        </button>

        <div role="status" aria-live="polite" className="min-w-0 flex-1">
          {state.status === "invalid" ? (
            <p
              key={attempt}
              className="flex items-start gap-2 text-sm font-medium text-ink"
            >
              <AlertCircle
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-red"
              />
              {t("invalidSummary")}
            </p>
          ) : null}
          {state.status === "success" ? (
            <p className="flex items-start gap-2 text-sm font-medium text-ink">
              <Check
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-blue"
              />
              {state.message}
            </p>
          ) : null}
          {state.status === "error" ? (
            <p className="flex items-start gap-2 text-sm font-medium text-ink">
              <AlertCircle
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-red"
              />
              {state.message}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
