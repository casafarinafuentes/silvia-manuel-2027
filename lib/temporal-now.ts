import { getTemporalContext, type TemporalContext } from "./temporal";

/**
 * La data "di adesso" per il server.
 *
 * In sviluppo si può fingere un'altra data per vedere il sito nelle
 * varie fasi: /anteprima?data=2027-06-20 la imposta, /anteprima la
 * toglie (oppure PREVIEW_DATE in .env.local). In produzione l'anteprima
 * non esiste: vale sempre e solo la data vera.
 */

const globalStore = globalThis as typeof globalThis & {
  __previewDate?: string | null;
};

const PREVIEW_ENABLED = process.env.NODE_ENV !== "production";

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** La data finta in uso, o null se si sta guardando il sito di oggi. */
export function getPreviewDate(): string | null {
  if (!PREVIEW_ENABLED) return null;

  const value = globalStore.__previewDate ?? process.env.PREVIEW_DATE ?? null;

  return value && DAY.test(value) ? value : null;
}

/** Imposta (o con null toglie) la data finta. Senza effetto in produzione. */
export function setPreviewDate(day: string | null): void {
  if (!PREVIEW_ENABLED) return;

  globalStore.__previewDate = day && DAY.test(day) ? day : null;
}

export function currentTemporalContext(): TemporalContext {
  const preview = getPreviewDate();

  // Mezzogiorno UTC: cade nello stesso giorno anche in Italia.
  return getTemporalContext(
    preview ? new Date(`${preview}T12:00:00Z`) : new Date(),
  );
}
