"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

type MagneticProps = {
  children: React.ReactNode;
  /** 0 = fermo, 0.3 = segue molto il puntatore. */
  strength?: number;
  className?: string;
};

/**
 * Il pulsante si sposta leggermente verso il puntatore quando gli sei
 * vicino. Solo con il mouse: sul touch e con "riduci movimento" resta
 * dov'è.
 */
export default function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 16 });
  const springY = useSpring(y, { stiffness: 220, damping: 16 });

  function onMove(event: React.PointerEvent) {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;

    const box = ref.current.getBoundingClientRect();

    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
