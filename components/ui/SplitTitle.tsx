"use client";

import { motion, useReducedMotion } from "framer-motion";

type SplitTitleProps = {
  text: string;
  className?: string;
  /** Secondi prima che parta la prima lettera. */
  delay?: number;
};

/**
 * Titolo che compare lettera per lettera, con una leggera sfocatura
 * che si scioglie. Lo screen reader legge il testo intero.
 */
export default function SplitTitle({
  text,
  className = "",
  delay = 0.3,
}: SplitTitleProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  let index = 0;

  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, wordIndex, words) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          className="inline-block whitespace-nowrap"
        >
          {[...word].map((char) => {
            const order = index++;

            return (
              <motion.span
                key={order}
                className="inline-block"
                initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.9,
                  delay: delay + order * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}

          {wordIndex < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
