import PageHero from "@/components/ui/PageHero";

export default function Hero({ after = false }: { after?: boolean }) {
  return (
    <PageHero
      title="Il Matrimonio"
      subtitle={after ? "Il nostro giorno" : "Tutti i dettagli della giornata"}
      image="/hero.jpg"
      alt="Li Capanni"
    />
  );
}
