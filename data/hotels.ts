/**
 * Alberghi consigliati a Cannigione.
 *
 * Nessuna convenzione: gli hotel applicano una tariffa dedicata solo ai
 * gruppi, quindi il 31 gennaio comunichiamo loro il numero certo di
 * persone (raccolto con l'RSVP) e poi girerete la prenotazione agli ospiti.
 *
 * `priceRange`: testo libero mostrato agli ospiti, es. "Circa 150–220 € a
 * notte in camera doppia". Finché resta `null` la scheda dice che la
 * fascia di prezzo è in arrivo: meglio nessun numero che uno sbagliato.
 * DA COMPILARE dopo aver sentito gli hotel.
 *
 * `id` è salvato nel database con la conferma: non cambiarlo dopo che
 * sono arrivate le prime risposte.
 */

export type Hotel = {
  id: string;
  name: string;
  category: string;
  description: string;
  priceRange: string | null;
  /** Ricerca su Google Maps: sempre valida, non richiede un link verificato. */
  mapsQuery: string;
};

export const hotels: Hotel[] = [
  {
    id: "micalosu",
    name: "Hotel Micalosu",
    category: "3 stelle",
    description:
      "Camere semplici e curate, la soluzione più economica tra quelle che vi consigliamo.",
    priceRange: null,
    mapsQuery: "Hotel Micalosu Cannigione",
  },
  {
    id: "moma",
    name: "Moma Hotel",
    category: "Boutique hotel",
    description:
      "In collina sopra il golfo di Cannigione, con giardino e vista panoramica sulla baia.",
    priceRange: null,
    mapsQuery: "Moma Hotel Cannigione",
  },
  {
    id: "stelle-marine",
    name: "Stelle Marine Hotel & Resort",
    category: "4 stelle",
    description:
      "Resort di 72 camere in un ampio giardino alberato, alcune con vista sull'isola della Maddalena.",
    priceRange: null,
    mapsQuery: "Stelle Marine Hotel Resort Cannigione",
  },
  {
    id: "cala-di-falco",
    name: "Resort Cala di Falco",
    category: "4 stelle",
    description:
      "Resort con vista mare, adatto anche a chi viaggia con la famiglia.",
    priceRange: null,
    mapsQuery: "Resort Cala di Falco Cannigione",
  },
  {
    id: "grand-hotel-cannigione",
    name: "Grand Hotel Cannigione",
    category: "Hotel di alta categoria",
    description:
      "Recentemente rinnovato, con architettura bianca a corte e arredi ispirati alla tradizione sarda.",
    priceRange: null,
    mapsQuery: "Grand Hotel Cannigione",
  },
];

/** Valore salvato per chi non prenota tramite noi. */
export const HOTEL_SELF_ARRANGED = "self";

export const HOTEL_SELF_ARRANGED_LABEL = "Mi organizzo autonomamente";

const VALID_IDS = new Set([HOTEL_SELF_ARRANGED, ...hotels.map((h) => h.id)]);

export function isValidHotelChoice(value: string): boolean {
  return VALID_IDS.has(value);
}

/** Testo leggibile per admin ed export; l'id sconosciuto resta com'è. */
export function hotelLabel(id: string | null): string {
  if (!id) return "—";
  if (id === HOTEL_SELF_ARRANGED) return HOTEL_SELF_ARRANGED_LABEL;

  return hotels.find((h) => h.id === id)?.name ?? id;
}

export function hotelMapsUrl(hotel: Hotel): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.mapsQuery)}`;
}
