import {
  CalendarDays,
  Mail,
  MapPinned,
  Gift,
  BedDouble,
} from "lucide-react";

import { homeMessages } from "@/i18n/messages/home";
import { resolve } from "@/i18n/pair";
import type { Locale } from "@/i18n/locales";
import { isRsvpClosed, type WeddingPhase } from "@/lib/temporal";

/** Le schede della home, adattate alla fase del matrimonio. */
export function getHomeCards(phase: WeddingPhase, locale: Locale) {
  const { cards: c } = resolve(homeMessages, locale);

  const cards = [
    {
      title: c.matrimonio.title,
      description: phase === "after" ? c.matrimonio.after : c.matrimonio.before,
      image: "/cards/wedding.jpg",
      icon: CalendarDays,
      href: "/matrimonio",
    },
    {
      title: c.rsvp.title,
      description: phase === "rsvp" ? c.rsvp.open : c.rsvp.late,
      image: "/cards/rsvp.jpg",
      icon: Mail,
      href: "/rsvp",
    },
    {
      title: c.hotel.title,
      description: c.hotel.text,
      image: "/cards/hotel.jpg",
      icon: BedDouble,
      href: "/viaggio",
    },
    {
      title: c.sardegna.title,
      description: c.sardegna.text,
      image: "/cards/sardinia.jpg",
      icon: MapPinned,
      href: "/sardegna",
    },
    {
      title: c.gift.title,
      description: c.gift.text,
      image: "/cards/gift.jpg",
      icon: Gift,
      href: "/lista-nozze",
    },
  ];

  // Dal giorno del matrimonio non c'è più niente da confermare, e dopo
  // la festa nessuno cerca più un hotel.
  return cards.filter(
    (card) =>
      !(isRsvpClosed(phase) && card.href === "/rsvp") &&
      !(phase === "after" && card.href === "/viaggio"),
  );
}
