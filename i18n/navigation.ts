import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Al posto di `next/link` e `next/navigation`: aggiungono da soli il
 * prefisso della lingua corrente (`/es/rsvp`) e mantengono la scelta
 * dell'ospite mentre naviga.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
