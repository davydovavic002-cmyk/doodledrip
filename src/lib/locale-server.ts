import { defaultLocale, locales, type Locale } from "@/i18n/config";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export async function getLocaleFromParams(
  params: Promise<{ locale: string }> | { locale: string },
): Promise<Locale> {
  const resolved = await Promise.resolve(params);
  if (isLocale(resolved.locale)) return resolved.locale;
  return defaultLocale;
}
