import { p } from "../pair.ts";

/**
 * Testi della pagina Hotel. Gli hotel (nomi, descrizioni, prezzi) sono
 * in `data/hotels.ts`; qui c'è tutto il resto.
 */
export const hotelMessages = {
  metadata: {
    title: p("Viaggio & Hotel", "Viaje & Hotel"),
    description: p(
      "Come arrivare in Sardegna (nave o aereo), perché serve l'auto, gli alberghi consigliati a Cannigione e i prezzi indicativi per il 12 giugno 2027.",
      "Cómo llegar a Cerdeña (barco o avión), por qué se necesita auto, los hoteles recomendados en Cannigione y los precios orientativos para el 12 de junio de 2027.",
    ),
  },

  hero: {
    eyebrow: p("COME ARRIVARE E DOVE DORMIRE", "CÓMO LLEGAR Y DÓNDE ALOJARSE"),
    title: p("Viaggio & Hotel", "Viaje & Hotel"),
    alt: p("Hotel in Sardegna", "Hotel en Cerdeña"),
    text: p(
      "Come arrivare in Sardegna, come muoversi una volta qui e dove dormire vicino alla location: tutto quello che serve per organizzare il viaggio.",
      "Cómo llegar a Cerdeña, cómo moverse una vez aquí y dónde alojarse cerca del lugar: todo lo que necesitan para organizar el viaje.",
    ),
  },

  intro: {
    title: p("Per un soggiorno\nindimenticabile", "Para una estadía\ninolvidable"),
    /** Testo dell'agenzia (Bespoke Team), nella lingua del sito. */
    planner: p(
      "Per rendere ancora più piacevole il vostro soggiorno in Sardegna, abbiamo selezionato alcuni hotel a Cannigione e nei suoi splendidi dintorni. Vi suggeriamo di prenotare con anticipo, poiché giugno è uno dei periodi più richiesti per visitare l'isola. Che desideriate concedervi il comfort di un resort, l'atmosfera intima di un boutique hotel o la comodità di un residence, ci auguriamo che queste proposte possano aiutarvi a scegliere il luogo ideale in cui soggiornare e godervi questi giorni speciali insieme a noi.",
      "Para que su estadía en Cerdeña sea aún más agradable, hemos seleccionado algunos hoteles en Cannigione y sus hermosos alrededores. Les sugerimos reservar con anticipación, ya que junio es una de las épocas más solicitadas para visitar la isla. Ya sea que prefieran la comodidad de un resort, el ambiente íntimo de un hotel boutique o la practicidad de un residence, esperamos que estas propuestas les ayuden a elegir el lugar ideal para alojarse y disfrutar estos días especiales junto a nosotros.",
    ),
    group: p(
      "Gli hotel non ci hanno dato una convenzione, ma applicano una tariffa dedicata ai gruppi: per questo vi chiediamo di indicare la vostra preferenza già nella conferma di presenza. Per chi alloggia in questi hotel è prevista una navetta da e per la location.",
      "Los hoteles no nos han dado un convenio, pero aplican una tarifa especial para grupos: por eso les pedimos que indiquen su preferencia ya al confirmar su asistencia. Para quienes se alojen en estos hoteles habrá un servicio de transporte de ida y vuelta al lugar.",
    ),
  },

  groups: {
    five: p("Hotel 5 stelle", "Hoteles de 5 estrellas"),
    four: p("Hotel 4 stelle", "Hoteles de 4 estrellas"),
    three: p("Hotel 3 stelle", "Hoteles de 3 estrellas"),
    residence: p("Residence", "Residence"),
  },

  card: {
    shuttle: p("Navetta inclusa", "Transporte incluido"),
    stars: p("{n} stelle", "{n} estrellas"),
    superior: p("3 stelle superior", "3 estrellas superior"),
    residence: p("Residence · suite e appartamenti", "Residence · suites y apartamentos"),
    discover: p("Scopri l'hotel", "Conoce el hotel"),
    maps: p("Google Maps", "Google Maps"),
    priceLabel: p("Prezzo indicativo", "Precio orientativo"),
    price: p("da circa {price} € a notte", "desde unos {price} € por noche"),
    priceNone: p(
      "Tariffe 2027 non ancora disponibili: controlla sul sito dell'hotel",
      "Tarifas 2027 aún no disponibles: consulta el sitio del hotel",
    ),
    photoAlt: p("{name}, Cannigione", "{name}, Cannigione"),
  },

  priceNote: {
    text: p(
      "Prezzi indicativi per 2 persone e 2 notti (11–13 giugno 2027), nella camera doppia più economica trovata su Booking.com ed Expedia il 1° novembre 2026, tasse incluse. Sono stime: le tariffe cambiano con la disponibilità e il prezzo definitivo dipende dalla tariffa per il gruppo.",
      "Precios orientativos para 2 personas y 2 noches (11–13 de junio de 2027), en la habitación doble más económica encontrada en Booking.com y Expedia el 1 de noviembre de 2026, impuestos incluidos. Son estimaciones: las tarifas cambian según la disponibilidad y el precio definitivo depende de la tarifa para el grupo.",
    ),
    photos: p(
      "Fotografie dai siti ufficiali degli hotel.",
      "Fotografías de los sitios oficiales de los hoteles.",
    ),
  },

  navetta: {
    title: p("Servizio navetta", "Servicio de transporte"),
    text: p(
      "Per gli ospiti che soggiorneranno negli hotel che vi consigliamo,\nsarà disponibile una navetta dedicata da e per la location del matrimonio.",
      "Para los invitados que se alojen en los hoteles que les recomendamos,\nhabrá un servicio de transporte exclusivo de ida y vuelta al lugar de la boda.",
    ),
    note: p(
      "Gli orari saranno comunicati nei giorni precedenti all'evento.",
      "Los horarios se comunicarán en los días previos al evento.",
    ),
  },

  how: {
    eyebrow: p("Come funziona", "Cómo funciona"),
    title: p("Dormire a Cannigione, in tre passi", "Alojarse en Cannigione, en tres pasos"),
    steps: [
      {
        title: p("Confermi la presenza", "Confirmas tu asistencia"),
        text: p(
          "Nel modulo RSVP indichi l'hotel che preferisci, oppure che ti organizzi da solo. Serve solo a farci un'idea: non è ancora una prenotazione.",
          "En el formulario RSVP indicas el hotel que prefieres, o que te organizas por tu cuenta. Solo nos sirve para tener una idea: todavía no es una reserva.",
        ),
      },
      {
        title: p("Il {date} contattiamo gli hotel", "El {date} contactamos a los hoteles"),
        text: p(
          "Comunichiamo a ogni struttura il numero certo di persone, così possono riservare le camere e proporci la tariffa per il gruppo.",
          "Le comunicamos a cada alojamiento el número exacto de personas, para que puedan reservar las habitaciones y proponernos la tarifa para el grupo.",
        ),
      },
      {
        title: p("Ricevi le indicazioni per prenotare", "Recibes las indicaciones para reservar"),
        text: p(
          "Gli hotel ci diranno come procedere (per esempio un link personale per prenotare e pagare). Te lo giriamo non appena disponibile.",
          "Los hoteles nos dirán cómo proceder (por ejemplo, un enlace personal para reservar y pagar). Te lo enviamos apenas esté disponible.",
        ),
      },
    ],
    lateTitle: p("Confermi dopo il {date}?", "¿Confirmas después del {date}?"),
    lateText: p(
      "Puoi farlo comunque, ma gli hotel saranno già stati contattati:",
      "Puedes hacerlo igualmente, pero los hoteles ya habrán sido contactados:",
    ),
    lateLink: p("scrivici", "escríbenos"),
    lateEnd: p(
      "e cerchiamo insieme una soluzione, compatibilmente con le disponibilità.",
      "y buscamos juntos una solución, según la disponibilidad.",
    ),
  },

  faq: {
    title: p("Domande frequenti", "Preguntas frecuentes"),
    items: [
      {
        question: p("C'è una convenzione con gli hotel?", "¿Hay un convenio con los hoteles?"),
        answer: p(
          "No. Gli hotel non ci hanno dato una convenzione: hanno una tariffa dedicata solo per i gruppi. Per questo raccogliamo le preferenze con la conferma di presenza e il {date} comunichiamo loro il numero certo di persone.",
          "No. Los hoteles no nos han dado un convenio: tienen una tarifa especial solo para grupos. Por eso recopilamos las preferencias con la confirmación de asistencia y el {date} les comunicamos el número exacto de personas.",
        ),
      },
      {
        question: p("Posso prenotare per conto mio?", "¿Puedo reservar por mi cuenta?"),
        answer: p(
          "Certo. Nel modulo RSVP puoi scegliere \"Mi organizzo autonomamente\" e prenotare dove preferisci, anche direttamente sul sito dell'hotel.",
          "Por supuesto. En el formulario RSVP puedes elegir \"Me organizo por mi cuenta\" y reservar donde prefieras, incluso directamente en el sitio del hotel.",
        ),
      },
      {
        question: p("Quanto costano gli hotel?", "¿Cuánto cuestan los hoteles?"),
        answer: p(
          "Sotto ogni struttura trovi un prezzo indicativo a notte, ricavato dalle tariffe pubbliche per il 12 giugno 2027. Dove non c'è ancora, le tariffe 2027 non sono state pubblicate. Il prezzo definitivo dipende dalla tariffa che ci verrà proposta per il gruppo.",
          "Debajo de cada alojamiento encuentras un precio orientativo por noche, obtenido de las tarifas públicas para el 12 de junio de 2027. Donde no aparece, las tarifas 2027 aún no se han publicado. El precio definitivo depende de la tarifa que nos propongan para el grupo.",
        ),
      },
      {
        question: p("C'è la navetta?", "¿Hay transporte?"),
        answer: p(
          "Sì: per chi alloggia negli hotel che vi consigliamo è prevista una navetta dedicata da e per la location. Gli orari saranno comunicati nei giorni precedenti al matrimonio.",
          "Sí: para quienes se alojen en los hoteles que les recomendamos habrá un transporte exclusivo de ida y vuelta al lugar. Los horarios se comunicarán en los días previos a la boda.",
        ),
      },
      {
        question: p("Dove sono rispetto alla location?", "¿Dónde están respecto al lugar?"),
        answer: p(
          "Tutte le strutture sono a Cannigione, la stessa località di Li Capanni. Nella mappa qui accanto vedi la zona.",
          "Todos los alojamientos están en Cannigione, la misma localidad que Li Capanni. En el mapa de al lado ves la zona.",
        ),
      },
      {
        question: p(
          "Posso cancellare o modificare la prenotazione?",
          "¿Puedo cancelar o modificar la reserva?",
        ),
        answer: p(
          "Le condizioni di modifica e cancellazione dipendono dalla struttura scelta. Vi consigliamo di verificarle al momento della prenotazione.",
          "Las condiciones de modificación y cancelación dependen del alojamiento elegido. Les recomendamos verificarlas al momento de reservar.",
        ),
      },
    ],
  },

  map: {
    title: p("Dove siamo", "Dónde estamos"),
    mapTitle: p("Mappa di Cannigione", "Mapa de Cannigione"),
    open: p("Apri Cannigione su Google Maps →", "Abre Cannigione en Google Maps →"),
  },

  contact: {
    eyebrow: p("Hai bisogno di aiuto?", "¿Necesitas ayuda?"),
    title: p("Siamo felici di aiutarti.", "Con gusto te ayudamos."),
    text: p(
      "Se avete dubbi riguardo agli hotel o al vostro soggiorno, non esitate a contattarci. Saremo felici di darvi tutte le informazioni necessarie.",
      "Si tienen dudas sobre los hoteles o su estadía, no duden en contactarnos. Con gusto les daremos toda la información necesaria.",
    ),
  },

  nextStep: {
    title: p("Se vi fermate qualche giorno in più", "Si se quedan unos días más"),
    description: p(
      "I posti del cuore di Silvia e Manuel in Gallura: dove mangiare, spiagge e paesini.",
      "Los lugares favoritos de Silvia y Manuel en la Gallura: dónde comer, playas y pueblitos.",
    ),
    cta: p("La nostra Sardegna", "Nuestra Cerdeña"),
  },
};
