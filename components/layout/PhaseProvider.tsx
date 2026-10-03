"use client";

import { createContext, useContext } from "react";

import type { WeddingPhase } from "@/lib/temporal";

/**
 * La fase la calcola il server (lib/temporal-now.ts) e arriva qui già
 * decisa: i componenti client la leggono con `usePhase()` invece di
 * guardare l'orologio del visitatore, così server e browser disegnano
 * sempre la stessa pagina.
 */
const PhaseContext = createContext<WeddingPhase>("rsvp");

export function PhaseProvider({
  phase,
  children,
}: {
  phase: WeddingPhase;
  children: React.ReactNode;
}) {
  return <PhaseContext.Provider value={phase}>{children}</PhaseContext.Provider>;
}

export function usePhase(): WeddingPhase {
  return useContext(PhaseContext);
}
