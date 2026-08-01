import {
  CalendarDays,
  Mail,
  BedDouble,
  MapPinned,
} from "lucide-react";

export const homeCards = [
  {
    title: "Il Matrimonio",
    description:
      "Scopri quando, dove e tutti i dettagli della giornata.",
    image: "/cards/wedding.jpg",
    icon: CalendarDays,
    href: "/matrimonio",
  },
  {
    title: "RSVP",
    description:
      "Conferma la tua presenza entro il 30 aprile 2027.",
    image: "/cards/rsvp.jpg",
    icon: Mail,
    href: "/rsvp",
  },
  {
    title: "Hotel",
    description:
      "Convenzioni e suggerimenti per il vostro soggiorno.",
    image: "/cards/hotel.jpg",
    icon: BedDouble,
    href: "/hotel",
  },
  {
    title: "La nostra Sardegna",
    description:
      "I luoghi del cuore che vi consigliamo di scoprire.",
    image: "/cards/sardinia.jpg",
    icon: MapPinned,
    href: "/sardegna",
  },
];