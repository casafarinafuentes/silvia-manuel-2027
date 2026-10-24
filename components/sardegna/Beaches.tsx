import Reveal from "@/components/ui/Reveal";

import BeachMap from "./BeachMap";
import { useM } from "@/i18n/use-messages";
import { sardegnaMessages } from "@/i18n/messages/sardegna";


export default function Beaches() {
  const { beaches: t } = useM(sardegnaMessages);

  return (
    <section id="spiagge" className="anchor-offset px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            {t.eyebrow}
          </p>

          <h2 className="mt-4 font-heading text-5xl font-light text-primary md:text-6xl">
            {t.title}
          </h2>

          <p className="mt-7 max-w-xl text-[15px] leading-7 text-secondary">
            {t.text}
          </p>
        </Reveal>

        {/* Mappa della costa nord-est con le foto di ogni spiaggia */}

        <Reveal>
          <BeachMap />
        </Reveal>
      </div>
    </section>
  );
}
