import type { Tier } from "./types";

export const TIERS: readonly Tier[] = [
  {
    id: "bronze",
    name: { ar: "البرونزية", en: "Bronze" },
    tagline: {
      ar: "مكان لشركتكم في شبكة المجلس وفعالياته ولجانه.",
      en: "A place in the council's network, its events and its committees.",
    },
    added: [
      { ar: "فعاليات للتواصل وبناء العلاقات", en: "Networking events" },
      {
        ar: "تعارف مباشر مع شركات أخرى",
        en: "Introductions to other businesses",
      },
      {
        ar: "إدراج شركتكم في دليل أعضاء المجلس عند إطلاقه",
        en: "An entry in the council's directory of members once it opens",
      },
      { ar: "دعوات إلى فعاليات المجلس", en: "Invitations to council events" },
      { ar: "عروض خاصة بالأعضاء", en: "Offers for members" },
      {
        ar: "عضوية في إحدى اللجان القطاعية",
        en: "Membership of a sector committee",
      },
    ],
  },
  {
    id: "silver",
    name: { ar: "الفضية", en: "Silver" },
    tagline: {
      ar: "حضور أوسع، مع أولوية في الدعوات ولقاءات رسمية ودور قيادي في اللجان.",
      en: "Wider reach, with priority invitations, official meetings and committee leadership.",
    },
    added: [
      {
        ar: "أولوية الدعوة إلى فعاليات كبار الشخصيات والموائد المستديرة",
        en: "Priority invitations to high-level gatherings and roundtables",
      },
      {
        ar: "لقاءات مع الجهات الحكومية والقطاع العام",
        en: "Meetings with government and the public sector",
      },
      {
        ar: "أدوار قيادية في اللجان القطاعية",
        en: "Leadership roles in sector committees",
      },
      { ar: "إحاطات عن السوق", en: "Market briefings" },
      {
        ar: "تعريف بشركتكم في قنوات المجلس",
        en: "A profile on the council's channels",
      },
    ],
  },
  {
    id: "gold",
    name: { ar: "الذهبية", en: "Gold" },
    tagline: {
      ar: "الدعم الأشمل، مع معلومات وتحليلات عن السوق مخصّصة لشركتكم، وإرشاد شخصي، ورأي في السياسات.",
      en: "The fullest support, with tailored insight, personal guidance and a say in policy.",
    },
    added: [
      {
        ar: "معلومات وتحليلات عن السوق مخصّصة لشركتكم",
        en: "Market insight tailored to your company",
      },
      {
        ar: "حضور بارز في قنوات المجلس",
        en: "A prominent profile on the council's channels",
      },
      {
        ar: "مشاركة في جهود المجلس لدى صنّاع القرار وفي قضايا السياسات",
        en: "A voice in the council's advocacy and policy work",
      },
      { ar: "إرشاد شخصي", en: "Personal guidance" },
      {
        ar: "متابعة الفرص والشراكات",
        en: "Following up opportunities and partnerships",
      },
    ],
  },
];
