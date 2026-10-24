import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/matrimonio/Footer";
import GiftDetails from "@/components/gift/GiftDetails";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { hasRealIban, wedding } from "@/config/wedding";
import { currentTemporalContext } from "@/lib/temporal-now";
import Lines from "@/components/ui/Lines";
import { initLocale } from "@/i18n/init-locale";
import { isLocale } from "@/i18n/locales";
import { resolve } from "@/i18n/pair";
import { getM } from "@/i18n/get-messages";
import { giftMessages } from "@/i18n/messages/gift";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const m = resolve(giftMessages.metadata, locale);

  return {
    title: m.title,
    description: m.description,
    /* Contiene coordinate bancarie: non deve finire nei motori di
       ricerca. Per lo stesso motivo la pagina è fuori dalla sitemap. */
    robots: { index: false, follow: false },
  };
}

export default async function ListaNozzePage({ params }: PageProps) {
  await initLocale(params);

  const m = await getM(giftMessages);
  const { gift } = wedding;

  const after = currentTemporalContext().phase === "after";

  // Senza IBAN vero e intestatario non mostriamo nulla di bancario.
  const ready = Boolean(gift.holder) && hasRealIban();

  return (
    <>
      <PageHero
        title={m.hero.title}
        subtitle={m.hero.subtitle}
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
              <TitleWithEmphasis
                text={m.message.title}
                emphasis={m.message.emphasis}
              />
            </p>
          </Reveal>

          <Reveal delay={100}>
            <p className="mx-auto mt-8 max-w-xl text-[17px] leading-8 text-secondary">
              {after ? m.message.textAfter : m.message.textBefore}
            </p>
          </Reveal>
        </div>

        {/* Coordinate per il bonifico */}

        <Reveal delay={200} className="relative mx-auto mt-14 max-w-xl">
          <div className="rounded-photo bg-primary px-8 py-10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-12">
            <h2 className="text-center text-xs uppercase tracking-[0.35em] text-white/85">
              {m.details.title}
            </h2>

            <div className="mt-8 flex justify-center">
              {ready ? (
                <GiftDetails
                  iban={gift.iban}
                  holder={gift.holder as string}
                />
              ) : (
                <p className="text-center text-[15px] leading-7 text-white/90">
                  <Lines text={m.details.preparing} />
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="mx-auto mt-10 max-w-md text-center text-[15px] leading-7 text-secondary">
            {m.thanks}
          </p>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}

/** Titolo su due righe con una parte in corsivo al posto di `{em}`. */
function TitleWithEmphasis({
  text,
  emphasis,
}: {
  text: string;
  emphasis: string;
}) {
  const [before, after] = text.split("{em}");

  return (
    <>
      <Lines text={before} />
      <em className="italic">{emphasis}</em>
      {after}
    </>
  );
}
