"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingLabel?: string;
};

export default function SubmitButton({
  children,
  pendingLabel = "Invio in corso…",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      whileHover={pending ? undefined : "hover"}
      whileTap={pending ? undefined : { scale: 0.985 }}
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
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {/* Background hover */}

      <motion.div
        variants={{
          rest: { x: "-100%" },
          hover: { x: "0%" },
        }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-[#55634d]"
      />

      {/* Testo */}

      <span className="relative z-10 flex items-center gap-4">
        {pending ? pendingLabel : children}

        {pending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <motion.div
            variants={{
              rest: { x: 0 },
              hover: { x: 5 },
            }}
            transition={{ duration: 0.25 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        )}
      </span>
    </motion.button>
  );
}
