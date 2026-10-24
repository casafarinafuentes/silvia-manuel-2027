import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Countdown from "@/components/ui/Countdown";
import Logo from "@/components/ui/Logo";
import { googleCalendarUrl } from "@/lib/calendar";
import { currentTemporalContext } from "@/lib/temporal-now";
import Lines from "@/components/ui/Lines";
import { useM } from "@/i18n/use-messages";
import { siteMessages } from "@/i18n/messages/site";
import { uiMessages } from "@/i18n/messages/ui";

export default function Footer() {
  const locale = useLocale();
  const { phase } = currentTemporalContext();
  const after = phase === "after";
  const weddingDay = phase === "wedding";
  const site = useM(siteMessages);
  const ui = useM(uiMessages);
  const f = ui.footer;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-12 lg:grid lg:grid-cols-[120px_2.2fr_1fr_1fr] lg:items-start lg:gap-10 lg:px-10">
        {/* Logo */}

        <div className="flex w-full justify-center lg:w-auto lg:justify-start">
          <Logo className="h-32 w-auto text-primary" />
        </div>

        {/* Countdown */}

        <div className="w-full text-center lg:border-l lg:border-border lg:pl-10 lg:text-left">
          {after ? (
            <>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-secondary">
                {site.date}
              </p>

              <p className="font-heading text-3xl font-light text-primary sm:text-4xl">
                {ui.thanks}
              </p>
            </>
          ) : (
            <>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-secondary">
                {weddingDay ? site.date : f.countdown}
              </p>

              <div className="flex justify-center lg:justify-start">
                <Countdown />
              </div>
            </>
          )}
        </div>

        {/* FAQ */}

        <div className="w-full text-center lg:border-l lg:border-border lg:pl-10 lg:text-left">
          {/* A matrimonio passato le FAQ non ci sono più: al loro posto
              l'invio delle foto. */}
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            {after ? f.photosTitle : f.faqTitle}
          </p>

          {after ? (
            <p className="mt-5 text-sm leading-7 text-secondary">
              <Lines text={f.photosText} />
            </p>
          ) : (
            <p className="mt-5 text-sm leading-7 text-secondary">
              <Lines text={f.faqText} />
            </p>
          )}

          <Link
            href={after ? "/matrimonio#foto" : "/matrimonio#faq"}
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary transition hover:text-accent"
          >
            {after ? f.photosLink : f.faqLink}
          </Link>
        </div>

        {/* Contatti */}

        <div className="w-full text-center lg:border-l lg:border-border lg:pl-10 lg:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-secondary">
            {f.contactsTitle}
          </p>

          <p className="mt-5 text-sm leading-7 text-secondary">
            <Lines text={f.contactsText} />
          </p>

          <Link
            href="/rsvp#contatti"
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary transition hover:text-accent"
          >
            {f.contactsLink}
          </Link>

          <Image
            src="/decorations/branch.webp"
            alt=""
            width={120}
            height={120}
            className="object-contain pointer-events-none absolute bottom-0 right-0 hidden opacity-15 lg:block"
          />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-5">
          <p className="text-center text-xs text-secondary">
            {f.withLove}{" "}
            <span className="text-primary">
              Silvia &amp; Manuel
            </span>{" "}
            ♡
          </p>

          {/* Dal giorno del matrimonio non serve più segnarselo. */}
          {!after && !weddingDay && (
            <>
              <span
                aria-hidden="true"
                className="hidden h-3 w-px bg-border sm:block"
              />

              <a
                href={locale === "it" ? "/calendario" : `/${locale}/calendario`}
                className="text-xs text-secondary transition hover:text-primary"
              >
                {f.addToCalendar}
              </a>

              <span
                aria-hidden="true"
                className="hidden h-3 w-px bg-border sm:block"
              />

              {/* Per Android: apre l'evento già compilato, senza file. */}
              <a
                href={googleCalendarUrl(locale)}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-secondary transition hover:text-primary"
              >
                {f.googleCalendar}
              </a>
            </>
          )}

          <span
            aria-hidden="true"
            className="hidden h-3 w-px bg-border sm:block"
          />

          <Link
            href="/lista-nozze"
            className="text-xs text-secondary transition hover:text-primary"
          >
            {f.gift}
          </Link>
        </div>
      </div>
    </footer>
  );
}