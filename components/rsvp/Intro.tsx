import Image from "next/image";

import Section from "@/components/ui/Section";
import Lines from "@/components/ui/Lines";
import { useM } from "@/i18n/use-messages";
import { rsvpMessages } from "@/i18n/messages/rsvp";


export default function Intro() {
  const { intro } = useM(rsvpMessages);

  return (
    <Section>
      <div className="relative">
        {/* Decorazione */}

        <Image
          src="/decorations/branch.webp"
          alt=""
          width={470}
          height={470}
          className="
            object-contain pointer-events-none
            absolute
            -left-28
            -top-8
            z-0
            hidden
            scale-x-[-1]
            opacity-25
            lg:block
          "
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-[48px] font-light leading-[1.15] tracking-[0.04em] text-primary md:text-[40px]">
            <Lines text={intro.title} />
          </h2>

          <div className="mt-8 flex items-center justify-center">
            <div className="h-px w-16 bg-border" />

            <span className="mx-5 text-sm text-accent">
              ❦
            </span>

            <div className="h-px w-16 bg-border" />
          </div>

          <div className="mt-8 space-y-2 text-lg leading-5 text-secondary">
            {intro.lines.split("\n").map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}