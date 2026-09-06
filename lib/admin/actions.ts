"use server";

import { redirect } from "next/navigation";

import { endSession, startSession, verifyPassword } from "./session";

export type LoginState = { error?: string };

export async function login(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Inserisci la password." };
  }

  let ok = false;

  try {
    ok = verifyPassword(password);
  } catch (error) {
    console.error("[admin] configurazione mancante", error);
    return { error: "Area admin non configurata." };
  }

  if (!ok) {
    return { error: "Password non corretta." };
  }

  await startSession();

  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}
