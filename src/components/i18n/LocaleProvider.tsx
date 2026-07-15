"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { useLocaleStore } from "@/stores/locale-store";

/**
 * Keeps Zustand locale in sync with the URL `[locale]` segment
 * so the URL remains the source of truth on localized pages.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}): React.JSX.Element {
  const setLocale = useLocaleStore((s) => s.setLocale);

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return <>{children}</>;
}
