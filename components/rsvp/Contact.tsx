import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative border-y border-border bg-white py-24">
      <Image
        src="/decorations/branch.svg"
        alt=""
        width={240}
        height={240}
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          hidden
          opacity-10
          lg:block
        "
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">

        <p className="text-[11px] uppercase tracking-[0.35em] text-secondary">
          Hai bisogno di aiuto?
        </p>

        <h2 className="mt-4 font-heading text-[42px] font-light text-primary">
          Contattaci
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-secondary">
          Per qualsiasi dubbio sulla conferma della presenza,
          esigenze particolari o semplicemente per salutarci,
          siamo sempre felici di sentirvi.
        </p>

        <div className="mt-12 space-y-6">

          <a
            href="mailto:info@silviamanuel.it"
            className="flex items-center justify-center gap-3 text-lg text-primary transition hover:text-accent"
          >
            <Mail size={18} />
            info@silviamanuel.it
          </a>

          <a
            href="tel:+393331234567"
            className="flex items-center justify-center gap-3 text-lg text-primary transition hover:text-accent"
          >
            <Phone size={18} />
            +39 333 123 4567
          </a>

        </div>

      </div>
    </section>
  );
}