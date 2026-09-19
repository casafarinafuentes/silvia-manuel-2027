import type { Metadata } from "next";

import Hero from "@/components/sardegna/Hero";
import Intro from "@/components/sardegna/Intro";
import CategoryNav from "@/components/sardegna/CategoryNav";
import Food from "@/components/sardegna/Food";
import Adventures from "@/components/sardegna/Adventures";
import Beaches from "@/components/sardegna/Beaches";
import Villages from "@/components/sardegna/Villages";
import Favorite from "@/components/sardegna/Favorite";
import QuickGuide from "@/components/sardegna/QuickGuide";
import PhotoCredits from "@/components/sardegna/PhotoCredits";
import NextStep from "@/components/ui/NextStep";
import Footer from "@/components/matrimonio/Footer";

export const metadata: Metadata = {
  title: "La nostra Sardegna",
  description:
    "I posti del cuore di Silvia e Manuel in Gallura e dintorni: dove mangiare, spiagge, paesini e qualche avventura per chi si ferma qualche giorno in più.",
  alternates: { canonical: "/sardegna" },
};

export default function SardegnaPage() {
  return (
    <div>
      <Hero />
      <Intro />
      <CategoryNav />

      <Food />
      <Adventures />
      <Beaches />
      <Villages />
      <Favorite />
      <QuickGuide />
      <PhotoCredits />

      <NextStep
        eyebrow="Ci vediamo presto"
        title="Manca solo la tua conferma"
        description="Fateci sapere se ci sarete: bastano un minuto e qualche informazione."
        href="/rsvp"
        cta="Conferma la tua presenza"
      />

      <Footer />
    </div>
  );
}