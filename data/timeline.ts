import type { TimelineIconName } from "@/lib/icons";

export type TimelineItem = {
  time: string;
  title: string;
  description: string;
  icon: TimelineIconName;
};

export const timeline: TimelineItem[] = [
  {
    time: "17:00",
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
    // Ultima voce, volutamente senza orario di fine: nella timeline
    // la linea prosegue tratteggiata oltre questo punto.
    time: "22:00",
    title: "Taglio torta & Dance Floor",
    description: "",
    icon: "cake",
  },
];