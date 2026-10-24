import { p } from "@/i18n/pair";

/**
 * Avventure della pagina Sardegna.
 *
 * Le informazioni pratiche (durate, periodi, accessi) sono quelle
 * riportate dagli operatori e dagli enti locali; possono cambiare da
 * una stagione all'altra, quindi vanno verificate sul sito indicato
 * prima di prenotare.
 *
 * I testi sono nelle due lingue (`p(italiano, spagnolo)`): `Adventures`
 * li risolve con `useM(adventures)`.
 */

const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const fact = (
  label: [string, string],
  value: [string, string],
) => ({ label: p(...label), value: p(...value) });

export const adventures = [
  {
    number: "01",
    title: p("Roccia dell'Orso", "Roca del Oso"),
    image: "/sardegna/avventure/roccia-orso.jpg",
    imagePosition: "object-[center_35%]",
    tagline: p(
      "Una passeggiata breve, una vista che vale la giornata",
      "Un paseo corto, una vista que vale el día",
    ),
    paragraphs: [
      p(
        "Una delle viste più iconiche della costa gallurese: a Capo d'Orso, vicino a Palau, il vento ha scolpito nel granito una roccia che ricorda un orso seduto, con l'arcipelago della Maddalena e la Corsica sullo sfondo.",
        "Una de las vistas más emblemáticas de la costa de la Gallura: en Capo d'Orso, cerca de Palau, el viento esculpió en el granito una roca que recuerda a un oso sentado, con el archipiélago de La Maddalena y Córcega al fondo.",
      ),
      p(
        "Dal parcheggio si sale a piedi lungo un sentiero segnalato di circa 500 metri, in lieve pendenza. È un'uscita semplice, adatta a tutti, e è anche un ottimo punto per vedere il tramonto.",
        "Desde el estacionamiento se sube a pie por un sendero señalizado de unos 500 metros, con una pendiente suave. Es una salida sencilla, apta para todos, y además un excelente punto para ver el atardecer.",
      ),
    ],
    facts: [
      fact(["A piedi", "A pie"], ["Circa 10 minuti dal parcheggio", "Unos 10 minutos desde el estacionamiento"]),
      fact(["Difficoltà", "Dificultad"], ["Facile", "Fácil"]),
      fact(["Quando", "Cuándo"], ["Da primavera ad autunno", "De primavera a otoño"]),
      fact(["Ingresso", "Entrada"], ["A pagamento, con orari stagionali", "De pago, con horarios según la temporada"]),
    ],
    tips: [
      p(
        "Portate una giacca leggera: sopra la roccia il vento è quasi sempre presente.",
        "Lleven una chaqueta ligera: sobre la roca casi siempre hay viento.",
      ),
      p(
        "Scarpe chiuse o comode: il sentiero è di roccia e terra.",
        "Calzado cerrado o cómodo: el sendero es de roca y tierra.",
      ),
    ],
    link: {
      href: "https://www.museipalau.com/roccia-dell-orso.html",
      label: p("Orari e biglietti (Musei di Palau)", "Horarios y entradas (Museos de Palau)"),
    },
  },
  {
    number: "02",
    title: p("Tour della Maddalena", "Tour de La Maddalena"),
    image: "/sardegna/avventure/arcipelago-maddalena.jpg",
    imagePosition: "object-[center_30%]",
    tagline: p(
      "Una giornata in barca tra calette e isole",
      "Un día en barco entre calas e islas",
    ),
    paragraphs: [
      p(
        "L'arcipelago della Maddalena è un parco nazionale: isole di granito rosa, calette dall'acqua trasparente e fondali che cambiano colore a ogni curva. Il modo migliore per vederlo è una giornata in barca, con soste per il bagno.",
        "El archipiélago de La Maddalena es un parque nacional: islas de granito rosado, calas de agua transparente y fondos que cambian de color a cada curva. La mejor manera de verlo es un día en barco, con paradas para bañarse.",
      ),
      p(
        "Le escursioni partono in genere dai porti di Palau e dai porti della zona; i giri più completi durano l'intera giornata e includono pranzo a bordo o su una spiaggia. Nel parco l'accesso ad alcune spiagge è regolamentato per proteggere l'ambiente.",
        "Las excursiones suelen salir de los puertos de Palau y de la zona; los recorridos más completos duran todo el día e incluyen almuerzo a bordo o en una playa. En el parque el acceso a algunas playas está regulado para proteger el ambiente.",
      ),
    ],
    facts: [
      fact(["Durata", "Duración"], ["Mezza giornata o giornata intera", "Medio día o día completo"]),
      fact(["Difficoltà", "Dificultad"], ["Facile, adatta a tutti", "Fácil, apta para todos"]),
      fact(["Quando", "Cuándo"], ["Stagione estiva", "Temporada de verano"]),
      fact(["Prenotazione", "Reserva"], ["Consigliata, soprattutto in alta stagione", "Recomendada, sobre todo en temporada alta"]),
    ],
    tips: [
      p(
        "Crema solare, cappello e costume di ricambio: si sta ore al sole.",
        "Protector solar, sombrero y un traje de baño de repuesto: se pasan horas al sol.",
      ),
      p(
        "Con il mare mosso le uscite possono cambiare percorso o saltare: chiedete all'operatore.",
        "Con el mar agitado las salidas pueden cambiar de ruta o cancelarse: pregunten al operador.",
      ),
    ],
    link: {
      href: maps("escursioni in barca arcipelago della Maddalena Palau"),
      label: p("Trova un'escursione su Google Maps", "Encuentra una excursión en Google Maps"),
    },
  },
  {
    number: "03",
    title: p("Golfo di Orosei", "Golfo de Orosei"),
    image: "/sardegna/avventure/orosei.jpg",
    tagline: p(
      "Cale selvagge e pareti di roccia sul mare",
      "Calas salvajes y paredes de roca sobre el mar",
    ),
    paragraphs: [
      p(
        "Sulla costa orientale, tra Cala Gonone e Baunei, le montagne cadono a picco sul mare e si aprono in cale famose, raggiungibili soprattutto in barca o a piedi. È una Sardegna diversa da quella della Costa Smeralda: più selvaggia e più verticale.",
        "En la costa oriental, entre Cala Gonone y Baunei, las montañas caen a pico sobre el mar y se abren en calas famosas, a las que se llega sobre todo en barco o a pie. Es una Cerdeña distinta a la de la Costa Esmeralda: más salvaje y más vertical.",
      ),
      p(
        "È lontana dalla Gallura, quindi conviene farla se vi fermate qualche giorno in più e magari dormite in zona. Alcune cale, come Cala Goloritzé, hanno l'accesso contingentato e vanno prenotate in anticipo.",
        "Queda lejos de la Gallura, así que conviene hacerla si se quedan unos días más y, quizás, duermen en la zona. Algunas calas, como Cala Goloritzé, tienen el acceso limitado y hay que reservar con anticipación.",
      ),
    ],
    facts: [
      fact(["Distanza", "Distancia"], ["Circa tre ore di auto dalla zona di Cannigione", "Unas tres horas en auto desde la zona de Cannigione"]),
      fact(["Durata", "Duración"], ["Una giornata, meglio se con una notte in zona", "Un día, mejor si incluye una noche en la zona"]),
      fact(["Quando", "Cuándo"], ["Stagione estiva", "Temporada de verano"]),
      fact(["Accesso", "Acceso"], ["In barca da Cala Gonone o a piedi; alcune cale contingentate", "En barco desde Cala Gonone o a pie; algunas calas con acceso limitado"]),
    ],
    tips: [
      p(
        "Partite presto: le cale più belle si riempiono in fretta.",
        "Salgan temprano: las calas más lindas se llenan rápido.",
      ),
      p(
        "Per i sentieri servono scarpe da trekking e acqua in abbondanza.",
        "Para los senderos hacen falta zapatos de trekking y agua en abundancia.",
      ),
    ],
    link: {
      href: maps("Cala Gonone escursioni in barca Golfo di Orosei"),
      label: p("Escursioni da Cala Gonone (Google Maps)", "Excursiones desde Cala Gonone (Google Maps)"),
    },
  },
  {
    number: "04",
    title: p("Delfini in canoa", "Delfines en kayak"),
    image: "/sardegna/avventure/delfini-golfo-aranci.jpg",
    imagePosition: "object-[center_15%]",
    tagline: p(
      "Il mare di Golfo Aranci visto dall'acqua",
      "El mar de Golfo Aranci visto desde el agua",
    ),
    paragraphs: [
      p(
        "Nella riserva marina di Capo Figari, a Golfo Aranci, vive da anni un gruppo di delfini. Con un'escursione in kayak, guidata, si pagaia lungo la costa fino a Cala Moresca, con soste per fare snorkeling e per un aperitivo in spiaggia.",
        "En la reserva marina de Capo Figari, en Golfo Aranci, vive desde hace años un grupo de delfines. En una excursión guiada en kayak se rema a lo largo de la costa hasta Cala Moresca, con paradas para hacer snorkel y para un aperitivo en la playa.",
      ),
      p(
        "I delfini sono animali selvatici: l'avvistamento non è garantito, ma le guide conoscono le abitudini del gruppo e sanno come avvicinarsi senza disturbarli. Non serve saper nuotare né avere esperienza di kayak.",
        "Los delfines son animales salvajes: el avistamiento no está garantizado, pero los guías conocen los hábitos del grupo y saben cómo acercarse sin molestarlos. No hace falta saber nadar ni tener experiencia en kayak.",
      ),
    ],
    facts: [
      fact(["Durata", "Duración"], ["Circa due ore e mezza", "Unas dos horas y media"]),
      fact(["Difficoltà", "Dificultad"], ["Facile, in kayak doppio", "Fácil, en kayak doble"]),
      fact(["Quando", "Cuándo"], ["Da maggio a settembre; alba, mattina o tramonto", "De mayo a septiembre; al amanecer, por la mañana o al atardecer"]),
      fact(["Partenza", "Salida"], ["Spiaggia dei Baracconi, Golfo Aranci", "Playa dei Baracconi, Golfo Aranci"]),
    ],
    tips: [
      p(
        "L'alba è il momento in cui è più facile avvistare i delfini.",
        "El amanecer es el momento en que es más fácil avistar a los delfines.",
      ),
      p(
        "Portate un costume e una maglia asciutta di ricambio.",
        "Lleven un traje de baño y una camiseta seca de repuesto.",
      ),
    ],
    link: {
      href: "https://www.kayakingmoresca.it/en/",
      label: p("Kayaking Moresca (Golfo Aranci)", "Kayaking Moresca (Golfo Aranci)"),
    },
  },
  {
    number: "05",
    title: p("Ferrata a Tavolara", "Vía ferrata en Tavolara"),
    image: "/sardegna/avventure/ferrata-tavolara.jpg",
    tagline: p(
      "Per chi cerca qualcosa di più avventuroso",
      "Para quienes buscan algo más aventurero",
    ),
    paragraphs: [
      p(
        "L'isola di Tavolara è una montagna di roccia che esce dal mare, alta 565 metri. Sull'isola ci sono vie ferrate con vista sul mare: la Ferrata Classica, meno tecnica e adatta anche a chi non ha esperienza, e la Ferrata degli Angeli, più impegnativa.",
        "La isla de Tavolara es una montaña de roca que sale del mar, de 565 metros de altura. En la isla hay vías ferratas con vista al mar: la Ferrata Clásica, menos técnica y apta también para quienes no tienen experiencia, y la Ferrata degli Angeli, más exigente.",
      ),
      p(
        "Si va sempre con una guida: si parte da Cala Finanza con un breve trasferimento in gommone, poi un sentiero porta al pratone in circa due ore e da lì inizia la ferrata. Attrezzatura tecnica e trasferimento in barca sono in genere inclusi.",
        "Siempre se va con un guía: se sale de Cala Finanza con un breve traslado en lancha, luego un sendero lleva al prado en unas dos horas y desde allí empieza la ferrata. El equipo técnico y el traslado en barco suelen estar incluidos.",
      ),
    ],
    facts: [
      fact(["Durata", "Duración"], ["Da 4 a 6 ore, in genere dalle 8 alle 18", "De 4 a 6 horas, por lo general de 8 a 18"]),
      fact(["Difficoltà", "Dificultad"], ["Media (la Classica); la Ferrata degli Angeli è difficile", "Media (la Clásica); la Ferrata degli Angeli es difícil"]),
      fact(["Quando", "Cuándo"], ["Fa sempre caldo: meglio le ore e le stagioni più fresche", "Siempre hace calor: mejor en las horas y estaciones más frescas"]),
      fact(["Partenza", "Salida"], ["Cala Finanza, con gommone per l'isola", "Cala Finanza, con lancha hacia la isla"]),
    ],
    tips: [
      p(
        "Due litri d'acqua a testa e scarpe da trekking chiuse.",
        "Dos litros de agua por persona y zapatos de trekking cerrados.",
      ),
      p(
        "Scegliete l'itinerario in base all'esperienza: chiedete alla guida quale è adatto a voi.",
        "Elijan el itinerario según su experiencia: pregunten al guía cuál es el adecuado para ustedes.",
      ),
    ],
    link: {
      href: "https://www.trekkingtavolara.com/escursioni-tavolara/ferrata-tavolara.html",
      label: p("Escursioni Trekking Tavolara", "Excursiones Trekking Tavolara"),
    },
  },
];
