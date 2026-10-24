import type { ReactNode } from "react";

import PageHeader from "@/components/layout/PageHeader";
import { initLocale } from "@/i18n/init-locale";

type AppLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AppLayout({ children, params }: AppLayoutProps) {
  await initLocale(params);

  return (
    <>
      <PageHeader />

      <main id="main" className="min-h-[calc(100vh-6rem)] focus:outline-none" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}