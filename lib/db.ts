import "server-only";

import { Pool } from "pg";

/**
 * Pool Postgres condiviso.
 *
 * In sviluppo Next ricarica i moduli a ogni modifica: senza cache sul
 * globale ogni reload aprirebbe un nuovo pool ed esauriremmo le
 * connessioni del database.
 */

const globalForDb = globalThis as unknown as {
  rsvpPool: Pool | undefined;
};

function connectionString(): string {
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL;

  if (!url) {
    throw new Error(
      "Database non configurato: manca DATABASE_URL (o POSTGRES_URL). " +
        "Vedi .env.example.",
    );
  }

  return url;
}

export function getPool(): Pool {
  if (!globalForDb.rsvpPool) {
    globalForDb.rsvpPool = new Pool({
      connectionString: connectionString(),
      // I Postgres gestiti (Neon, Supabase, Vercel) richiedono TLS ma
      // presentano certificati che Node non verifica di default.
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }

  return globalForDb.rsvpPool;
}

export async function query<T extends Record<string, unknown>>(
  text: string,
  params: readonly unknown[] = [],
): Promise<T[]> {
  const result = await getPool().query<T>(text, params as unknown[]);
  return result.rows;
}

/** True se è configurata una connessione al database. */
export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.DATABASE_URL ??
      process.env.POSTGRES_URL ??
      process.env.POSTGRES_PRISMA_URL,
  );
}
