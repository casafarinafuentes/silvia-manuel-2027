import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[260px] sm:h-[280px] md:h-[320px]">
        <Image
          src="/matrimonio/cta.jpg"
          alt="Panorama della location"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/15" />

        {/* Content */}

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">

            <h2 className="font-heading text-[30px] font-light leading-[1.2] text-white sm:text-[38px] md:text-[56px]">
              Non vediamo l&apos;ora
              <br />
              di festeggiare con voi.
            </h2>

            <div className="mt-4 h-px w-10 bg-white/60" />

            <Link
              href="/rsvp"
              className="mt-6 inline-flex items-center gap-3 bg-[#3F5643] px-7 py-3 text-[10px] uppercase tracking-[0.24em] text-white transition hover:bg-[#334637] sm:px-8 sm:text-[11px] sm:tracking-[0.28em]"
            >
              Conferma la tua presenza
              <span className="text-base">→</span>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}