import PageHero from "@/components/ui/PageHero";
import { useM } from "@/i18n/use-messages";
import { sardegnaMessages } from "@/i18n/messages/sardegna";


export default function Hero() {
  const { hero } = useM(sardegnaMessages);

  return (
    <PageHero
      title={hero.title}
      subtitle={hero.subtitle}
      image="/sardegna/hero-scogliera.jpg"
      alt={hero.alt}
      imageClassName="object-cover object-center"
      overlayClassName="bg-gradient-to-b from-black/40 via-black/35 to-black/50"
    />
  );
}
