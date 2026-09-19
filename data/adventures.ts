/**
 * Avventure della pagina Sardegna.
 *
 * Le informazioni pratiche (durate, periodi, accessi) sono quelle
 * riportate dagli operatori e dagli enti locali; possono cambiare da
 * una stagione all'altra, quindi vanno verificate sul sito indicato
 * prima di prenotare.
 */

export type Adventure = {
  number: string;
  title: string;
  image: string;
  /** Riga breve sotto il titolo, visibile anche da chiuso. */
  tagline: string;
  paragraphs: string[];
  facts: { label: string; value: string }[];
  tips: string[];
  link: { href: string; label: string };
};

const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const adventures: Adventure[] = [
  {
    number: "01",
    title: "Roccia dell'Orso",
    image: "/sardegna/avventure/roccia-dellorso.jpg",
    tagline: "Una passeggiata breve, una vista che vale la giornata",
    paragraphs: [
      "Una delle viste più iconiche della costa gallurese: a Capo d'Orso, vicino a Palau, il vento ha scolpito nel granito una roccia che ricorda un orso seduto, con l'arcipelago della Maddalena e la Corsica sullo sfondo.",
      "Dal parcheggio si sale a piedi lungo un sentiero segnalato di circa 500 metri, in lieve pendenza. È un'uscita semplice, adatta a tutti, e è anche un ottimo punto per vedere il tramonto.",
    ],
    facts: [
      { label: "A piedi", value: "Circa 10 minuti dal parcheggio" },
      { label: "Difficoltà", value: "Facile" },
      { label: "Quando", value: "Da primavera ad autunno" },
      { label: "Ingresso", value: "A pagamento, con orari stagionali" },
    ],
    tips: [
      "Portate una giacca leggera: sopra la roccia il vento è quasi sempre presente.",
      "Scarpe chiuse o comode: il sentiero è di roccia e terra.",
    ],
    link: {
      href: "https://www.museipalau.com/roccia-dell-orso.html",
      label: "Orari e biglietti (Musei di Palau)",
    },
  },
  {
    number: "02",
    title: "Tour della Maddalena",
    image: "/sardegna/avventure/maddalena.jpg",
    tagline: "Una giornata in barca tra calette e isole",
    paragraphs: [
      "L'arcipelago della Maddalena è un parco nazionale: isole di granito rosa, calette dall'acqua trasparente e fondali che cambiano colore a ogni curva. Il modo migliore per vederlo è una giornata in barca, con soste per il bagno.",
      "Le escursioni partono in genere dai porti di Palau e dai porti della zona; i giri più completi durano l'intera giornata e includono pranzo a bordo o su una spiaggia. Nel parco l'accesso ad alcune spiagge è regolamentato per proteggere l'ambiente.",
    ],
    facts: [
      { label: "Durata", value: "Mezza giornata o giornata intera" },
      { label: "Difficoltà", value: "Facile, adatta a tutti" },
      { label: "Quando", value: "Stagione estiva" },
      { label: "Prenotazione", value: "Consigliata, soprattutto in alta stagione" },
    ],
    tips: [
      "Crema solare, cappello e costume di ricambio: si sta ore al sole.",
      "Con il mare mosso le uscite possono cambiare percorso o saltare: chiedete all'operatore.",
    ],
    link: {
      href: maps("escursioni in barca arcipelago della Maddalena Palau"),
      label: "Trova un'escursione su Google Maps",
    },
  },
  {
    number: "03",
    title: "Golfo di Orosei",
    image: "/sardegna/avventure/golfo-di-orosei.jpg",
    tagline: "Cale selvagge e pareti di roccia sul mare",
    paragraphs: [
      "Sulla costa orientale, tra Cala Gonone e Baunei, le montagne cadono a picco sul mare e si aprono in cale famose, raggiungibili soprattutto in barca o a piedi. È una Sardegna diversa da quella della Costa Smeralda: più selvaggia e più verticale.",
      "È lontana dalla Gallura, quindi conviene farla se vi fermate qualche giorno in più e magari dormite in zona. Alcune cale, come Cala Goloritzé, hanno l'accesso contingentato e vanno prenotate in anticipo.",
    ],
    facts: [
      { label: "Distanza", value: "Circa tre ore di auto dalla zona di Cannigione" },
      { label: "Durata", value: "Una giornata, meglio se con una notte in zona" },
      { label: "Quando", value: "Stagione estiva" },
      { label: "Accesso", value: "In barca da Cala Gonone o a piedi; alcune cale contingentate" },
    ],
    tips: [
      "Partite presto: le cale più belle si riempiono in fretta.",
      "Per i sentieri servono scarpe da trekking e acqua in abbondanza.",
    ],
    link: {
      href: maps("Cala Gonone escursioni in barca Golfo di Orosei"),
      label: "Escursioni da Cala Gonone (Google Maps)",
    },
  },
  {
    number: "04",
    title: "Delfini in canoa",
    image: "/sardegna/avventure/golfo-aranci.jpg",
    tagline: "Il mare di Golfo Aranci visto dall'acqua",
    paragraphs: [
      "Nella riserva marina di Capo Figari, a Golfo Aranci, vive da anni un gruppo di delfini. Con un'escursione in kayak, guidata, si pagaia lungo la costa fino a Cala Moresca, con soste per fare snorkeling e per un aperitivo in spiaggia.",
      "I delfini sono animali selvatici: l'avvistamento non è garantito, ma le guide conoscono le abitudini del gruppo e sanno come avvicinarsi senza disturbarli. Non serve saper nuotare né avere esperienza di kayak.",
    ],
    facts: [
      { label: "Durata", value: "Circa due ore e mezza" },
      { label: "Difficoltà", value: "Facile, in kayak doppio" },
      { label: "Quando", value: "Da maggio a settembre; alba, mattina o tramonto" },
      { label: "Partenza", value: "Spiaggia dei Baracconi, Golfo Aranci" },
    ],
    tips: [
      "L'alba è il momento in cui è più facile avvistare i delfini.",
      "Portate un costume e una maglia asciutta di ricambio.",
    ],
    link: {
      href: "https://www.kayakingmoresca.it/en/",
      label: "Kayaking Moresca (Golfo Aranci)",
    },
  },
  {
    number: "05",
    title: "Ferrata a Tavolara",
    image: "/sardegna/avventure/tavolara.jpg",
    tagline: "Per chi cerca qualcosa di più avventuroso",
    paragraphs: [
      "L'isola di Tavolara è una montagna di roccia che esce dal mare, alta 565 metri. Sull'isola ci sono vie ferrate con vista sul mare: la Ferrata Classica, meno tecnica e adatta anche a chi non ha esperienza, e la Ferrata degli Angeli, più impegnativa.",
      "Si va sempre con una guida: si parte da Cala Finanza con un breve trasferimento in gommone, poi un sentiero porta al pratone in circa due ore e da lì inizia la ferrata. Attrezzatura tecnica e trasferimento in barca sono in genere inclusi.",
    ],
    facts: [
      { label: "Durata", value: "Da 4 a 6 ore, in genere dalle 8 alle 18" },
      { label: "Difficoltà", value: "Media (la Classica); la Ferrata degli Angeli è difficile" },
      { label: "Quando", value: "Fa sempre caldo: meglio le ore e le stagioni più fresche" },
      { label: "Partenza", value: "Cala Finanza, con gommone per l'isola" },
    ],
    tips: [
      "Due litri d'acqua a testa e scarpe da trekking chiuse.",
      "Scegliete l'itinerario in base all'esperienza: chiedete alla guida quale è adatto a voi.",
    ],
    link: {
      href: "https://www.trekkingtavolara.com/escursioni-tavolara/ferrata-tavolara.html",
      label: "Escursioni Trekking Tavolara",
    },
  },
];
