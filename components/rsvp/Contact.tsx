import Image from "next/image";

import ContactAction from "@/components/ui/ContactAction";

export default function Contact({ closed = false }: { closed?: boolean }) {
  return (
    <section
      id="contatti"
      className="anchor-offset relative border-y border-border bg-white py-24"
    >
      <Image
        src="/decorations/branch.webp"
        alt=""
        width={240}
        height={240}
        className="
          object-contain pointer-events-none
          absolute
          bottom-0
          right-0
          hidden
          opacity-10
          lg:block
        "
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">

        <p className="text-xs uppercase tracking-[0.35em] text-secondary">
          {closed ? "Contatti" : "Hai bisogno di aiuto?"}
        </p>

        <h2 className="mt-4 font-heading text-[42px] font-light text-primary">
          {closed ? "Siamo felici di sentirvi." : "Siamo felici di aiutarti."}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-secondary">
          {closed
            ? "Per qualsiasi cosa, o semplicemente per un saluto, scriveteci quando volete."
            : "Per qualsiasi dubbio sulla conferma della presenza, esigenze particolari o semplicemente per salutarci, siamo sempre felici di sentirvi."}
        </p>

        <div className="mt-12">
          <ContactAction />
        </div>

      </div>
    </section>
  );
}