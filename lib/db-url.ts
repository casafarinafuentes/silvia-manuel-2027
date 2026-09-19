/**
 * Toglie dall'URL Postgres i parametri che decidono la verifica TLS.
 *
 * `pg` dà la precedenza a ciò che trova nell'URL (sslmode=require /
 * verify-full …) rispetto all'opzione `ssl` passata al Pool. I Postgres
 * gestiti (Supabase, Neon, Vercel) presentano una catena di certificati
 * che Node non riconosce, e con sslmode nell'URL la connessione cade con
 * "self-signed certificate in certificate chain". Rimuovendoli, vale la
 * scelta esplicita fatta in lib/db.ts (TLS attivo, catena non verificata).
 */
const TLS_PARAMS = [
  "sslmode",
  "ssl",
  "sslrootcert",
  "sslcert",
  "sslkey",
  "sslcrl",
  "uselibpqcompat",
];

export function stripTlsParams(connectionString: string): string {
  try {
    const url = new URL(connectionString);

    for (const name of TLS_PARAMS) {
      url.searchParams.delete(name);
    }

    return url.toString();
  } catch {
    // URL non parsabile (es. password con caratteri speciali non
    // codificati): meglio lasciarlo com'è che romperlo.
    return connectionString;
  }
}
