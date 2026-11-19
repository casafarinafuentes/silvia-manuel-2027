"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useLocale } from "next-intl";

import { fill } from "@/i18n/pair";
import { rsvpDeadlineLabel } from "@/lib/rsvp/deadline";
import { useM } from "@/i18n/use-messages";
import { hotelMessages } from "@/i18n/messages/hotel";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { faq: t } = useM(hotelMessages);
  const date = rsvpDeadlineLabel(useLocale());
  const faqs = t.items;

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
        {t.title}
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
                      ? "max-h-[40rem] pb-6"
                      : "max-h-0"
                  }
                `}
              >
                <p className="max-w-xl pr-10 leading-7 text-secondary">
                  {fill(faq.answer, { date })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}