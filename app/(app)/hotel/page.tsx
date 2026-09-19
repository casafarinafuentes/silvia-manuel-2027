import type { Metadata } from "next";

import Hero from "@/components/hotel/Hero";
import Intro from "@/components/hotel/Intro";
import HowItWorks from "@/components/hotel/HowItWorks";
import Hotels from "@/components/hotel/Hotels";

import Contact from "@/components/hotel/Contact";
import InfoSection from "@/components/hotel/InfoSection";
import NextStep from "@/components/ui/NextStep";
import Footer from "@/components/matrimonio/Footer";

export const metadata: Metadata = {
  title: "Dove dormire",
  description:
    "Alberghi consigliati a Cannigione e come funziona la prenotazione per gli ospiti.",
  alternates: { canonical: "/hotel" },
};

export default function HotelPage() {
  return (
    <>
      <Hero />

      <Intro />

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