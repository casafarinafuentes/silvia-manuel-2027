import Image from "next/image";

import Section from "@/components/ui/Section";

export default function Intro() {
  return (
    <Section>
      <div className="relative">
        {/* Decorazione */}

        <Image
          src="/decorations/branch.svg"
          alt=""
          width={470}
          height={470}
          className="
            pointer-events-none
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
            La vostra presenza
            <br />
            renderà questo giorno unico.
          </h2>

          <div className="mt-8 flex items-center justify-center">
            <div className="h-px w-16 bg-border" />

            <span className="mx-5 text-sm text-accent">
              ❦
            </span>

            <div className="h-px w-16 bg-border" />
          </div>

          <div className="mt-8 space-y-2 text-lg leading-5 text-secondary">
            <p>
              Vi chiediamo di confermare la vostra presenza
            </p>

            <p>
              compilando il form qui sotto.
            </p>

            <p>
              Ogni dettaglio ci aiuterà a rendere tutto perfetto.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}