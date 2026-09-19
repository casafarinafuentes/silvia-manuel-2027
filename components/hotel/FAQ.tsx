"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "C'è una convenzione con gli hotel?",
    answer:
      "No. Gli hotel non ci hanno dato una convenzione: hanno una tariffa dedicata solo per i gruppi. Per questo raccogliamo le preferenze con la conferma di presenza e il 31 gennaio comunichiamo loro il numero certo di persone.",
  },
  {
    question: "Posso prenotare per conto mio?",
    answer:
      "Certo. Nel modulo RSVP puoi scegliere \"Mi organizzo autonomamente\" e prenotare dove preferisci, anche direttamente sul sito dell'hotel.",
  },
  {
    question: "Quanto costano gli hotel?",
    answer:
      "Sotto ogni struttura trovi una fascia di prezzo indicativa per camera doppia. Il prezzo definitivo dipende dalla tariffa che ci verrà proposta per il gruppo.",
  },
  {
    question: "C'è la navetta?",
    answer:
      "Sì: per chi alloggia negli hotel che vi consigliamo è prevista una navetta dedicata da e per la location. Gli orari saranno comunicati nei giorni precedenti al matrimonio.",
  },
  {
    question: "Dove sono rispetto alla location?",
    answer:
      "Tutte le strutture sono a Cannigione, la stessa località di Li Capanni. Nella mappa qui accanto vedi la zona.",
  },
  {
    question: "Posso cancellare o modificare la prenotazione?",
    answer:
      "Le condizioni di modifica e cancellazione dipendono dalla struttura scelta. Vi consigliamo di verificarle al momento della prenotazione.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      className="
        h-full
        rounded-panel
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