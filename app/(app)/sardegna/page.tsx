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
import { currentTemporalContext } from "@/lib/temporal-now";

export const metadata: Metadata = {
  title: "La Sardegna che amiamo",
  description:
    "I posti che Silvia e Manuel consigliano in Gallura e dintorni: dove mangiare, spiagge, paesini e qualche avventura.",
  alternates: { canonical: "/sardegna" },
};

export default function SardegnaPage() {
  const { phase } = currentTemporalContext();
  const after = phase === "after";

  return (
    <div>
      <Hero />
      <Intro after={after} />
      <CategoryNav />

      <Food showComingSoon={phase === "rsvp" || phase === "waiting"} />
      <Adventures />
      <Beaches />
      <Villages />
      <Favorite />
      <QuickGuide after={after} />
      <PhotoCredits />

      {/* L'invito a fine pagina segue la fase; a matrimonio passato
          non c'è un passo successivo. */}
      {phase === "rsvp" && (
        <NextStep
          eyebrow="Ci vediamo presto"
          title="Manca solo la tua conferma"
          description="Fateci sapere se ci sarete: bastano un minuto e qualche informazione."
          href="/rsvp"
          cta="Conferma la tua presenza"
        />
      )}

      {phase !== "rsvp" && phase !== "after" && (
        <NextStep
          eyebrow={phase === "wedding" ? "È il giorno" : "Ci vediamo presto"}
          title="Tutti i dettagli della giornata"
          description={
            phase === "wedding"
              ? "Programma, location e informazioni pratiche."
              : "Programma, location e informazioni pratiche per il 12 giugno."
          }
          href="/matrimonio"
          cta="Il matrimonio"
        />
      )}

      <Footer />
    </div>
  );
}