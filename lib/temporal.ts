/**
 * Motore delle fasi: l'unico posto in cui il sito decide "a che punto
 * siamo" rispetto al matrimonio. I componenti non guardano mai la data:
 * chiedono la fase e si adattano.
 *
 * Qui dentro solo funzioni pure (la data arriva da fuori), così il
 * comportamento si prova con una data qualunque. La data "di adesso",
 * con l'anteprima per lo sviluppo, sta in lib/temporal-now.ts.
 */

import { wedding } from "../config/wedding.ts";

/**
 * - `rsvp`        fino alla scadenza delle conferme: l'RSVP è in evidenza
 * - `waiting`     scadenza passata: in evidenza i dettagli della giornata
 * - `final-weeks` ultime tre settimane: prima le informazioni pratiche
 * - `wedding`     il giorno del matrimonio, fino alle 6 del mattino dopo
 *                 (la festa non ha orario di fine): l'essenziale
 * - `after`       da lì in poi: il sito diventa un ricordo
 */
export type WeddingPhase =
  | "rsvp"
  | "waiting"
  | "final-weeks"
  | "wedding"
  | "after";

export type TemporalContext = {
  /** Data di oggi in Italia, "AAAA-MM-GG". */
  today: string;
  phase: WeddingPhase;
  /** Giorni di calendario al matrimonio: 0 il giorno stesso, negativi dopo. */
  daysToWedding: number;
  /** La scadenza delle conferme non è ancora passata. */
  beforeRsvpDeadline: boolean;
};

/** Da quanti giorni prima scattano le "ultime settimane". */
export const FINAL_WEEKS_DAYS = 21;

/**
 * Fino a che ora del mattino seguente è ancora "il giorno del
 * matrimonio": a mezzanotte si balla ancora, e un sito che ringrazia
 * al passato sarebbe fuori tempo.
 */
export const WEDDING_NIGHT_HOURS = 6;

/** Le conferme si chiudono con il giorno del matrimonio. */
export function isRsvpClosed(phase: WeddingPhase): boolean {
  return phase === "wedding" || phase === "after";
}

/**
 * Il giorno in Italia, qualunque sia il fuso di chi calcola (server in
 * UTC, computer di sviluppo altrove): le fasi cambiano a mezzanotte
 * italiana per tutti.
 */
function italianDay(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function dayNumber(day: string): number {
  const [year, month, date] = day.split("-").map(Number);

  return Date.UTC(year, month - 1, date) / 86_400_000;
}

export function getTemporalContext(date: Date): TemporalContext {
  const today = italianDay(date);

  const daysToWedding = dayNumber(wedding.dates.wedding) - dayNumber(today);
  const beforeRsvpDeadline = today <= wedding.dates.rsvpDeadline;

  // Il giorno "della festa": lo stesso di oggi, ma le prime ore del
  // mattino appartengono ancora al giorno prima.
  const partyDay = italianDay(
    new Date(date.getTime() - WEDDING_NIGHT_HOURS * 3_600_000),
  );

  let phase: WeddingPhase;

  if (partyDay > wedding.dates.wedding) phase = "after";
  else if (daysToWedding <= 0) phase = "wedding";
  else if (daysToWedding <= FINAL_WEEKS_DAYS) phase = "final-weeks";
  else if (!beforeRsvpDeadline) phase = "waiting";
  else phase = "rsvp";

  return { today, phase, daysToWedding, beforeRsvpDeadline };
}
