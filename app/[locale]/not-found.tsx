import Logo from "@/components/ui/Logo";
import { Link } from "@/i18n/navigation";
import { getM } from "@/i18n/get-messages";
import { siteMessages } from "@/i18n/messages/site";

/**
 * Pagina "non trovata" nella lingua dell'ospite. Gli indirizzi
 * sconosciuti arrivano qui grazie a `[...rest]/page.tsx`.
 */
export default async function NotFound() {
  const m = await getM(siteMessages);

  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <Logo className="h-24 w-auto text-primary" />

      <h1 className="mt-10 font-heading text-4xl font-light text-primary sm:text-5xl">
        {m.notFound.title}
      </h1>

      <p className="mt-5 max-w-md leading-8 text-secondary">{m.notFound.text}</p>

      <Link
        href="/"
        className="mt-10 border-b border-primary pb-1 text-xs uppercase tracking-[0.28em] text-primary transition hover:text-accent"
      >
        {m.notFound.home}
      </Link>
    </main>
  );
}
