import baghdadRiverside from "@/assets/images/stock/baghdad-riverside-construction.jpg";
import basraWaterfront from "@/assets/images/stock/basra-waterfront-cranes.jpg";
import conferenceAudience from "@/assets/images/stock/conference-audience.jpg";
import meetingTable from "@/assets/images/stock/meeting-table.jpg";
import type { WhyJoinRow } from "./types";

export const WHY_JOIN: readonly WhyJoinRow[] = [
  {
    id: "trade",
    title: { ar: "نمو التجارة", en: "Trade growth" },
    body: {
      ar: "للتجارة بين العراق والمملكة المتحدة مجال واسع لتنمو في الاتجاهين. ويساعد المجلس أعضاءه على إيجاد المشترين والموردين والوكلاء في البلد الآخر، وعلى فهم ما تتطلبه التجارة فيه قبل الصفقة الأولى.",
      en: "Trade between Iraq and the United Kingdom has room to grow in both directions. The council helps members find buyers, suppliers and agents in the other country, and understand what trading there involves before the first deal.",
    },
    image: basraWaterfront,
    imageAlt: {
      ar: "واجهة مائية في البصرة تظهر خلفها رافعات الميناء وجسر معلّق",
      en: "A waterfront in Basra with port cranes and a cable-stayed bridge beyond",
    },
  },
  {
    id: "investment",
    title: { ar: "فرص الاستثمار", en: "Investment opportunities" },
    body: {
      ar: "يبني العراق ويتوسّع في الطاقة والبنية التحتية والزراعة والتكنولوجيا. ويُطلع المجلس أعضاءه على ما يصل إليه من فرص، ليلتقوا الشركاء العراقيين والجهات المعنية، ويدرسوا كل فرصة مع من يعرفون السوق عن قرب.",
      en: "Iraq is building and expanding in energy, infrastructure, agriculture and technology. The council shares the opportunities it learns of with its members, so they can meet the Iraqi partners and authorities involved and weigh each one with people who know the market closely.",
    },
    image: baghdadRiverside,
    imageAlt: {
      ar: "مبنى شاهق قيد الإنشاء تعلوه الرافعات على ضفة النهر في بغداد",
      en: "A high-rise under construction with cranes at its top, across the river in Baghdad",
    },
  },
  {
    id: "committees",
    title: { ar: "اللجان القطاعية", en: "Sector committees" },
    body: {
      ar: "يعمل الأعضاء معًا في لجان قطاعية، يتبادلون فيها المعرفة، ويلتقون نظراءهم في مجالهم، ويطرحون قضايا قطاعهم بصوت واحد.",
      en: "Members work together in committees organised by sector, where they share what they know, meet their counterparts in the field and raise their industry's concerns with one voice.",
    },
    image: meetingTable,
    imageAlt: {
      ar: "أشخاص يدوّنون ملاحظاتهم حول طاولة اجتماعات خشبية",
      en: "People taking notes around a wooden meeting table",
    },
  },
  {
    id: "events",
    title: { ar: "الفعاليات وبناء العلاقات", en: "Events and networking" },
    body: {
      ar: "تجمع الإحاطات والموائد المستديرة ولقاءات الأعمال الأعضاءَ بصنّاع القرار وببعضهم، لتصبح المحادثة الأولى بداية لشراكة عمل.",
      en: "Briefings, roundtables and business gatherings bring members together with decision-makers and with one another, so that a first conversation can become a working partnership.",
    },
    image: conferenceAudience,
    imageAlt: {
      ar: "جمهور جالس في قاعة مؤتمرات خافتة الإضاءة",
      en: "An audience seated in a dimly lit conference hall",
    },
  },
];
