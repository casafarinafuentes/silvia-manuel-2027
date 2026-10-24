import type { Metadata } from "next";
import { redirect } from "@/i18n/navigation";
import { initLocale } from "@/i18n/init-locale";
import { alternatesFor } from "@/i18n/metadata";
import { isLocale } from "@/i18n/locales";

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

type PageProps = { params: Promise<{ locale: string }> };

// La pagina hotel è nascosta e non tradotta: se si riaccende resta in
// italiano finché non la si traduce.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  return {
    title: "Dove dormire",
    description:
      "Alberghi consigliati a Cannigione, navetta per la location e come funziona la prenotazione.",
    alternates: alternatesFor(locale, "/hotel"),
    robots: HOTEL_SECTION_ENABLED ? undefined : { index: false, follow: false },
  };
}

export default async function HotelPage({ params }: PageProps) {
  const locale = await initLocale(params);

  // Pagina nascosta: non gestiamo noi gli hotel. Chi arriva da un
  // vecchio link finisce sul consiglio per cercare alloggio da sé.
  if (!HOTEL_SECTION_ENABLED) {
    redirect({ href: "/matrimonio#dove-dormire", locale });
  }

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
        title="Se vi fermate qualche giorno in più"
        description="I posti del cuore di Silvia e Manuel in Gallura: dove mangiare, spiagge e paesini."
        href="/sardegna"
        cta="La nostra Sardegna"
      />

      <Footer />
    </>
  );
}