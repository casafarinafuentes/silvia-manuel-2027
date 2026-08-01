"use client";

import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      <label className="form-label">
        Numero invitati
      </label>

      <div className="mt-8 flex items-center justify-center gap-8">

        {/* - */}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
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
            bg-white
            transition
            hover:border-primary
          "
        >
          <Minus size={18} />
        </motion.button>

        {/* Numero */}

        <div className="relative flex h-14 min-w-[56px] items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{
                y: 18,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -18,
                opacity: 0,
              }}
              transition={{
                duration: 0.18,
              }}
              className="absolute font-heading text-5xl font-light text-primary"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* + */}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
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
            bg-white
            transition
            hover:border-primary
          "
        >
          <Plus size={18} />
        </motion.button>

      </div>
    </div>
  );
}