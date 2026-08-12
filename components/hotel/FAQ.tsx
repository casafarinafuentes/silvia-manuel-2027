"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "Posso prenotare autonomamente?",
    answer:
      "Sì. Potete prenotare direttamente tramite il sito dell'hotel oppure contattare la struttura. Se sarà disponibile una convenzione dedicata agli ospiti, troverete tutte le informazioni aggiornate su questa pagina.",
  },
  {
    question: "È prevista una convenzione?",
    answer:
      "Stiamo definendo eventuali tariffe dedicate con alcune strutture. Se confermate, saranno indicate chiaramente insieme ai relativi hotel.",
  },
  {
    question: "Quanto distano gli hotel dalla location?",
    answer:
      "Tutti gli hotel consigliati si trovano a pochi minuti dalla location del matrimonio e saranno serviti dalla navetta dedicata.",
  },
  {
    question: "Posso cancellare o modificare la prenotazione?",
    answer:
      "Le condizioni di modifica e cancellazione dipendono dalla struttura scelta. Vi consigliamo di verificarle direttamente al momento della prenotazione.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      className="
        h-full
        rounded-[36px]
        border
        border-border
        bg-white
        p-8
      "
    >
      <h2 className="font-heading text-[42px] font-light text-primary">
        Domande frequenti
      </h2>

      <div className="mt-8 divide-y divide-border">
        {faqs.map((faq, index) => {
          const isOpen = open === index;

          return (
            <div key={faq.question}>
              <button
                onClick={() =>
                  setOpen(isOpen ? null : index)
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-6
                  py-6
                  text-left
                "
              >
                <span className="text-[17px] text-primary">
                  {faq.question}
                </span>

                {isOpen ? (
                  <Minus
                    size={18}
                    className="text-secondary"
                  />
                ) : (
                  <Plus
                    size={18}
                    className="text-secondary"
                  />
                )}
              </button>

              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "max-h-40 pb-6"
                      : "max-h-0"
                  }
                `}
              >
                <p className="max-w-xl pr-10 leading-7 text-secondary">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}