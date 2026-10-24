import type { Metadata } from "next";

import { defaultLocale, locales, type Locale } from "./locales";

/**
 * Indirizzo di una pagina nella lingua indicata: l'italiano senza
 * prefisso (`/rsvp`), le altre con (`/es/rsvp`).
 */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;

  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

/**
 * Canonical e versioni in altre lingue della stessa pagina: dicono a
 * Google che `/rsvp` e `/es/rsvp` sono la stessa pagina tradotta e non
 * due contenuti doppi.
 */
export function alternatesFor(
  locale: Locale,
  path: string,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};

  for (const l of locales) {
    languages[l] = localizedPath(l, path);
  }

  languages["x-default"] = localizedPath(defaultLocale, path);

  return {
    canonical: localizedPath(locale, path),
    languages,
  };
}
