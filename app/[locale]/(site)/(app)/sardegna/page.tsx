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
import { initLocale } from "@/i18n/init-locale";
import { alternatesFor } from "@/i18n/metadata";
import { isLocale } from "@/i18n/locales";
import { resolve } from "@/i18n/pair";
import { getM } from "@/i18n/get-messages";
import { sardegnaMessages } from "@/i18n/messages/sardegna";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const m = resolve(sardegnaMessages.metadata, locale);

  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, "/sardegna"),
  };
}

export default async function SardegnaPage({ params }: PageProps) {
  await initLocale(params);

  const { nextStep: n } = await getM(sardegnaMessages);
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
          eyebrow={n.rsvpEyebrow}
          title={n.rsvpTitle}
          description={n.rsvpText}
          href="/rsvp"
          cta={n.rsvpCta}
        />
      )}

      {phase !== "rsvp" && phase !== "after" && (
        <NextStep
          eyebrow={phase === "wedding" ? n.dayEyebrow : n.soonEyebrow}
          title={n.title}
          description={phase === "wedding" ? n.textDay : n.textSoon}
          href="/matrimonio"
          cta={n.cta}
        />
      )}

      <Footer />
    </div>
  );
}