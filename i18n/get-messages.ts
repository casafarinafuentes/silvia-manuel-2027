import { getLocale } from "next-intl/server";

import type { Locale } from "./locales";
import { resolveCached, type Resolved } from "./pair";

/** Come `useM`, per i componenti server `async` e le route. */
export async function getM<D extends object>(dict: D): Promise<Resolved<D>> {
  return resolveCached(dict, (await getLocale()) as Locale);
}
