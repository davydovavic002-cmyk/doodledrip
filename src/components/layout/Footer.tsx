"use client";

import { AtSign, Coffee, MapPin, Phone } from "lucide-react";
import { LocaleLink } from "@/components/ui/LocaleLink";
import {
  LEGAL_LINKS,
  NAV_LINKS,
  SITE_LOCATION,
  SITE_NAME,
} from "@/lib/constants";
import { useI18n } from "@/hooks/use-i18n";

export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();
  const { t, locale } = useI18n();

  return (
    <footer className="mt-auto border-t-4 border-coffee-blue bg-coffee-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12 md:px-8 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Coffee
              className="h-6 w-6 text-coffee-blue"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span className="font-display text-lg font-black text-coffee-ink">
              {SITE_NAME}
            </span>
          </div>
          <p className="text-sm text-coffee-ink/70">{t("home.tagline")}</p>
          <a
            href={SITE_LOCATION.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-sm text-coffee-ink/70 transition-colors hover:text-coffee-blue"
          >
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-coffee-blue"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span>
              {SITE_LOCATION.street}
              <br />
              {SITE_LOCATION.postalCode} {SITE_LOCATION.city}
            </span>
          </a>
          <a
            href={`tel:${SITE_LOCATION.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm text-coffee-ink/70 transition-colors hover:text-coffee-blue"
          >
            <Phone className="h-4 w-4 text-coffee-blue" strokeWidth={2.5} />
            {SITE_LOCATION.phone}
          </a>
        </div>

        <nav aria-label={t("a11y.navFooter")}>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-coffee-blue">
            {t("footer.explore")}
          </h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <LocaleLink
                  href={link.href}
                  className="text-sm font-medium text-coffee-ink/70 transition-colors hover:text-coffee-blue"
                >
                  {t(link.labelKey)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("a11y.navLegal")}>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-coffee-blue">
            {t("footer.legal")}
          </h3>
          <ul className="space-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <LocaleLink
                  href={link.href}
                  className="text-sm font-medium text-coffee-ink/70 transition-colors hover:text-coffee-blue"
                >
                  {t(link.labelKey)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-coffee-blue">
            {t("footer.connect")}
          </h3>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-coffee-ink/70 transition-colors hover:text-coffee-blue"
            aria-label={t("a11y.instagram")}
          >
            <AtSign className="h-4 w-4" strokeWidth={2.5} />
            {SITE_LOCATION.instagram}
          </a>
          <a
            href={`mailto:${SITE_LOCATION.email}`}
            className="mt-2 block text-sm text-coffee-ink/70 hover:text-coffee-blue"
          >
            {SITE_LOCATION.email}
          </a>
          <p className="mt-6 text-xs text-coffee-ink/50">
            {t("footer.hours")}
            <br />
            {locale === "nl" ? SITE_LOCATION.hoursNl : SITE_LOCATION.hours}
          </p>
        </div>
      </div>

      <div className="border-t-2 border-coffee-blue/20 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-center text-xs text-coffee-ink/50 md:px-8">
        © {year} {SITE_NAME}. {t("footer.credit")}
      </div>
    </footer>
  );
}
