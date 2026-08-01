import Image from "next/image";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

import { inspirations } from "@/data/inspirations";

export default function Inspirations() {
  return (
    <Section>
      <SectionTitle
        eyebrow="ISPIRAZIONI"
        title="L'atmosfera che ci aspetta"
        subtitle="Un piccolo assaggio dei colori, dei dettagli e delle emozioni che renderanno speciale questa giornata."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {inspirations.map((item) => (
          <div
            key={item.image}
            className="relative aspect-[3/2] overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}