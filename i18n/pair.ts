import { locales, type Locale } from "./locales.ts";

/**
 * Un testo scritto nelle due lingue, una accanto all'altra.
 *
 *   titolo: p("Il matrimonio", "La boda")
 *
 * `p` vuole sempre entrambe le versioni: se manca la traduzione il
 * progetto non compila, quindi non può restare una frase in italiano
 * nella pagina spagnola. Le due versioni devono avere la stessa forma
 * (due stringhe, due liste di stringhe, o due funzioni con gli stessi
 * argomenti, per i testi con un numero o un nome in mezzo).
 */
export class Pair<T> {
  readonly values: Record<Locale, T>;

  constructor(values: Record<Locale, T>) {
    this.values = values;
  }
}

export function p<T>(it: T, es: T): Pair<T> {
  return new Pair<T>({ it, es });
}

/**
 * Quello che resta di un dizionario una volta scelta la lingua: ogni
 * `p(...)` diventa il suo valore, tutto il resto (immagini, link,
 * numeri) passa com'è. Il dizionario può mischiare testi e dati.
 */
export type Resolved<D> =
  D extends Pair<infer T>
    ? T
    : D extends (...args: never[]) => unknown
      ? D
      : D extends readonly unknown[]
        ? { [K in keyof D]: Resolved<D[K]> }
        : D extends object
          ? { [K in keyof D]: Resolved<D[K]> }
          : D;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

export function resolve<D>(dict: D, locale: Locale): Resolved<D> {
  if (dict instanceof Pair) {
    return dict.values[locale] as Resolved<D>;
  }

  if (Array.isArray(dict)) {
    return dict.map((item) => resolve(item, locale)) as Resolved<D>;
  }

  if (isPlainObject(dict)) {
    const out: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(dict)) {
      out[key] = resolve(value, locale);
    }

    return out as Resolved<D>;
  }

  return dict as Resolved<D>;
}

const cache = new WeakMap<object, Partial<Record<Locale, unknown>>>();

/**
 * Come `resolve`, ma ricorda il risultato: lo stesso dizionario nella
 * stessa lingua viene risolto una volta sola, non a ogni render.
 */
export function resolveCached<D extends object>(
  dict: D,
  locale: Locale,
): Resolved<D> {
  let perLocale = cache.get(dict);

  if (!perLocale) {
    perLocale = {};
    cache.set(dict, perLocale);
  }

  if (!(locale in perLocale)) {
    perLocale[locale] = resolve(dict, locale);
  }

  return perLocale[locale] as Resolved<D>;
}

/**
 * Riempie i segnaposto di un testo: `fill("Ciao {name}", { name: "Ana" })`.
 * Un segnaposto senza valore resta com'è, così l'errore si nota.
 */
export function fill(
  text: string,
  values: Record<string, string | number>,
): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Per il codice che sceglie il testo a runtime (condizioni, fasi):
 * `tr(locale, "Ciao", "Hola")`. Come `p`, vuole sempre entrambe le
 * versioni.
 */
export function tr<T>(locale: Locale, it: T, es: T): T {
  return locale === "es" ? es : it;
}

/** Tutte le lingue, per i controlli che le attraversano. */
export { locales };
