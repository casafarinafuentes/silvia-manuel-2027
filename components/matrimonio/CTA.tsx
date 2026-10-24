import ParallaxImage from "@/components/ui/ParallaxImage";
import { Link } from "@/i18n/navigation";
import Magnetic from "@/components/ui/Magnetic";

import { useLocale } from "next-intl";

import Lines from "@/components/ui/Lines";
import { primaryAction, type PhaseAction } from "@/lib/phase-content";
import { useM } from "@/i18n/use-messages";
import { matrimonioMessages } from "@/i18n/messages/matrimonio";
import type { WeddingPhase } from "@/lib/temporal";

/**
 * Chiusura della pagina Matrimonio: frase e pulsante seguono la fase.
 *
 * Il pulsante è l'invito principale della fase, tranne quando
 * porterebbe a questa stessa pagina: in quel caso si propone la guida
 * alla Sardegna, e a matrimonio passato non c'è pulsante.
 */
export default function CTA({ phase }: { phase: WeddingPhase }) {
  const locale = useLocale();
  const { cta: t } = useM(matrimonioMessages);
  const main = primaryAction(phase, locale);

  const action: PhaseAction | null =
    phase === "after"
      ? null
      : main.href.startsWith("/matrimonio")
        ? { href: "/sardegna", label: t.sardegna }
        : main;

  const title =
    phase === "after" ? t.after : phase === "wedding" ? t.wedding : t.before;

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[260px] sm:h-[280px] md:h-[320px]">
        <ParallaxImage
          src="/matrimonio/cta.jpg"
          alt={t.alt}
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/15" />

        {/* Content */}

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">

            <h2 className="font-heading text-[30px] font-light leading-[1.2] text-white sm:text-[38px] md:text-[56px]">
              <Lines text={title} />
            </h2>

            <div className="mt-4 h-px w-10 bg-white/60" />

            {action && (
            <Magnetic className="mt-6">
              <Link
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                className="inline-flex items-center gap-3 bg-[#3F5643] px-7 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:bg-[#334637] sm:px-8 sm:text-xs sm:tracking-[0.28em]"
              >
                {action.label}
                <span className="text-base">→</span>
              </Link>
            </Magnetic>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
