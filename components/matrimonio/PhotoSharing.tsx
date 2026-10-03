import { Camera } from "lucide-react";

import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/config/wedding";

/**
 * Album condiviso: striscia a tutta larghezza con foto di sfondo. Gli
 * ospiti caricano qui foto e video della giornata; il pulsante compare
 * solo quando in config c'è il link alla cartella.
 *
 * La foto di sfondo è un segnaposto: basta cambiare `src`.
 */
export default function PhotoSharing() {
  const { sharedAlbumUrl } = wedding.photos;

  return (
    <section
      id="foto"
      className="anchor-offset relative my-10 flex min-h-[440px] items-center overflow-hidden lg:my-14 lg:min-h-[520px]"
    >
      <ParallaxImage
        src="/matrimonio/marquee-day.jpg"
        alt=""
        sizes="100vw"
        className="object-cover"
      />

      {/* Velo: uniforme su telefono, dove il testo occupa tutta la
          larghezza; da md in su più scuro solo a sinistra. */}

      <div className="absolute inset-0 bg-black/50 md:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/65 via-black/40 to-black/10 md:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <Reveal className="max-w-xl text-white">
          <Camera size={28} strokeWidth={1.3} aria-hidden="true" />

          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-white/85">
            Le vostre foto
          </p>

          <h2 className="mt-4 font-heading text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
            La giornata
            <br />
            <em className="italic">vista da voi</em>.
          </h2>

          <p className="mt-6 max-w-md leading-8 text-white/90">
            Scattate pure tutte le foto e i video che volete, poi
            caricateli nel nostro album condiviso su Drive: così li
            raccogliamo tutti in un posto solo.
          </p>

          {sharedAlbumUrl ? (
            <a
              href={sharedAlbumUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center justify-center border border-white bg-white px-8 py-3.5 text-xs uppercase tracking-[0.28em] text-[#2f2b28] transition hover:bg-transparent hover:text-white"
            >
              Carica le tue foto →
            </a>
          ) : (
            <p className="mt-9 inline-block border border-white/50 px-6 py-3 text-xs uppercase tracking-[0.24em] text-white/90">
              Il link arriverà qui prima del matrimonio
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
