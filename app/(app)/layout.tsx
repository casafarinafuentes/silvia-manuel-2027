import type { ReactNode } from "react";

import PageHeader from "@/components/layout/PageHeader";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <PageHeader />

      <main className="min-h-[calc(100vh-5rem)]">
        {children}
      </main>
    </>
  );
}