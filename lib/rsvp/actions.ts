"use server";

import { clientIp } from "@/lib/request";
import { isPastRsvpDeadline } from "./deadline";
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

export async function submitRsvp(
  _previous: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const parsed = parseRsvp(
    {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    attending: formData.get("attending"),
    partySize: formData.get("partySize"),
    dietary: formData.get("dietary"),
    hotel: formData.get("hotel"),
    message: formData.get("message"),
    },
    { hotelRequired: !isPastRsvpDeadline() },
  );

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
