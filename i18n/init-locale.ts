import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { isLocale, type Locale } from "./locales";

/**
 * Da chiamare all'inizio di ogni pagina e layout dentro `[locale]`.
 *
 * Next disegna layout e pagine in parallelo, quindi la lingua scelta nel
 * layout non è garantita quando parte la pagina: ognuno la dichiara da
 * sé. Senza questa riga il sito smetterebbe di essere statico.
 */
export async function initLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  return locale;
}
