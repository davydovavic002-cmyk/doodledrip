"use client";

import { useLocaleStore } from "@/stores/locale-store";
import { translate } from "@/i18n/dictionary";
import { L } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import type { LocalizedString } from "@/types";

export function useI18n(): {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  l: (text: LocalizedString) => string;
} {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  return {
    locale,
    setLocale,
    t: (key, vars) => translate(locale, key, vars),
    l: (text) => L(text, locale),
  };
}
