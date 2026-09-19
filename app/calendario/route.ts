import { wedding } from "@/config/wedding";

/**
 * "Aggiungi al calendario": file .ics con data e luogo del matrimonio.
 * Si apre direttamente in Calendario (iPhone/Mac), Google Calendar e
 * Outlook. L'orario viene da config, con fuso orario esplicito.
 */

/** 20270612T150000Z */
function icsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Le virgole, i punti e virgola e gli a capo vanno protetti in iCalendar. */
function escapeText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function GET() {
  const start = new Date(wedding.dates.startsAt);
  // Dalla cerimonia ai saluti (02:00 nel programma): 9 ore.
  const end = new Date(start.getTime() + 9 * 60 * 60 * 1000);

  const place = `${wedding.location.venue}, ${wedding.location.address.locality} (${wedding.location.address.province}), ${wedding.location.address.region}`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Silvia e Manuel//Matrimonio 2027//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:matrimonio-2027@silviaemanuel.it",
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${escapeText("Matrimonio di Silvia & Manuel")}`,
    `LOCATION:${escapeText(place)}`,
    `URL:${wedding.location.maps}`,
    `DESCRIPTION:${escapeText("Non vediamo l'ora di festeggiare con voi! Programma e informazioni: https://silviaemanuel.it")}`,
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
      "Content-Disposition": 'attachment; filename="matrimonio-silvia-manuel.ics"',
    },
  });
}
