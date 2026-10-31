import type { Metadata } from "next";
import { redirect } from "@/i18n/navigation";

import Hero from "@/components/hotel/Hero";
import Intro from "@/components/hotel/Intro";
import Navetta from "@/components/hotel/Navetta";
import HowItWorks from "@/components/hotel/HowItWorks";
import Hotels from "@/components/hotel/Hotels";

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
    alternates: alternatesFor(locale, "/hotel"),
    robots: HOTEL_SECTION_ENABLED ? undefined : { index: false, follow: false },
  };
}

export default async function HotelPage({ params }: PageProps) {
  const locale = await initLocale(params);

  // Sezione spenta: chi arriva da un vecchio link finisce sul consiglio
  // per cercare alloggio da sé (barra "Dove dormire" nella pagina Matrimonio).
  if (!HOTEL_SECTION_ENABLED) {
    redirect({ href: "/matrimonio#dove-dormire", locale });
  }

  const { nextStep } = await getM(hotelMessages);

  return (
    <>
      <Hero />

      <Intro />

      <Navetta />
      <HowItWorks />
      <Hotels />

      <InfoSection />

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
