"use client";

import { useState } from "react";

import Divider from "@/components/ui/Divider";
import Accordion from "@/components/ui/Accordion";

import {
  practicalInfoLeft,
  practicalInfoRight,
} from "@/data/faq";

export default function FaqColumn() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div>
      <Divider
        title="FAQ"
        className="mb-6"
      />

      <div className="grid gap-y-6 gap-x-12 lg:grid-cols-2">
        {[
          practicalInfoLeft,
          practicalInfoRight,
        ].map((column, columnIndex) => (
          <div className="space-y-0" key={columnIndex}>
            {column.map((item) => (
              <Accordion
                key={item.title}
                title={item.title}
                content={item.content}
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