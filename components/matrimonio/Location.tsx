import Image from "next/image";

import { wedding } from "@/config/wedding";

export default function Location() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="overflow-hidden bg-[#F1ECE4] lg:grid lg:grid-cols-[1.55fr_1fr]">

          {/* Foto */}

          <div className="relative aspect-[16/10]">
            <Image
              src="/matrimonio/location.jpg"
              alt={wedding.location.venue}
              fill
              sizes="(max-width:1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>

          {/* Pannello */}

          <div className="relative flex items-center">
            <div className="relative z-10 w-full px-8 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">

              <p className="text-xs uppercase tracking-[0.35em] text-secondary">
                LA LOCATION
              </p>

              <h2 className="mt-4 font-heading text-4xl font-light leading-tight text-primary sm:text-5xl">
                {wedding.location.venue}
              </h2>

              <div className="my-7 h-px w-16 bg-border" />

              <p className="leading-8 text-secondary">
                Affacciata sul mare cristallino della Sardegna,
                <strong className="font-medium text-primary">
                  {" "}
                  {wedding.location.venue}
                </strong>{" "}
                è il luogo che abbiamo scelto per celebrare il nostro
                amore, immersi nella natura e circondati dalla
                bellezza della costa.
              </p>

              <a
                href={wedding.location.maps}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center justify-center bg-primary px-8 py-4 text-sm uppercase tracking-[0.22em] text-white transition hover:opacity-90"
              >
                Scopri la location →
              </a>

            </div>

            <Image
              src="/decorations/branch.svg"
              alt=""
              width={120}
              height={120}
              className="pointer-events-none absolute bottom-8 right-8 opacity-10"
            />

          </div>
        </div>
      </div>
    </section>
  );
}