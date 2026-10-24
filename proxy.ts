import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { SESSION_COOKIE, looksLikeLiveSession } from "@/lib/admin/constants";

/**
 * Un solo proxy per due compiti:
 *
 *  - area admin: controllo ottimistico, scarta subito il traffico senza
 *    cookie di sessione, prima di renderizzare qualsiasi cosa. NON è
 *    l'autorizzazione vera: la firma del cookie viene verificata lato
 *    server da ogni pagina admin e dalla route di export.
 *  - tutto il resto: la lingua. Gli indirizzi senza prefisso sono
 *    italiani, `/es/...` spagnoli; chi arriva per la prima volta con il
 *    browser in spagnolo viene portato su `/es`, e la scelta fatta col
 *    selettore viene ricordata.
 */
const handleLocale = createIntlMiddleware(routing);

function handleAdmin(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (looksLikeLiveSession(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return handleAdmin(request);
  }

  return handleLocale(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    // Tutto tranne: API, admin (gestito sopra), anteprima delle fasi
    // (solo sviluppo), file interni di Next e file con estensione
    // (immagini, video, robots.txt, sitemap.xml, icone).
    "/((?!api|admin|anteprima|_next|_vercel|.*\\..*).*)",
  ],
};
