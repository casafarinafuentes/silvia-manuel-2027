import { wedding } from "@/config/wedding";
import { calendarDate, weddingEvent } from "@/lib/calendar";

/**
 * "Aggiungi al calendario": file .ics con data e luogo del matrimonio.
 * Si apre direttamente in Calendario (iPhone/Mac), Google Calendar e
 * Outlook. L'orario viene da config, con fuso orario esplicito.
 */

/** Le virgole, i punti e virgola e gli a capo vanno protetti in iCalendar. */
function escapeText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function GET() {
  const { start, end, title, place, description } = weddingEvent;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Silvia e Manuel//Matrimonio 2027//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:matrimonio-2027@silviaemanuel.it",
    `DTSTAMP:${calendarDate(new Date())}`,
    `DTSTART:${calendarDate(start)}`,
    `DTEND:${calendarDate(end)}`,
    `SUMMARY:${escapeText(title)}`,
    `LOCATION:${escapeText(place)}`,
    `URL:${wedding.location.maps}`,
    `DESCRIPTION:${escapeText(description)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText("Tra una settimana: il matrimonio di Silvia & Manuel")}`,
    "TRIGGER:-P7D",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(`${lines.join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      // "inline": iPhone e Mac aprono subito la scheda "Aggiungi al
      // calendario" invece di salvare il file tra i download. Dove il
      // browser non sa aprirlo (Android, Windows) lo scarica comunque,
      // con questo nome.
      "Content-Disposition": 'inline; filename="matrimonio-silvia-manuel.ics"',
    },
  });
}
