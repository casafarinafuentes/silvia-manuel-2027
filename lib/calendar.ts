import { wedding } from "@/config/wedding";
import { resolve } from "@/i18n/pair";
import type { Locale } from "@/i18n/locales";
import { calendarMessages } from "@/i18n/messages/site";

/**
 * L'evento del matrimonio per i calendari: una sola definizione, usata
 * sia dal file .ics (/calendario) sia dal link a Google Calendar.
 */

const start = new Date(wedding.dates.startsAt);

// La festa non ha un orario di fine: in calendario blocchiamo 9 ore
// dalla cerimonia, fino a notte fonda.
const end = new Date(start.getTime() + 9 * 60 * 60 * 1000);

/** L'evento nella lingua indicata (titolo, luogo, descrizione, promemoria). */
export function weddingEvent(locale: Locale) {
  const m = resolve(calendarMessages, locale);

  return {
    start,
    end,
    title: m.title,
    place: `${wedding.location.venue}, ${wedding.location.address.locality} (${wedding.location.address.province}), ${m.region}`,
    description: m.description,
    reminder: m.reminder,
  };
}

/** 20270612T150000Z: il formato delle date di iCalendar e di Google. */
export function calendarDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * Link che apre Google Calendar con l'evento già compilato: per chi usa
 * Android, dove il file .ics verrebbe solo scaricato.
 */
export function googleCalendarUrl(locale: Locale): string {
  const event = weddingEvent(locale);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${calendarDate(event.start)}/${calendarDate(event.end)}`,
    details: event.description,
    location: event.place,
    hl: locale,
  });

  return `https://calendar.google.com/calendar/render?${params}`;
}
