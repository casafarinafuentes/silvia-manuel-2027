import type { Metadata } from "next";

import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Area riservata",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <p className="text-[10px] uppercase tracking-[0.38em] text-secondary">
          Silvia &amp; Manuel
        </p>

        <h1 className="mt-4 font-heading text-4xl font-light text-primary">
          Area riservata
        </h1>

        <p className="mt-4 text-sm leading-6 text-secondary">
          Inserisci la password per consultare le conferme.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
