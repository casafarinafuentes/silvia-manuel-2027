import type { Locale } from "../i18n/locales.ts";
import { fill, resolve } from "../i18n/pair.ts";
import { hotelMessages } from "../i18n/messages/hotel.ts";
import type { Hotel } from "./hotels.ts";

/** "da circa 300 € a notte", o null dove la tariffa 2027 non c'è ancora. */
export function hotelPriceText(hotel: Hotel, locale: Locale): string | null {
  if (!hotel.price) return null;

  return fill(resolve(hotelMessages.card.price, locale), {
    price: hotel.price.perNight,
  });
}

/** Riga breve sotto il nome: stelle (o "Residence") e prezzo, se c'è. */
export function hotelSummary(hotel: Hotel, locale: Locale): string {
  const kind =
    hotel.category === "residence"
      ? "Residence"
      : `${"★".repeat(hotel.stars)}${hotel.superior ? " superior" : ""}`;

  return [kind, hotelPriceText(hotel, locale)].filter(Boolean).join(" · ");
}
