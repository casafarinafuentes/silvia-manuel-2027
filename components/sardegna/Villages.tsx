"use client";

import { useState } from "react";

const nearby = [
  "San Pantaleo",
  "Porto Cervo",
  "Porto Rotondo",
  "Olbia",
  "San Teodoro",
];

const further = ["Alghero", "Castelsardo"];

function VillageList({
  items,
  active,
  onHover,
}: {
  items: string[];
  active: string | null;
  onHover: (village: string | null) => void;
}) {
  return (
    <ul className="mt-8 border-t border-border">
      {items.map((place, index) => (
        <li key={place}>
          <button
            type="button"
            onMouseEnter={() => onHover(place)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(place)}
            onBlur={() => onHover(null)}
            className={`
              flex w-full items-center gap-5 border-b border-border py-5
              text-left transition-colors duration-300
              motion-reduce:transition-none
              ${active === place ? "text-primary" : ""}
            `}
          >
            <span className="text-[10px] text-secondary">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span
              className={`
                font-heading text-2xl font-light transition-opacity duration-300
                motion-reduce:transition-none
                ${active && active !== place ? "opacity-40" : "opacity-100"}
              `}
            >
              {place}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function Villages() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="paesini" className="anchor-offset px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-secondary">
            Da scoprire
          </p>

          <h2 className="mt-4 font-heading text-5xl font-light text-primary md:text-6xl">
            Paesini
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-secondary">
              In zona
            </p>

            <VillageList
              items={nearby}
              active={active}
              onHover={setActive}
            />

            <div className="mt-16">
              <p className="text-[10px] uppercase tracking-[0.35em] text-secondary">
                Se avete più tempo
              </p>

              <VillageList
                items={further}
                active={active}
                onHover={setActive}
              />
            </div>
          </div>

          {/*
            Pannello di accompagnamento alla lista.

            La mappa vera arriverà quando avremo coordinate verificate
            per ogni paese: inventarle significherebbe mandare gli
            invitati nel posto sbagliato. Nel frattempo il pannello
            reagisce comunque alla lista, così l'interazione è già
            quella definitiva.
          */}
          <div
            className="
              relative min-h-[420px] overflow-hidden rounded-[32px]
              border border-border bg-panel-photo
              lg:sticky lg:top-28 lg:min-h-[560px]
            "
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
              <p
                className={`
                  font-heading text-4xl font-light leading-tight text-primary
                  transition-opacity duration-500 md:text-5xl
                  motion-reduce:transition-none
                  ${active ? "opacity-100" : "opacity-0"}
                `}
              >
                {active ?? ""}
              </p>

              <p
                className={`
                  mt-6 max-w-xs text-[13px] leading-6 text-secondary
                  transition-opacity duration-500
                  motion-reduce:transition-none
                  ${active ? "opacity-0" : "opacity-100"}
                `}
              >
                Passate il mouse sui nomi per scoprirli.
                <br />
                La mappa arriverà presto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
