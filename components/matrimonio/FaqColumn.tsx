"use client";

import { useState } from "react";

import Divider from "@/components/ui/Divider";
import Accordion from "@/components/ui/Accordion";
import { usePhase } from "@/components/layout/PhaseProvider";

import { useLocale } from "next-intl";

import { getPracticalInfo } from "@/data/faq";
import { useM } from "@/i18n/use-messages";
import { matrimonioMessages } from "@/i18n/messages/matrimonio";

export default function FaqColumn() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const { faq } = useM(matrimonioMessages);
  const { left, right } = getPracticalInfo(usePhase(), useLocale());

  return (
    <div>
      <Divider
        title={faq.title}
        className="mb-6"
      />

      <div className="grid gap-y-6 gap-x-12 lg:grid-cols-2">
        {[left, right].map((column, columnIndex) => (
          <div className="space-y-0" key={columnIndex}>
            {column.map((item) => (
              <Accordion
                key={item.title}
                title={item.title}
                content={item.content}
                action={item.action}
                open={openItem === item.title}
                onToggle={() =>
                  setOpenItem(
                    openItem === item.title
                      ? null
                      : item.title
                  )
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
