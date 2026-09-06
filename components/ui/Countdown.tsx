"use client";

import { useSyncExternalStore } from "react";

import { wedding } from "@/config/wedding";

type CountdownProps = {
  variant?: "hero" | "footer";
};

/** Istante con fuso orario esplicito: uguale per tutti i visitatori. */
const weddingDate = new Date(wedding.dates.startsAt);

/* --------------------------------------------------------------------
   L'orologio è una sorgente esterna a React: la modelliamo come store.

   Lo snapshot è il numero di secondi mancanti — un primitivo, quindi
   stabile tra due letture nello stesso tick. Restituire un oggetto
   nuovo a ogni chiamata manderebbe useSyncExternalStore in loop.
-------------------------------------------------------------------- */

function remainingSeconds(): number {
  return Math.max(
    0,
    Math.floor((weddingDate.getTime() - Date.now()) / 1000),
  );
}

let snapshot = remainingSeconds();

function subscribe(onChange: () => void): () => void {
  const interval = setInterval(() => {
    const next = remainingSeconds();

    if (next !== snapshot) {
      snapshot = next;
      onChange();
    }
  }, 1000);

  return () => clearInterval(interval);
}

function getSnapshot(): number {
  return snapshot;
}

/** Sul server non esiste un "adesso" del visitatore: mostriamo "--". */
function getServerSnapshot(): null {
  return null;
}

export default function Countdown({ variant = "footer" }: CountdownProps) {
  const seconds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const dark = variant === "footer";

  const items =
    seconds === null
      ? [
          { label: "Giorni", value: null },
          { label: "Ore", value: null },
          { label: "Minuti", value: null },
          { label: "Secondi", value: null },
        ]
      : [
          { label: "Giorni", value: Math.floor(seconds / 86_400) },
          { label: "Ore", value: Math.floor(seconds / 3_600) % 24 },
          { label: "Minuti", value: Math.floor(seconds / 60) % 60 },
          { label: "Secondi", value: seconds % 60 },
        ];

  return (
    <div
      className="flex items-center justify-center whitespace-nowrap"
      role="timer"
      aria-label="Tempo mancante al matrimonio"
    >
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {/* Larghezze scalate: a 360px quattro colonne fisse da 62px
              più i separatori uscivano dallo schermo. */}
          <div className="w-[46px] text-center sm:w-[62px] md:w-[78px]">
            <p
              className={`font-heading font-light leading-none tabular-nums text-3xl sm:text-4xl md:text-5xl ${
                dark ? "text-primary" : "text-white"
              }`}
            >
              {item.value === null
                ? "--"
                : String(item.value).padStart(2, "0")}
            </p>

            <p
              className={`mt-2 text-[9px] uppercase tracking-[0.22em] sm:mt-3 sm:text-[10px] sm:tracking-[0.32em] ${
                dark ? "text-secondary" : "text-white/80"
              }`}
            >
              {item.label}
            </p>
          </div>

          {index !== items.length - 1 && (
            <div
              aria-hidden="true"
              className={`mx-2 h-9 w-px sm:mx-3 sm:h-12 md:mx-4 ${
                dark ? "bg-border" : "bg-white/25"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
