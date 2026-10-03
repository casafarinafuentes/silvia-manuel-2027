import Reveal from "@/components/ui/Reveal";

import BeachMap from "./BeachMap";

export default function Beaches() {
  return (
    <section id="spiagge" className="anchor-offset px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            Acqua cristallina
          </p>

          <h2 className="mt-4 font-heading text-5xl font-light text-primary md:text-6xl">
            Spiagge
          </h2>

          <p className="mt-7 max-w-xl text-[15px] leading-7 text-secondary">
            Premete un nome, o un punto sulla mappa, per vedere la spiaggia.
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
