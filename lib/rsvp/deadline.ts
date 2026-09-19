import { wedding } from "@/config/wedding";

/**
 * Fine della scadenza RSVP: le 23:59 del giorno indicato in config,
 * ora italiana. L'offset è quello invernale (+01:00), giusto per la
 * scadenza di gennaio; se la data si sposta in estate va adeguato.
 */
export const RSVP_DEADLINE_END = new Date(
  `${wedding.dates.rsvpDeadline}T23:59:59+01:00`,
);

export function isPastRsvpDeadline(now: Date = new Date()): boolean {
  return now.getTime() > RSVP_DEADLINE_END.getTime();
}
