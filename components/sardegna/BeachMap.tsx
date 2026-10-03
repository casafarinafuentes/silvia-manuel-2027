"use client";

import Image from "next/image";
import { useState } from "react";

import { wedding } from "@/config/wedding";

/**
 * Mappa stilizzata della costa nord-est, disegnata a mano: la linea di
 * costa è una spezzata di punti [longitudine, latitudine] ammorbidita
 * in curva. Non è una carta nautica, ma i segnaposto sono messi alle
 * coordinate reali con la stessa proiezione, quindi le posizioni
 * relative sono quelle giuste.
 */

type Point = [lng: number, lat: number];

const WIDTH = 620;
const HEIGHT = 640;

const WEST = 9.08;
const NORTH = 41.3;
/** Pixel per grado di latitudine. */
const SCALE = 1143;
/** A 41° nord un grado di longitudine è più corto di uno di latitudine. */
const LNG_RATIO = 0.755;

function project([lng, lat]: Point): [number, number] {
  return [(lng - WEST) * LNG_RATIO * SCALE, (NORTH - lat) * SCALE];
}

/** Da Vignola (nord-ovest) a San Teodoro (sud-est), terra a sinistra. */
const coast: Point[] = [
  [9.08, 41.14],
  [9.12, 41.175],
  [9.147, 41.212],
  [9.138, 41.246], // Capo Testa
  [9.166, 41.236],
  [9.188, 41.244], // Santa Teresa Gallura
  [9.232, 41.258], // Punta Falcone
  [9.25, 41.246],
  [9.272, 41.224],
  [9.284, 41.196], // Porto Pozzo
  [9.297, 41.214],
  [9.325, 41.197], // Porto Pollo
  [9.35, 41.196],
  [9.366, 41.208], // Punta Sardegna
  [9.386, 41.181], // Palau
  [9.424, 41.179], // Capo d'Orso
  [9.427, 41.15],
  [9.441, 41.109], // Cannigione
  [9.448, 41.082], // fondo del golfo di Arzachena
  [9.459, 41.096],
  [9.463, 41.122],
  [9.468, 41.14], // Baja Sardinia
  [9.497, 41.143],
  [9.524, 41.156], // Capo Ferro
  [9.538, 41.136], // Porto Cervo
  [9.541, 41.118], // Pevero
  [9.556, 41.108],
  [9.571, 41.097], // Romazzino
  [9.563, 41.088],
  [9.553, 41.079], // Capriccioli
  [9.535, 41.072], // Cala di Volpe
  [9.546, 41.058],
  [9.538, 41.042],
  [9.522, 41.03], // Portisco
  [9.501, 41.008], // golfo di Cugnana
  [9.527, 41.018],
  [9.549, 41.034], // Porto Rotondo
  [9.562, 41.02],
  [9.556, 41.003], // Marinella
  [9.6, 41.011],
  [9.666, 40.998], // Capo Figari
  [9.643, 40.985], // Cala Moresca
  [9.618, 40.992], // Golfo Aranci
  [9.6, 40.97],
  [9.574, 40.954],
  [9.54, 40.936],
  [9.508, 40.923], // Olbia
  [9.542, 40.914],
  [9.59, 40.91],
  [9.648, 40.923], // Capo Ceraso
  [9.628, 40.902],
  [9.616, 40.892], // Porto Istana
  [9.635, 40.874], // Porto San Paolo
  [9.657, 40.859],
  [9.722, 40.846], // Capo Coda Cavallo
  [9.69, 40.833], // Cala Brandinchi
  [9.684, 40.82], // Lu Impostu
  [9.697, 40.809],
  [9.675, 40.79], // La Cinta
  [9.677, 40.768], // San Teodoro
  [9.69, 40.74],
];

const islands: Point[][] = [
  // La Maddalena
  [
    [9.375, 41.225],
    [9.385, 41.254],
    [9.41, 41.264],
    [9.434, 41.25],
    [9.43, 41.222],
    [9.405, 41.211],
  ],
  // Caprera
  [
    [9.45, 41.238],
    [9.47, 41.245],
    [9.486, 41.22],
    [9.48, 41.187],
    [9.461, 41.177],
    [9.452, 41.205],
  ],
  // Spargi
  [
    [9.335, 41.24],
    [9.346, 41.25],
    [9.357, 41.24],
    [9.346, 41.23],
  ],
  // Tavolara
  [
    [9.672, 40.893],
    [9.7, 40.911],
    [9.737, 40.918],
    [9.71, 40.899],
  ],
  // Molara
  [
    [9.72, 40.868],
    [9.731, 40.877],
    [9.742, 40.868],
    [9.731, 40.859],
  ],
];

/** Curva morbida (Catmull-Rom) attraverso i punti dati. */
function smooth(points: [number, number][], closed: boolean): string {
  const count = points.length;
  const at = (index: number) =>
    closed
      ? points[(index + count) % count]
      : points[Math.min(Math.max(index, 0), count - 1)];

  let path = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;

  for (let i = 0; i < (closed ? count : count - 1); i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];

    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];

    path += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }

  return closed ? `${path}Z` : path;
}

const coastLine = smooth(coast.map(project), false);
// La terra: la costa, chiusa passando fuori dai bordi sud e ovest.
const landPath = `${coastLine} L${project(coast[coast.length - 1])[0].toFixed(1)} ${HEIGHT + 40} L-40 ${HEIGHT + 40} L-40 ${project(coast[0])[1].toFixed(1)} Z`;
const islandPaths = islands.map((island) => smooth(island.map(project), true));

const towns: { name: string; at: Point; anchor: "start" | "end" }[] = [
  { name: "S. Teresa", at: [9.168, 41.2], anchor: "start" },
  { name: "Porto Cervo", at: [9.556, 41.142], anchor: "start" },
  { name: "Golfo Aranci", at: [9.612, 41.028], anchor: "start" },
  { name: "Olbia", at: [9.495, 40.922], anchor: "end" },
  { name: "San Teodoro", at: [9.664, 40.768], anchor: "end" },
];

type Beach = {
  name: string;
  at: Point;
  /** Assente finché non c'è una fotografia: compare un segnaposto. */
  image?: string;
};

const groups: { title: string; beaches: Beach[] }[] = [
  {
    title: "Vicino alla location",
    beaches: [
      {
        name: "Spiaggia del Principe",
        at: [9.566, 41.089],
        image: "/sardegna/spiaggia-del-principe.jpg",
      },
      {
        name: "Capriccioli",
        at: [9.553, 41.078],
        image: "/sardegna/capriccioli.jpg",
      },
      {
        name: "Grande Pevero",
        at: [9.542, 41.118],
        image: "/sardegna/grande-pevero.jpg",
      },
    ],
  },
  {
    title: "Se avete qualche giorno in più",
    beaches: [
      {
        name: "Cala Moresca",
        at: [9.643, 40.986],
        image: "/sardegna/cala-moresca.jpg",
      },
      {
        name: "Spiaggia Bianca",
        at: [9.609, 40.981],
        image: "/sardegna/spiaggia-bianca.jpg",
      },
      {
        name: "Nodu Pianu",
        at: [9.596, 40.967],
        image: "/sardegna/nodu-pianu.jpg",
      },
      {
        name: "Mare e Rocce",
        at: [9.578, 40.956],
        image: "/sardegna/mare-e-rocce.jpg",
      },
      {
        name: "Rena Bianca",
        at: [9.189, 41.244],
        image: "/sardegna/rena-bianca.jpg",
      },
      {
        name: "Porto Istana",
        at: [9.617, 40.893],
        image: "/sardegna/porto-istana.jpg",
      },
      {
        name: "Cala Brandinchi",
        at: [9.689, 40.834],
        image: "/sardegna/cala-brandinchi.jpg",
      },
      {
        name: "Lu Impostu",
        at: [9.683, 40.82],
        image: "/sardegna/lu-impostu.jpg",
      },
    ],
  },
];

const venue: Point = [
  wedding.location.coordinates.lng,
  wedding.location.coordinates.lat,
];

function percent(point: Point) {
  const [x, y] = project(point);

  return { left: `${(x / WIDTH) * 100}%`, top: `${(y / HEIGHT) * 100}%` };
}

function panelIdFor(name: string): string {
  return `spiaggia-${name.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function BeachMap() {
  // Aperta: la spiaggia di cui si vede la foto. In evidenza: quella
  // su cui passa il mouse (sulla mappa o nell'elenco).
  // Tutte chiuse all'arrivo.
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const beaches = groups.flatMap((group) => group.beaches);

  /* Dalla mappa: apre la foto e, se il riquadro è fuori schermo (su
     telefono l'elenco sta sotto la mappa), ci porta la pagina. */
  function selectFromMap(name: string) {
    setSelected(name);

    window.setTimeout(() => {
      document
        .getElementById(panelIdFor(name))
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 350);
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      {/* Mappa: su schermi larghi resta in vista mentre scorre l'elenco. */}

      <div className="relative mx-auto w-full max-w-[560px] lg:sticky lg:top-24">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="Mappa della costa nord-est della Sardegna con le spiagge consigliate"
          className="block w-full rounded-photo bg-[color-mix(in_srgb,var(--primary)_16%,var(--background))]"
        >
          {/* Alone chiaro lungo la costa, per dare profondità al mare. */}
          <g fill="none" stroke="#fff" strokeLinejoin="round">
            <path d={landPath} strokeWidth="30" strokeOpacity="0.22" />
            <path d={landPath} strokeWidth="14" strokeOpacity="0.3" />
          </g>

          <path
            d={landPath}
            fill="var(--background)"
            stroke="var(--primary)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {islandPaths.map((path) => (
            <path
              key={path}
              d={path}
              fill="var(--background)"
              stroke="var(--primary)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          ))}

          {/* Località, per orientarsi */}

          <g
            fill="var(--text-muted)"
            fontSize="9.5"
            letterSpacing="2.4"
            style={{ textTransform: "uppercase" }}
          >
            {towns.map((town) => {
              const [x, y] = project(town.at);

              return (
                <text key={town.name} x={x} y={y} textAnchor={town.anchor}>
                  {town.name}
                </text>
              );
            })}
          </g>

          <text
            x={WIDTH - 22}
            y={34}
            textAnchor="end"
            fill="var(--text-muted)"
            fontSize="9.5"
            letterSpacing="2.4"
          >
            N ↑
          </text>
        </svg>

        {/* La location del matrimonio: il punto che deve saltare all'occhio. */}

        <div
          style={percent(venue)}
          className="pointer-events-none absolute z-10 flex h-0 w-0 items-center justify-center"
        >
          <span
            aria-hidden="true"
            className="absolute h-9 w-9 animate-ping rounded-full bg-[var(--primary-dark)] opacity-30 [animation-duration:2.4s] motion-reduce:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute h-5 w-5 rounded-full border-[3px] border-white bg-[var(--primary-dark)] shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
          />

          <span className="absolute right-4 whitespace-nowrap rounded-tile bg-[var(--primary-dark)] px-3 py-2 text-right text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] sm:right-5 sm:px-4">
            <span className="block text-[8px] uppercase tracking-[0.22em] text-white/85 sm:text-[10px] sm:tracking-[0.28em]">
              Noi saremo qui
            </span>
            <span className="block font-heading text-base italic leading-tight sm:text-xl">
              {wedding.location.venue}
            </span>
          </span>
        </div>

        {/* Segnaposto: pulsanti veri, raggiungibili anche da tastiera. */}

        {beaches.map((beach) => {
          const isSelected = selected === beach.name;
          const isActive = isSelected || hovered === beach.name;
          const position = percent(beach.at);
          // Vicino al bordo destro l'etichetta si apre verso sinistra.
          const alignRight = parseFloat(position.left) > 68;

          return (
            <button
              key={beach.name}
              type="button"
              aria-label={`${beach.name}: mostra la foto`}
              aria-pressed={isSelected}
              onMouseEnter={() => setHovered(beach.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(beach.name)}
              onBlur={() => setHovered(null)}
              onClick={() => selectFromMap(beach.name)}
              style={position}
              className={`group absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none ${
                hovered === beach.name ? "z-40" : isSelected ? "z-30" : "z-20"
              }`}
            >
              <span
                aria-hidden="true"
                className={`block rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-all duration-300 motion-reduce:transition-none ${
                  isActive
                    ? "h-4 w-4 bg-primary"
                    : "h-3 w-3 bg-accent group-focus-visible:ring-2 group-focus-visible:ring-primary"
                }`}
              />

              <span
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-full mb-1 whitespace-nowrap rounded-full border border-border bg-white px-4 py-1.5 font-heading text-[17px] leading-none text-primary shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 motion-reduce:transition-none ${
                  alignRight ? "right-0" : "left-1/2 -translate-x-1/2"
                } ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
              >
                {beach.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Elenco: premendo un nome si apre il riquadro con la sua foto. */}

      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-xs uppercase tracking-[0.35em] text-secondary">
              {group.title}
            </p>

            <ul className="mt-4 border-t border-border">
              {group.beaches.map((beach) => {
                const isSelected = selected === beach.name;
                const isActive = isSelected || hovered === beach.name;
                const panelId = panelIdFor(beach.name);

                return (
                  <li key={beach.name} className="border-b border-border">
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      aria-controls={panelId}
                      onMouseEnter={() => setHovered(beach.name)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() =>
                        setSelected(isSelected ? null : beach.name)
                      }
                      className="flex w-full items-center gap-4 py-3 text-left"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-300 ${
                          isActive ? "bg-primary" : "bg-accent"
                        }`}
                      />

                      <span
                        className={`flex-1 font-heading text-2xl font-light transition-colors duration-300 ${
                          isActive ? "text-accent" : "text-primary"
                        }`}
                      >
                        {beach.name}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`text-xl font-light text-secondary transition-transform duration-300 motion-reduce:transition-none ${
                          isSelected ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      id={panelId}
                      inert={!isSelected}
                      className={`grid transition-all duration-500 motion-reduce:transition-none ${
                        isSelected ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-photo bg-panel-photo">
                          {beach.image ? (
                            <Image
                              src={beach.image}
                              alt={beach.name}
                              fill
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-cover"
                            />
                          ) : (
                            <p className="absolute inset-0 flex items-center justify-center px-6 text-center font-heading text-lg text-secondary">
                              Foto in arrivo
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
