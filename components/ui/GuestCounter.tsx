"use client";

import { Minus, Plus } from "lucide-react";

type GuestCounterProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function GuestCounter({
  value,
  onChange,
}: GuestCounterProps) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.32em] text-secondary">
        Numero invitati
      </label>

      <div className="mt-6 flex items-center gap-8">

        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-border
            transition
            duration-300
            hover:border-primary
            hover:bg-background
          "
        >
          <Minus size={18} />
        </button>

        <span className="min-w-[32px] text-center font-heading text-5xl font-light text-primary">
          {value}
        </span>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-border
            transition
            duration-300
            hover:border-primary
            hover:bg-background
          "
        >
          <Plus size={18} />
        </button>

      </div>
    </div>
  );
}