"use client";

import ParallaxImage from "@/components/ui/ParallaxImage";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type PageHeroProps = {
  title: string;
  /** Riga in maiuscoletto sotto il titolo: compare in dissolvenza. */
  subtitle: string;
  image: string;
  alt: string;
  /** Classi per l'immagine (es. il punto di messa a fuoco). */
  imageClassName?: string;
  /** Classi per il velo scuro sopra la foto. */
  overlayClassName?: string;
  /** Altezza della sezione: a tutto schermo se non indicata. */
  heightClassName?: string;
};

/**
 * Apertura comune a tutte le pagine interne: titolo grande al centro e
 * sottotitolo in maiuscoletto che compare subito dopo. Avere un solo
 * componente tiene i titoli identici da una pagina all'altra.
 */
export default function PageHero({
  title,
  subtitle,
  image,
  alt,
  imageClassName = "object-cover",
  overlayClassName = "bg-black/25",
  heightClassName = "min-h-screen",
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`relative flex overflow-hidden ${heightClassName}`}>
      {/* Background */}

      <ParallaxImage
        src={image}
        alt={alt}
        priority
        sizes="100vw"
        className={imageClassName}
      />

      {/* Overlay */}

      <div className={`absolute inset-0 ${overlayClassName}`} />

      {/* Content */}

      <div className="relative z-10 flex w-full items-center justify-center px-6 py-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center text-white">
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-heading text-5xl font-light leading-none sm:text-6xl md:text-8xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-xs uppercase tracking-[0.32em] sm:tracking-[0.45em]"
          >
            {subtitle}
          </motion.p>

          <div className="mt-7 h-px w-20 bg-white/60 sm:w-24" />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col items-center"
          >
            <p className="text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em]">
              Scorri
            </p>

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mt-3"
            >
              <ChevronDown size={26} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
