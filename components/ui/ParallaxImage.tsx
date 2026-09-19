"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type ParallaxImageProps = Omit<ImageProps, "fill"> & {
  /** Quanto si sposta la foto rispetto allo scroll, in % (default 10). */
  strength?: number;
};

/**
 * Immagine a riempimento con effetto parallax: durante lo scroll la
 * foto scorre più lentamente del resto della pagina.
 *
 * Il contenitore padre deve essere `relative` e avere una dimensione.
 * Con "riduci movimento" attivo la foto resta ferma.
 */
export default function ParallaxImage({
  strength = 10,
  className = "",
  alt,
  ...props
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`],
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={reduceMotion ? undefined : { y }}
        // Più alta del contenitore: lo spostamento non scopre mai i bordi.
        className={
          reduceMotion
            ? "absolute inset-0"
            : "absolute inset-x-0 -bottom-[15%] -top-[15%]"
        }
      >
        <Image {...props} alt={alt} fill className={className} />
      </motion.div>
    </div>
  );
}
