import {
  CalendarDays,
  Mail,
  MapPinned,
  Gift,
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
      "Conferma la tua presenza entro il 12 marzo 2027.",
    image: "/cards/rsvp.jpg",
    icon: Mail,
    href: "/rsvp",
  },
  {
    title: "La Sardegna che amiamo",
    description:
      "Spiagge, tavole e paesi che vi consigliamo di scoprire.",
    image: "/cards/sardinia.jpg",
    icon: MapPinned,
    href: "/sardegna",
  },
  {
    title: "Regalo di nozze",
    description:
      "Se desiderate farci un regalo, qui trovate come contribuire al nostro viaggio.",
    image: "/cards/gift.jpg",
    icon: Gift,
    href: "/lista-nozze",
  },
];
