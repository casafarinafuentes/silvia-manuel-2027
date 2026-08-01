"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[470px] overflow-hidden">
      {/* Background */}

      <Image
        src="/rsvp/rsvp-hero.jpg"
        alt="RSVP"
        fill
        priority
        className="object-cover object-[center_28%]"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-white/15" />

      {/* Content */}

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex h-full items-start justify-center pt-10"
      >
        <div className="text-center text-primary">
          <h1 className="font-heading text-[88px] font-light leading-none md:text-[108px]">
            RSVP
          </h1>

          <div className="mt-5 flex items-center justify-center">
            <div className="h-px w-16 bg-[#c8b79d]" />

            <span className="mx-5 text-lg text-[#b99d75]">
              ❦
            </span>

            <div className="h-px w-16 bg-[#c8b79d]" />
          </div>

          <p className="mt-6 font-heading text-[25px] italic leading-[1.35] md:text-[28px]">
            Conferma la tua presenza
            <br />
            entro il 30 aprile 2027.
          </p>
        </div>
      </motion.div>
    </section>
  );
}