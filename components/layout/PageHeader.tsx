"use client";

import Link from "next/link";

import Logo from "@/components/ui/Logo";
import SiteMenu from "./Menu";

export default function PageHeader() {
  return (
    // `data-site-header`: la pagina Sardegna lo fa scorrere fuori
    // schermo quando la sua mini-nav si aggancia (vedi globals.css).
    <header
      data-site-header
      className="sticky top-0 z-40 bg-background/90 transition-transform duration-500 ease-out motion-reduce:transition-none"
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">

        <Link href="/" aria-label="Silvia & Manuel — Home" className="text-primary">
          <Logo className="h-16 w-auto" />
        </Link>

        <SiteMenu variant="dark" />

      </div>
    </header>
  );
}