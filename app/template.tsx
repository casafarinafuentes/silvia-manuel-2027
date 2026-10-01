"use client";

import { useEffect } from "react";

import Logo from "@/components/ui/Logo";

/**
 * Transizione tra le pagine, solo CSS.
 *
 * Il template viene ricreato a ogni navigazione: la tenda color sabbia
 * (con il monogramma) si apre verso l'alto e il contenuto sale in
 * dissolvenza. Essendo CSS puro, se lo script non parte la tenda si
 * apre lo stesso e non blocca mai la pagina. Con "riduci movimento" è
 * nascosta (vedi globals.css).
 *
 * Qui viene anche forzato lo scroll in cima a ogni cambio pagina.
 * Normalmente ci pensa il router, ma quando si naviga dal menu mobile
 * il link viene cliccato mentre `<body>` ha ancora `overflow: hidden`
 * (il menu lo blocca per impedire lo scroll dietro al pannello): il
 * ripristino dello scroll del router può arrivare in quella finestra e
 * perdersi, lasciando la pagina nuova alla posizione di scroll della
 * pagina precedente. La hero, alta quanto basta, finiva così in parte
 * sotto l'header fisso.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="page-wipe" aria-hidden="true">
        <Logo title={null} className="page-wipe-mark h-28 w-auto text-primary" />
      </div>

      <div className="page-enter">{children}</div>
    </>
  );
}
