import type { Metadata } from "next";
import { redirect } from "next/navigation";

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

export const metadata: Metadata = {
  title: "Dove dormire",
  description:
    "Alberghi consigliati a Cannigione, navetta per la location e come funziona la prenotazione.",
  alternates: { canonical: "/hotel" },
  robots: HOTEL_SECTION_ENABLED ? undefined : { index: false, follow: false },
};

export default function HotelPage() {
  // Pagina nascosta: non gestiamo noi gli hotel. Chi arriva da un
  // vecchio link finisce sul consiglio per cercare alloggio da sé.
  if (!HOTEL_SECTION_ENABLED) {
    redirect("/matrimonio#dove-dormire");
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