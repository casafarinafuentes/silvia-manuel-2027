import { wedding } from "@/config/wedding";
import { matrimonioMessages } from "@/i18n/messages/matrimonio";
import { resolve } from "@/i18n/pair";
import type { Locale } from "@/i18n/locales";
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
export function getPracticalInfo(
  phase: WeddingPhase,
  locale: Locale,
): {
  left: FaqItem[];
  right: FaqItem[];
} {
  const { uploadUrl } = wedding.photos;
  const { faq } = resolve(matrimonioMessages, locale);

  return {
    left: [
      { title: faq.parking.title, content: faq.parking.content },
      { title: faq.kids.title, content: faq.kids.content },
      {
        title: faq.allergies.title,
        content: isRsvpClosed(phase)
          ? faq.allergies.closed
          : faq.allergies.open,
      },
    ],

    right: [
      { title: faq.animals.title, content: faq.animals.content },
      {
        title: faq.photos.title,
        content: uploadUrl ? faq.photos.withLink : faq.photos.withoutLink,
        action: uploadUrl
          ? { label: faq.photos.action, href: uploadUrl }
          : undefined,
      },
    ],
  };
}
