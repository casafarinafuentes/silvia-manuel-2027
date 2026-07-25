import Section from "@/components/ui/Section";
import FeatureCard from "./FeatureCard";
import { homeCards } from "@/data/homeCards";

export default function HomeCards() {
  return (
    <Section>

      <div className="mx-auto max-w-2xl">

        <h2 className="text-center text-5xl text-primary">
          Esplora il nostro sito
        </h2>

        <div className="mt-5 text-center text-accent">
          ❦
        </div>

        <div className="mt-12 space-y-6">

          {homeCards.map((card) => (
            <FeatureCard
              key={card.title}
              {...card}
            />
          ))}

        </div>

      </div>

    </Section>
  );
}