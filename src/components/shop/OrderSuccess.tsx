"use client";

import { useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { VARIANT_LABELS } from "@/data/products";
import { SITE_LOCATION } from "@/lib/constants";
import { formatPrice } from "@/lib/pricing";
import { useI18n } from "@/hooks/use-i18n";
import type { CartItem } from "@/stores/cart-store";
import type { ProductVariant } from "@/types";

function lineMeta(
  item: CartItem,
  l: (text: { en: string; nl: string }) => string,
): string {
  const parts = [
    item.variant
      ? l(VARIANT_LABELS[item.variant as ProductVariant])
      : null,
    item.bagSize,
  ].filter(Boolean);
  return parts.length
    ? `${parts.join(" · ")} × ${item.quantity}`
    : `× ${item.quantity}`;
}

interface OrderSnapshot {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  fulfillment: "pickup" | "delivery";
  customer: { name: string; email: string; phone: string };
  address: string;
  createdAt: string;
}

const emptySubscribe = (): (() => void) => () => undefined;

function readStoredOrder(orderParam: string | null): OrderSnapshot | null {
  try {
    const raw = sessionStorage.getItem("coffee-last-order");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OrderSnapshot;
    if (!orderParam || parsed.orderId === orderParam) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function OrderSuccess(): React.JSX.Element {
  const { t, l } = useI18n();
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order");
  const order = useSyncExternalStore(
    emptySubscribe,
    () => readStoredOrder(orderParam),
    () => null,
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <BrutalCard className="overflow-hidden">
          <div className="border-b-4 border-coffee-blue bg-coffee-blue px-6 py-8 text-center text-white">
            <CheckCircle2
              className="mx-auto h-14 w-14"
              strokeWidth={2}
              aria-hidden="true"
            />
            <h1 className="mt-4 font-display text-3xl font-black tracking-tight">
              {t("success.title")}
            </h1>
            <p className="mt-2 text-white/80">
              {order
                ? t("success.thanks", {
                    name: order.customer.name.split(" ")[0] ?? "",
                  })
                : t("success.generic")}
            </p>
            {(order?.orderId ?? orderParam) ? (
              <p className="mt-4 inline-block border-2 border-white/40 px-3 py-1 font-display text-sm font-bold tracking-wider">
                {order?.orderId ?? orderParam}
              </p>
            ) : null}
          </div>

          <div className="space-y-6 p-6">
            {order ? (
              <>
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <InfoBlock
                    label={t("success.email")}
                    value={order.customer.email}
                  />
                  <InfoBlock
                    label={t("success.fulfillment")}
                    value={
                      order.fulfillment === "pickup"
                        ? t("success.pickup", {
                            address: SITE_LOCATION.short,
                          })
                        : t("success.delivery", { address: order.address })
                    }
                  />
                </div>

                <ul className="space-y-2 border-y-2 border-coffee-blue/15 py-4">
                  {order.items.map((item) => (
                    <li
                      key={`${item.id}-${item.variant}-${item.bagSize}`}
                      className="flex justify-between gap-3 text-sm"
                    >
                      <span className="text-coffee-ink">
                        {item.name}{" "}
                        <span className="text-coffee-ink/50">
                          ({lineMeta(item, l)})
                        </span>
                      </span>
                      <span className="font-display font-bold text-coffee-blue">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between font-display text-lg font-black">
                  <span>{t("success.total")}</span>
                  <span className="text-coffee-blue">
                    {formatPrice(order.total)}
                  </span>
                </div>

                <p className="text-sm text-coffee-ink/60">
                  {t("success.sent")}{" "}
                  <strong className="text-coffee-ink">
                    {order.customer.email}
                  </strong>
                  . {t("success.tagline")}
                </p>
              </>
            ) : (
              <p className="text-sm text-coffee-ink/60">{t("success.fallback")}</p>
            )}

            <div className="flex flex-wrap gap-3">
              <LocaleLink href="/">
                <Button variant="secondary">
                  <Home className="h-4 w-4" strokeWidth={2.5} />
                  {t("success.home")}
                </Button>
              </LocaleLink>
              <LocaleLink href="/shop">
                <Button>
                  <ShoppingBag className="h-4 w-4" strokeWidth={2.5} />
                  {t("success.shop")}
                </Button>
              </LocaleLink>
            </div>
          </div>
        </BrutalCard>
      </motion.div>
    </div>
  );
}

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <div className="border-2 border-coffee-blue/20 bg-coffee-cream p-3">
      <p className="font-display text-[10px] font-bold uppercase tracking-widest text-coffee-blue">
        {label}
      </p>
      <p className="mt-1 text-sm text-coffee-ink">{value}</p>
    </div>
  );
}
