import dates from "@/assets/images/stock/agriculture-date-palm.jpg";
import crane from "@/assets/images/stock/construction-crane.jpg";
import refinery from "@/assets/images/stock/energy-refinery.jpg";
import servers from "@/assets/images/stock/technology-server-aisle.jpg";
import type { IconCard } from "./types";

export const WHY_IRAQ: readonly IconCard[] = [
  {
    id: "energy",
    icon: "zap",
    image: {
      src: refinery,
      alt: {
        ar: "خزانات وأنابيب مصفاة نفط تحت سماء دافئة",
        en: "Refinery tanks and pipework under a warm sky",
      },
    },
    title: { ar: "الطاقة", en: "Energy" },
    body: {
      ar: "النفط والغاز وتوليد الكهرباء والطاقة المتجددة، مجالات تتيح فيها مشاريع الطاقة في العراق للشركات العراقية والبريطانية أن تعمل معًا في شراكة.",
      en: "Oil, gas, power generation and renewables, where Iraq's energy projects give Iraqi and British companies room to work in partnership.",
    },
  },
  {
    id: "infrastructure",
    icon: "building",
    image: {
      src: crane,
      alt: {
        ar: "رافعة برجية فوق هيكل مبنى قيد الإنشاء عند الغروب",
        en: "A tower crane above a building frame under construction at sunset",
      },
    },
    title: {
      ar: "البناء والبنية التحتية",
      en: "Construction and infrastructure",
    },
    body: {
      ar: "الطرق والإسكان وشبكات المياه والمباني العامة، مجالات يستطيع فيها المقاولون العراقيون وشركات التصميم وإدارة المشاريع البريطانية أن ينهضوا معًا بأعمال البناء في العراق.",
      en: "Roads, housing, water networks and public buildings, where Iraqi contractors and British design and project management firms can take on Iraq's building work together.",
    },
  },
  {
    id: "agriculture",
    icon: "wheat",
    image: {
      src: dates,
      alt: {
        ar: "نخلة تتدلّى منها عناقيد التمر الأحمر",
        en: "A date palm hung with clusters of red dates",
      },
    },
    title: { ar: "الزراعة والغذاء", en: "Agriculture and food" },
    body: {
      ar: "الزراعة والري وتصنيع الأغذية، مجالات يستطيع فيها المنتجون العراقيون والشركات البريطانية أن يطوّروا معًا قطاع الغذاء في العراق.",
      en: "Farming, irrigation and food processing, where Iraqi producers and British companies can develop Iraq's food sector together.",
    },
  },
  {
    id: "technology",
    icon: "cpu",
    image: {
      src: servers,
      alt: {
        ar: "ممر بين خزائن الخوادم في مركز بيانات",
        en: "An aisle between server cabinets in a data centre",
      },
    },
    title: { ar: "التكنولوجيا", en: "Technology" },
    body: {
      ar: "الاتصالات والخدمات الرقمية والتكنولوجيا المالية، مجالات تستطيع فيها الشركات العراقية والبريطانية أن تبني معًا خدمات جديدة للسوق العراقية.",
      en: "Telecommunications, digital services and financial technology, where Iraqi and British firms can build new services for the Iraqi market together.",
    },
  },
];
