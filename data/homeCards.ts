import {
  CalendarDays,
  Mail,
  MapPinned,
  Gift,
} from "lucide-react";

import { isRsvpClosed, type WeddingPhase } from "@/lib/temporal";

/** Le schede della home, adattate alla fase del matrimonio. */
export function getHomeCards(phase: WeddingPhase) {
  const cards = [
    {
      title: "Il Matrimonio",
      description:
        phase === "after"
          ? "Il nostro giorno a Li Capanni: il luogo, le foto e i ricordi."
          : "Scopri quando, dove e tutti i dettagli della giornata.",
      image: "/cards/wedding.jpg",
      icon: CalendarDays,
      href: "/matrimonio",
    },
    {
      title: "RSVP",
      description:
        phase === "rsvp"
          ? "Conferma la tua presenza entro il 12 marzo 2027."
          : "La scadenza è passata: se non hai ancora risposto, fallo al più presto.",
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
      title: "Per tutto ciò che verrà",
      description:
        "Se desiderate farci un regalo, potete contribuire ai progetti della nostra famiglia.",
      image: "/cards/gift.jpg",
      icon: Gift,
      href: "/lista-nozze",
    },
  ];

  // Dal giorno del matrimonio non c'è più niente da confermare.
  return isRsvpClosed(phase)
    ? cards.filter((card) => card.href !== "/rsvp")
    : cards;
}
