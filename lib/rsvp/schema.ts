/**
 * Tipi e validazione del form RSVP.
 *
 * Condiviso tra client e server: il client lo usa per il feedback
 * immediato, il server lo riesegue perché il controllo lato client
 * non è una garanzia.
 */

export type RsvpInput = {
  firstName: string;
  lastName: string;
  email: string;
  attending: boolean;
  partySize: number;
  dietary: string;
  message: string;
};

export type RsvpFieldErrors = Partial<
  Record<keyof RsvpInput | "form", string>
>;

export const MAX_PARTY_SIZE = 20;

const LIMITS = {
  name: 80,
  email: 160,
  dietary: 500,
  message: 2000,
} as const;

/**
 * Volutamente permissiva: serve a intercettare errori di battitura,
 * non a decidere se una casella esiste davvero.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export type ParseResult =
  | { ok: true; data: RsvpInput }
  | { ok: false; errors: RsvpFieldErrors };

export function parseRsvp(raw: unknown): ParseResult {
  const errors: RsvpFieldErrors = {};

  const source = (raw ?? {}) as Record<string, unknown>;

  const firstName = clean(source.firstName);
  const lastName = clean(source.lastName);
  const email = clean(source.email);
  const dietary = clean(source.dietary);
  const message = clean(source.message);

  if (!firstName) {
    errors.firstName = "Inserisci il tuo nome.";
  } else if (firstName.length > LIMITS.name) {
    errors.firstName = `Massimo ${LIMITS.name} caratteri.`;
  }

  if (!lastName) {
    errors.lastName = "Inserisci il tuo cognome.";
  } else if (lastName.length > LIMITS.name) {
    errors.lastName = `Massimo ${LIMITS.name} caratteri.`;
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "Controlla l'indirizzo email.";
  } else if (email.length > LIMITS.email) {
    errors.email = `Massimo ${LIMITS.email} caratteri.`;
  }

  // `attending` non ha default: se manca è perché non è stata fatta
  // una scelta, ed è un errore da segnalare.
  let attending: boolean;

  if (typeof source.attending === "boolean") {
    attending = source.attending;
  } else if (source.attending === "true" || source.attending === "false") {
    attending = source.attending === "true";
  } else {
    errors.attending = "Facci sapere se ci sarai.";
    attending = false;
  }

  const rawPartySize = Number(source.partySize);

  let partySize = Number.isFinite(rawPartySize)
    ? Math.trunc(rawPartySize)
    : Number.NaN;

  if (!Number.isFinite(partySize)) {
    errors.partySize = "Indica quante persone siete.";
    partySize = 1;
  } else if (partySize < 1 || partySize > MAX_PARTY_SIZE) {
    errors.partySize = `Inserisci un numero tra 1 e ${MAX_PARTY_SIZE}.`;
    partySize = Math.min(Math.max(partySize, 1), MAX_PARTY_SIZE);
  }

  // Chi non partecipa non porta nessuno: normalizziamo invece di
  // rifiutare, così il vincolo del database non viene mai violato.
  if (!attending) {
    partySize = 1;
  }

  if (dietary.length > LIMITS.dietary) {
    errors.dietary = `Massimo ${LIMITS.dietary} caratteri.`;
  }

  if (message.length > LIMITS.message) {
    errors.message = `Massimo ${LIMITS.message} caratteri.`;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      attending,
      partySize,
      dietary,
      message,
    },
  };
}
