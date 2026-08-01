"use client";

import { Plus } from "lucide-react";

type AccordionProps = {
  title: string;
  content: string;
  open: boolean;
  onToggle: () => void;
};

export default function Accordion({
  title,
  content,
  open,
  onToggle,
}: AccordionProps) {
  return (
    <div className="border-b border-border/70">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-base text-primary transition-colors group-hover:text-accent">
          {title}
        </span>

        <Plus
          size={16}
          strokeWidth={1.6}
          className={`text-secondary transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 pr-6 text-sm leading-7 text-secondary">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}