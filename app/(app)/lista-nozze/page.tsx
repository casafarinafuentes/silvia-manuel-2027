import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/matrimonio/Footer";
import GiftDetails from "@/components/gift/GiftDetails";
import { wedding } from "@/config/wedding";

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

  return (
    <>
      <main className="relative overflow-hidden px-6 py-24 md:py-32">
        <Image
          src="/decorations/branch.svg"
          alt=""
          width={280}
          height={280}
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 bottom-0 hidden opacity-10 lg:block"
        />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-secondary">
            Un pensiero
          </p>

          <h1 className="mt-5 font-heading text-4xl font-light text-primary md:text-5xl">
            Lista nozze
          </h1>

          {/* Divisore botanico, come nell'intro della Sardegna. */}
          <div className="my-10 flex items-center justify-center gap-5">
            <span className="h-px w-16 bg-border" />

            <svg
              viewBox="0 0 48 24"
              aria-hidden="true"
              className="h-6 w-12 text-secondary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M24 20C20 14 16 9 8 7" strokeLinecap="round" />
              <path d="M24 20C28 14 32 9 40 7" strokeLinecap="round" />
              <path d="M18 14C15 11 13 8 13 4" strokeLinecap="round" />
              <path d="M30 14C33 11 35 8 35 4" strokeLinecap="round" />
            </svg>

            <span className="h-px w-16 bg-border" />
          </div>

          <p className="font-heading text-[26px] font-light leading-snug text-primary md:text-[32px]">
            La cosa che ci sta più a cuore è avervi con noi.
          </p>

          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-8 text-secondary">
            La vostra presenza è già il regalo più bello. Se poi avete
            piacere di lasciarci un pensiero, qui sotto trovate i
            nostri riferimenti.
          </p>

          <div className="mt-14 flex w-full justify-center">
            {gift.holder ? (
              <GiftDetails
                iban={gift.iban}
                holder={gift.holder}
                reference={gift.reference}
              />
            ) : (
              /* Senza intestatario non mostriamo l'IBAN: un bonifico
                 verso un nome sbagliato è peggio di nessun bonifico. */
              <p className="text-[13px] leading-6 text-secondary">
                Stiamo preparando i riferimenti:
                <br />
                li troverete qui a breve.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
