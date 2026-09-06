"use client";

import { useState } from "react";

const adventures = [
  {
    number: "01",
    title: "Roccia dell'Orso",
    description:
      "Una delle viste più iconiche della costa gallurese. Una passeggiata semplice che porta fino alla grande roccia scolpita dal vento, con una vista spettacolare sul mare.",
  },
  {
    number: "02",
    title: "Tour della Maddalena",
    description:
      "Una giornata in barca tra calette, acqua cristallina e alcune delle isole più belle dell'arcipelago.",
  },
  {
    number: "03",
    title: "Golfo di Orosei",
    description:
      "Cale selvagge, pareti di roccia e mare trasparente. Una delle escursioni da mettere in cima alla lista se avete qualche giorno in più.",
  },
  {
    number: "04",
    title: "Delfini in canoa",
    description:
      "Un'esperienza sul mare di Golfo Aranci per provare ad avvistare i delfini direttamente dall'acqua.",
  },
  {
    number: "05",
    title: "Ferrata a Tavolara",
    description:
      "Per chi cerca qualcosa di più avventuroso: una ferrata spettacolare con il mare della Sardegna come panorama.",
  },
];

export default function Adventures() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="avventure"
      className="anchor-offset bg-panel px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-secondary">
            Da vivere
          </p>

          <h2 className="mt-4 font-heading text-5xl font-light text-primary md:text-6xl">
            Avventure
          </h2>
        </div>

        <div className="border-t border-border">
          {adventures.map((adventure, index) => {
            const isOpen = open === index;

            return (
              <div
                key={adventure.number}
                className="border-b border-border"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`avventura-${adventure.number}`}
                    className="flex w-full items-center gap-6 py-7 text-left"
                  >
                    <span className="w-8 text-[10px] tracking-[0.2em] text-secondary">
                      {adventure.number}
                    </span>

                    <span className="flex-1 font-heading text-2xl font-light text-primary md:text-3xl">
                      {adventure.title}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`text-xl font-light text-secondary transition-transform duration-300 motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={`avventura-${adventure.number}`}
                  role="region"
                  aria-label={adventure.title}
                  // Esclude il contenuto chiuso da screen reader e tab
                  // senza usare `hidden`, che azzererebbe la transizione.
                  inert={!isOpen}
                  className={`grid transition-all duration-500 motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden pl-14">
                    <p className="max-w-2xl text-[15px] leading-7 text-secondary">
                      {adventure.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}