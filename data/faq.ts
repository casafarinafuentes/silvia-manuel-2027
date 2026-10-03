import { wedding } from "@/config/wedding";
import { isRsvpClosed, type WeddingPhase } from "@/lib/temporal";

export type FaqItem = {
  title: string;
  content: string;
  /** Pulsante facoltativo sotto la risposta. */
  action?: { label: string; href: string };
};

/**
 * Le FAQ della pagina Matrimonio, in due colonne. Alcune risposte
 * dipendono dalla fase: a conferme chiuse non si può più rimandare
 * all'RSVP.
 */
export function getPracticalInfo(phase: WeddingPhase): {
  left: FaqItem[];
  right: FaqItem[];
} {
  const { sharedAlbumUrl } = wedding.photos;

  return {
    left: [
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
        content: isRsvpClosed(phase)
          ? "Le abbiamo raccolte con le conferme. Se c'è qualcosa da aggiungere, ditecelo."
          : "Segnalatele durante la conferma RSVP.",
      },
    ],

    right: [
      {
        title: "Animali",
        content:
          "Purtroppo non sono ammessi animali.",
      },
      {
        title: "Fotografie",
        content: sharedAlbumUrl
          ? "Scattate pure tutte le foto e i video che volete. Ci farebbe piacere vederli: potete caricarli nel nostro album condiviso su Drive."
          : "Scattate pure tutte le foto e i video che volete. Ci farebbe piacere vederli: in questa pagina troverete il link a un album condiviso su Drive dove caricarli.",
        action: sharedAlbumUrl
          ? { label: "Carica le tue foto", href: sharedAlbumUrl }
          : undefined,
      },
    ],
  };
}
