"use client";

import { Plus } from "lucide-react";

type AccordionProps = {
  title: string;
  content: string;
  /** Pulsante facoltativo sotto il testo (link esterno). */
  action?: { label: string; href: string };
  open: boolean;
  onToggle: () => void;
};

export default function Accordion({
  title,
  content,
  action,
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

          {action && (
            <a
              href={action.href}
              target="_blank"
              rel="noreferrer"
              tabIndex={open ? undefined : -1}
              className="mb-5 inline-flex items-center justify-center bg-primary px-6 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:opacity-90"
            >
              {action.label} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}