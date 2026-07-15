import type { Locale } from "@/i18n/config";
import type { LocalizedString } from "@/types";

export function L(text: LocalizedString, locale: Locale): string {
  return text[locale] || text.en;
}

export function bagPrice(basePrice: number, size: "250g" | "1kg"): number {
  return size === "1kg" ? Math.round(basePrice * 3.6 * 100) / 100 : basePrice;
}
