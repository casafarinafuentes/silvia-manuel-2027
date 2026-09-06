"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { login, type LoginState } from "@/lib/admin/actions";

const INITIAL: LoginState = {};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        mt-8
        w-full
        bg-primary
        px-8
        py-3.5
        text-[11px]
        uppercase
        tracking-[0.3em]
        text-white
        transition
        hover:bg-[#55634d]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {pending ? "Verifica…" : "Entra"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, INITIAL);

  return (
    <form action={formAction} className="mt-10">
      <label
        htmlFor="password"
        className="block text-[10px] uppercase tracking-[0.32em] text-secondary"
      >
        Password
      </label>

      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        aria-describedby={state.error ? "login-error" : undefined}
        className="
          mt-4
          w-full
          border-0
          border-b
          border-border
          bg-transparent
          pb-3
          text-lg
          text-primary
          outline-none
          transition
          focus:border-primary
        "
      />

      {state.error && (
        <p
          id="login-error"
          role="alert"
          className="mt-4 text-sm text-[#a4553f]"
        >
          {state.error}
        </p>
      )}

      <Submit />
    </form>
  );
}
