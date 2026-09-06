import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[82vh] min-h-[680px] overflow-hidden">
      {/* Immagine */}

      <Image
        src="/sardegna/sardegna-hero.jpg"
        alt="La nostra Sardegna"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/30" />

      {/* Contenuto */}

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.45em] text-white/80">
            La nostra
          </p>

          <h1 className="mt-5 font-heading text-7xl font-light leading-none text-white md:text-[104px]">
            Sardegna
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
            I luoghi che amiamo, quelli che vi consigliamo
            e qualche posto che vale la pena scoprire.
          </p>
        </div>
      </div>

      {/* Scroll */}

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-white/80">
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