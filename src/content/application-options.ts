import type {
  ApplicationSector,
  CompanySize,
  ContactSubject,
  Country,
  Option,
} from "./types";

export const CONTACT_SUBJECTS: readonly Option<ContactSubject>[] = [
  { value: "general", label: { ar: "استفسار عام", en: "General enquiry" } },
  { value: "membership", label: { ar: "العضوية", en: "Membership" } },
  { value: "partnership", label: { ar: "الشراكات", en: "Partnership" } },
  { value: "media", label: { ar: "الإعلام والصحافة", en: "Media and press" } },
  { value: "other", label: { ar: "موضوع آخر", en: "Other" } },
];

export const APPLICATION_SECTORS: readonly Option<ApplicationSector>[] = [
  {
    value: "energy",
    label: { ar: "الطاقة والنفط والغاز", en: "Energy, oil and gas" },
  },
  {
    value: "construction",
    label: {
      ar: "البناء والبنية التحتية",
      en: "Construction and infrastructure",
    },
  },
  {
    value: "trade",
    label: { ar: "التجارة والتوزيع", en: "Trade and distribution" },
  },
  {
    value: "finance",
    label: {
      ar: "المصارف والخدمات المالية",
      en: "Banking and financial services",
    },
  },
  {
    value: "technology",
    label: {
      ar: "التكنولوجيا والاتصالات",
      en: "Technology and telecommunications",
    },
  },
  {
    value: "health",
    label: { ar: "الصحة والأدوية", en: "Health and pharmaceuticals" },
  },
  {
    value: "education",
    label: { ar: "التعليم والتدريب", en: "Education and training" },
  },
  {
    value: "agriculture",
    label: { ar: "الزراعة والصناعات الغذائية", en: "Agriculture and food" },
  },
  {
    value: "transport",
    label: { ar: "النقل والخدمات اللوجستية", en: "Transport and logistics" },
  },
  {
    value: "manufacturing",
    label: { ar: "الصناعة التحويلية", en: "Manufacturing" },
  },
  {
    value: "services",
    label: { ar: "الخدمات المهنية", en: "Professional services" },
  },
  { value: "other", label: { ar: "قطاع آخر", en: "Other" } },
];

export const COMPANY_SIZES: readonly Option<CompanySize>[] = [
  {
    value: "1-10",
    label: { ar: "من 1 إلى 10 موظفين", en: "1 to 10 employees" },
  },
  {
    value: "11-50",
    label: { ar: "من 11 إلى 50 موظفًا", en: "11 to 50 employees" },
  },
  {
    value: "51-250",
    label: { ar: "من 51 إلى 250 موظفًا", en: "51 to 250 employees" },
  },
  {
    value: "251-1000",
    label: { ar: "من 251 إلى 1000 موظف", en: "251 to 1,000 employees" },
  },
  {
    value: "1000+",
    label: { ar: "أكثر من 1000 موظف", en: "More than 1,000 employees" },
  },
];

export const COUNTRIES: readonly Option<Country>[] = [
  { value: "iraq", label: { ar: "العراق", en: "Iraq" } },
  { value: "uk", label: { ar: "المملكة المتحدة", en: "United Kingdom" } },
  { value: "other", label: { ar: "دولة أخرى", en: "Other" } },
];
