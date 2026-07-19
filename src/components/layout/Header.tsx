"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Coffee, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { CartButton } from "@/components/shop/MiniCart";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { useI18n } from "@/hooks/use-i18n";
import { stripLocaleFromPathname } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

export function Header(): React.JSX.Element {
  const pathname = usePathname();
  const path = stripLocaleFromPathname(pathname);
  // Menu is tied to the current path so it closes on navigate without an effect.
  const [menuForPath, setMenuForPath] = useState<string | null>(null);
  const mobileOpen = menuForPath === pathname;
  const { t } = useI18n();

  const closeMobile = (): void => setMenuForPath(null);
  const toggleMobile = (): void =>
    setMenuForPath((prev) => (prev === pathname ? null : pathname));

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setMenuForPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "z-50 border-b-4 border-coffee-blue bg-white pt-[env(safe-area-inset-top)]",
        mobileOpen ? "fixed inset-x-0 top-0" : "sticky top-0",
      )}
    >      <div className="mx-auto grid h-14 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4 md:h-20 md:grid-cols-[auto_1fr_auto] md:px-6 lg:px-8">
        <LocaleLink
          href="/"
          className="group flex min-w-0 items-center gap-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coffee-blue/30 sm:gap-2"
          aria-label={`${SITE_NAME} — Home`}
        >
          <motion.div
            whileHover={{ rotate: -8, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="shrink-0"
          >
            <Coffee
              className="h-7 w-7 text-coffee-blue sm:h-8 sm:w-8"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </motion.div>
          <span className="truncate font-display text-base font-black tracking-tight text-coffee-ink sm:text-lg md:text-2xl">
            <span className="sm:hidden">D&amp;D</span>
            <span className="hidden sm:inline">{SITE_NAME}</span>
          </span>
        </LocaleLink>

        <nav
          className="hidden items-center justify-center gap-0 md:flex md:justify-self-center lg:gap-0.5"
          aria-label={t("a11y.navMain")}
        >
          {NAV_LINKS.map((link) => (
            <LocaleLink
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-1.5 py-2 font-display text-[10px] font-bold uppercase tracking-wide transition-colors lg:px-2.5 lg:text-xs lg:tracking-wider xl:px-3",
                path === link.href
                  ? "text-coffee-blue"
                  : "text-coffee-ink/70 hover:text-coffee-blue",
              )}
            >
              {t(link.labelKey)}
              {path === link.href ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-1 right-1 h-1 bg-coffee-blue lg:left-2 lg:right-2"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
            </LocaleLink>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-1.5 sm:gap-2">
          <LanguageSwitcher className="hidden md:inline-flex" />
          <CartButton />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border-2 border-coffee-blue md:hidden"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("a11y.closeMenu") : t("a11y.openMenu")}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={2.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-x-0 bottom-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-40 overflow-y-auto border-t-2 border-coffee-blue bg-coffee-cream sm:top-[calc(4rem+env(safe-area-inset-top))] md:hidden"
          aria-label={t("a11y.navMobile")}
        >
          <ul className="flex flex-col p-3 sm:p-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <LocaleLink
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "block border-b-2 border-coffee-blue/20 py-3.5 font-display text-base font-bold uppercase tracking-wider sm:text-lg",
                    path === link.href
                      ? "text-coffee-blue"
                      : "text-coffee-ink",
                  )}
                >
                  {t(link.labelKey)}
                </LocaleLink>
              </li>
            ))}
          </ul>
          <div className="border-t-2 border-coffee-blue/20 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <LanguageSwitcher />
          </div>
        </motion.nav>
      ) : null}
    </header>
  );
}
