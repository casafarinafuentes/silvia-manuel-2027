import { MessageCircle } from "lucide-react";

import { wedding } from "@/config/wedding";
import { useM } from "@/i18n/use-messages";
import { travelMessages } from "@/i18n/messages/travel";

/**
 * Invito a entrare nel gruppo aggiornamenti su WhatsApp (ci scrivono
 * solo gli sposi). Non compare finché in config non c'è il link.
 *
 * `compact`: versione piccola per il grazie dopo l'RSVP e per l'invito.
 */
export default function CommunityJoin({ compact = false }: { compact?: boolean }) {
  const { community } = useM(travelMessages);
  const url = wedding.community.whatsappUrl;

  if (!url) return null;

  const button = (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-3 bg-[#3F5643] px-7 py-3.5 text-xs uppercase tracking-[0.24em] text-white transition hover:bg-[#334637]"
    >
      <MessageCircle size={16} aria-hidden="true" />
      {community.cta}
    </a>
  );

  if (compact) {
    return (
      <div className="mx-auto mt-10 max-w-md border-t border-border pt-8 text-center">
        <p className="text-sm leading-7 text-secondary">{community.text}</p>

        <div className="mt-6">{button}</div>
      </div>
    );
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-panel border border-border bg-white px-8 py-12 text-center md:px-14">
        <p className="text-xs uppercase tracking-[0.35em] text-secondary">
          {community.eyebrow}
        </p>

        <h2 className="mt-4 font-heading text-4xl font-light text-primary">
          {community.title}
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-8 text-secondary">
          {community.text}
        </p>

        <div className="mt-8">{button}</div>
      </div>
    </section>
  );
}
