import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

/**
 * I testi non passano da next-intl: stanno in `./messages` come
 * oggetti tipizzati con italiano e spagnolo affiancati (vedi
 * `./pair.ts`). Da next-intl servono solo lingua e instradamento, per
 * questo `messages` resta vuoto e non viaggia nulla verso il browser.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {},
    timeZone: "Europe/Rome",
  };
});
