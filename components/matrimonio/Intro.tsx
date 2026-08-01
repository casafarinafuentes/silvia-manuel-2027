import Image from "next/image";

export default function Intro() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Immagine */}

        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/matrimonio/intro.jpg"
            alt="Cerimonia"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Testo */}

        <div className="relative mx-auto flex w-full max-w-xl flex-col text-center lg:mx-0 lg:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            IL MATRIMONIO
          </p>

          <h2 className="mt-3 font-heading text-5xl font-light leading-tight text-primary sm:text-6xl">
            Finalmente
            <br />
            ci siamo.
          </h2>

          <div className="mx-auto my-6 h-px w-20 bg-border lg:mx-0" />

          <p className="text-lg leading-8 text-secondary">
            12 giugno 2027 sarà il giorno che abbiamo sognato per tanto
            tempo. Non vediamo l&apos;ora di festeggiare insieme a voi in uno
            dei luoghi che più amiamo.
          </p>

          <Image
            src="/decorations/branch.svg"
            alt=""
            width={140}
            height={140}
            className="pointer-events-none absolute -right-6 top-0 hidden h-auto opacity-15 lg:block"
          />
        </div>
      </div>
    </section>
  );
}