"use client";

import Link from "next/link";

import Logo from "@/components/ui/Logo";
import SiteMenu from "./Menu";

export default function PageHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        <Link href="/" aria-label="Silvia & Manuel — Home" className="text-primary">
          <Logo className="h-8 w-auto" />
        </Link>

        <SiteMenu variant="dark" />

      </div>
    </header>
  );
}