import Image from "next/image";
import Link from "next/link";

import { currentTemporalContext } from "@/lib/temporal-now";

export default function Sardegna() {
  // Dopo il matrimonio nessuno "si ferma qualche giorno in più":
  // la guida resta per chi vorrà tornare.
  const after = currentTemporalContext().phase === "after";

  return (
    <section className="px-5 pb-16 lg:px-6 lg:pb-20">
      <div className="mx-auto grid max-w-[1320px] overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">

        {/* Foto */}

        <div className="relative min-h-[260px] sm:min-h-[350px]">
          <Image
            src="/home/sardegna.jpg"
            alt="Sardegna"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        {/* Testo */}

        <div className="relative flex items-center bg-[#faf7f2] px-7 py-12 sm:px-12 sm:py-14 lg:min-h-[350px] lg:px-14">

          <Image
            src="/decorations/branch.webp"
            alt=""
            width={170}
            height={170}
            className="object-contain pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 opacity-15"
          />

          <div className="relative z-10 max-w-sm">

            <h2 className="font-heading text-[30px] font-normal leading-[1.08] text-primary sm:text-[35px]">
              {after ? "Per quando tornerete" : "Qualche giorno in più"}
              <br />
              in Sardegna.
            </h2>

            <p className="mt-6 text-[16px] leading-7 text-secondary sm:mt-7 sm:text-[18px] sm:leading-8">
              {after
                ? "Abbiamo raccolto per voi i posti che vi consigliamo di non perdere."
                : "Se decidete di fermarvi, abbiamo raccolto per voi i posti che vi consigliamo di non perdere."}
            </p>

            <Link
              href="/sardegna"
              className="mt-8 inline-flex items-center gap-3 bg-[#55634d] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#475541] sm:mt-9 sm:gap-4 sm:px-9 sm:py-4 sm:text-[12px] sm:tracking-[0.24em]"
            >
              Scopri la Sardegna
              <span>→</span>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}