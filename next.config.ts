import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // La pagina "Hotel" è diventata "Viaggio & Hotel": i vecchi link
  // (anche quelli già condivisi) portano alla nuova, con l'ancora degli
  // hotel.
  async redirects() {
    return [
      { source: "/hotel", destination: "/viaggio#hotel", permanent: true },
      { source: "/es/hotel", destination: "/es/viaggio#hotel", permanent: true },
      { source: "/it/hotel", destination: "/viaggio#hotel", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
