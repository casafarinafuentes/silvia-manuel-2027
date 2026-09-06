"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

import { navigation } from "@/data/navigation";
import { wedding } from "@/config/wedding";

type SiteMenuProps = {
  variant?: "light" | "dark";
};

export default function SiteMenu({ variant = "light" }: SiteMenuProps) {
  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Esc chiude il menu, e il focus torna dove l'utente lo aveva
  // lasciato invece di ripartire dall'inizio della pagina.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Con il menu aperto la pagina sotto non deve scorrere.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      {/* Bottone Hamburger */}

      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label="Apri menu"
        aria-expanded={open}
        className={`
          rounded-full p-3 transition backdrop-blur-sm
          ${
            variant === "light"
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-transparent text-primary hover:bg-black/5"
          }
        `}
      >
        <Menu size={22} aria-hidden="true" />
      </button>

      {/* Overlay + Menu

          `overflow-hidden`: da chiuso il pannello è spostato fuori
          schermo con translate-x-full e, senza clipping, allargherebbe
          il documento (overflow orizzontale su mobile).

          `inert` da chiuso: senza, i link resterebbero raggiungibili
          con Tab pur essendo invisibili. */}

      <div
        inert={!open}
        className={`
          fixed inset-0 z-50 flex justify-end overflow-hidden
          transition-opacity duration-300 motion-reduce:transition-none
          ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
        `}
      >
        {/* Sfondo */}

        <button
          type="button"
          tabIndex={-1}
          aria-label="Chiudi menu"
          onClick={() => setOpen(false)}
          className={`
            absolute inset-0 h-full w-full cursor-default bg-black/40
            transition-opacity duration-300 motion-reduce:transition-none
            ${open ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Pannello */}

        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
          className={`
            relative flex h-full w-96 max-w-[calc(100vw-2.5rem)] flex-col
            bg-background p-8 shadow-2xl
            transition-transform duration-300 ease-out
            motion-reduce:transition-none
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Header */}

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-secondary">
                {wedding.couple.bride} &amp; {wedding.couple.groom}
              </p>

              <h2 className="mt-3 font-heading text-4xl font-light text-primary">
                Menu
              </h2>
            </div>

            <button
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Chiudi menu"
              className="shrink-0 text-primary transition hover:text-accent"
            >
              <X size={28} aria-hidden="true" />
            </button>
          </div>

          <div className="my-10 h-px bg-border" />

          {/* Navigazione */}

          <nav className="flex flex-col gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between gap-4 text-left text-2xl font-light text-primary transition hover:text-accent"
              >
                <span>{item.label}</span>

                <ArrowRight
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            ))}
          </nav>

          {/* Footer */}

          <div className="mt-auto">
            <div className="mb-8 h-px bg-border" />

            <p className="text-sm uppercase tracking-[0.35em] text-secondary">
              {wedding.location.venue}
            </p>

            <p className="mt-2 text-lg text-primary">
              {wedding.location.address.locality} ·{" "}
              {wedding.location.address.region}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
