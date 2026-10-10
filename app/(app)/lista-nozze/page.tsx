import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/matrimonio/Footer";
import GiftDetails from "@/components/gift/GiftDetails";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { hasRealIban, wedding } from "@/config/wedding";
import { currentTemporalContext } from "@/lib/temporal-now";

export const metadata: Metadata = {
  title: "Per tutto ciò che verrà",
  description:
    "Se desiderate farci un regalo, qui trovate le coordinate per contribuire ai progetti della nostra famiglia.",
  /* Contiene coordinate bancarie: non deve finire nei motori di
     ricerca. Per lo stesso motivo la pagina è fuori dalla sitemap. */
  robots: { index: false, follow: false },
};

export default function ListaNozzePage() {
  const { gift } = wedding;

  const after = currentTemporalContext().phase === "after";

  // Senza IBAN vero e intestatario non mostriamo nulla di bancario.
  const ready = Boolean(gift.holder) && hasRealIban();

  return (
    <>
      <PageHero
        title="Per tutto ciò che verrà"
        subtitle="I nostri progetti"
        image="/lista-nozze/hero.jpg"
        alt=""
        overlayClassName="bg-gradient-to-b from-black/35 via-black/20 to-black/45"
      />

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
              Una famiglia,
              <br />
              e tanti <em className="italic">progetti da realizzare</em>.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <p className="mx-auto mt-8 max-w-xl text-[17px] leading-8 text-secondary">
              Con il matrimonio {after ? "abbiamo iniziato" : "iniziamo"} a
              costruire i progetti della nostra famiglia. Se desiderate farci un regalo, potete
              aiutarci a trasformarli in realtà: qui sotto trovate le
              coordinate per il bonifico.
            </p>
          </Reveal>
        </div>

        {/* Coordinate per il bonifico */}

        <Reveal delay={200} className="relative mx-auto mt-14 max-w-xl">
          <div className="rounded-photo bg-primary px-8 py-10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-12">
            <h2 className="text-center text-xs uppercase tracking-[0.35em] text-white/85">
              Coordinate per il bonifico
            </h2>

            <div className="mt-8 flex justify-center">
              {ready ? (
                <GiftDetails
                  iban={gift.iban}
                  holder={gift.holder as string}
                  reference={gift.reference}
                />
              ) : (
                <p className="text-center text-[15px] leading-7 text-white/90">
                  Stiamo preparando le coordinate:
                  <br />
                  le troverete qui a breve.
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="mx-auto mt-10 max-w-md text-center text-[15px] leading-7 text-secondary">
            Grazie di cuore, da entrambi.
          </p>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
