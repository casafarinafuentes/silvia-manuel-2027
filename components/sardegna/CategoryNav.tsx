"use client";

import { useEffect, useRef, useState } from "react";

const categories = [
  { label: "Mangiare", href: "#cibo" },
  { label: "Avventure", href: "#avventure" },
  { label: "Spiagge", href: "#spiagge" },
  { label: "Paesini", href: "#paesini" },
];

export default function CategoryNav() {
  const [isStuck, setIsStuck] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);

  /* Sticky: attivo solo quando la nav ha davvero raggiunto il bordo
     superiore, non al primo pixel di scroll. Il sentinel che la
     precede esce dal viewport esattamente in quel momento. */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  /* Sezione corrente: evidenzia la voce di navigazione corrispondente
     a ciò che si sta guardando. */
  useEffect(() => {
    const sections = categories
      .map(({ href }) => document.querySelector(href))
      .filter((element): element is Element => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(`#${visible.target.id}`);
        }
      },
      {
        // Banda stretta a metà schermo: la sezione "attiva" è quella
        // che si sta effettivamente leggendo.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />

      <div className="sticky top-0 z-40 px-4">
        <nav
          aria-label="Esplora la Sardegna"
          className={`
            mx-auto
            flex
            max-w-full
            items-center
            justify-center
            transition-all
            duration-500
            ease-out
            motion-reduce:transition-none
            md:w-fit
            ${
              isStuck
                ? `
                  rounded-full
                  border
                  border-white/40
                  bg-white/55
                  shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                  backdrop-blur-xl
                  backdrop-saturate-150
                  my-3
                `
                : `
                  rounded-none
                  border-transparent
                  bg-transparent
                  shadow-none
                  backdrop-blur-none
                  my-0
                `
            }
          `}
        >
          {/* Su schermi stretti le voci scorrono invece di andare a capo. */}
          <div
            className={`
              flex items-center overflow-x-auto
              [-ms-overflow-style:none] [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              px-2 md:px-4
              ${isStuck ? "py-3" : "py-4"}
              transition-[padding] duration-500 motion-reduce:transition-none
            `}
          >
            {categories.map((category, index) => {
              const isActive = active === category.href;

              return (
                <div key={category.href} className="flex items-center">
                  <a
                    href={category.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`
                      whitespace-nowrap
                      px-4
                      py-1
                      text-[10px]
                      uppercase
                      tracking-[0.32em]
                      transition-colors
                      duration-300
                      hover:text-primary
                      md:px-6
                      ${isActive ? "text-primary" : "text-secondary"}
                    `}
                  >
                    {category.label}
                  </a>

                  {index !== categories.length - 1 && (
                    <span aria-hidden="true" className="text-border">
                      ·
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
