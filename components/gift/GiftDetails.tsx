"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type GiftDetailsProps = {
  iban: string;
  holder: string;
  reference: string;
};

/**
 * Riferimenti per il bonifico.
 *
 * Restano chiusi finché non si chiede di vederli: chi non è
 * interessato non incontra mai un IBAN, chi lo cerca lo trova in un
 * gesto. È la differenza fra offrire una possibilità e presentare un
 * conto.
 */
export default function GiftDetails({
  iban,
  holder,
  reference,
}: GiftDetailsProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  /* L'IBAN si scrive a gruppi per leggerlo, ma si incolla senza
     spazi: molti home banking rifiutano il formato spaziato. */
  const plainIban = iban.replace(/\s+/g, "");

  async function copy() {
    try {
      await navigator.clipboard.writeText(plainIban);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard negata (permessi, http): l'IBAN resta comunque
      // visibile e selezionabile a mano, quindi non blocchiamo nulla.
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="
          border-b border-border pb-1 text-[11px] uppercase
          tracking-[0.28em] text-secondary transition-colors
          duration-300 hover:border-primary hover:text-primary
          motion-reduce:transition-none
        "
      >
        Mostra i riferimenti
      </button>
    );
  }

  return (
    <div className="w-full max-w-md text-left">
      <dl className="border-t border-border/70">
        <div className="border-b border-border/70 py-5">
          <dt className="text-[10px] uppercase tracking-[0.28em] text-secondary">
            Intestato a
          </dt>

          <dd className="mt-2 text-[15px] leading-6 text-primary">
            {holder}
          </dd>
        </div>

        <div className="border-b border-border/70 py-5">
          <dt className="text-[10px] uppercase tracking-[0.28em] text-secondary">
            IBAN
          </dt>

          <dd className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
            {/* tabular-nums tiene le cifre allineate; break-all evita
                che un IBAN lungo sbordi su schermi stretti. */}
            <span className="font-mono text-[15px] leading-6 tracking-wide text-primary break-all tabular-nums">
              {iban}
            </span>

            <button
              type="button"
              onClick={copy}
              className="
                inline-flex shrink-0 items-center gap-2 text-[10px]
                uppercase tracking-[0.24em] text-secondary
                transition-colors duration-300 hover:text-primary
                motion-reduce:transition-none
              "
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copiato" : "Copia"}
            </button>

            {/* Annuncio per chi usa uno screen reader. */}
            <span aria-live="polite" className="sr-only">
              {copied ? "IBAN copiato negli appunti" : ""}
            </span>
          </dd>
        </div>

        <div className="border-b border-border/70 py-5">
          <dt className="text-[10px] uppercase tracking-[0.28em] text-secondary">
            Causale
          </dt>

          <dd className="mt-2 text-[15px] leading-6 text-primary">
            {reference}
            <span className="block text-[13px] text-secondary">
              Aggiungete il vostro nome, così sappiamo chi ringraziare.
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
