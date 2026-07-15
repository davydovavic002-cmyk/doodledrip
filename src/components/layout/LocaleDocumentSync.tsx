"use client";

import { useEffect } from "react";
import { useLocaleStore } from "@/stores/locale-store";

/** Keep <html lang> in sync with the persisted locale store. */
export function LocaleDocumentSync(): null {
  const locale = useLocaleStore((s) => s.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
