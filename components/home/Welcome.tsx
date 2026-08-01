import Image from "next/image";

import Section from "@/components/ui/Section";
import FeatureCard from "./FeatureCard";

import { homeCards } from "@/data/homeCards";

export default function Welcome() {
  return (
    <Section>
      <div className="relative z-10 ">
        {/* Decorazione */}

        <Image
  src="/decorations/branch.svg"
  alt=""
  width={430}
  height={430}
  className="
    pointer-events-none
    absolute
    -left-24
    -top-15
    z-0
    hidden
    scale-x-[-1]
    opacity-12
    lg:block
  "
/>

        {/* Testo */}

        <div className="mx-auto max-w-4xl text-center">
          <p className="font-heading text-[34px] leading-[1.15] text-primary md:text-[30px]">
  Siamo felici di condividere con voi
  <br />
  uno dei giorni più importanti della nostra vita.
</p>

          <div className="mt-7 flex items-center justify-center">
            <div className="h-px w-16 bg-border" />

            <span className="mx-5 text-sm text-accent">
              ❦
            </span>

            <div className="h-px w-16 bg-border" />
          </div>
        </div>

        {/* Card */}

        <div className="relative z-20 mt-10 flex justify-center gap-4">
  {homeCards.map((card) => (
    <div
      key={card.title}
      className="w-[300px]"
    >
      <FeatureCard {...card} />
    </div>
  ))}
</div>
      </div>
    </Section>
  );
}