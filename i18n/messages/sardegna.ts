import { p } from "../pair.ts";

export const sardegnaMessages = {
  metadata: {
    title: p("La Sardegna che amiamo", "La Cerdeña que amamos"),
    description: p(
      "I posti che Silvia e Manuel consigliano in Gallura e dintorni: dove mangiare, spiagge, paesini e qualche avventura.",
      "Los lugares que Silvia y Manuel recomiendan en la Gallura y alrededores: dónde comer, playas, pueblitos y alguna aventura.",
    ),
  },

  hero: {
    title: p("La Sardegna che amiamo", "La Cerdeña que amamos"),
    subtitle: p("I posti che vi consigliamo", "Los lugares que les recomendamos"),
    alt: p(
      "Scogliera di granito sul mare, in Sardegna",
      "Acantilado de granito sobre el mar, en Cerdeña",
    ),
  },

  intro: {
    titleBefore: p(
      "La Sardegna è molto più\ndel posto in cui ci sposiamo.",
      "Cerdeña es mucho más\nque el lugar donde nos casamos.",
    ),
    titleAfter: p(
      "La Sardegna è molto più\ndel posto in cui ci siamo sposati.",
      "Cerdeña es mucho más\nque el lugar donde nos casamos.",
    ),
    textBefore: p(
      "Se avete voglia di fermarvi qualche giorno in più, abbiamo raccolto per voi alcuni dei nostri posti del cuore.",
      "Si tienen ganas de quedarse unos días más, hemos reunido para ustedes algunos de nuestros lugares favoritos.",
    ),
    textAfter: p(
      "Se avete voglia di tornarci, abbiamo raccolto per voi alcuni dei nostri posti del cuore.",
      "Si tienen ganas de volver, hemos reunido para ustedes algunos de nuestros lugares favoritos.",
    ),
  },

  nav: {
    label: p("Esplora la Sardegna", "Explora Cerdeña"),
    food: p("Food", "Comida"),
    adventures: p("Avventure", "Aventuras"),
    beaches: p("Spiagge", "Playas"),
    villages: p("Paesini", "Pueblitos"),
  },

  food: {
    title: p("Food", "Comida"),
    text: p(
      "Qualche indirizzo che ci piace particolarmente, tra sapori locali, colazioni, vino e posti dove fermarsi per qualcosa di buono.",
      "Algunas direcciones que nos gustan especialmente, entre sabores locales, desayunos, vino y lugares donde parar a comer algo rico.",
    ),
    cantina: p("Agriturismo / Cantina", "Agroturismo / Bodega"),
    restaurant: p("Ristorante", "Restaurante"),
    breakfast: p("Colazioni", "Desayunos"),
    aperitifs: p("Aperitivi", "Aperitivos"),
    comingSoon: p(
      "Stiamo ancora scegliendo qualche posto\nda consigliarvi...",
      "Todavía estamos eligiendo algunos lugares\npara recomendarles...",
    ),
    discover: p("Scopri →", "Descubre →"),
    places: {
      saCrescia: p("Sapori della tradizione gallurese", "Sabores de la tradición gallurese"),
      paltusa: p("Vini, vigneti e degustazioni", "Vinos, viñedos y degustaciones"),
      guardia: p("Vini e sapori della Sardegna", "Vinos y sabores de Cerdeña"),
      sushi: p("Sushi à la carte", "Sushi a la carta"),
      pace: p("Colazioni e dolci", "Desayunos y dulces"),
      pistacchio: p("Caffetteria e pasticceria", "Cafetería y pastelería"),
      locationGallura: p("Gallura", "Gallura"),
    },
  },

  adventures: {
    eyebrow: p("Da vivere", "Para vivir"),
    title: p("Avventure", "Aventuras"),
  },

  beaches: {
    eyebrow: p("Acqua cristallina", "Agua cristalina"),
    title: p("Spiagge", "Playas"),
    text: p(
      "Premete un nome, o un punto sulla mappa, per vedere la spiaggia.",
      "Toquen un nombre, o un punto en el mapa, para ver la playa.",
    ),
    mapLabel: p(
      "Mappa della costa nord-est della Sardegna con le spiagge consigliate",
      "Mapa de la costa noreste de Cerdeña con las playas recomendadas",
    ),
    showPhoto: p("{name}: mostra la foto", "{name}: mostrar la foto"),
    near: p("Vicino alla location", "Cerca del lugar"),
    far: p("Un po' più lontano", "Un poco más lejos"),
    venueAfter: p("Ci siamo sposati qui", "Nos casamos aquí"),
    venueDay: p("Noi siamo qui", "Estamos aquí"),
    venueBefore: p("Noi saremo qui", "Estaremos aquí"),
    photoSoon: p("Foto in arrivo", "Foto próximamente"),
  },

  villages: {
    eyebrow: p("Da scoprire", "Para descubrir"),
    title: p("Paesini", "Pueblitos"),
    nearby: p("In zona", "En la zona"),
    further: p("Se avete più tempo", "Si tienen más tiempo"),
    mapOf: p("Mappa di {name}", "Mapa de {name}"),
    mapGallura: p("Mappa della Gallura", "Mapa de la Gallura"),
    onMap: p("Sulla mappa", "En el mapa"),
    hint: p(
      "Passate il mouse sui nomi (o toccateli) per vederli",
      "Pasen el mouse sobre los nombres (o tóquenlos) para verlos",
    ),
    country: p("Sardegna, Italia", "Cerdeña, Italia"),
  },

  favorite: {
    eyebrow: p("Il nostro posto del cuore", "Nuestro lugar favorito"),
    quote: p(
      "“Se dovessimo sceglierne una sola,\nprobabilmente sarebbe questa.”",
      "“Si tuviéramos que elegir una sola,\nprobablemente sería esta.”",
    ),
  },

  quickGuide: {
    eyebrow: p("Piccoli itinerari", "Pequeños itinerarios"),
    titleAfterStart: p("Per quando", "Para cuando"),
    titleAfterEm: p("tornerete", "vuelvan"),
    titleBeforeStart: p("Se avete", "Si tienen"),
    titleBeforeEm: p("qualche giorno", "unos días"),
    titleBeforeEnd: p("in più", "más"),
    text: p(
      "Qualche idea per organizzare il vostro tempo in Sardegna senza dover pensare troppo. Toccate un luogo per vedere di cosa si tratta.",
      "Algunas ideas para organizar su tiempo en Cerdeña sin pensar demasiado. Toquen un lugar para ver de qué se trata.",
    ),
    itineraries: [
      {
        days: "1",
        unit: p("giorno", "día"),
        lead: p("Il minimo indispensabile", "Lo mínimo indispensable"),
        stops: [
          { name: p("Spiaggia del Principe", "Spiaggia del Principe"), href: "#spiagge" },
          { name: p("San Pantaleo", "San Pantaleo"), href: "#paesini" },
          { name: p("Aperitivo", "Aperitivo") },
          { name: p("Cena", "Cena") },
        ],
      },
      {
        days: "3",
        unit: p("giorni", "días"),
        lead: p("Il tempo di respirare", "El tiempo de respirar"),
        stops: [
          { name: p("Tour della Maddalena", "Tour de La Maddalena"), href: "#avventure" },
          { name: p("Cala Moresca", "Cala Moresca"), href: "#spiagge" },
          { name: p("San Pantaleo", "San Pantaleo"), href: "#paesini" },
          { name: p("Porto Cervo", "Porto Cervo"), href: "#paesini" },
        ],
      },
      {
        days: "5+",
        unit: p("giorni", "días"),
        lead: p("Fino in fondo", "Hasta el final"),
        stops: [
          { name: p("Golfo di Orosei", "Golfo de Orosei"), href: "#avventure" },
          { name: p("Cala Moresca", "Cala Moresca"), href: "#spiagge" },
          { name: p("Castelsardo", "Castelsardo"), href: "#paesini" },
          { name: p("Alghero", "Alghero"), href: "#paesini" },
        ],
      },
    ],
  },

  credits: p("Crediti fotografici", "Créditos fotográficos"),

  nextStep: {
    rsvpEyebrow: p("Ci vediamo presto", "Nos vemos pronto"),
    rsvpTitle: p("Manca solo la tua conferma", "Solo falta tu confirmación"),
    rsvpText: p(
      "Fateci sapere se ci sarete: bastano un minuto e qualche informazione.",
      "Avísennos si estarán: bastan un minuto y algunos datos.",
    ),
    rsvpCta: p("Conferma la tua presenza", "Confirma tu asistencia"),
    dayEyebrow: p("È il giorno", "Es el día"),
    soonEyebrow: p("Ci vediamo presto", "Nos vemos pronto"),
    title: p("Tutti i dettagli della giornata", "Todos los detalles del día"),
    textDay: p(
      "Programma, location e informazioni pratiche.",
      "Programa, lugar e información práctica.",
    ),
    textSoon: p(
      "Programma, location e informazioni pratiche per il 12 giugno.",
      "Programa, lugar e información práctica para el 12 de junio.",
    ),
    cta: p("Il matrimonio", "La boda"),
  },
};
