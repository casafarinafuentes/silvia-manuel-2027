import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Envelope from "@/components/invito/Envelope";
import InvitationCard from "@/components/invito/InvitationCard";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { initLocale } from "@/i18n/init-locale";
import { isLocale } from "@/i18n/locales";
import { getM } from "@/i18n/get-messages";
import { resolve } from "@/i18n/pair";
import { inviteMessages } from "@/i18n/messages/invite";
import { crimson, corinthia } from "@/app/fonts";
import { isRsvpClosed } from "@/lib/temporal";
import { currentTemporalContext } from "@/lib/temporal-now";

import styles from "@/components/invito/invito.module.css";

/**
 * Invito interattivo, per chi non può ricevere quello di carta in
 * tempo (parenti lontani, amici all'estero).
 *
 * La pagina non esiste per chi non ha il link esatto: l'indirizzo
 * contiene un segreto (`INVITE_SLUG`, in variabile d'ambiente: il
 * repository è pubblico, quindi non può stare nel codice). Qualsiasi
 * altro indirizzo risponde "non trovata". Non è in sitemap, non è in
 * robots.txt e porta `noindex`.
 *
 * In sviluppo, senza variabile, vale "prova".
 */
export const dynamic = "force-dynamic";

function validSlug(slug: string): boolean {
  const expected =
    process.env.INVITE_SLUG ??
    (process.env.NODE_ENV === "production" ? undefined : "prova");

  return Boolean(expected) && slug === expected;
}

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale) || !validSlug(slug)) return {};

  const m = resolve(inviteMessages.metadata, locale);

  return {
    title: m.title,
    description: m.description,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function InvitoPage({ params }: PageProps) {
  await initLocale(params);

  const { slug } = await params;

  if (!validSlug(slug)) notFound();

  const m = await getM(inviteMessages);
  const rsvpOpen = !isRsvpClosed(currentTemporalContext().phase);

  return (
    <main
      id="main"
      tabIndex={-1}
      className={`${crimson.variable} ${corinthia.variable} relative flex min-h-svh flex-col items-center justify-center overflow-x-clip px-4 pb-10 pt-16 focus:outline-none`}
    >
      <div className="absolute right-5 top-5">
        <LanguageSwitcher variant="dark" />
      </div>

      <Envelope
        card={<InvitationCard rsvpOpen={rsvpOpen} />}
        actions={
          <div className="flex flex-col items-center gap-6 text-center">
            {rsvpOpen && (
              <Link href="/rsvp" className={styles.primary}>
                {m.actions.rsvp}
                <span aria-hidden="true">→</span>
              </Link>
            )}

            <Link href="/" className={styles.secondary}>
              {m.actions.site}
            </Link>

            <p className="max-w-xs text-sm leading-6 text-secondary">
              {m.actions.note}
            </p>
          </div>
        }
      />
    </main>
  );
}
