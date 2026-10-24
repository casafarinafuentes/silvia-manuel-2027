/**
 * Lingue del sito.
 *
 * L'italiano è la lingua di partenza e vive senza prefisso
 * (`/matrimonio`); lo spagnolo sta sotto `/es` (`/es/matrimonio`).
 * Per aggiungerne un'altra (es. l'inglese) si aggiunge qui, si
 * aggiunge il campo corrispondente a `Pair` in `./pair.ts` e il
 * compilatore indica ogni testo ancora da tradurre.
 */
export const locales = ["it", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

/** Nome della lingua scritto nella lingua stessa, per il selettore. */
export const localeNames: Record<Locale, string> = {
  it: "Italiano",
  es: "Español",
};

/** Sigla breve mostrata nel selettore. */
export const localeCodes: Record<Locale, string> = {
  it: "IT",
  es: "ES",
};

/** Valore per `og:locale` e simili. */
export const localeTags: Record<Locale, string> = {
  it: "it_IT",
  es: "es_ES",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
