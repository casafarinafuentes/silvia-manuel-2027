/**
 * Costanti condivise tra proxy (Edge) e codice server (Node).
 * Questo file non deve importare né `server-only` né `node:*`.
 */

export const SESSION_COOKIE = "sm_admin";

export const SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 ore

/**
 * Controllo "ottimistico": verifica solo che il cookie abbia la forma
 * giusta e non sia scaduto. NON valida la firma — quella richiede il
 * segreto e `node:crypto`, e avviene lato server in `isAuthenticated`.
 *
 * Serve a scartare subito le richieste palesemente non autenticate,
 * non a decidere chi può vedere i dati.
 */
export function looksLikeLiveSession(token: string | undefined): boolean {
  if (!token) return false;

  const separator = token.lastIndexOf(".");
  if (separator === -1) return false;

  const expiry = Number(token.slice(0, separator));

  return Number.isFinite(expiry) && expiry > Date.now();
}
