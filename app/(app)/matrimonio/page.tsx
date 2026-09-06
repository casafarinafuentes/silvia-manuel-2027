import type { Metadata } from "next";

import Hero from "@/components/matrimonio/Hero";
import Intro from "@/components/matrimonio/Intro";
import Timeline from "@/components/matrimonio/Timeline";
import Location from "@/components/matrimonio/Location";
import DressCode from "@/components/matrimonio/DressCode";
import PracticalInfo from "@/components/matrimonio/PracticalInfo";
import Inspirations from "@/components/matrimonio/Inspirations";
import CTA from "@/components/matrimonio/CTA";
import Footer from "@/components/matrimonio/Footer";

export const metadata: Metadata = {
  title: "Il matrimonio",
  description:
    "Programma della giornata, location, dress code e informazioni pratiche per il 12 giugno 2027.",
  alternates: { canonical: "/matrimonio" },
};

export default function MatrimonioPage() {
  return (
   <main className="bg-background">
      <Hero />

      <Intro />

      <Timeline />

      <Location />

      <DressCode />

      <PracticalInfo />

      <Inspirations />

      <CTA />

      <Footer />
    </main>
  );
}