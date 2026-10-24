import { p } from "../pair.ts";

export const matrimonioMessages = {
  hero: {
    title: p("Il Matrimonio", "La Boda"),
    subtitleAfter: p("Il nostro giorno", "Nuestro día"),
    subtitleBefore: p("Tutti i dettagli della giornata", "Todos los detalles del día"),
    alt: p("Li Capanni", "Li Capanni"),
  },

  intro: {
    alt: p("Cerimonia", "Ceremonia"),
    eyebrow: p("IL MATRIMONIO", "LA BODA"),
    titleAfter: p("È stato\nbellissimo.", "Fue\nhermoso."),
    titleBefore: p("Finalmente\nci siamo.", "Por fin\nllegó el día."),
    textAfter: p(
      "Il 12 giugno 2027 è stato il giorno che avevamo sognato per tanto tempo. Grazie per averlo festeggiato insieme a noi in uno dei luoghi che più amiamo.",
      "El 12 de junio de 2027 fue el día que soñamos durante mucho tiempo. Gracias por haberlo celebrado con nosotros en uno de los lugares que más amamos.",
    ),
    textBefore: p(
      "Il 12 giugno 2027 sarà il giorno che abbiamo sognato per tanto tempo. Non vediamo l'ora di festeggiare insieme a voi in uno dei luoghi che più amiamo.",
      "El 12 de junio de 2027 será el día que soñamos durante mucho tiempo. Estamos ansiosos por celebrar con ustedes en uno de los lugares que más amamos.",
    ),
  },

  timeline: {
    title: p("La Giornata", "El Día"),
    items: [
      { time: "17:00", title: p("Cerimonia", "Ceremonia"), description: p("", ""), icon: "gem" as const },
      { time: "18:30", title: p("Aperitivo", "Aperitivo"), description: p("", ""), icon: "martini" as const },
      { time: "20:00", title: p("Cena", "Cena"), description: p("", ""), icon: "utensils" as const },
      {
        // Ultima voce, volutamente senza orario di fine: nella timeline
        // la linea prosegue tratteggiata oltre questo punto.
        time: "22:00",
        title: p("Taglio torta & Dance Floor", "Corte del pastel y pista de baile"),
        description: p("", ""),
        icon: "cake" as const,
      },
    ],
  },

  location: {
    eyebrow: p("LA LOCATION", "EL LUGAR"),
    before: p("Affacciata sul mare cristallino della Sardegna,", "Frente al mar cristalino de Cerdeña,"),
    after: p(
      "è il luogo che abbiamo scelto per celebrare il nostro amore, immersi nella natura e circondati dalla bellezza della costa.",
      "es el lugar que elegimos para celebrar nuestro amor, inmersos en la naturaleza y rodeados de la belleza de la costa.",
    ),
    cta: p("Scopri la location →", "Descubre el lugar →"),
  },

  dressCode: {
    title: p("Cosa indossare", "Qué ponerse"),
    items: [
      {
        title: p("Saremo su un prato", "Estaremos sobre el césped"),
        description: p(
          "Cerimonia e ricevimento si svolgono sull'erba: vi consigliamo un tacco grosso o una scarpa stabile. I tacchi a spillo tendono ad affondare.",
          "La ceremonia y la recepción se realizan sobre el césped: les recomendamos un taco ancho o un zapato estable. Los tacones de aguja tienden a hundirse.",
        ),
        icon: "shoes" as const,
      },
      {
        title: p("Una giacca per la sera", "Una chaqueta para la noche"),
        description: p(
          "Quando il sole tramonta, in riva al mare si rinfresca: portate una giacca o uno scialle per la sera.",
          "Cuando se pone el sol, a orillas del mar refresca: traigan una chaqueta o un chal para la noche.",
        ),
        icon: "jacket" as const,
      },
    ],
  },

  photos: {
    eyebrow: p("Le vostre foto", "Sus fotos"),
    title1: p("La giornata", "El día"),
    title2: p("vista da voi", "visto por ustedes"),
    textAfter: p(
      "Avete foto e video della giornata? Inviateceli da qui: li raccogliamo tutti in un posto solo, e arrivano solo a noi.",
      "¿Tienen fotos y videos del día? Envíenoslos desde aquí: los reunimos todos en un solo lugar, y llegan solo a nosotros.",
    ),
    textBefore: p(
      "Scattate pure tutte le foto e i video che volete, poi inviateceli da qui: li raccogliamo tutti in un posto solo, e arrivano solo a noi.",
      "Saquen todas las fotos y videos que quieran, y luego envíenoslos desde aquí: los reunimos todos en un solo lugar, y llegan solo a nosotros.",
    ),
    upload: p("Carica le tue foto →", "Sube tus fotos →"),
    soonStarted: p("Il link arriverà qui a breve", "El enlace llegará aquí muy pronto"),
    soonBefore: p("Il link arriverà qui prima del matrimonio", "El enlace llegará aquí antes de la boda"),
  },

  faq: {
    title: p("FAQ", "Preguntas frecuentes"),
    parking: {
      title: p("Parcheggio e navetta", "Estacionamiento y transporte"),
      content: p(
        "Stiamo predisponendo un'area di parcheggio dedicata con un servizio navetta che vi porterà direttamente alla location.",
        "Estamos preparando un área de estacionamiento exclusiva con un servicio de transporte que los llevará directamente al lugar.",
      ),
    },
    kids: {
      title: p("Bambini", "Niños"),
      content: p(
        "I bambini sono i benvenuti ed è previsto un menù dedicato.",
        "Los niños son bienvenidos y habrá un menú especial para ellos.",
      ),
    },
    allergies: {
      title: p("Allergie", "Alergias"),
      closed: p(
        "Le abbiamo raccolte con le conferme. Se c'è qualcosa da aggiungere, ditecelo.",
        "Las recopilamos con las confirmaciones. Si hay algo que añadir, díganoslo.",
      ),
      open: p(
        "Segnalatele durante la conferma RSVP.",
        "Indíquenlas al confirmar su asistencia.",
      ),
    },
    animals: {
      title: p("Animali", "Mascotas"),
      content: p("Purtroppo non sono ammessi animali.", "Lamentablemente no se admiten mascotas."),
    },
    photos: {
      title: p("Fotografie", "Fotografías"),
      withLink: p(
        "Scattate pure tutte le foto e i video che volete. Ci farebbe piacere vederli: potete inviarceli dal pulsante qui sotto. Arrivano solo a noi.",
        "Saquen todas las fotos y videos que quieran. Nos encantará verlos: pueden enviárnoslos con el botón de abajo. Llegan solo a nosotros.",
      ),
      withoutLink: p(
        "Scattate pure tutte le foto e i video che volete. Ci farebbe piacere vederli: in questa pagina troverete il link per inviarceli.",
        "Saquen todas las fotos y videos que quieran. Nos encantará verlos: en esta página encontrarán el enlace para enviárnoslos.",
      ),
      action: p("Carica le tue foto", "Sube tus fotos"),
    },
  },

  inspirations: {
    eyebrow: p("ISPIRAZIONI", "INSPIRACIÓN"),
    title: p("L'atmosfera che ci aspetta", "El ambiente que nos espera"),
    subtitle: p(
      "Un piccolo assaggio dei colori, dei dettagli e delle emozioni che renderanno speciale questa giornata.",
      "Un pequeño adelanto de los colores, los detalles y las emociones que harán especial este día.",
    ),
    items: [
      {
        image: "/matrimonio/marquee-cover.jpg",
        alt: p("Il marquee di Li Capanni al tramonto", "La carpa de Li Capanni al atardecer"),
      },
      {
        image: "/matrimonio/marquee-day.jpg",
        alt: p("La cerimonia vista dall'alto", "La ceremonia vista desde arriba"),
      },
      {
        image: "/matrimonio/marquee-sunset.jpg",
        alt: p("L'atmosfera della location al calar del sole", "El ambiente del lugar al caer el sol"),
      },
    ],
  },

  cta: {
    sardegna: p("Scopri la Sardegna", "Descubre Cerdeña"),
    alt: p("Panorama della location", "Panorámica del lugar"),
    after: p("Un giorno che\nporteremo sempre con noi.", "Un día que\nllevaremos siempre con nosotros."),
    wedding: p("Ci siamo:\nè ora di festeggiare.", "Llegó el momento:\nes hora de celebrar."),
    before: p("Non vediamo l'ora\ndi festeggiare con voi.", "Estamos ansiosos\npor celebrar con ustedes."),
  },

  metadata: {
    title: p("Il matrimonio", "La boda"),
    after: p(
      "Il 12 giugno 2027 a Li Capanni: il luogo, le foto e i ricordi della giornata.",
      "El 12 de junio de 2027 en Li Capanni: el lugar, las fotos y los recuerdos del día.",
    ),
    before: p(
      "Programma della giornata, location, dress code e informazioni pratiche per il 12 giugno 2027.",
      "Programa del día, lugar, código de vestimenta e información práctica para el 12 de junio de 2027.",
    ),
  },
};
