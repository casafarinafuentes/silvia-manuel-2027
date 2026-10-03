import { wedding } from "@/config/wedding";

export type FaqItem = {
  title: string;
  content: string;
  /** Pulsante facoltativo sotto la risposta. */
  action?: { label: string; href: string };
};

const { sharedAlbumUrl } = wedding.photos;

export const practicalInfoLeft: FaqItem[] = [
  {
    title: "Parcheggio e navetta",
    content:
      "Stiamo predisponendo un'area di parcheggio dedicata con un servizio navetta che vi porterà direttamente alla location.",
  },
  {
    title: "Bambini",
    content:
      "I bambini sono i benvenuti ed è previsto un menù dedicato.",
  },
  {
    title: "Allergie",
    content:
      "Segnalatele durante la conferma RSVP.",
  },
];

export const practicalInfoRight: FaqItem[] = [
  {
    title: "Animali",
    content:
      "Purtroppo non sono ammessi animali.",
  },
  {
    title: "Fotografie",
    content: sharedAlbumUrl
      ? "Scattate pure tutte le foto e i video che volete. Ci farebbe piacere vederli: potete caricarli nel nostro album condiviso su Drive."
      : "Scattate pure tutte le foto e i video che volete. Ci farebbe piacere vederli: prima del matrimonio troverete in questa pagina il link a un album condiviso su Drive dove caricarli.",
    action: sharedAlbumUrl
      ? { label: "Carica le tue foto", href: sharedAlbumUrl }
      : undefined,
  },
];
