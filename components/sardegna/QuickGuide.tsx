import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/ui/Reveal";

/**
 * Itinerari indicativi, composti solo con luoghi già presenti in
 * questa pagina. Ogni luogo rimanda alla sezione che lo descrive.
 */
type Stop = { name: string; href?: string };

const itineraries: {
  days: string;
  unit: string;
  lead: string;
  stops: Stop[];
}[] = [
  {
    days: "1",
    unit: "giorno",
    lead: "Il minimo indispensabile",
    stops: [
      { name: "Spiaggia del Principe", href: "#spiagge" },
      { name: "San Pantaleo", href: "#paesini" },
      { name: "Aperitivo" },
      { name: "Cena" },
    ],
  },
  {
    days: "3",
    unit: "giorni",
    lead: "Il tempo di respirare",
    stops: [
      { name: "Tour della Maddalena", href: "#avventure" },
      { name: "Cala Moresca", href: "#spiagge" },
      { name: "San Pantaleo", href: "#paesini" },
      { name: "Porto Cervo", href: "#paesini" },
    ],
  },
  {
    days: "5+",
    unit: "giorni",
    lead: "Fino in fondo",
    stops: [
      { name: "Golfo di Orosei", href: "#avventure" },
      { name: "Cala Moresca", href: "#spiagge" },
      { name: "Stintino", href: "#spiagge" },
      { name: "Alghero", href: "#paesini" },
    ],
  },
];

export default function QuickGuide() {
  return (
    <section className="relative overflow-hidden bg-panel px-6 py-24 md:py-32">
      {/* Ramo botanico dietro il titolo, come nelle altre pagine. */}
      <Image
        src="/decorations/branch.webp"
        alt=""
        aria-hidden="true"
        width={420}
        height={525}
        className="pointer-events-none absolute -right-16 -top-10 hidden object-contain opacity-15 lg:block"
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl md:mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-secondary">
            Piccoli itinerari
          </p>

          <h2 className="mt-4 font-heading text-4xl font-light leading-tight text-primary md:text-6xl">
            Se avete <em className="font-light italic">qualche giorno</em> in più
          </h2>

          <p className="mt-6 text-[17px] leading-8 text-secondary">
            Qualche idea per organizzare il vostro tempo in Sardegna
            senza dover pensare troppo. Toccate un luogo per vedere di
            cosa si tratta.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {itineraries.map((itinerary, index) => (
            <Reveal key={itinerary.days} delay={index * 100} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-photo border border-border/70 bg-white/70 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_24px_70px_rgba(0,0,0,0.06)] motion-reduce:transition-none md:p-9">
                <div className="flex items-end gap-3">
                  <span className="font-heading text-[88px] font-light leading-[0.8] text-accent transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none">
                    {itinerary.days}
                  </span>

                  <span className="pb-1 font-heading text-2xl font-light italic text-primary">
                    {itinerary.unit}
                  </span>
                </div>

                <p className="mt-6 text-xs uppercase tracking-[0.28em] text-secondary">
                  {itinerary.lead}
                </p>

                {/* Percorso: pallini uniti da un filo, come le tappe di una mappa. */}
                <ol className="relative mt-8 space-y-5 border-l border-border pl-7">
                  {itinerary.stops.map((stop) => (
                    <li key={stop.name} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[34px] top-2.5 h-2 w-2 rounded-full bg-accent"
                      />

                      {stop.href ? (
                        <Link
                          href={stop.href}
                          className="inline-flex items-center gap-2 font-heading text-2xl font-light text-primary transition-colors hover:text-accent"
                        >
                          {stop.name}
                          <ArrowRight
                            size={15}
                            aria-hidden="true"
                            className="opacity-0 transition-all duration-300 group-hover:opacity-60"
                          />
                        </Link>
                      ) : (
                        <span className="font-heading text-2xl font-light text-primary">
                          {stop.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
