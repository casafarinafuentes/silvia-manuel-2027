import Link from "next/link";

import { wedding, whatsappUrl } from "@/config/wedding";

const PILL = `
  inline-flex
  items-center
  justify-center
  rounded-full
  border
  border-border
  px-10
  py-4
  text-[11px]
  uppercase
  tracking-[0.32em]
  text-primary
  transition-all
  duration-300
  motion-reduce:transition-none
  hover:border-primary
  hover:bg-primary
  hover:text-white
`;

/**
 * Pulsante di contatto.
 *
 * Finché in `config/wedding.ts` non c'è un recapito verificato non
 * viene reso alcun link: mostrare un numero inventato significherebbe
 * mandare gli invitati a scrivere a uno sconosciuto.
 */
export default function ContactAction({
  label = "Scrivici",
}: {
  label?: string;
}) {
  const whatsapp = whatsappUrl();

  if (whatsapp) {
    return (
      <Link
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={PILL}
      >
        {label}
      </Link>
    );
  }

  if (wedding.contacts.email) {
    return (
      <Link href={`mailto:${wedding.contacts.email}`} className={PILL}>
        {label}
      </Link>
    );
  }

  return (
    <p className="text-[13px] leading-6 text-secondary">
      Stiamo preparando i nostri recapiti:
      <br />
      li troverete qui a breve.
    </p>
  );
}
