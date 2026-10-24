"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { localeCodes, localeNames, locales, type Locale } from "@/i18n/locales";
import { useM } from "@/i18n/use-messages";
import { siteMessages } from "@/i18n/messages/site";

type LanguageSwitcherProps = {
  /** Colori: chiaro sulle foto, scuro sullo sfondo della pagina. */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Cambio lingua: un interruttore IT / ES che porta alla stessa pagina
 * nell'altra lingua (stesso indirizzo, con o senza il prefisso `/es`).
 *
 * L'ancora (#faq) non arriva al server, quindi la rileggiamo dal
 * browser al momento del clic.
 */
export default function LanguageSwitcher({
  variant = "dark",
  className = "",
}: LanguageSwitcherProps) {
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const m = useM(siteMessages);

  function change(next: Locale) {
    if (next === current) return;

    const hash = window.location.hash;
    const search = window.location.search;

    startTransition(() => {
      router.replace(`${pathname}${search}${hash}`, {
        locale: next,
        scroll: false,
      });
    });
  }

  const dark = variant === "dark";

  return (
    <div
      role="group"
      aria-label={m.language.label}
      aria-busy={pending}
      className={`inline-flex items-center text-[11px] uppercase tracking-[0.22em] ${className}`}
    >
      {locales.map((code, index) => {
        const active = code === current;

        return (
          <span key={code} className="inline-flex items-center">
            {index > 0 && (
              <span
                aria-hidden="true"
                className={`mx-2 h-3 w-px ${dark ? "bg-border" : "bg-white/40"}`}
              />
            )}

            <button
              type="button"
              lang={code}
              onClick={() => change(code)}
              aria-pressed={active}
              aria-label={localeNames[code]}
              title={localeNames[code]}
              className={`py-1 transition ${
                active
                  ? dark
                    ? "text-primary"
                    : "text-white"
                  : dark
                    ? "text-secondary hover:text-primary"
                    : "text-white/60 hover:text-white"
              } ${active ? "border-b border-current" : "border-b border-transparent"}`}
            >
              {localeCodes[code]}
            </button>
          </span>
        );
      })}
    </div>
  );
}
