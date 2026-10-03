import { wedding } from "@/config/wedding";

/**
 * L'evento del matrimonio per i calendari: una sola definizione, usata
 * sia dal file .ics (/calendario) sia dal link a Google Calendar.
 */

const start = new Date(wedding.dates.startsAt);

// La festa non ha un orario di fine: in calendario blocchiamo 9 ore
// dalla cerimonia, fino a notte fonda.
const end = new Date(start.getTime() + 9 * 60 * 60 * 1000);

export const weddingEvent = {
  start,
  end,
  title: "Matrimonio di Silvia & Manuel",
  place: `${wedding.location.venue}, ${wedding.location.address.locality} (${wedding.location.address.province}), ${wedding.location.address.region}`,
  description:
    "Non vediamo l'ora di festeggiare con voi! Programma e informazioni: https://silviaemanuel.it",
};

/** 20270612T150000Z: il formato delle date di iCalendar e di Google. */
export function calendarDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * Link che apre Google Calendar con l'evento già compilato: per chi usa
 * Android, dove il file .ics verrebbe solo scaricato.
 */
export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: weddingEvent.title,
    dates: `${calendarDate(weddingEvent.start)}/${calendarDate(weddingEvent.end)}`,
    details: weddingEvent.description,
    location: weddingEvent.place,
  });

  return `https://calendar.google.com/calendar/render?${params}`;
}
