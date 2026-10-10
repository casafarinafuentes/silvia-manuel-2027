"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clientIp } from "@/lib/request";
import {
  deleteRsvp,
  isAdminLoginLimited,
  recordAdminLoginFailure,
} from "@/lib/rsvp/repository";

import {
  endSession,
  isAuthenticated,
  startSession,
  verifyPassword,
} from "./session";

export type LoginState = { error?: string };

export async function login(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Inserisci la password." };
  }

  const ip = await clientIp();

  // Se il database non risponde non chiudiamo fuori l'admin: il
  // limite è una protezione in più, non l'unica difesa (la password
  // resta comunque obbligatoria).
  try {
    if (await isAdminLoginLimited(ip)) {
      return {
        error: "Troppi tentativi. Riprova tra qualche minuto.",
      };
    }
  } catch (error) {
    console.error("[admin] rate limit non disponibile", error);
  }

  let ok = false;

  try {
    ok = verifyPassword(password);
  } catch (error) {
    console.error("[admin] configurazione mancante", error);
    return { error: "Area admin non configurata." };
  }

  if (!ok) {
    try {
      await recordAdminLoginFailure(ip);
    } catch (error) {
      console.error("[admin] tentativo non registrato", error);
    }

    return { error: "Password non corretta." };
  }

  await startSession();

  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Elimina le conferme spuntate nell'elenco (prove, doppioni).
 *
 * Una server action è raggiungibile da chiunque conosca il suo
 * indirizzo: la sessione va verificata qui, non basta che il pulsante
 * stia in una pagina protetta.
 */
export async function removeRsvp(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const ids = formData
    .getAll("id")
    .filter((id): id is string => typeof id === "string" && UUID.test(id));

  await deleteRsvp(ids);

  revalidatePath("/admin");
}
