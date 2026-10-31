import Image from "next/image";

import ContactAction from "@/components/ui/ContactAction";
import { useM } from "@/i18n/use-messages";
import { hotelMessages } from "@/i18n/messages/hotel";

export default function Contact() {
  const { contact } = useM(hotelMessages);

  return (
    <section className="relative border-y border-border bg-white py-24">
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
          {contact.eyebrow}
        </p>

        <h2 className="mt-4 font-heading text-[42px] font-light text-primary">
          {contact.title}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-secondary">
          {contact.text}
        </p>

        <div className="mt-12">
          <ContactAction />
        </div>

      </div>
    </section>
  );
}