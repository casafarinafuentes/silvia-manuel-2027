"use client";

import { useEffect, useRef, useState } from "react";

import SiteMenu from "@/components/layout/Menu";

const categories = [
  { label: "Food", href: "#cibo" },
  { label: "Avventure", href: "#avventure" },
  { label: "Spiagge", href: "#spiagge" },
  { label: "Paesini", href: "#paesini" },
];

export default function CategoryNav() {
  const [isStuck, setIsStuck] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  /* Agganciata quando il sentinel che la precede è salito oltre il
     punto in cui la nav si ferma (il `top` dello sticky). Si misura a
     ogni scroll invece di usare un IntersectionObserver: con uno
     scroll veloce il sentinel salta da sopra a sotto lo schermo senza
     mai "intersecare", e lo stato restava bloccato su agganciata anche
     tornati in cima (l'header non ricompariva). */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const sticky = stickyRef.current;
    if (!sentinel || !sticky) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      const offset = parseFloat(getComputedStyle(sticky).top) || 0;

      setIsStuck(sentinel.getBoundingClientRect().top < offset);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Con la nav agganciata l'header del sito si ritrae: in alto resta
     solo la pillola. Lasciando la pagina torna al suo posto. */
  useEffect(() => {
    document.documentElement.toggleAttribute("data-header-retracted", isStuck);

    return () => {
      document.documentElement.removeAttribute("data-header-retracted");
    };
  }, [isStuck]);

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

      {/* Mai attaccata al bordo superiore. Il contenitore è largo quanto
          la pagina: senza `pointer-events-none` coprirebbe i clic su ciò
          che gli sta accanto (era il motivo per cui il menu hamburger
          non rispondeva a pagina scorsa). */}
      <div
        ref={stickyRef}
        className="pointer-events-none sticky top-4 z-40 px-4"
      >
        <nav
          aria-label="Esplora la Sardegna"
          className={`
            pointer-events-auto
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
                `
                : `
                  rounded-none
                  border-transparent
                  bg-transparent
                  shadow-none
                  backdrop-blur-none
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
                      text-xs
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

          {/* Da agganciata l'header non c'è più: il menu del sito
              si apre da qui. */}
          {isStuck && (
            <div className="flex shrink-0 items-center border-l border-border/80 pl-1 pr-2">
              <SiteMenu variant="dark" compact />
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
