"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Ritardo in millisecondi, per sfalsare elementi vicini. */
  delay?: number;
  className?: string;
};

/**
 * Comparsa discreta all'ingresso nel viewport.
 *
 * Principio: il contenuto è VISIBILE di default. Lo stato nascosto
 * viene applicato via CSS solo sotto `html.js`, cioè solo quando il
 * JavaScript è effettivamente in esecuzione. Se lo script non parte,
 * fallisce o l'observer non scatta mai, resta comunque tutto leggibile.
 *
 * Una precedente versione basata su `whileInView` di framer-motion
 * lasciava intere sezioni a opacità 0 quando l'observer non si
 * attivava: qui il caso peggiore è "nessuna animazione", non
 * "nessun contenuto".
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const show = () => element.classList.add("is-visible");

    // Se l'API non c'è, mostriamo subito invece di nascondere.
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    observer.observe(element);

    // Rete di sicurezza: se dopo qualche secondo l'elemento non è
    // ancora stato rivelato, lo mostriamo comunque.
    const fallback = window.setTimeout(show, 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
