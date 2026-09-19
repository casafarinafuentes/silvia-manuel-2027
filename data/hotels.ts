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

export type HotelFeature = "sea" | "pool" | "beach" | "breakfast" | "rooms" | "garden" | "restaurant";

export type Hotel = {
  id: string;
  name: string;
  /** Stelle (1–5), come dichiarate da Tripadvisor o dal sito dell'hotel. */
  stars: number;
  image: string;
  description: string;
  /** Massimo tre punti di forza, solo dati trovati su fonti pubbliche. */
  features: { icon: HotelFeature; label: string }[];
  priceRange: string | null;
  /** Sito ufficiale dell'hotel. */
  website: string;
  /** Ricerca su Google Maps: sempre valida, non richiede un link verificato. */
  mapsQuery: string;
};

export const hotels: Hotel[] = [
  {
    id: "cala-di-falco",
    name: "Resort Cala di Falco",
    stars: 4,
    image: "/hotel/cala-di-falco.jpg",
    description:
      "Resort affacciato sull'arcipelago della Maddalena, con spiaggia, due piscine e due ristoranti: pensato anche per chi viaggia con la famiglia.",
    features: [
      { icon: "sea", label: "Fronte mare" },
      { icon: "pool", label: "Due piscine" },
      { icon: "restaurant", label: "Due ristoranti" },
    ],
    priceRange: null,
    website: "https://www.hotelcaladifalco.com/",
    mapsQuery: "Resort Cala di Falco Cannigione",
  },
  {
    id: "stelle-marine",
    name: "MYO Hotel Stelle Marine",
    stars: 4,
    image: "/hotel/stelle-marine.jpg",
    description:
      "Già Stelle Marine Hotel & Resort: camere immerse in un giardino di cinque ettari, spiaggia privata e vista sull'arcipelago della Maddalena.",
    features: [
      { icon: "beach", label: "Spiaggia privata" },
      { icon: "pool", label: "Piscina" },
      { icon: "garden", label: "Giardino di 5 ettari" },
    ],
    priceRange: null,
    website: "https://www.myohotelstellemarine.com/",
    mapsQuery: "Stelle Marine Hotel Cannigione",
  },
  {
    id: "grand-hotel-cannigione",
    name: "Grand Hotel Cannigione",
    stars: 5,
    image: "/hotel/grand-hotel-cannigione.jpg",
    description:
      "Recentemente rinnovato, con architettura bianca a corte, piscina e arredi ispirati alla tradizione sarda. La struttura più raffinata tra quelle che vi consigliamo.",
    features: [
      { icon: "breakfast", label: "Colazione inclusa" },
      { icon: "pool", label: "Piscina" },
      { icon: "rooms", label: "Appena rinnovato" },
    ],
    priceRange: null,
    website: "https://grandhotelcannigione.it/",
    mapsQuery: "Grand Hotel Cannigione",
  },
  {
    id: "moma",
    name: "Moma Hotel",
    stars: 3,
    image: "/hotel/moma.jpg",
    description:
      "Hotel di charme in collina sopra il golfo, con terrazza panoramica, giardino e solo dieci camere: un'atmosfera intima, ma con pochi posti.",
    features: [
      { icon: "rooms", label: "Solo 10 camere" },
      { icon: "garden", label: "Terrazza e giardino" },
      { icon: "breakfast", label: "Colazione a buffet" },
    ],
    priceRange: null,
    website: "https://momahotel.it/",
    mapsQuery: "Moma Hotel Cannigione",
  },
  {
    id: "micalosu",
    name: "Hotel Micalosu",
    stars: 3,
    image: "/hotel/micalosu.jpg",
    description:
      "In posizione elevata sul mare, con camere semplici e curate: la soluzione più economica tra quelle che vi consigliamo.",
    features: [
      { icon: "sea", label: "Vista mare" },
      { icon: "pool", label: "Piscina" },
      { icon: "rooms", label: "52 camere" },
    ],
    priceRange: null,
    website: "https://www.hotelmicalosu.it/",
    mapsQuery: "Hotel Micalosu Cannigione",
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
