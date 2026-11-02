import type { Organisation } from "./types";

export const ORGANISATION: Organisation = {
  name: {
    ar: "مجلس الأعمال العراقي البريطاني",
    en: "Iraqi–British Business Council",
  },
  short: "IBBC",
  standing: {
    ar: "تأسس المجلس في العراق بموافقة اتحاد الغرف التجارية العراقية ومصادقة وزارة التجارة.",
    en: "Formed in Iraq with the approval of the Federation of Iraqi Chambers of Commerce, and ratified by the Ministry of Commerce.",
  },
  institutions: [
    {
      ar: "اتحاد الغرف التجارية العراقية",
      en: "Federation of Iraqi Chambers of Commerce",
    },
    { ar: "وزارة التجارة", en: "Ministry of Commerce" },
  ],
  description: {
    ar: "يجمع مجلس الأعمال العراقي البريطاني بين الشركات العراقية والبريطانية، ليعزّز التبادل التجاري والاستثمار ويبني شراكات راسخة بين البلدين.",
    en: "The Iraqi–British Business Council brings Iraqi and British companies together to grow trade and investment and build lasting partnerships between the two countries.",
  },
  contact: { phone: "+964 790 199 9998", social: [] },
};
