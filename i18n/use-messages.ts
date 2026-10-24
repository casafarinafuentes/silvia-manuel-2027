import { useLocale } from "next-intl";

import type { Locale } from "./locales";
import { resolveCached, type Resolved } from "./pair";

/**
 * I testi di un dizionario nella lingua della pagina.
 *
 *   const m = useM(rsvpMessages);
 *   <h1>{m.hero.title}</h1>
 *
 * Funziona nei componenti client e in quelli server non async. Nei
 * componenti server `async` si usa `getM` (`./get-messages.ts`).
 */
export function useM<D extends object>(dict: D): Resolved<D> {
  return resolveCached(dict, useLocale() as Locale);
}
