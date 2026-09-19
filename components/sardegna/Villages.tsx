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

/**
 * Mappa incorporata di Google, senza chiave API: cerca il nome del
 * paese, così il punto è sempre quello giusto e non dipende da
 * coordinate scritte a mano.
 */
function mapSrc(place: string): string {
  const query = encodeURIComponent(`${place}, Sardegna, Italia`);
  return `https://www.google.com/maps?q=${query}&z=13&output=embed`;
}

/** Vista d'insieme mostrata quando nessun paese è selezionato. */
const OVERVIEW_SRC =
  "https://www.google.com/maps?q=Gallura%2C%20Sardegna&z=9&output=embed";

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
            onFocus={() => onHover(place)}
            // Sui dispositivi touch non esiste l'hover: il tocco seleziona.
            onClick={() => onHover(place)}
            aria-pressed={active === place}
            className={`
              flex w-full items-center gap-5 border-b border-border py-5
              text-left transition-colors duration-300
              motion-reduce:transition-none
              ${active === place ? "text-primary" : ""}
            `}
          >
            <span className="text-xs text-secondary">
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
          <p className="text-xs uppercase tracking-[0.4em] text-secondary">
            Da scoprire
          </p>

          <h2 className="mt-4 font-heading text-5xl font-light text-primary md:text-6xl">
            Paesini
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-secondary">
              In zona
            </p>

            <VillageList
              items={nearby}
              active={active}
              onHover={setActive}
            />

            <div className="mt-16">
              <p className="text-xs uppercase tracking-[0.35em] text-secondary">
                Se avete più tempo
              </p>

              <VillageList
                items={further}
                active={active}
                onHover={setActive}
              />
            </div>
          </div>

          {/* Mappa: mostra il paese sul quale passa il mouse (o che è
              stato toccato). Senza selezione, la Gallura intera. */}
          <div
            className="
              relative min-h-[420px] overflow-hidden rounded-photo
              border border-border bg-panel-photo
              lg:sticky lg:top-28 lg:min-h-[560px]
            "
          >
            <iframe
              key={active ?? "panoramica"}
              title={active ? `Mappa di ${active}` : "Mappa della Gallura"}
              src={active ? mapSrc(active) : OVERVIEW_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 animate-[fadeIn_600ms_ease-out] motion-reduce:animate-none"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent px-6 pb-5 pt-14">
              <p className="font-heading text-3xl font-light leading-none text-primary">
                {active ?? "Gallura"}
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.28em] text-secondary">
                {active
                  ? "Sulla mappa"
                  : "Passate il mouse sui nomi (o toccateli) per vederli"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
