import { useM } from "@/i18n/use-messages";
import { travelMessages } from "@/i18n/messages/travel";

/** Scorciatoie verso le parti della pagina: è lunga, si salta dove serve. */
export default function PageNav({ showHotels }: { showHotels: boolean }) {
  const { nav } = useM(travelMessages);

  const links = [
    { href: "#come-arrivare", label: nav.arrive },
    { href: "#auto", label: nav.car },
    ...(showHotels ? [{ href: "#hotel", label: nav.hotels }] : []),
  ];

  return (
    <nav aria-label={nav.label} className="px-6 pt-12">
      <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-flex rounded-full border border-border px-5 py-2.5 text-xs uppercase tracking-[0.26em] text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
