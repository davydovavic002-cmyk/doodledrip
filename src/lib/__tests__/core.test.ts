import { describe, expect, it } from "vitest";
import { getOrderTotal, getShippingCost } from "@/lib/pricing";
import { validateCreateOrder, validateEmail } from "@/lib/order-schema";
import { translate } from "@/i18n/dictionary";
import { stripLocaleFromPathname, withLocale } from "@/lib/locale-path";

describe("pricing", () => {
  it("applies free shipping at threshold", () => {
    expect(getShippingCost(44.99)).toBeGreaterThan(0);
    expect(getShippingCost(45)).toBe(0);
    expect(getShippingCost(100)).toBe(0);
  });

  it("sums shipping into order total", () => {
    expect(getOrderTotal(20)).toBe(20 + getShippingCost(20));
    expect(getOrderTotal(45)).toBe(45);
  });
});

describe("order schema", () => {
  const base = {
    items: [
      {
        id: "yirgacheffe",
        name: "Ethiopian Yirgacheffe",
        price: 14,
        quantity: 1,
        kind: "coffee",
      },
    ],
    customer: {
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      phone: "+32470000000",
    },
    fulfillment: "pickup" as const,
    address: null,
    totals: { subtotal: 14, shipping: 0, total: 14 },
    cardLast4: "4242",
  };

  it("validates email helper", () => {
    expect(validateEmail("ok@test.com")).toBe(true);
    expect(validateEmail("bad")).toBe(false);
  });

  it("accepts a valid pickup order", () => {
    const result = validateCreateOrder(base);
    expect(result.ok).toBe(true);
  });

  it("rejects empty items", () => {
    const result = validateCreateOrder({ ...base, items: [] });
    expect(result.ok).toBe(false);
  });

  it("requires address for delivery", () => {
    const result = validateCreateOrder({
      ...base,
      fulfillment: "delivery",
      address: null,
    });
    expect(result.ok).toBe(false);
  });
});

describe("i18n dictionary", () => {
  it("returns Dutch nav labels", () => {
    expect(translate("nl", "nav.about")).toBe("Over ons");
  });

  it("falls back to English for missing keys", () => {
    expect(translate("nl", "totally.missing.key")).toBe("totally.missing.key");
  });
});

describe("locale paths", () => {
  it("prefixes and strips locale", () => {
    expect(withLocale("/shop", "nl")).toBe("/nl/shop");
    expect(withLocale("/", "en")).toBe("/en");
    expect(stripLocaleFromPathname("/nl/shop")).toBe("/shop");
    expect(stripLocaleFromPathname("/en")).toBe("/");
  });
});
