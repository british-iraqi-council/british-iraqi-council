import type { IconCard } from "./types";

export const BENEFITS: readonly IconCard[] = [
  {
    id: "access",
    icon: "key-round",
    title: { ar: "الوصول", en: "Access" },
    body: {
      ar: "تعارف وإحاطات عن السوق وفعاليات يخصّصها المجلس لأعضائه.",
      en: "Introductions, market briefings and council events set aside for members.",
    },
  },
  {
    id: "visibility",
    icon: "eye",
    title: { ar: "الظهور", en: "Visibility" },
    body: {
      ar: "حضور لشركتك في قنوات المجلس وفعالياته، أمام جمهور من مجتمعَي الأعمال العراقي والبريطاني.",
      en: "A place for your company on the council's channels and at its events, before Iraqi and British business audiences.",
    },
  },
  {
    id: "advocacy",
    icon: "megaphone",
    title: { ar: "تمثيل المصالح", en: "Advocacy" },
    body: {
      ar: "مجلس ذو صفة رسمية يحمل قضاياك إلى الجهات المعنية في البلدين.",
      en: "A council with official standing that raises your concerns with the relevant authorities in both countries.",
    },
  },
  {
    id: "networking",
    icon: "users",
    title: { ar: "بناء العلاقات", en: "Networking" },
    body: {
      ar: "لقاءات تجمعك بصنّاع القرار وبنظرائك من الشركات في البلدين.",
      en: "Meetings that bring you together with decision-makers and with peers from both business communities.",
    },
  },
];
