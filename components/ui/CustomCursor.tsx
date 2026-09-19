"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Anello che segue il puntatore. Si ingrandisce sui link e sui
 * pulsanti; sugli elementi con `data-cursor="Testo"` mostra quel testo
 * (es. "Scopri" sulle foto).
 *
 * È un'aggiunta: il cursore normale resta visibile. Compare solo con
 * mouse e trackpad, mai sul touch e mai con "riduci movimento".
 */
export default function CustomCursor() {
  const reduceMotion = useReducedMotion();

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;

    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;

      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const labelled = target?.closest?.("[data-cursor]");
      const interactive = target?.closest?.("a, button, [role='button']");

      setLabel(labelled?.getAttribute("data-cursor") ?? null);
      setHovering(Boolean(labelled || interactive));
    }

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion, x, y]);

  // Il cursore compare al primo movimento del mouse: sul touch non
  // scatta mai, quindi resta invisibile.
  if (reduceMotion) return null;

  const size = label ? 88 : hovering ? 52 : 26;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-white mix-blend-difference"
      >
        {label && (
          <span className="text-[11px] uppercase tracking-[0.2em] text-black mix-blend-normal">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
