import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE, looksLikeLiveSession } from "@/lib/admin/constants";

/**
 * Controllo ottimistico sull'area admin: scarta subito il traffico
 * senza cookie di sessione, prima di renderizzare qualsiasi cosa.
 *
 * NON è l'autorizzazione vera: la firma del cookie viene verificata
 * lato server da ogni pagina admin e dalla route di export.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (looksLikeLiveSession(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: "/admin/:path*",
};
