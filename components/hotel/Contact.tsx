import Image from "next/image";

import ContactAction from "@/components/ui/ContactAction";

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
          Siamo felici di aiutarti.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-secondary">
          Se avete dubbi riguardo agli hotel, alla navetta
          o al vostro soggiorno, non esitate a contattarci.
          Saremo felici di darvi tutte le informazioni
          necessarie.
        </p>

        <div className="mt-12">
          <ContactAction />
        </div>

      </div>
    </section>
  );
}