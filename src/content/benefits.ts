import type { IconCard } from "./types";

export const BENEFITS: readonly IconCard[] = [
  {
    id: "access",
    icon: "key-round",
    title: { ar: "فرص الوصول", en: "Access" },
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
      ar: "حضور لشركتكم في قنوات المجلس وفعالياته، أمام جمهور من مجتمعَي الأعمال العراقي والبريطاني.",
      en: "A place for your company on the council's channels and at its events, before Iraqi and British business audiences.",
    },
  },
  {
    id: "advocacy",
    icon: "megaphone",
    title: { ar: "تمثيل المصالح", en: "Advocacy" },
    body: {
      ar: "مجلس ذو صفة رسمية في العراق يحمل قضاياكم إلى الجهات المعنية.",
      en: "A council with official standing in Iraq that takes your concerns to the relevant authorities.",
    },
  },
  {
    id: "networking",
    icon: "users",
    title: { ar: "بناء العلاقات", en: "Networking" },
    body: {
      ar: "لقاءات تجمعكم بصنّاع القرار وبنظرائكم من الشركات في البلدين.",
      en: "Meetings that bring you together with decision-makers and with peers from both business communities.",
    },
  },
];
