"use client";

import { useEffect, useRef, useState } from "react";

import { useM } from "@/i18n/use-messages";
import { inviteMessages } from "@/i18n/messages/invite";

import styles from "./invito.module.css";

type Phase = "closed" | "seal" | "flap" | "rise" | "reveal" | "open";

/** Quando (in ms dal tocco) scatta ogni fase dell'apertura. */
const SCHEDULE: [Phase, number][] = [
  ["seal", 0],
  ["flap", 420],
  ["rise", 1380],
  ["reveal", 2330],
  ["open", 3650],
];

/**
 * La busta del invito: chiusa con il sigillo, si apre al tocco, la
 * cartolina esce e si ingrandisce, poi compaiono i pulsanti.
 *
 * Le immagini e i testi arrivano da fuori (`card`, `actions`): qui c'è
 * solo la regia dell'animazione, che è tutta CSS (invito.module.css) e
 * si governa con `data-phase`.
 */
export default function Envelope({
  card,
  actions,
}: {
  card: React.ReactNode;
  actions: React.ReactNode;
}) {
  const m = useM(inviteMessages);

  const [phase, setPhase] = useState<Phase>("closed");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;

    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  function openEnvelope() {
    if (phase !== "closed") return;

    // Con "riduci movimento" niente teatro: si apre subito.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("open");
      return;
    }

    for (const [next, delay] of SCHEDULE) {
      timers.current.push(window.setTimeout(() => setPhase(next), delay));
    }
  }

  const isOpen = phase === "open";

  return (
    <div className={styles.wrap}>
      <div className={styles.scene} data-phase={phase}>
        {/* Intestazione: occupa lo spazio dove si alzerà la patta. */}
        <div className={styles.header} aria-hidden={phase !== "closed"}>
          <p className={styles.eyebrow}>{m.header.eyebrow}</p>
          <p className={styles.names}>{m.header.names}</p>
        </div>

        <div className={`${styles.layer} ${styles.back}`} aria-hidden="true" />

        <div className={styles.cardSlot} inert={!isOpen}>
          {card}
        </div>

        <svg
          className={`${styles.layer} ${styles.front}`}
          viewBox="0 0 600 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 300,150 600,0 600,400 0,400" fill="#889777" />
          {/* Pieghe del davanti: dai due angoli in basso verso il centro. */}
          <g fill="none" strokeLinecap="round">
            <path d="M0 400 L300 150" stroke="rgba(52,66,45,.5)" strokeWidth="1.4" />
            <path d="M600 400 L300 150" stroke="rgba(52,66,45,.5)" strokeWidth="1.4" />
            <path d="M0 400 L300 150" stroke="rgba(255,255,255,.14)" strokeWidth="1" transform="translate(1.5 1.5)" />
            <path d="M600 400 L300 150" stroke="rgba(255,255,255,.14)" strokeWidth="1" transform="translate(-1.5 1.5)" />
          </g>
          <rect x="0" y="0" width="600" height="400" fill="none" stroke="rgba(52,66,45,.35)" strokeWidth="1.2" />
        </svg>

        <div className={styles.flapShadow} aria-hidden="true" />

        <div className={styles.flap} aria-hidden="true">
          <div className={`${styles.flapFace} ${styles.flapFront}`} />
          <div className={`${styles.flapFace} ${styles.flapBack}`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/invito/seal.webp"
            alt=""
            width={477}
            height={468}
            className={styles.seal}
          />
        </div>

        <button
          type="button"
          className={styles.hit}
          onClick={openEnvelope}
          disabled={phase !== "closed"}
          aria-label={`${m.envelope.open}. ${m.envelope.sealed}`}
        />
      </div>

      <div className={styles.under}>
        <p className={styles.hint}>{m.envelope.hint}</p>

        <div className={styles.actions} inert={!isOpen}>
          {actions}
        </div>
      </div>

      <p className="sr-only" role="status">
        {isOpen ? m.envelope.opened : ""}
      </p>
    </div>
  );
}
