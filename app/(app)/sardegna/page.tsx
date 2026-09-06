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

export const metadata: Metadata = {
  title: "La nostra Sardegna",
  description:
    "I posti del cuore di Silvia e Manuel in Gallura e dintorni: dove mangiare, spiagge, paesini e qualche avventura per chi si ferma qualche giorno in più.",
  alternates: { canonical: "/sardegna" },
};

export default function SardegnaPage() {
  return (
    <main>
      <Hero />
      <Intro />
      <CategoryNav />

      <Food />
      <Adventures />
      <Beaches />
      <Villages />
      <Favorite />
      <QuickGuide />
    </main>
  );
}