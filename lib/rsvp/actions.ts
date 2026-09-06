"use server";

import { headers } from "next/headers";

import { parseRsvp, type RsvpFieldErrors } from "./schema";
import {
  DuplicateRsvpError,
  insertRsvp,
  isRateLimited,
  recordAttempt,
} from "./repository";

export type RsvpState =
  | { status: "idle" }
  | { status: "success"; attending: boolean; firstName: string }
  | { status: "error"; errors: RsvpFieldErrors };

async function clientIp(): Promise<string> {
  const headerList = await headers();

  // Vercel valorizza x-forwarded-for; il primo valore è il client.
  const forwarded = headerList.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return headerList.get("x-real-ip") ?? "unknown";
}

export async function submitRsvp(
  _previous: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const parsed = parseRsvp({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    attending: formData.get("attending"),
    partySize: formData.get("partySize"),
    dietary: formData.get("dietary"),
    message: formData.get("message"),
  });

  if (!parsed.ok) {
    return { status: "error", errors: parsed.errors };
  }

  const ip = await clientIp();

  try {
    if (await isRateLimited(ip)) {
      return {
        status: "error",
        errors: {
          form: "Hai inviato troppe conferme di seguito. Riprova tra un'ora.",
        },
      };
    }

    await recordAttempt(ip);
    await insertRsvp(parsed.data);
  } catch (error) {
    if (error instanceof DuplicateRsvpError) {
      return {
        status: "error",
        errors: {
          form:
            "Risulta già una conferma con questo nome. " +
            "Se devi correggere qualcosa, scrivici pure.",
        },
      };
    }

    // Il dettaglio resta nei log del server: al visitatore non
    // mostriamo mai errori del database.
    console.error("[rsvp] invio fallito", error);

    return {
      status: "error",
      errors: {
        form:
          "Non siamo riusciti a salvare la conferma. " +
          "Riprova tra poco o scrivici.",
      },
    };
  }

  return {
    status: "success",
    attending: parsed.data.attending,
    firstName: parsed.data.firstName,
  };
}
