import { wedding } from "@/config/wedding";

/**
 * Fine della scadenza RSVP: le 23:59 del giorno indicato in config,
 * ora italiana. L'offset è quello invernale (+01:00), giusto per la
 * scadenza del 12 marzo (l'ora legale parte a fine marzo); se la data
 * si sposta in estate va adeguato.
 */
export const RSVP_DEADLINE_END = new Date(
  `${wedding.dates.rsvpDeadline}T23:59:59+01:00`,
);

export function isPastRsvpDeadline(now: Date = new Date()): boolean {
  return now.getTime() > RSVP_DEADLINE_END.getTime();
}

/** "12 marzo": la scadenza come va scritta nei testi, presa da config. */
export function rsvpDeadlineLabel(): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${wedding.dates.rsvpDeadline}T12:00:00Z`));
}
