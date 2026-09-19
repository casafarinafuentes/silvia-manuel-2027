import "server-only";

import { headers } from "next/headers";

/**
 * IP del client, così come lo vede il server.
 *
 * Vercel valorizza x-forwarded-for: il primo valore è il client.
 * Serve solo per il rate limiting, dove l'IP viene subito hashato.
 */
export async function clientIp(): Promise<string> {
  const headerList = await headers();

  const forwarded = headerList.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return headerList.get("x-real-ip") ?? "unknown";
}
