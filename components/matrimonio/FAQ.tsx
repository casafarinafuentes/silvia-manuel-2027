"use client";

import { useState } from "react";

import Divider from "@/components/ui/Divider";
import Accordion from "@/components/ui/Accordion";

import { practicalInfoLeft } from "@/data/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <Divider
        title="FAQ"
        className="mb-10"
      />

      {practicalInfoLeft.map((item, index) => (
        <Accordion
          key={item.title}
          title={item.title}
          content={item.content}
          open={openIndex === index}
          onToggle={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
}