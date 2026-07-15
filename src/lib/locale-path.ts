import { isLocale } from "@/lib/locale-server";
import type { Locale } from "@/i18n/config";

/** Strip leading `/{locale}` from a pathname. */
export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (!maybeLocale || !isLocale(maybeLocale)) {
    return pathname || "/";
  }
  const rest = segments.slice(2).join("/");
  return rest ? `/${rest}` : "/";
}

/** Prefix an internal path with a locale segment. */
export function withLocale(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  if (href === "/") return `/${locale}`;
  const stripped = stripLocaleFromPathname(href);
  if (stripped === "/") return `/${locale}`;
  return `/${locale}${stripped}`;
}
