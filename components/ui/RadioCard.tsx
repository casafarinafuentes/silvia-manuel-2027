"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

type RadioCardProps = {
  selected: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
};

export default function RadioCard({
  selected,
  title,
  subtitle,
  onClick,
}: RadioCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        relative
        overflow-hidden
        border
        p-8
        text-left
        transition-all
        duration-300

        ${
          selected
            ? "border-primary bg-[#f8f5ef]"
            : "border-border bg-white hover:border-primary/50"
        }
      `}
    >
      {/* Check */}

      <motion.div
        animate={{
          scale: selected ? 1 : 0,
          opacity: selected ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          absolute
          right-5
          top-5
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          bg-primary
          text-white
        "
      >
        <Check size={16} />
      </motion.div>

      <p className="font-heading text-3xl font-light text-primary">
        {title}
      </p>

      <p className="mt-3 text-secondary">
        {subtitle}
      </p>
    </motion.button>
  );
}