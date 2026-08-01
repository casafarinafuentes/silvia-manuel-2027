"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type SubmitButtonProps = {
  children: React.ReactNode;
};

export default function SubmitButton({
  children,
}: SubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      whileHover="hover"
      whileTap={{ scale: 0.985 }}
      initial="rest"
      animate="rest"
      className="
        group
        relative
        inline-flex
        items-center
        justify-center
        overflow-hidden
        border
        border-primary
        bg-primary
        px-12
        py-4
        text-[11px]
        uppercase
        tracking-[0.32em]
        text-white
      "
    >
      {/* Background hover */}

      <motion.div
        variants={{
          rest: {
            x: "-100%",
          },
          hover: {
            x: "0%",
          },
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          absolute
          inset-0
          bg-[#55634d]
        "
      />

      {/* Testo */}

      <span className="relative z-10 flex items-center gap-4">

        {children}

        <motion.div
          variants={{
            rest: {
              x: 0,
            },
            hover: {
              x: 5,
            },
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <ArrowRight size={16} />
        </motion.div>

      </span>
    </motion.button>
  );
}