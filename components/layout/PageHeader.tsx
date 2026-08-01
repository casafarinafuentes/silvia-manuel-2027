"use client";

import Link from "next/link";

import SiteMenu from "./Menu";

export default function PageHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        <Link
          href="/"
          className="font-heading text-3xl tracking-[0.25em] text-primary"
        >
          SM
        </Link>

        <SiteMenu variant="dark" />

      </div>
    </header>
  );
}