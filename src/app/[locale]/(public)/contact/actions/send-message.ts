"use server";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/core/i18n/routing";
import type { FormActionState } from "@/core/types/form-action-state";
import { isFailure } from "@/core/types/results/results";
import { parseFormErrors } from "@/lib/parse-form-errors";
import { contactRepo } from "@/repositories/contact";
import { CONTACT_FIELDS, contactSchema, type ContactField } from "../schemas";

const readField = (formData: FormData, field: string): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
};

const readLocale = (formData: FormData): string => {
  const submitted = readField(formData, "locale");
  return hasLocale(routing.locales, submitted)
    ? submitted
    : routing.defaultLocale;
};

export async function sendMessage(
  _prevState: FormActionState<ContactField>,
  formData: FormData,
): Promise<FormActionState<ContactField>> {
  const locale = readLocale(formData);
  const contact = await getTranslations({ locale, namespace: "contact.form" });

  if (readField(formData, "nickname") !== "") {
    return { status: "success", message: contact("successMessage") };
  }

  try {
    const parsed = contactSchema.safeParse({
      name: readField(formData, "name"),
      company: readField(formData, "company"),
      email: readField(formData, "email"),
      phone: readField(formData, "phone"),
      subject: readField(formData, "subject"),
      message: readField(formData, "message"),
    });

    if (!parsed.success) {
      const errors = await getTranslations({
        locale,
        namespace: "forms.errors",
      });
      return {
        status: "invalid",
        errors: parseFormErrors(parsed.error, CONTACT_FIELDS, (key) =>
          errors(key),
        ),
      };
    }

    const result = await contactRepo.send(parsed.data);

    if (isFailure(result)) {
      return { status: "error", message: contact("unsentMessage") };
    }

    return { status: "success", message: contact("successMessage") };
  } catch {
    return { status: "error", message: contact("unsentMessage") };
  }
}
