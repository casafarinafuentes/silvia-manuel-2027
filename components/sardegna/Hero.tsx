import ParallaxImage from "@/components/ui/ParallaxImage";

export default function Hero() {
  return (
    <section className="relative h-[82vh] min-h-[680px] overflow-hidden">
      {/* Immagine */}

      <ParallaxImage
        src="/sardegna/sardegna-hero.jpg"
        alt="La nostra Sardegna"
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" />

      {/* Contenuto */}

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          {/* "La nostra" era un'etichetta minuscola accanto a un titolo
              enorme. Ora è la prima riga del titolo, in corsivo e di
              peso dignitoso, così le due parole si leggono insieme. */}
          <h1 className="text-white">
            <span className="block font-heading text-4xl font-light italic leading-none tracking-wide md:text-6xl">
              La nostra
            </span>

            <span className="mt-2 block font-heading text-7xl font-light leading-none md:mt-3 md:text-[120px]">
              Sardegna
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
            I luoghi che amiamo, quelli che vi consigliamo
            e qualche posto che vale la pena scoprire.
          </p>
        </div>
      </div>

      {/* Scroll */}

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-white/80">
          Scorri
        </p>

        <svg
          className="mx-auto mt-4 h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6 9 6 6 6-6"
          />
        </svg>
      </div>
    </section>
  );
}