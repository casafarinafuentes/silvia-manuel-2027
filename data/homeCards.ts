import {
  CalendarDays,
  Mail,
  BedDouble,
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
      "Conferma la tua presenza entro il 31 gennaio 2027.",
    image: "/cards/rsvp.jpg",
    icon: Mail,
    href: "/rsvp",
  },
  {
    title: "Hotel",
    description:
      "Gli alberghi di Cannigione, la navetta e come prenotare.",
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
  {
    title: "Lista nozze",
    description:
      "La vostra presenza è il regalo più grande. Per chi desidera lasciarci un pensiero.",
    // Nessuna foto: la scheda usa il ramo botanico al posto dell'immagine.
    image: null,
    icon: Gift,
    href: "/lista-nozze",
  },
];
