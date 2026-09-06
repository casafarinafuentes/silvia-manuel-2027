import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

import { SESSION_COOKIE, SESSION_DURATION_MS } from "./constants";

/**
 * Sessione admin minimale.
 *
 * Il cookie contiene una scadenza firmata con HMAC. Non c'è nulla di
 * segreto al suo interno: senza il segreto sul server la firma non è
 * falsificabile, e senza firma valida il cookie viene ignorato.
 */

export { SESSION_COOKIE };

function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET;

  if (!value || value.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET mancante o troppo corta (min 16 caratteri). " +
        "Vedi .env.example.",
    );
  }

  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Confronto a tempo costante, per non rivelare nulla dalla durata. */
function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return timingSafeEqual(bufferA, bufferB);
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    throw new Error("ADMIN_PASSWORD non configurata. Vedi .env.example.");
  }

  return safeEqual(candidate, expected);
}

export function createToken(): string {
  const expiresAt = String(Date.now() + SESSION_DURATION_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;

  const separator = token.lastIndexOf(".");
  if (separator === -1) return false;

  const expiresAt = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  if (!safeEqual(signature, sign(expiresAt))) {
    return false;
  }

  const expiry = Number(expiresAt);

  return Number.isFinite(expiry) && expiry > Date.now();
}

export async function startSession(): Promise<void> {
  const store = await cookies();

  store.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidToken(store.get(SESSION_COOKIE)?.value);
}
