"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type BackgroundVideoProps = {
  mp4: string;
  webm?: string;
  /** Fotogramma mostrato finché il video non è pronto a partire. */
  poster: string;
  className?: string;
};

/**
 * True se il video ha senso acceso: niente "riduci movimento", niente
 * schermi stretti (il guadagno visivo non vale il peso dei dati su
 * mobile) e niente connessioni a risparmio dati.
 *
 * Modellato come store esterno, come il countdown: il risultato dipende
 * da `window`/`navigator`, quindi non esiste prima del mount, e risponde
 * da solo se il visitatore ruota lo schermo o cambia le preferenze di
 * sistema mentre la pagina è aperta.
 */
function shouldPlay(): boolean {
  if (typeof window === "undefined") return false;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const narrow = window.matchMedia("(max-width: 767px)").matches;

  // API non standard, supportata solo da alcuni browser: assente altrove,
  // quindi la assumiamo "false" quando non è disponibile.
  const connection = (
    navigator as unknown as { connection?: { saveData?: boolean } }
  ).connection;

  return !reduceMotion && !narrow && !connection?.saveData;
}

function subscribe(onChange: () => void): () => void {
  const queries = [
    window.matchMedia("(prefers-reduced-motion: reduce)"),
    window.matchMedia("(max-width: 767px)"),
  ];

  for (const query of queries) query.addEventListener("change", onChange);

  return () => {
    for (const query of queries) query.removeEventListener("change", onChange);
  };
}

function getServerSnapshot(): boolean {
  return false;
}

export default function BackgroundVideo({
  mp4,
  webm,
  poster,
  className = "",
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const enabled = useSyncExternalStore(subscribe, shouldPlay, getServerSnapshot);

  useEffect(() => {
    // L'autoplay muto può fallire se il browser non vede `muted` a
    // tempo: impostarlo anche via DOM, non solo via prop, è la rete di
    // sicurezza per questo bug noto di React sugli elementi media.
    if (videoRef.current) videoRef.current.muted = true;
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="auto"
      poster={poster}
      onCanPlay={() => setReady(true)}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
