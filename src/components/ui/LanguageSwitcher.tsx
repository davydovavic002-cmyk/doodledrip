"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useI18n } from "@/hooks/use-i18n";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { stripLocaleFromPathname } from "@/lib/locale-path";

function setLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

export function LanguageSwitcher({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const { locale, setLocale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const languages: Locale[] = ["en", "nl"];

  const switchTo = (code: Locale): void => {
    if (code === locale) return;
    const path = stripLocaleFromPathname(pathname);
    setLocaleCookie(code);
    setLocale(code);
    const nextPath = path === "/" ? `/${code}` : `/${code}${path}`;
    router.push(nextPath);
  };

  return (
    <div
      className={cn("border-2 border-coffee-blue", className ?? "inline-flex")}
      role="group"
      aria-label={t("a11y.lang")}
    >
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          className={cn(
            "px-2.5 py-1 font-display text-xs font-black uppercase tracking-wider",
            locale === code
              ? "bg-coffee-blue text-white"
              : "bg-white text-coffee-ink hover:bg-coffee-cream",
          )}
          aria-pressed={locale === code}
        >
          {t(`lang.${code}`)}
        </button>
      ))}
    </div>
  );
}
