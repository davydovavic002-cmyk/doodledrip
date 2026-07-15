"use client";

import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { VARIANT_LABELS } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { formatPrice, getShippingCost } from "@/lib/pricing";
import { useI18n } from "@/hooks/use-i18n";
import {
  selectCartCount,
  selectCartSubtotal,
  useCartStore,
  type CartItem,
} from "@/stores/cart-store";
import { cn } from "@/lib/utils";

const emptySubscribe = (): (() => void) => () => undefined;
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

/** Icon button for the header (top-right). */
export function CartButton({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const { t } = useI18n();
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const totalItems = hydrated ? selectCartCount(items) : 0;

  return (
    <motion.button
      type="button"
      onClick={toggleCart}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-2 border-coffee-blue bg-white text-coffee-ink shadow-brutal-sm hover:bg-coffee-cream focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coffee-blue/30",
        className,
      )}
      aria-label={
        isOpen
          ? t("a11y.closeCart")
          : totalItems > 0
            ? `${t("a11y.openCart")}, ${t("a11y.cartItems", { n: totalItems })}`
            : t("a11y.openCart")
      }
      aria-expanded={isOpen}
    >
      <ShoppingBag className="h-5 w-5 text-coffee-blue" strokeWidth={2.5} />
      {totalItems > 0 ? (
        <motion.span
          key={totalItems}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center border-2 border-coffee-blue bg-coffee-blue px-1 font-display text-[10px] font-black text-white"
        >
          {totalItems}
        </motion.span>
      ) : null}
    </motion.button>
  );
}

export function MiniCart(): React.JSX.Element {
  const { t, l } = useI18n();
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const subtotal = selectCartSubtotal(items);
  const shipping = getShippingCost(subtotal);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const count = selectCartCount(items);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setCartOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, setCartOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[54] bg-coffee-ink/25 backdrop-blur-[2px]"
            onClick={() => setCartOpen(false)}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-[56] flex max-h-[min(88dvh,640px)] w-full flex-col rounded-t-none border-4 border-b-0 border-coffee-blue bg-white shadow-brutal-lg sm:inset-x-auto sm:bottom-auto sm:right-3 sm:top-[4.5rem] sm:max-h-[min(75vh,560px)] sm:w-[calc(100vw-1.5rem)] sm:max-w-sm sm:border-b-4 md:right-8 md:top-[5.5rem]"
            role="dialog"
            aria-modal="true"
            aria-label={t("cart.title")}
          >
            <div className="flex shrink-0 items-center justify-between border-b-4 border-coffee-blue px-4 py-3">
              <div className="flex items-center gap-2">
                <ShoppingBag
                  className="h-5 w-5 text-coffee-blue"
                  strokeWidth={2.5}
                />
                <h2 className="font-display text-base font-black text-coffee-ink">
                  {t("cart.title")}
                  {count > 0 ? (
                    <span className="ml-2 text-coffee-blue">({count})</span>
                  ) : null}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="flex h-8 w-8 items-center justify-center border-2 border-coffee-blue hover:bg-coffee-cream"
                aria-label={t("a11y.closeCart")}
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <span className="text-4xl" aria-hidden="true">
                    ☕
                  </span>
                  <p className="mt-3 font-display text-sm font-bold uppercase tracking-wider text-coffee-ink/40">
                    {t("cart.empty")}
                  </p>
                  <LocaleLink
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="mt-3 font-display text-sm font-bold text-coffee-blue underline-offset-4 hover:underline"
                  >
                    {t("cart.browse")}
                  </LocaleLink>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <CartLineItem
                      key={lineKeyFromItem(item)}
                      item={item}
                      variantLabel={
                        item.variant ? l(VARIANT_LABELS[item.variant]) : null
                      }
                      onRemove={() =>
                        removeItem({
                          id: item.id,
                          kind: item.kind,
                          variant: item.variant,
                          bagSize: item.bagSize,
                        })
                      }
                      onUpdateQuantity={(qty) =>
                        updateQuantity(
                          {
                            id: item.id,
                            kind: item.kind,
                            variant: item.variant,
                            bagSize: item.bagSize,
                          },
                          qty,
                        )
                      }
                    />
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <div className="shrink-0 space-y-3 border-t-4 border-coffee-blue p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                {remaining > 0 ? (
                  <p className="text-xs text-coffee-ink/60">
                    {t("cart.freeShipLeft", {
                      amount: formatPrice(remaining),
                    })}
                  </p>
                ) : (
                  <p className="text-xs font-bold text-coffee-blue">
                    {t("cart.freeUnlocked")}
                  </p>
                )}

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-coffee-ink/60">
                    <span>{t("cart.subtotal")}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-coffee-ink/60">
                    <span>{t("cart.shipping")}</span>
                    <span>
                      {shipping === 0 ? t("cart.free") : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t-2 border-coffee-blue/20 pt-2">
                    <span className="font-display text-sm font-bold uppercase tracking-wider text-coffee-ink/50">
                      {t("cart.total")}
                    </span>
                    <span className="font-display text-xl font-black text-coffee-blue">
                      {formatPrice(subtotal + shipping)}
                    </span>
                  </div>
                </div>

                <LocaleLink href="/checkout" onClick={() => setCartOpen(false)}>
                  <Button type="button" className="w-full" size="lg">
                    {t("cart.checkout")}
                  </Button>
                </LocaleLink>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function lineKeyFromItem(item: CartItem): string {
  return [
    item.kind,
    item.id,
    item.variant ?? "none",
    item.bagSize ?? "none",
  ].join(":");
}

function CartLineItem({
  item,
  variantLabel,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  variantLabel: string | null;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}): React.JSX.Element {
  const { t } = useI18n();
  const meta = [variantLabel, item.bagSize].filter(Boolean).join(" · ");

  return (
    <li className="flex gap-3 border-2 border-coffee-blue p-2.5">
      {item.image ? (
        <div className="relative h-14 w-14 shrink-0 border-2 border-coffee-blue bg-coffee-cream">
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover p-1"
            sizes="56px"
          />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate font-display text-sm font-bold text-coffee-ink">
          {item.name}
        </p>
        {meta ? <p className="text-xs text-coffee-ink/50">{meta}</p> : null}
        <p className="mt-0.5 font-display text-sm font-bold text-coffee-blue">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          type="button"
          onClick={onRemove}
          className="text-coffee-ink/30 hover:text-coffee-blue"
          aria-label={t("a11y.removeItem", { name: item.name })}
        >
          <Trash2 className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-1 border-2 border-coffee-blue">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            className="flex h-9 w-9 items-center justify-center hover:bg-coffee-cream"
            aria-label={t("a11y.decreaseQty")}
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
          <span className="w-7 text-center font-display text-sm font-bold">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="flex h-9 w-9 items-center justify-center hover:bg-coffee-cream"
            aria-label={t("a11y.increaseQty")}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </li>
  );
}
