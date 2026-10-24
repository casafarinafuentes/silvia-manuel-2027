"use client";

import { Link } from "@/i18n/navigation";

import Logo from "@/components/ui/Logo";
import SiteMenu from "./Menu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useM } from "@/i18n/use-messages";
import { uiMessages } from "@/i18n/messages/ui";

export default function PageHeader() {
  const m = useM(uiMessages);

  return (
    // `data-site-header`: la pagina Sardegna lo fa scorrere fuori
    // schermo quando la sua mini-nav si aggancia (vedi globals.css).
    <header
      data-site-header
      className="sticky top-0 z-40 bg-background/90 transition-transform duration-500 ease-out motion-reduce:transition-none"
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">

        <Link href="/" aria-label={m.menu.home} className="text-primary">
          <Logo className="h-16 w-auto" />
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <LanguageSwitcher variant="dark" />

          <SiteMenu variant="dark" />
        </div>

      </div>
    </header>
  );
}