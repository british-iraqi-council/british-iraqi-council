"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useTranslations } from "next-intl";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ExternalLink,
  Upload,
  X,
} from "lucide-react";
import type { TierId } from "@/content";
import { Link } from "@/core/i18n/navigation";
import {
  CONTROL_CLASS,
  FormField,
  RichText,
  describedBy,
} from "@/core/new-components/common";
import type { FormActionState } from "@/core/types/form-action-state";
import { firstInvalidField, focusControl } from "@/lib/focus-first-invalid";
import { parseTier } from "@/lib/parse-tier";
import { sendApplication } from "../actions";
import {
  APPLICATION_FIELDS,
  ATTACHMENT_MAX_BYTES,
  type ApplicationField,
} from "../schemas";
import type { ApplicationFormProps, FormOption } from "../types";

const INITIAL_STATE: FormActionState<ApplicationField> = { status: "idle" };

const TIER_DOTS: Record<TierId, string> = {
  bronze: "bg-tier-bronze",
  silver: "bg-tier-silver",
  gold: "bg-tier-gold",
};

const LEGEND_CLASS =
  "mb-5 font-display text-title font-semibold text-blue hyphens-auto [overflow-wrap:anywhere]";

const isPdf = (file: File): boolean =>
  file.name.toLowerCase().endsWith(".pdf") &&
  (file.type === "" || file.type === "application/pdf");

interface SelectFieldProps {
  name: ApplicationField;
  label: string;
  placeholder: string;
  options: readonly FormOption[];
  required?: boolean;
  error?: string;
}

export default function ApplicationForm({
  locale,
  tiers,
  sectors,
  companySizes,
  countries,
}: ApplicationFormProps) {
  const t = useTranslations("apply.form");
  const tErrors = useTranslations("forms.errors");
  const [state, formAction, isPending] = useActionState(
    sendApplication,
    INITIAL_STATE,
  );
  const [tier, setTier] = useState<TierId | "">("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [attachmentBlocked, setAttachmentBlocked] = useState(false);
  const [attachmentResetFor, setAttachmentResetFor] =
    useState<FormActionState<ApplicationField> | null>(null);
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const attachmentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const requested = parseTier(
      new URLSearchParams(window.location.search).get("tier"),
    );
    if (requested) {
      setTier(requested);
    }
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setTier("");
      setFileName(null);
    }
    if (state.status === "invalid" && formRef.current) {
      const field = firstInvalidField(APPLICATION_FIELDS, state.errors);
      if (field) {
        focusControl(formRef.current, field);
      }
    }
  }, [state]);

  const serverErrors: Partial<Record<ApplicationField, string>> =
    state.status === "invalid" ? state.errors : {};
  const serverAttachmentError =
    attachmentResetFor === state ? undefined : serverErrors.attachment;
  const errors: Partial<Record<ApplicationField, string>> = {
    ...serverErrors,
    attachment: attachmentError ?? serverAttachmentError,
  };

  const control = (name: ApplicationField) => ({
    id: name,
    name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": describedBy(name, { error: errors[name] }),
  });

  const renderSelect = ({
    name,
    label,
    placeholder,
    options,
    required = false,
  }: SelectFieldProps) => (
    <FormField id={name} label={label} required={required} error={errors[name]}>
      <div className="relative">
        <select
          {...control(name)}
          defaultValue=""
          required={required}
          className={`${CONTROL_CLASS} appearance-none pe-11`}
        >
          <option value="" disabled={required}>
            {placeholder}
          </option>
          {options.map((option) => (
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
  );

  const onAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
    setAttachmentBlocked(false);
    setAttachmentResetFor(state);
    if (!file) {
      setAttachmentError(null);
    } else if (file.size > ATTACHMENT_MAX_BYTES) {
      setAttachmentError(tErrors("attachmentTooLarge"));
    } else if (!isPdf(file)) {
      setAttachmentError(tErrors("attachmentType"));
    } else {
      setAttachmentError(null);
    }
  };

  const removeAttachment = () => {
    if (attachmentRef.current) {
      attachmentRef.current.value = "";
    }
    setFileName(null);
    setAttachmentError(null);
    setAttachmentBlocked(false);
    setAttachmentResetFor(state);
    attachmentRef.current?.focus();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) {
      return;
    }
    setAttempt((count) => count + 1);
    if (attachmentError) {
      setAttachmentBlocked(true);
      focusControl(event.currentTarget, "attachment");
      return;
    }
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  const statusMessage =
    attachmentBlocked && attachmentError
      ? attachmentError
      : state.status === "invalid"
        ? t("invalidSummary")
        : null;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="flex w-full flex-col gap-10 rounded-3xl border border-line bg-white p-6 shadow-[0_10px_40px_rgba(11,36,112,0.08)] sm:p-10"
    >
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

      <fieldset className="min-w-0">
        <legend className={LEGEND_CLASS}>{t("companyLegend")}</legend>
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              id="companyName"
              label={t("companyName")}
              required
              error={errors.companyName}
            >
              <input
                {...control("companyName")}
                type="text"
                autoComplete="organization"
                required
                className={CONTROL_CLASS}
              />
            </FormField>
          </div>
          {renderSelect({
            name: "sector",
            label: t("sector"),
            placeholder: t("sectorPlaceholder"),
            options: sectors,
            required: true,
          })}
          {renderSelect({
            name: "country",
            label: t("country"),
            placeholder: t("countryPlaceholder"),
            options: countries,
            required: true,
          })}
          <FormField id="city" label={t("city")} error={errors.city}>
            <input
              {...control("city")}
              type="text"
              autoComplete="address-level2"
              className={CONTROL_CLASS}
            />
          </FormField>
          <FormField id="website" label={t("website")} error={errors.website}>
            <input
              {...control("website")}
              type="url"
              autoComplete="url"
              dir="ltr"
              className={`${CONTROL_CLASS} text-start`}
            />
          </FormField>
          <div className="sm:col-span-2">
            {renderSelect({
              name: "companySize",
              label: t("companySize"),
              placeholder: t("companySizePlaceholder"),
              options: companySizes,
            })}
          </div>
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className={LEGEND_CLASS}>{t("contactLegend")}</legend>
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <FormField
            id="fullName"
            label={t("fullName")}
            required
            error={errors.fullName}
          >
            <input
              {...control("fullName")}
              type="text"
              autoComplete="name"
              required
              className={CONTROL_CLASS}
            />
          </FormField>
          <FormField
            id="position"
            label={t("position")}
            error={errors.position}
          >
            <input
              {...control("position")}
              type="text"
              autoComplete="organization-title"
              className={CONTROL_CLASS}
            />
          </FormField>
          <FormField
            id="email"
            label={t("email")}
            required
            error={errors.email}
          >
            <input
              {...control("email")}
              type="email"
              autoComplete="email"
              dir="ltr"
              required
              className={`${CONTROL_CLASS} text-start`}
            />
          </FormField>
          <FormField
            id="phone"
            label={t("phone")}
            required
            error={errors.phone}
          >
            <input
              {...control("phone")}
              type="tel"
              autoComplete="tel"
              dir="ltr"
              required
              className={`${CONTROL_CLASS} text-start`}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className={LEGEND_CLASS}>{t("membershipLegend")}</legend>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p id="tier-label" className="text-sm font-semibold text-ink">
              {t("tier")}
              <span aria-hidden="true" className="ms-1 text-ink">
                *
              </span>
            </p>
            <div
              role="radiogroup"
              aria-labelledby="tier-label"
              aria-required="true"
              aria-invalid={Boolean(errors.tier)}
              aria-describedby={describedBy("tier", {
                hint: t("tierHint"),
                error: errors.tier,
              })}
              className="grid gap-3 sm:grid-cols-3"
            >
              {tiers.map((option) => (
                <label
                  key={option.id}
                  className="relative flex min-w-0 cursor-pointer flex-col gap-2 rounded-2xl border border-muted bg-white p-4 transition-[border-color,box-shadow] duration-150 hover:border-ink has-[:checked]:border-blue has-[:checked]:ring-2 has-[:checked]:ring-blue has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-blue"
                >
                  <input
                    type="radio"
                    name="tier"
                    value={option.id}
                    checked={tier === option.id}
                    onChange={() => setTier(option.id)}
                    required
                    className="sr-only"
                  />
                  <span className="flex items-center gap-2 font-display text-title font-semibold text-blue">
                    <span
                      aria-hidden="true"
                      className={`size-2.5 shrink-0 rounded-full ${TIER_DOTS[option.id]}`}
                    />
                    <span className="min-w-0 hyphens-auto [overflow-wrap:anywhere]">
                      <RichText text={option.name} locale={locale} />
                    </span>
                    {tier === option.id ? (
                      <Check
                        size={18}
                        aria-hidden="true"
                        className="ms-auto shrink-0 text-blue"
                      />
                    ) : null}
                  </span>
                  <span className="text-[15px] text-ink">
                    <RichText text={option.tagline} locale={locale} />
                  </span>
                </label>
              ))}
            </div>
            <p id="tier-hint" className="text-sm text-muted">
              {t("tierHint")}
            </p>
            {errors.tier ? (
              <p
                id="tier-error"
                className="flex items-start gap-2 text-sm font-medium text-ink"
              >
                <AlertCircle
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-red"
                />
                <span>{errors.tier}</span>
              </p>
            ) : null}
          </div>

          <FormField
            id="heardFrom"
            label={t("heardFrom")}
            error={errors.heardFrom}
          >
            <input
              {...control("heardFrom")}
              type="text"
              className={CONTROL_CLASS}
            />
          </FormField>

          <FormField id="message" label={t("message")} error={errors.message}>
            <textarea
              {...control("message")}
              rows={5}
              className={`${CONTROL_CLASS} h-36 resize-none`}
            />
          </FormField>

          <FormField
            id="attachment"
            label={t("attachment")}
            hint={t("attachmentHint")}
            error={errors.attachment}
          >
            <div className="flex flex-col gap-3">
              <label
                htmlFor="attachment"
                className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-muted bg-ivory px-4 py-5 text-center transition-[border-color,box-shadow] duration-150 hover:border-ink has-[input:focus-visible]:border-blue has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-3 has-[input:focus-visible]:outline-blue"
              >
                <Upload size={20} aria-hidden="true" className="text-blue" />
                <span className="text-sm font-semibold break-all text-ink">
                  {fileName ?? t("chooseFile")}
                </span>
                <input
                  ref={attachmentRef}
                  id="attachment"
                  name="attachment"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={onAttachmentChange}
                  aria-invalid={Boolean(errors.attachment)}
                  aria-describedby={describedBy("attachment", {
                    hint: t("attachmentHint"),
                    error: errors.attachment,
                  })}
                  className="sr-only"
                />
              </label>
              {fileName || errors.attachment ? (
                <button
                  type="button"
                  onClick={removeAttachment}
                  className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-blue px-5 text-sm font-semibold text-blue transition-colors duration-150 hover:bg-ivory"
                >
                  <X size={16} aria-hidden="true" className="shrink-0" />
                  {t("removeFile")}
                </button>
              ) : null}
            </div>
          </FormField>

          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-start gap-3 text-[15px] text-ink">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={describedBy("consent", {
                  error: errors.consent,
                })}
                className="mt-1 size-5 shrink-0 accent-blue"
              />
              <span className="min-w-0">
                {t.rich("consent", {
                  link: (chunks) => (
                    <Link
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold whitespace-nowrap text-blue underline underline-offset-4"
                    >
                      {chunks}
                      <ExternalLink
                        size={14}
                        aria-hidden="true"
                        className="ms-1 inline-block align-[-0.125em]"
                      />
                      <span className="sr-only">{t("opensInNewTab")}</span>
                    </Link>
                  ),
                })}
              </span>
            </label>
            {errors.consent ? (
              <p
                id="consent-error"
                className="flex items-start gap-2 text-sm font-medium text-ink"
              >
                <AlertCircle
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-red"
                />
                <span>{errors.consent}</span>
              </p>
            ) : null}
          </div>
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          aria-disabled={isPending}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-deep aria-disabled:cursor-not-allowed aria-disabled:opacity-60 motion-safe:active:scale-[0.97]"
        >
          {isPending ? t("submitting") : t("submit")}
        </button>

        <div role="status" aria-live="polite" className="min-w-0 flex-1">
          {statusMessage ? (
            <p
              key={attempt}
              className="flex items-start gap-2 text-sm font-medium text-ink"
            >
              <AlertCircle
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-red"
              />
              <span>
                <RichText text={statusMessage} locale={locale} />
              </span>
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
