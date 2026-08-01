"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}

      <Image
        src="/matrimonio/hero.jpg"
        alt="Cerimonia"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-heading text-5xl font-light leading-none sm:text-6xl md:text-8xl"
          >
            Il Matrimonio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-[10px] uppercase tracking-[0.32em] sm:text-xs sm:tracking-[0.45em]"
          >
            TUTTI I DETTAGLI DELLA GIORNATA
          </motion.p>

          <div className="mt-7 h-px w-20 bg-white/60 sm:w-24" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col items-center"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] sm:text-[11px] sm:tracking-[0.45em]">
              Scorri
            </p>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mt-3"
            >
              <ChevronDown size={26} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}