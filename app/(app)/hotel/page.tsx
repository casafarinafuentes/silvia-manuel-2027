import type { Metadata } from "next";

import Hero from "@/components/hotel/Hero";
import Intro from "@/components/hotel/Intro";
import Navetta from "@/components/hotel/Navetta";
import Hotels from "@/components/hotel/Hotels";

import Contact from "@/components/hotel/Contact";
import InfoSection from "@/components/hotel/InfoSection";
import Footer from "@/components/matrimonio/Footer";

export const metadata: Metadata = {
  title: "Dove dormire",
  description:
    "Strutture consigliate vicino alla location e informazioni sul servizio navetta.",
  alternates: { canonical: "/hotel" },
};

export default function HotelPage() {
  return (
    <>
      <Hero />

      <Intro />

      <Navetta />

      <Hotels />

      <InfoSection />

      <Contact />

      <Footer />
    </>
  );
}