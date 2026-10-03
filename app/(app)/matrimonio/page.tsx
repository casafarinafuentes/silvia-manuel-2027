import type { Metadata } from "next";

import Hero from "@/components/matrimonio/Hero";
import Intro from "@/components/matrimonio/Intro";
import Timeline from "@/components/matrimonio/Timeline";
import Location from "@/components/matrimonio/Location";
import DressCode from "@/components/matrimonio/DressCode";
import PhotoSharing from "@/components/matrimonio/PhotoSharing";
import PracticalInfo from "@/components/matrimonio/PracticalInfo";
import Inspirations from "@/components/matrimonio/Inspirations";
import CTA from "@/components/matrimonio/CTA";
import Footer from "@/components/matrimonio/Footer";
import StayTip from "@/components/ui/StayTip";

export const metadata: Metadata = {
  title: "Il matrimonio",
  description:
    "Programma della giornata, location, dress code e informazioni pratiche per il 12 giugno 2027.",
  alternates: { canonical: "/matrimonio" },
};

export default function MatrimonioPage() {
  return (
   <div className="bg-background">
      <Hero />

      <Intro />

      <Timeline />

      <Location />

      <StayTip />

      <DressCode />

      <PhotoSharing />

      <PracticalInfo />

      <Inspirations />

      <CTA />

      <Footer />
    </div>
  );
}