"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { useM } from "@/i18n/use-messages";
import { giftMessages } from "@/i18n/messages/gift";

type GiftDetailsProps = {
  iban: string;
  holder: string;
};

/** Coordinate per il bonifico, sempre in vista e con IBAN copiabile. */
export default function GiftDetails({
  iban,
  holder,
}: GiftDetailsProps) {
  const { details: t } = useM(giftMessages);
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

  return (
    <div className="w-full max-w-md text-left">
      <dl className="border-t border-white/30">
        <div className="border-b border-white/30 py-5">
          <dt className="text-xs uppercase tracking-[0.28em] text-white/75">
            {t.holder}
          </dt>

          <dd className="mt-2 text-[15px] leading-6 text-white">
            {holder}
          </dd>
        </div>

        <div className="border-b border-white/30 py-5">
          <dt className="text-xs uppercase tracking-[0.28em] text-white/75">
            {t.iban}
          </dt>

          <dd className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
            {/* tabular-nums tiene le cifre allineate; break-all evita
                che un IBAN lungo sbordi su schermi stretti. */}
            <span className="font-mono text-[15px] leading-6 tracking-wide text-white break-all tabular-nums">
              {iban}
            </span>

            <button
              type="button"
              onClick={copy}
              className="
                inline-flex shrink-0 items-center gap-2 text-xs
                uppercase tracking-[0.24em] text-white/75
                transition-colors duration-300 hover:text-white
                motion-reduce:transition-none
              "
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? t.copied : t.copy}
            </button>

            {/* Annuncio per chi usa uno screen reader. */}
            <span aria-live="polite" className="sr-only">
              {copied ? t.copiedAnnounce : ""}
            </span>
          </dd>
        </div>

        <div className="border-b border-white/30 py-5">
          <dt className="text-xs uppercase tracking-[0.28em] text-white/75">
            {t.reference}
          </dt>

          <dd className="mt-2 text-[15px] leading-6 text-white">
            {t.referenceValue}
            <span className="block text-[13px] text-white/75">
              {t.referenceNote}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
