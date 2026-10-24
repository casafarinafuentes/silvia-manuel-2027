/**
 * Tipi e validazione del form RSVP.
 *
 * Condiviso tra client e server: il client lo usa per il feedback
 * immediato, il server lo riesegue perché il controllo lato client
 * non è una garanzia.
 */

import { isValidHotelChoice } from "../../data/hotels.ts";
import { defaultLocale, type Locale } from "../../i18n/locales.ts";
import { rsvpErrors } from "../../i18n/messages/rsvp.ts";
import { fill, resolve } from "../../i18n/pair.ts";

export type RsvpInput = {
  firstName: string;
  lastName: string;
  email: string;
  attending: boolean;
  partySize: number;
  dietary: string;
  hotel: string;
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

export type ParseOptions = {
  /**
   * Prima della scadenza chi partecipa deve indicare l'alloggio (anche
   * "mi organizzo da solo"): serve per comunicare il numero agli hotel.
   * Dopo la scadenza la scelta non viene più richiesta né salvata.
   */
  hotelRequired?: boolean;
  /** Lingua dei messaggi di errore (di default l'italiano). */
  locale?: Locale;
};

export function parseRsvp(
  raw: unknown,
  options: ParseOptions = {},
): ParseResult {
  const errors: RsvpFieldErrors = {};
  const t = resolve(rsvpErrors, options.locale ?? defaultLocale);

  const source = (raw ?? {}) as Record<string, unknown>;

  const firstName = clean(source.firstName);
  const lastName = clean(source.lastName);
  const email = clean(source.email);
  const dietary = clean(source.dietary);
  const message = clean(source.message);
  let hotel = clean(source.hotel);

  if (!firstName) {
    errors.firstName = t.firstNameRequired;
  } else if (firstName.length > LIMITS.name) {
    errors.firstName = fill(t.maxLength, { max: LIMITS.name });
  }

  if (!lastName) {
    errors.lastName = t.lastNameRequired;
  } else if (lastName.length > LIMITS.name) {
    errors.lastName = fill(t.maxLength, { max: LIMITS.name });
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = t.emailInvalid;
  } else if (email.length > LIMITS.email) {
    errors.email = fill(t.maxLength, { max: LIMITS.email });
  }

  // `attending` non ha default: se manca è perché non è stata fatta
  // una scelta, ed è un errore da segnalare.
  let attending: boolean;

  if (typeof source.attending === "boolean") {
    attending = source.attending;
  } else if (source.attending === "true" || source.attending === "false") {
    attending = source.attending === "true";
  } else {
    errors.attending = t.attendingRequired;
    attending = false;
  }

  const rawPartySize = Number(source.partySize);

  let partySize = Number.isFinite(rawPartySize)
    ? Math.trunc(rawPartySize)
    : Number.NaN;

  if (!Number.isFinite(partySize)) {
    errors.partySize = t.partySizeRequired;
    partySize = 1;
  } else if (partySize < 1 || partySize > MAX_PARTY_SIZE) {
    errors.partySize = fill(t.partySizeRange, { max: MAX_PARTY_SIZE });
    partySize = Math.min(Math.max(partySize, 1), MAX_PARTY_SIZE);
  }

  // Chi non partecipa non porta nessuno: normalizziamo invece di
  // rifiutare, così il vincolo del database non viene mai violato.
  if (!attending) {
    partySize = 1;
  }

  if (!attending || !options.hotelRequired) {
    hotel = "";
  } else if (!hotel) {
    errors.hotel = t.hotelRequired;
  } else if (!isValidHotelChoice(hotel)) {
    errors.hotel = t.hotelInvalid;
  }

  if (dietary.length > LIMITS.dietary) {
    errors.dietary = fill(t.maxLength, { max: LIMITS.dietary });
  }

  if (message.length > LIMITS.message) {
    errors.message = fill(t.maxLength, { max: LIMITS.message });
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
      hotel,
      message,
    },
  };
}
