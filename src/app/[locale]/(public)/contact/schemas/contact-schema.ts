import { z } from "zod";
import { CONTACT_SUBJECTS } from "@/content";
import { emailField, emptyToUndefined, valuesOf } from "@/lib/zod-helpers";

export const CONTACT_FIELDS = [
  "name",
  "company",
  "email",
  "phone",
  "subject",
  "message",
] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export const contactSchema = z.object({
  name: z
    .string("nameRequired")
    .trim()
    .min(2, "nameRequired")
    .max(120, "nameTooLong"),
  company: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(160, "companyTooLong").optional(),
  ),
  email: emailField,
  phone: z.preprocess(
    emptyToUndefined,
    z.string().trim().min(7, "phoneInvalid").max(24, "phoneInvalid").optional(),
  ),
  subject: z.enum(valuesOf(CONTACT_SUBJECTS), "subjectRequired"),
  message: z
    .string("messageTooShort")
    .trim()
    .min(10, "messageTooShort")
    .max(2000, "messageTooLong"),
});

export type ContactValues = z.infer<typeof contactSchema>;
