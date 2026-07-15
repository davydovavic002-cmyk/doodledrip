"use client";

import { useI18n } from "@/hooks/use-i18n";

export function SkipToContent(): React.JSX.Element {
  const { t } = useI18n();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border-4 focus:border-coffee-blue focus:bg-white focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:text-coffee-blue focus:shadow-brutal"
    >
      {t("a11y.skip")}
    </a>
  );
}
