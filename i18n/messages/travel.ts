import { p } from "../pair.ts";

/**
 * Testi della parte "come arrivare" della pagina Viaggio & Hotel.
 *
 * Tempi e distanze sono indicativi: rotte e durate dagli aggregatori di
 * traghetti (Ferryhopper, Traghettilines), distanze in auto calcolate
 * verso Li Capanni e confrontate con i servizi transfer. Le compagnie
 * cambiano orari ogni stagione: nei testi rimandiamo sempre a
 * verificare le date.
 */
export const travelMessages = {
  nav: {
    label: p("In questa pagina", "En esta página"),
    arrive: p("Come arrivare", "Cómo llegar"),
    car: p("L'auto", "El auto"),
    hotels: p("Hotel", "Hoteles"),
  },

  arrive: {
    eyebrow: p("Come arrivare", "Cómo llegar"),
    title: p("Due strade per la Sardegna", "Dos caminos a Cerdeña"),
    text: p(
      "In nave con la vostra auto oppure in aereo, con un'auto a noleggio all'arrivo. Vi consigliamo la nave: in Sardegna l'auto serve comunque.",
      "En barco con su propio auto o en avión, con un auto de alquiler al llegar. Les recomendamos el barco: en Cerdeña el auto se necesita de todas formas.",
    ),
  },

  ship: {
    title: p("In nave", "En barco"),
    badge: p("Consigliata", "Recomendado"),
    lead: p(
      "Imbarcate l'auto e in Sardegna siete subito autonomi. Ci sono traversate ogni giorno, sia di notte sia di giorno.",
      "Embarcan el auto y en Cerdeña son autónomos desde el primer momento. Hay travesías todos los días, tanto de noche como de día.",
    ),
    routes: [
      {
        from: "Livorno",
        to: "Olbia",
        when: p("tutti i giorni, di notte e di giorno", "todos los días, de noche y de día"),
        duration: p("circa 7–9 ore", "unas 7–9 horas"),
      },
      {
        from: "Livorno",
        to: "Golfo Aranci",
        when: p("alcuni giorni a settimana", "algunos días a la semana"),
        duration: p("circa 7–10 ore", "unas 7–10 horas"),
      },
      {
        from: "Piombino",
        to: "Olbia / Golfo Aranci",
        when: p("solo in alcuni periodi dell'estate: verificate le date", "solo en algunos períodos del verano: verifiquen las fechas"),
        duration: p("circa 6–7 ore", "unas 6–7 horas"),
      },
    ],
    tips: [
      p(
        "Con la notturna dormite in cabina e arrivate la mattina, riposati.",
        "Con el nocturno duermen en camarote y llegan por la mañana, descansados.",
      ),
      p(
        "Prenotate presto: a giugno i posti per le auto finiscono in fretta.",
        "Reserven con anticipación: en junio los lugares para autos se agotan rápido.",
      ),
    ],
    companies: p(
      "Compagnie: Moby, Grimaldi Lines, Corsica Sardinia Ferries.",
      "Compañías: Moby, Grimaldi Lines, Corsica Sardinia Ferries.",
    ),
    cta: p("Confronta orari e prezzi", "Compara horarios y precios"),
    ctaUrl: p("https://www.ferryhopper.com/it/", "https://www.ferryhopper.com/es/"),
  },

  plane: {
    title: p("In aereo", "En avión"),
    lead: p(
      "Il più veloce, ma all'arrivo serve un'auto a noleggio: prenotatela insieme al volo.",
      "Es lo más rápido, pero al llegar se necesita un auto de alquiler: resérvenlo junto con el vuelo.",
    ),
    airports: [
      {
        name: p("Olbia Costa Smeralda", "Olbia Costa Smeralda"),
        code: "OLB",
        note: p(
          "L'aeroporto più vicino, a circa 45 minuti dalla location.",
          "El aeropuerto más cercano, a unos 45 minutos del lugar.",
        ),
      },
      {
        name: p("Alghero", "Alghero"),
        code: "AHO",
        note: p(
          "Un'alternativa se trovate voli migliori, ma è a 2 ore–2 ore e mezza di auto.",
          "Una alternativa si encuentran mejores vuelos, pero está a 2 horas–2 horas y media en auto.",
        ),
      },
    ],
    abroad: p(
      "Dall'estero: volo per Roma o Milano e da lì un volo diretto per Olbia.",
      "Desde el extranjero (Chile, Australia…): vuelo a Roma o Milán y desde ahí un vuelo directo a Olbia.",
    ),
    cta: p("Cerca voli per Olbia", "Busca vuelos a Olbia"),
    ctaUrl: p(
      "https://www.google.com/travel/flights?q=voli%20per%20Olbia&hl=it",
      "https://www.google.com/travel/flights?q=vuelos%20a%20Olbia&hl=es",
    ),
  },

  car: {
    eyebrow: p("Da sapere", "Para saber"),
    title: p("In Sardegna serve l'auto", "En Cerdeña se necesita auto"),
    text: p(
      "Li Capanni e gli hotel che vi consigliamo sono lontani da porti e aeroporti, e a giugno in Costa Smeralda i taxi sono pochi e costosi. Che arriviate in nave con la vostra auto o in aereo con un'auto a noleggio, avere un mezzo vi lascia liberi di muovervi.",
      "Li Capanni y los hoteles que les recomendamos están lejos de puertos y aeropuertos, y en junio en la Costa Esmeralda los taxis son pocos y caros. Ya sea que lleguen en barco con su auto o en avión con un auto de alquiler, tener un vehículo les da libertad para moverse.",
    ),
    tableTitle: p("Distanze da Li Capanni", "Distancias a Li Capanni"),
    rows: [
      { place: p("Porto di Olbia", "Puerto de Olbia"), distance: "35 km", time: p("45 min", "45 min") },
      { place: p("Porto di Golfo Aranci", "Puerto de Golfo Aranci"), distance: "40 km", time: p("50 min", "50 min") },
      { place: p("Aeroporto di Olbia", "Aeropuerto de Olbia"), distance: "35–40 km", time: p("45 min", "45 min") },
      { place: p("Aeroporto di Alghero", "Aeropuerto de Alghero"), distance: "150 km", time: p("2 h–2 h 30", "2 h–2 h 30") },
    ],
    note: p(
      "Tempi indicativi in auto, senza traffico.",
      "Tiempos orientativos en auto, sin tráfico.",
    ),
    wedding: p(
      "Il giorno del matrimonio stiamo predisponendo un parcheggio con navetta fino alla location.",
      "El día de la boda estamos preparando un estacionamiento con transporte hasta el lugar.",
    ),
  },

  community: {
    eyebrow: p("Aggiornamenti", "Novedades"),
    title: p("Restiamo in contatto", "Sigamos en contacto"),
    text: p(
      "Abbiamo creato un gruppo WhatsApp in cui scriviamo solo noi: novità sul sito, offerte degli hotel, promemoria per le scadenze. Niente chiacchiere, solo le cose importanti.",
      "Creamos un grupo de WhatsApp donde solo escribimos nosotros: novedades del sitio, ofertas de hoteles, recordatorios de plazos. Nada de charlas, solo lo importante.",
    ),
    cta: p("Entra nel gruppo WhatsApp", "Únete al grupo de WhatsApp"),
  },
};
