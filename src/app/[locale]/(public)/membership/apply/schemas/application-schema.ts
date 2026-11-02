import { z } from "zod";
import {
  APPLICATION_SECTORS,
  COMPANY_SIZES,
  COUNTRIES,
  TIERS,
} from "@/content";
import { emailField, emptyToUndefined, valuesOf } from "@/lib/zod-helpers";

export const ATTACHMENT_MAX_BYTES = 4 * 1024 * 1024;

const optionalText = (max: number, key: string) =>
  z.preprocess(emptyToUndefined, z.string().trim().max(max, key).optional());

export const APPLICATION_FIELDS = [
  "companyName",
  "sector",
  "country",
  "city",
  "website",
  "companySize",
  "fullName",
  "position",
  "email",
  "phone",
  "tier",
  "heardFrom",
  "message",
  "attachment",
  "consent",
] as const;

export type ApplicationField = (typeof APPLICATION_FIELDS)[number];

const attachment = z
  .instanceof(File)
  .refine(
    (file) =>
      file.name.toLowerCase().endsWith(".pdf") &&
      (file.type === "" || file.type === "application/pdf"),
    "attachmentType",
  )
  .refine((file) => file.size <= ATTACHMENT_MAX_BYTES, "attachmentTooLarge");

export const applicationSchema = z.object({
  companyName: z
    .string("companyNameRequired")
    .trim()
    .min(2, "companyNameRequired")
    .max(160, "companyNameTooLong"),
  sector: z.enum(valuesOf(APPLICATION_SECTORS), "sectorRequired"),
  country: z.enum(valuesOf(COUNTRIES), "countryRequired"),
  city: optionalText(80, "cityTooLong"),
  website: z.preprocess(
    emptyToUndefined,
    z.string().trim().pipe(z.url("websiteInvalid")).optional(),
  ),
  companySize: z.preprocess(
    emptyToUndefined,
    z.enum(valuesOf(COMPANY_SIZES), "companySizeInvalid").optional(),
  ),
  fullName: z
    .string("fullNameRequired")
    .trim()
    .min(2, "fullNameRequired")
    .max(120, "fullNameTooLong"),
  position: optionalText(120, "positionTooLong"),
  email: emailField,
  phone: z
    .string("phoneRequired")
    .trim()
    .min(7, "phoneRequired")
    .max(24, "phoneRequired"),
  tier: z.enum(
    valuesOf(TIERS.map(({ id }) => ({ value: id }))),
    "tierRequired",
  ),
  heardFrom: optionalText(160, "heardFromTooLong"),
  message: optionalText(2000, "messageTooLong"),
  attachment: z.preprocess(
    (value) => (value instanceof File && value.size === 0 ? undefined : value),
    attachment.optional(),
  ),
  consent: z.literal("on", "consentRequired"),
});

export type ApplicationValues = z.infer<typeof applicationSchema>;
