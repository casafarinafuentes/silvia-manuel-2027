"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

import { navigation } from "@/data/navigation";

type SiteMenuProps = {
  variant?: "light" | "dark";
};

export default function SiteMenu({
  variant = "light",
}: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Bottone Hamburger */}

      <button
        onClick={() => setOpen(true)}
        aria-label="Apri menu"
        className={`
rounded-full
p-3
transition
backdrop-blur-sm

${
  variant === "light"
    ? "bg-white/10 text-white hover:bg-white/20"
    : "bg-transparent text-primary hover:bg-black/5"
}
`}
      >
        <Menu size={22} />
      </button>

      {/* Overlay + Menu */}

      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Overlay */}

        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Pannello */}

        <div
          className={`relative flex h-full w-96 flex-col bg-background p-8 shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-secondary">
                Silvia & Manuel
              </p>

              <h2 className="mt-3 text-4xl font-light text-primary">
                Menu
              </h2>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Chiudi menu"
              className="text-primary transition hover:text-accent"
            >
              <X size={28} />
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
      className="group flex items-center justify-between text-left text-2xl font-light text-primary transition hover:text-accent"
    >
      <span>{item.label}</span>

      <ArrowRight
  size={20}
  className="transition-transform duration-200 group-hover:translate-x-1"
/>
    </Link>
  ))}
</nav>

          {/* Footer */}

          <div className="mt-auto">
            <div className="mb-8 h-px bg-border" />

            <p className="text-sm uppercase tracking-[0.35em] text-secondary">
              Li Capanni
            </p>

            <p className="mt-2 text-lg text-primary">
              Cannigione · Sardegna
            </p>
          </div>
        </div>
      </div>
    </>
  );
}