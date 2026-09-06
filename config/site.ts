/**
 * URL pubblico del sito.
 *
 * Ordine di preferenza:
 *  1. NEXT_PUBLIC_SITE_URL — impostata a mano, vince sempre
 *  2. VERCEL_PROJECT_PRODUCTION_URL — dominio di produzione su Vercel
 *  3. localhost, per lo sviluppo
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;

  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (vercel) {
    return `https://${vercel}`;
  }

  return "http://localhost:3000";
}
