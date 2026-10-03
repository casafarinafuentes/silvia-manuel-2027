import { wedding } from "../config/wedding.ts";
import type { WeddingPhase } from "./temporal.ts";

export type PhaseAction = {
  href: string;
  label: string;
  /** Link fuori dal sito (si apre in una nuova scheda). */
  external?: boolean;
};

/**
 * L'invito principale di ogni fase: è il pulsante che compare nella
 * hero della home e nelle chiusure delle pagine. Cambiarlo qui lo
 * cambia ovunque.
 */
export function primaryAction(phase: WeddingPhase): PhaseAction {
  switch (phase) {
    case "rsvp":
      return { href: "/rsvp", label: "Conferma la tua presenza" };
    case "waiting":
      return { href: "/matrimonio", label: "Scopri la giornata" };
    case "final-weeks":
      return { href: "/matrimonio#faq", label: "Informazioni pratiche" };
    case "wedding":
      return {
        href: wedding.location.maps,
        label: "Come arrivare",
        external: true,
      };
    case "after":
      return { href: "/matrimonio#foto", label: "Le vostre foto" };
  }
}
