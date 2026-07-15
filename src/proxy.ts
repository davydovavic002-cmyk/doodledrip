import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  defaultLocale,
  locales,
  type Locale,
} from "@/i18n/config";

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function negotiateLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean);

  for (const lang of preferred) {
    if (!lang) continue;
    if (isLocale(lang)) return lang;
    const base = lang.split("-")[0];
    if (base && isLocale(base)) return base;
  }

  return defaultLocale;
}

function setLocaleCookie(response: NextResponse, locale: Locale): void {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

/**
 * Next.js 16 renamed the middleware convention to `proxy`.
 * Same locale-prefix redirect / cookie sync behavior.
 */
export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  // Valid locale prefix — continue
  if (isLocale(firstSegment)) {
    const response = NextResponse.next();
    setLocaleCookie(response, firstSegment);
    return response;
  }

  const locale = negotiateLocale(request);
  const url = request.nextUrl.clone();

  // Unknown 2-letter locale segment → replace with preferred locale
  if (/^[a-zA-Z]{2}$/.test(firstSegment)) {
    const rest = pathname.slice(firstSegment.length + 1) || "/";
    url.pathname = rest === "/" ? `/${locale}` : `/${locale}${rest}`;
    const response = NextResponse.redirect(url);
    setLocaleCookie(response, locale);
    return response;
  }

  // Missing locale prefix → redirect
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  const response = NextResponse.redirect(url);
  setLocaleCookie(response, locale);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)",
  ],
};
