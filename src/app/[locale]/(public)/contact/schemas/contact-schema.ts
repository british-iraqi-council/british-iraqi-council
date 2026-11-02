import { z } from "zod";
import { CONTACT_SUBJECTS } from "@/content";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

const SUBJECT_VALUES = CONTACT_SUBJECTS.map((option) => option.value) as [
  (typeof CONTACT_SUBJECTS)[number]["value"],
  ...(typeof CONTACT_SUBJECTS)[number]["value"][],
];

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
  email: z.string("emailInvalid").trim().pipe(z.email("emailInvalid")),
  phone: z.preprocess(
    emptyToUndefined,
    z.string().trim().min(7, "phoneInvalid").max(24, "phoneInvalid").optional(),
  ),
  subject: z.enum(SUBJECT_VALUES, "subjectRequired"),
  message: z
    .string("messageTooShort")
    .trim()
    .min(10, "messageTooShort")
    .max(2000, "messageTooLong"),
});

export type ContactValues = z.infer<typeof contactSchema>;
