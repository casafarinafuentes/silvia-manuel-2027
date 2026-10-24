import PageHero from "@/components/ui/PageHero";
import { useM } from "@/i18n/use-messages";
import { matrimonioMessages } from "@/i18n/messages/matrimonio";


export default function Hero({ after = false }: { after?: boolean }) {
  const { hero } = useM(matrimonioMessages);

  return (
    <PageHero
      title={hero.title}
      subtitle={after ? hero.subtitleAfter : hero.subtitleBefore}
      image="/hero.jpg"
      alt={hero.alt}
    />
  );
}
