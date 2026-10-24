import { wedding } from "../config/wedding.ts";
import type { WeddingPhase } from "./temporal.ts";
import { resolve } from "../i18n/pair.ts";
import type { Locale } from "../i18n/locales.ts";
import { uiMessages } from "../i18n/messages/ui.ts";

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
export function primaryAction(phase: WeddingPhase, locale: Locale): PhaseAction {
  const label = resolve(uiMessages.phaseAction, locale);

  switch (phase) {
    case "rsvp":
      return { href: "/rsvp", label: label.rsvp };
    case "waiting":
      return { href: "/matrimonio", label: label.waiting };
    case "final-weeks":
      return { href: "/matrimonio#faq", label: label.finalWeeks };
    case "wedding":
      return {
        href: wedding.location.maps,
        label: label.wedding,
        external: true,
      };
    case "after":
      return { href: "/matrimonio#foto", label: label.after };
  }
}
