"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type BackgroundVideoProps = {
  mp4: string;
  webm?: string;
  /** Versioni più leggere, servite sotto i 768px (vedi <source media>). */
  mobileMp4?: string;
  mobileWebm?: string;
  /** Fotogramma mostrato finché il video non è pronto a partire. */
  poster: string;
  className?: string;
};

/**
 * True se il video ha senso acceso: niente "riduci movimento" e niente
 * connessioni a risparmio dati. Sotto i 768px parte comunque, ma con i
 * file più leggeri (vedi `mobileMp4`/`mobileWebm`): è così che la
 * maggior parte degli ospiti vedrà il sito, quindi non ha senso
 * escluderli a priori — il peso si tiene basso scegliendo il file
 * giusto, non disattivando il video.
 *
 * Modellato come store esterno, come il countdown: il risultato dipende
 * da `window`/`navigator`, quindi non esiste prima del mount, e risponde
 * da solo se il visitatore cambia le preferenze di sistema mentre la
 * pagina è aperta.
 */
function shouldPlay(): boolean {
  if (typeof window === "undefined") return false;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // API non standard, supportata solo da alcuni browser: assente altrove,
  // quindi la assumiamo "false" quando non è disponibile.
  const connection = (
    navigator as unknown as { connection?: { saveData?: boolean } }
  ).connection;

  return !reduceMotion && !connection?.saveData;
}

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

function getServerSnapshot(): boolean {
  return false;
}

export default function BackgroundVideo({
  mp4,
  webm,
  mobileMp4,
  mobileWebm,
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
      {/* Il browser sceglie la prima sorgente la cui `media` combacia,
          una volta sola al caricamento: niente da ricalcolare noi. */}
      {mobileWebm && (
        <source media="(max-width: 767px)" src={mobileWebm} type="video/webm" />
      )}
      {mobileMp4 && (
        <source media="(max-width: 767px)" src={mobileMp4} type="video/mp4" />
      )}
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
