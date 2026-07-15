import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const routes = [
  "",
  "/menu",
  "/events",
  "/shop",
  "/visit",
  "/about",
  "/faq",
  "/privacy",
  "/shipping",
  "/returns",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://doodleanddrip.be";

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
  );
}
