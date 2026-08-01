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
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 20,
      }}
      className={`
        relative
        overflow-hidden
        rounded-[24px]
        border
        p-8
        text-left
        transition-all
        duration-300

        ${
          selected
            ? "border-primary bg-[#faf8f3]"
            : "border-border bg-white hover:border-primary/50 hover:bg-[#fcfbf8]"
        }
      `}
    >
      {/* Check */}

      <motion.div
        initial={false}
        animate={{
          scale: selected ? 1 : 0,
          opacity: selected ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 18,
        }}
        className="
          absolute
          right-6
          top-6
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-primary
          text-white
        "
      >
        <Check size={16} />
      </motion.div>

      <h3 className="font-heading text-3xl font-light text-primary">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-secondary">
        {subtitle}
      </p>
    </motion.button>
  );
}