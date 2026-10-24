import { defineRouting } from "next-intl/routing";

import { defaultLocale, locales } from "./locales";

/**
 * Instradamento per lingua.
 *
 * `as-needed`: la lingua di partenza non porta prefisso, quindi tutti
 * gli indirizzi già in circolazione (`/rsvp`, `/matrimonio`, i link
 * stampati o condivisi) continuano a funzionare identici.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
