import type { TimelineIconName } from "@/lib/icons";

export type TimelineItem = {
  time: string;
  title: string;
  description: string;
  icon: TimelineIconName;
};

export const timeline: TimelineItem[] = [
  {
    time: "16:30",
    title: "Arrivo degli ospiti",
    description: "Cocktail di benvenuto e accoglienza.",
    icon: "car",
  },
  {
    time: "17:30",
    title: "Cerimonia",
    description: "",
    icon: "gem",
  },
  {
    time: "18:30",
    title: "Aperitivo",
    description: "",
    icon: "martini",
  },
  {
    time: "20:00",
    title: "Cena",
    description: "",
    icon: "utensils",
  },
  {
    time: "22:30",
    title: "Torta e festa",
    description: "",
    icon: "cake",
  },
  {
    time: "02:00",
    title: "Saluti",
    description: "",
    icon: "sparkles",
  },
];