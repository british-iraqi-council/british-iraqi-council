"use server";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/core/i18n/routing";
import type { FormActionState } from "@/core/types/form-action-state";
import { isFailure } from "@/core/types/results/results";
import { parseFormErrors } from "@/lib/parse-form-errors";
import { membershipRepo } from "@/repositories/membership";
import {
  APPLICATION_FIELDS,
  applicationSchema,
  type ApplicationField,
} from "../schemas";

const readField = (formData: FormData, field: string): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
};

const readFile = (formData: FormData, field: string): File | undefined => {
  const value = formData.get(field);
  return value instanceof File ? value : undefined;
};

const readLocale = (formData: FormData): string => {
  const submitted = readField(formData, "locale");
  return hasLocale(routing.locales, submitted)
    ? submitted
    : routing.defaultLocale;
};

export async function sendApplication(
  _prevState: FormActionState<ApplicationField>,
  formData: FormData,
): Promise<FormActionState<ApplicationField>> {
  const locale = readLocale(formData);
  const apply = await getTranslations({ locale, namespace: "apply.form" });

  if (readField(formData, "nickname") !== "") {
    return { status: "success", message: apply("successMessage") };
  }

  try {
    const parsed = applicationSchema.safeParse({
      companyName: readField(formData, "companyName"),
      sector: readField(formData, "sector"),
      country: readField(formData, "country"),
      city: readField(formData, "city"),
      website: readField(formData, "website"),
      companySize: readField(formData, "companySize"),
      fullName: readField(formData, "fullName"),
      position: readField(formData, "position"),
      email: readField(formData, "email"),
      phone: readField(formData, "phone"),
      tier: readField(formData, "tier"),
      heardFrom: readField(formData, "heardFrom"),
      message: readField(formData, "message"),
      attachment: readFile(formData, "attachment"),
      consent: readField(formData, "consent"),
    });

    if (!parsed.success) {
      const errors = await getTranslations({
        locale,
        namespace: "forms.errors",
      });
      return {
        status: "invalid",
        errors: parseFormErrors(parsed.error, APPLICATION_FIELDS, (key) =>
          errors(key),
        ),
      };
    }

    const result = await membershipRepo.apply(parsed.data);

    if (isFailure(result)) {
      return { status: "error", message: apply("unsentMessage") };
    }

    return { status: "success", message: apply("successMessage") };
  } catch {
    return { status: "error", message: apply("unsentMessage") };
  }
}
