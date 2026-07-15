import type { Metadata } from "next";
import { translate } from "@/i18n/dictionary";
import { locales, type Locale } from "@/i18n/config";
import { SITE_NAME } from "@/lib/constants";

export function pageMetadata(
  locale: Locale,
  path: string,
  titleKey: string,
  descriptionKey: string,
): Metadata {
  const title = translate(locale, titleKey);
  const description = translate(locale, descriptionKey);
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `/${loc}${normalized}`;
  }

  return {
    title,
    description,
    alternates: {
      languages,
      canonical: `/${locale}${normalized}`,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      locale: locale === "nl" ? "nl_BE" : "en_US",
    },
  };
}
