import type { Metadata } from "next";
import Image from "next/image";
import { Gift, Heart, Sparkles } from "lucide-react";

import Footer from "@/components/matrimonio/Footer";
import GiftDetails from "@/components/gift/GiftDetails";
import Reveal from "@/components/ui/Reveal";
import { hasRealIban, wedding } from "@/config/wedding";

export const metadata: Metadata = {
  title: "Lista nozze",
  description:
    "La vostra presenza è il regalo più grande. Per chi desiderasse lasciarci un pensiero.",
  /* Contiene coordinate bancarie: non deve finire nei motori di
     ricerca. Per lo stesso motivo la pagina è fuori dalla sitemap. */
  robots: { index: false, follow: false },
};

export default function ListaNozzePage() {
  const { gift } = wedding;

  // Senza IBAN vero e intestatario non mostriamo nulla di bancario.
  const ready = Boolean(gift.holder) && hasRealIban();

  return (
    <>
      {/* Apertura con foto */}

      <section className="relative flex min-h-[46vh] items-center justify-center overflow-hidden">
        <Image
          src="/matrimonio/cta.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45" />

        <div className="relative z-10 px-6 py-24 text-center text-white">
          <p className="text-xs uppercase tracking-[0.45em] text-white/85">
            Un pensiero
          </p>

          <h1 className="mt-5 font-heading text-5xl font-light md:text-7xl">
            Lista nozze
          </h1>

          <div className="mx-auto mt-8 h-px w-16 bg-white/60" />
        </div>
      </section>

      {/* Messaggio */}

      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <Image
          src="/decorations/branch.webp"
          alt=""
          width={320}
          height={400}
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-10 hidden object-contain opacity-10 lg:block"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-heading text-[30px] font-light leading-snug text-primary md:text-[44px]">
              La cosa che ci sta più a cuore
              <br />
              è <em className="italic">avervi con noi</em>.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <p className="mx-auto mt-8 max-w-xl text-[17px] leading-8 text-secondary">
              La vostra presenza è già il regalo più bello. Se poi avete
              piacere di lasciarci un pensiero, qui sotto trovate i
              nostri riferimenti.
            </p>
          </Reveal>
        </div>

        {/* Tre blocchi */}

        <div className="relative mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Prima di tutto, voi",
              text: "Il giorno più bello lo è davvero solo con accanto le persone a cui vogliamo bene.",
            },
            {
              icon: Sparkles,
              title: "Nessun obbligo",
              text: "Non c'è niente che siate tenuti a fare: quello che conta per noi è festeggiare insieme.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 100} className="h-full">
              <div className="flex h-full flex-col items-center rounded-photo border border-border bg-panel-photo px-8 py-10 text-center">
                <item.icon
                  size={26}
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className="text-accent"
                />

                <h2 className="mt-5 font-heading text-2xl text-primary">
                  {item.title}
                </h2>

                <p className="mt-3 text-[15px] leading-7 text-secondary">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}

          {/* Il terzo blocco contiene i riferimenti veri e propri. */}
          <Reveal delay={200} className="h-full">
            <div className="flex h-full flex-col items-center rounded-photo border border-primary/30 bg-white px-8 py-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
              <Gift
                size={26}
                strokeWidth={1.4}
                aria-hidden="true"
                className="text-accent"
              />

              <h2 className="mt-5 font-heading text-2xl text-primary">
                Se vi va di lasciarci un pensiero
              </h2>

              <div className="mt-6 flex w-full flex-1 items-start justify-center">
                {ready ? (
                  <GiftDetails
                    iban={gift.iban}
                    holder={gift.holder as string}
                    reference={gift.reference}
                  />
                ) : (
                  <p className="text-[13px] leading-6 text-secondary">
                    Stiamo preparando i riferimenti:
                    <br />
                    li troverete qui a breve.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
