import type { Metadata } from "next";

import Hero from "@/components/hotel/Hero";
import Intro from "@/components/hotel/Intro";
import Navetta from "@/components/hotel/Navetta";
import HowItWorks from "@/components/hotel/HowItWorks";
import Hotels from "@/components/hotel/Hotels";
import PageNav from "@/components/viaggio/PageNav";
import Arrivals from "@/components/viaggio/Arrivals";
import CarNotice from "@/components/viaggio/CarNotice";
import CommunityJoin from "@/components/viaggio/CommunityJoin";

import Contact from "@/components/hotel/Contact";
import InfoSection from "@/components/hotel/InfoSection";
import NextStep from "@/components/ui/NextStep";
import Footer from "@/components/matrimonio/Footer";
import { HOTEL_SECTION_ENABLED } from "@/data/hotels";
import { initLocale } from "@/i18n/init-locale";
import { alternatesFor } from "@/i18n/metadata";
import { isLocale } from "@/i18n/locales";
import { getM } from "@/i18n/get-messages";
import { resolve } from "@/i18n/pair";
import { hotelMessages } from "@/i18n/messages/hotel";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const m = resolve(hotelMessages.metadata, locale);

  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, "/viaggio"),
  };
}

/**
 * Viaggio & Hotel: prima come arrivare (nave o aereo) e perché serve
 * l'auto, poi la navetta e gli hotel consigliati. /hotel porta qui
 * (vedi next.config.ts).
 *
 * Con la sezione hotel spenta (`HOTEL_SECTION_ENABLED`) resta solo la
 * parte sul viaggio.
 */
export default async function ViaggioPage({ params }: PageProps) {
  await initLocale(params);

  const { nextStep } = await getM(hotelMessages);

  return (
    <>
      <Hero />

      <PageNav showHotels={HOTEL_SECTION_ENABLED} />

      <Arrivals />
      <CarNotice />

      {HOTEL_SECTION_ENABLED && (
        <>
          <Navetta />
          <Intro />
          <HowItWorks />
          <Hotels />
          <InfoSection />
        </>
      )}

      <CommunityJoin />

      <Contact />

      <NextStep
        title={nextStep.title}
        description={nextStep.description}
        href="/sardegna"
        cta={nextStep.cta}
      />

      <Footer />
    </>
  );
}
