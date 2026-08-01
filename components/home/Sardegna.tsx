import Image from "next/image";
import Link from "next/link";

export default function Sardegna() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto grid max-w-[1320px] overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">

        {/* Foto */}

        <div className="relative min-h-[350px]">
          <Image
            src="/home/sardegna.jpg"
            alt="Sardegna"
            fill
            className="object-cover"
          />
        </div>

        {/* Testo */}

        <div className="relative flex min-h-[350px] items-center bg-[#faf7f2] px-14">

          <Image
            src="/decorations/branch.svg"
            alt=""
            width={170}
            height={170}
            className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 opacity-15"
          />

          <div className="relative z-10 max-w-sm">

            <h2 className="font-heading text-[35px] font-normal leading-[1.08] text-primary">
              Ci siamo innamorati
              <br />
              anche di questa terra.
            </h2>

            <p className="mt-7 text-[18px] leading-8 text-secondary">
              Se avete qualche giorno in più,
              abbiamo raccolto per voi i posti
              che più ci hanno emozionato.
            </p>

            <Link
              href="/sardegna"
              className="mt-9 inline-flex items-center gap-4 bg-[#55634d] px-9 py-4 text-[12px] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-[#475541]"
            >
              Scopri la nostra Sardegna
              <span>→</span>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}