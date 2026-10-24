import Image from "next/image";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

import { useM } from "@/i18n/use-messages";
import { matrimonioMessages } from "@/i18n/messages/matrimonio";

export default function Inspirations() {
  const { inspirations: t } = useM(matrimonioMessages);

  return (
    <Section>
      <SectionTitle
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.items.map((item) => (
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