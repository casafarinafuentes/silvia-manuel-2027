"use client";

import ParallaxImage from "@/components/ui/ParallaxImage";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import Link from "next/link";

import SplitTitle from "@/components/ui/SplitTitle";
import Magnetic from "@/components/ui/Magnetic";
import Countdown from "@/components/ui/Countdown";
import { wedding } from "@/config/wedding";
import SiteMenu from "@/components/layout/Menu";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}

      <ParallaxImage
        src="/hero.jpg"
        alt="Li Capanni"
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}

      {/* Velo a gradiente: scurisce di più dove sta il testo (titolo al
          centro, countdown in basso) e lascia respirare la foto sopra. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55" />

      {/* Sfumatura in basso: la foto si scioglie nel colore della pagina. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-b from-transparent to-background" />

      {/* Top Bar */}

      <div className="absolute left-0 top-0 z-20 flex w-full items-center justify-between p-6 text-white">
        <div className="font-heading text-3xl tracking-[0.25em]">
          SM
        </div>

        <SiteMenu variant="light" />
      </div>

      {/* Contenuto */}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white"
      >
        <h1 className="font-heading text-6xl font-light md:text-8xl">
          <SplitTitle
            text={`${wedding.couple.bride} & ${wedding.couple.groom}`}
          />
        </h1>

        <p className="mt-8 text-sm uppercase tracking-[0.35em]">
          12 GIUGNO 2027
        </p>

        <div className="mt-5 h-px w-32 bg-white/60" />

        <p className="mt-5 text-xs uppercase tracking-[0.25em]">
          {wedding.location.venue}
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.18em] opacity-90">
          {wedding.location.address.locality},{" "}
          {wedding.location.address.region}
        </p>

        {/* Countdown */}

        <div className="mt-12">
          <Countdown variant="hero" />
        </div>

        <Magnetic className="mt-10">
          <Link href="/rsvp"
          className="inline-flex items-center gap-3 border border-white bg-white px-8 py-3.5 text-xs uppercase tracking-[0.28em] text-[#2f2b28] transition hover:bg-transparent hover:text-white"
        >
          Conferma la tua presenza
        </Link>
        </Magnetic>
      </motion.div>

      {/* Scroll */}

      {/* L'indicatore oscilla in continuo: lo fermiamo del tutto per
          chi ha chiesto meno animazioni. */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-center text-primary"
      >
        <p className="mb-2 text-xs uppercase tracking-[0.35em]">
          Scorri
        </p>

        <ChevronDown size={28} aria-hidden="true" className="block" />
      </motion.div>
    </section>
  );
}