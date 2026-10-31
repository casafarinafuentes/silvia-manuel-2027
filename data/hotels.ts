import { p, type Pair } from "../i18n/pair.ts";

/**
 * Alberghi consigliati a Cannigione.
 *
 * Selezione dell'agenzia (Bespoke Team, novembre 2026). Nessuna
 * convenzione: gli hotel applicano una tariffa dedicata solo ai gruppi,
 * quindi il 12 marzo comunichiamo loro il numero certo di persone
 * (raccolto con l'RSVP) e poi girerete la prenotazione agli ospiti.
 *
 * `price`: stima per camera doppia a notte, ricavata dalle tariffe
 * pubbliche di Booking.com ed Expedia per 2 adulti, 2 notti
 * (11-13 giugno 2027), rilevate il 1° novembre 2026, tasse incluse. Si
 * arrotonda per difetto alla decina. `null` dove le tariffe 2027 non
 * erano ancora pubblicate: meglio nessun numero che uno inventato.
 * DA RIVEDERE quando gli hotel mandano i prezzi del gruppo.
 *
 * `id` è salvato nel database con la conferma: non cambiarlo dopo che
 * sono arrivate le prime risposte.
 */

/**
 * Interruttore della sezione hotel: pagina /hotel e domanda "Dove
 * dormirai?" nel modulo RSVP. Per spegnerla basta rimetterla a `false`
 * (e togliere le voci da data/navigation.ts, data/homeCards.ts e
 * app/sitemap.ts).
 */
export const HOTEL_SECTION_ENABLED = true;

export type HotelFeature =
  | "sea"
  | "pool"
  | "beach"
  | "breakfast"
  | "rooms"
  | "garden"
  | "restaurant"
  | "spa"
  | "kitchen";

export type HotelCategory = "hotel" | "residence";

export type Hotel = {
  id: string;
  name: string;
  category: HotelCategory;
  /** Stelle (1–5), come dichiarate dall'hotel o dall'agenzia; 0 per il residence. */
  stars: number;
  /** "3 stelle superior": la categoria è la stessa, con qualcosa in più. */
  superior?: boolean;
  /** Zona, come la indica l'agenzia (nome proprio, uguale nelle due lingue). */
  area: string;
  image: string;
  description: Pair<string>;
  /** Massimo tre punti di forza, solo dati trovati sul sito dell'hotel. */
  features: { icon: HotelFeature; label: Pair<string> }[];
  /** Stima a notte per la camera doppia più economica (vedi sopra). */
  price: {
    perNight: number;
    /** Cosa comprende la cifra, es. "camera doppia, colazione inclusa". */
    unit: Pair<string>;
  } | null;
  /** Sito ufficiale dell'hotel. */
  website: string;
  /** Ricerca su Google Maps: sempre valida, non richiede un link verificato. */
  mapsQuery: string;
};

/** Nell'ordine dell'elenco dell'agenzia: dalle cinque stelle al residence. */
export const hotels: Hotel[] = [
  {
    id: "grand-hotel-cannigione",
    name: "Grand Hotel Cannigione",
    category: "hotel",
    stars: 5,
    area: "Cannigione",
    image: "/hotel/grand-hotel-cannigione.jpg",
    description: p(
      "Cinque stelle vicino al centro di Cannigione e a circa 300 metri dalla spiaggia, con piscina, spa e due ristoranti. La struttura più raffinata tra quelle che vi consigliamo.",
      "Cinco estrellas cerca del centro de Cannigione y a unos 300 metros de la playa, con piscina, spa y dos restaurantes. El alojamiento más refinado de los que les recomendamos.",
    ),
    features: [
      { icon: "pool", label: p("Piscina", "Piscina") },
      { icon: "spa", label: p("Spa & Wellness", "Spa & Wellness") },
      { icon: "restaurant", label: p("Due ristoranti", "Dos restaurantes") },
    ],
    price: {
      perNight: 450,
      unit: p("camera doppia, colazione inclusa", "habitación doble, desayuno incluido"),
    },
    website: "https://grandhotelcannigione.it/",
    mapsQuery: "Grand Hotel Cannigione",
  },
  {
    id: "blu-hotel-morisco",
    name: "Blu Hotel Morisco",
    category: "hotel",
    stars: 4,
    area: "Cannigione",
    image: "/hotel/blu-hotel-morisco.jpg",
    description: p(
      "Hotel in stile moresco a pochi passi dal mare e dal porto turistico di Cannigione, con ampia piscina e ristorante. Una buona base per le spiagge della Gallura e per le escursioni alla Maddalena.",
      "Hotel de estilo morisco a pocos pasos del mar y del puerto deportivo de Cannigione, con amplia piscina y restaurante. Una buena base para las playas de la Gallura y las excursiones a La Maddalena.",
    ),
    features: [
      { icon: "sea", label: p("A pochi passi dal mare", "A pocos pasos del mar") },
      { icon: "pool", label: p("Ampia piscina", "Amplia piscina") },
      { icon: "restaurant", label: p("Ristorante", "Restaurante") },
    ],
    price: null,
    website: "https://bluhotelmorisco.it/",
    mapsQuery: "Blu Hotel Morisco Cannigione",
  },
  {
    id: "blu-hotel-laconia",
    name: "Blu Hotel Laconia Village",
    category: "hotel",
    stars: 4,
    area: "La Conia · Cannigione",
    image: "/hotel/blu-hotel-laconia.jpg",
    description: p(
      "Villaggio dall'aspetto tipicamente sardo, in una baia vicino alla Costa Smeralda, a pochi passi dalle spiagge. Pensato per le famiglie, con 160 camere (alcune con vista mare), piscina e ristorante.",
      "Pueblo de aspecto típicamente sardo, en una bahía cerca de la Costa Esmeralda, a pocos pasos de las playas. Pensado para familias, con 160 habitaciones (algunas con vista al mar), piscina y restaurante.",
    ),
    features: [
      { icon: "sea", label: p("A pochi passi dal mare", "A pocos pasos del mar") },
      { icon: "pool", label: p("Piscina", "Piscina") },
      { icon: "rooms", label: p("160 camere", "160 habitaciones") },
    ],
    price: null,
    website: "https://bluhotels.it/en/hotels-and-resorts",
    mapsQuery: "Blu Hotel Laconia Village Cannigione",
  },
  {
    id: "stelle-marine",
    name: "MYO Hotel Stelle Marine",
    category: "hotel",
    stars: 4,
    area: "Mannena · Cannigione",
    image: "/hotel/stelle-marine.jpg",
    description: p(
      "Già Stelle Marine Hotel & Resort: camere con terrazza o patio immerse in un giardino mediterraneo, spiaggia privata attrezzata e vista sul golfo di Arzachena e sull'arcipelago della Maddalena.",
      "Antes Stelle Marine Hotel & Resort: habitaciones con terraza o patio en un jardín mediterráneo, playa privada equipada y vista al golfo de Arzachena y al archipiélago de La Maddalena.",
    ),
    features: [
      { icon: "beach", label: p("Spiaggia privata", "Playa privada") },
      { icon: "pool", label: p("Due piscine", "Dos piscinas") },
      { icon: "garden", label: p("Giardino mediterraneo", "Jardín mediterráneo") },
    ],
    price: {
      perNight: 300,
      unit: p("camera doppia, colazione inclusa", "habitación doble, desayuno incluido"),
    },
    website: "https://www.myohotelstellemarine.com/",
    mapsQuery: "Stelle Marine Hotel Cannigione",
  },
  {
    id: "hotel-del-porto",
    name: "Hotel del Porto",
    category: "hotel",
    stars: 3,
    superior: true,
    area: "Cannigione",
    image: "/hotel/hotel-del-porto.jpg",
    description: p(
      "Tre stelle superior inaugurato nel 2004, affacciato sui pontili del porto turistico di Cannigione: le spiagge si raggiungono a piedi o in auto e l'aeroporto è a circa mezz'ora.",
      "Tres estrellas superior inaugurado en 2004, frente a los muelles del puerto deportivo de Cannigione: a las playas se llega a pie o en auto y el aeropuerto está a unos treinta minutos.",
    ),
    features: [
      { icon: "sea", label: p("Sul porto turistico", "Frente al puerto deportivo") },
      { icon: "restaurant", label: p("Ristorante", "Restaurante") },
      { icon: "beach", label: p("Spiagge vicine", "Playas cercanas") },
    ],
    price: null,
    website: "https://hoteldelporto.com/",
    mapsQuery: "Hotel del Porto Cannigione",
  },
  {
    id: "micalosu",
    name: "Hotel Micalosu",
    category: "hotel",
    stars: 3,
    area: "Cannigione",
    image: "/hotel/micalosu.jpg",
    description: p(
      "Albergo a conduzione familiare in posizione panoramica sul golfo di Arzachena, con vista sull'arcipelago della Maddalena, piscina, giardino e ristorante.",
      "Hotel de gestión familiar en posición panorámica sobre el golfo de Arzachena, con vista al archipiélago de La Maddalena, piscina, jardín y restaurante.",
    ),
    features: [
      { icon: "sea", label: p("Vista mare", "Vista al mar") },
      { icon: "pool", label: p("Piscina panoramica", "Piscina panorámica") },
      { icon: "breakfast", label: p("Colazione", "Desayuno") },
    ],
    price: {
      perNight: 220,
      unit: p("camera doppia", "habitación doble"),
    },
    website: "https://www.hotelmicalosu.it/",
    mapsQuery: "Hotel Micalosu Cannigione",
  },
  {
    id: "tanca-manna",
    name: "Sporting Hotel Tanca Manna",
    category: "residence",
    stars: 0,
    area: "Tanca Manna · Cannigione",
    image: "/hotel/tanca-manna.jpg",
    description: p(
      "Residence con 93 suite-appartamento, quasi tutte con angolo cottura, a circa 300 metri dalla spiaggia. Due piscine all'aperto e una coperta riscaldata: comodo per chi viaggia in gruppo o si ferma più giorni.",
      "Residence con 93 suites-apartamento, casi todas con kitchenette, a unos 300 metros de la playa. Dos piscinas al aire libre y una cubierta climatizada: cómodo para quienes viajan en grupo o se quedan varios días.",
    ),
    features: [
      { icon: "kitchen", label: p("Angolo cottura", "Kitchenette") },
      { icon: "pool", label: p("Tre piscine", "Tres piscinas") },
      { icon: "beach", label: p("A 300 m dalla spiaggia", "A 300 m de la playa") },
    ],
    price: {
      perNight: 100,
      unit: p("monolocale per 2 persone, senza colazione", "monoambiente para 2 personas, sin desayuno"),
    },
    website: "https://www.sportinghoteltancamannamp.it/",
    mapsQuery: "Sporting Hotel Tanca Manna Cannigione",
  },
];

/** Valore salvato per chi non prenota tramite noi. */
export const HOTEL_SELF_ARRANGED = "self";

export const HOTEL_SELF_ARRANGED_LABEL = "Mi organizzo autonomamente";

/**
 * Hotel dell'elenco precedente: usciti dalla selezione dell'agenzia ma
 * ancora leggibili in admin se qualcuno li aveva già scelti.
 */
const LEGACY_NAMES: Record<string, string> = {
  "cala-di-falco": "Resort Cala di Falco",
  moma: "Moma Hotel",
};

const VALID_IDS = new Set([HOTEL_SELF_ARRANGED, ...hotels.map((h) => h.id)]);

export function isValidHotelChoice(value: string): boolean {
  return VALID_IDS.has(value);
}

/** Testo leggibile per admin ed export; l'id sconosciuto resta com'è. */
export function hotelLabel(id: string | null): string {
  if (!id) return "—";
  if (id === HOTEL_SELF_ARRANGED) return HOTEL_SELF_ARRANGED_LABEL;

  return hotels.find((h) => h.id === id)?.name ?? LEGACY_NAMES[id] ?? id;
}

export function hotelMapsUrl(hotel: Hotel): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.mapsQuery)}`;
}
