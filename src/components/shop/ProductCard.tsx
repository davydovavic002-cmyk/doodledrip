"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ShoppingBag } from "lucide-react";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { Button } from "@/components/ui/Button";
import { FlavorRadar } from "@/components/ui/FlavorRadar";
import { GrindSizePicker } from "@/components/shop/GrindSizePicker";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { bagPrice } from "@/lib/locale";
import { formatPrice } from "@/lib/pricing";
import { useI18n } from "@/hooks/use-i18n";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";
import type { BagSize, Product, ProductVariant } from "@/types";

export interface ProductCardProps {
  product: Product;
  index: number;
}

function formatShortDate(iso: string, locale: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString(
    locale === "nl" ? "nl-BE" : "en-GB",
    { day: "numeric", month: "short", year: "numeric" },
  );
}

export function ProductCard({
  product,
  index,
}: ProductCardProps): React.JSX.Element {
  const { t, l, locale } = useI18n();
  const isCoffee = product.kind === "coffee";
  const hasSizes = Boolean(product.sizes?.length);
  const [variant, setVariant] = useState<ProductVariant>("whole-bean");
  const [bagSize, setBagSize] = useState<BagSize>(
    product.sizes?.[0] ?? "250g",
  );
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const price = useMemo(
    () => (hasSizes ? bagPrice(product.price, bagSize) : product.price),
    [hasSizes, product.price, bagSize],
  );

  const soldOut = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 10;

  const handleAdd = (): void => {
    if (soldOut) return;

    addItem({
      id: product.id,
      name: l(product.name),
      price,
      kind: product.kind,
      ...(isCoffee && hasSizes ? { variant } : {}),
      ...(hasSizes ? { bagSize } : {}),
      image: product.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 200 }}
      className={cn(hasSizes && "h-full")}
    >
      <BrutalCard
        as="article"
        className={cn(
          "flex flex-col overflow-hidden",
          hasSizes && "h-full",
        )}
      >
        <div className="relative aspect-square shrink-0 border-b-4 border-coffee-blue bg-coffee-cream">
          <Image
            src={product.image}
            alt={l(product.name)}
            fill
            className="object-cover p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.roastLevel ? (
            <span className="absolute left-3 top-3 border-2 border-coffee-blue bg-white px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-coffee-blue">
              {t("shop.roastTag", {
                level: t(`roast.${product.roastLevel}`),
              })}
            </span>
          ) : (
            <span className="absolute left-3 top-3 border-2 border-coffee-blue bg-white px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-coffee-blue">
              {product.kind === "gift-card"
                ? t("shop.giftTag")
                : t("shop.merchTag")}
            </span>
          )}
          {product.microLot ? (
            <span className="absolute right-3 top-3 border-2 border-coffee-blue bg-coffee-cream px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-coffee-blue">
              {t("shop.microLot")}
            </span>
          ) : null}
          {soldOut ? (
            <span className="absolute bottom-3 right-3 border-2 border-coffee-blue bg-coffee-blue px-2 py-1 font-display text-[10px] font-bold uppercase text-white">
              {t("shop.soldOut")}
            </span>
          ) : null}
        </div>

        <div className={cn("flex flex-col p-5", hasSizes && "flex-1")}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {product.origin ? (
                <p className="font-display text-[10px] font-bold uppercase tracking-widest text-coffee-blue">
                  {product.origin}
                </p>
              ) : null}
              <h3 className="font-display text-lg font-black text-coffee-ink">
                {l(product.name)}
              </h3>
            </div>
            <span className="shrink-0 font-display text-xl font-black text-coffee-blue">
              {formatPrice(price)}
            </span>
          </div>

          <p className="mt-2 text-sm text-coffee-ink/60">
            {l(product.description)}
          </p>

          {product.roastDate && product.bestBy ? (
            <dl className="mt-3 grid grid-cols-2 gap-2 border-2 border-coffee-blue/20 bg-coffee-cream p-2 text-xs">
              <div>
                <dt className="font-display font-bold uppercase tracking-wider text-coffee-ink/40">
                  {t("shop.roastDate")}
                </dt>
                <dd className="font-medium text-coffee-ink">
                  {formatShortDate(product.roastDate, locale)}
                </dd>
              </div>
              <div>
                <dt className="font-display font-bold uppercase tracking-wider text-coffee-ink/40">
                  {t("shop.bestBy")}
                </dt>
                <dd className="font-medium text-coffee-ink">
                  {formatShortDate(product.bestBy, locale)}
                </dd>
              </div>
            </dl>
          ) : (
            <div className="mt-3 min-h-[3.25rem]" aria-hidden="true" />
          )}

          <p
            className={cn(
              "mt-2 min-h-[1.25rem] font-display text-xs font-bold uppercase tracking-wider",
              soldOut
                ? "text-red-600"
                : lowStock
                  ? "text-orange-600"
                  : "text-coffee-ink/40",
            )}
          >
            {soldOut
              ? t("shop.soldOut")
              : lowStock
                ? t("shop.lowStock", { n: product.stock })
                : t("shop.inStock", { n: product.stock })}
          </p>

          {product.flavor && hasSizes ? (
            <div className="mt-3 flex justify-center">
              <FlavorRadar profile={product.flavor} size={120} />
            </div>
          ) : null}

          <div className={cn("pt-4", hasSizes && "mt-auto")}>
            {hasSizes ? (
              <div>
                <p className="mb-1.5 font-display text-[10px] font-bold uppercase tracking-wider text-coffee-ink/50">
                  {t("shop.size")}
                </p>
                <div className="flex min-h-[2.5rem] gap-1 border-2 border-coffee-blue p-1">
                  {product.sizes!.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setBagSize(size)}
                      className={cn(
                        "flex-1 py-2 font-display text-[10px] font-bold uppercase",
                        bagSize === size
                          ? "bg-coffee-blue text-white"
                          : "text-coffee-ink/60 hover:bg-coffee-cream",
                      )}
                    >
                      {size === "250g" ? t("shop.per250") : t("shop.per1kg")}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {isCoffee && hasSizes ? (
              <div className="mt-4">
                <p className="mb-1.5 font-display text-[10px] font-bold uppercase tracking-wider text-coffee-ink/50">
                  {t("shop.grind")}
                </p>
                <GrindSizePicker
                  value={variant}
                  onChange={setVariant}
                  layoutGroupId={`grind-${product.id}`}
                />
              </div>
            ) : null}

            <motion.div
              animate={added ? { scale: 1.06 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
              className="mt-4"
            >
              <Button
                type="button"
                className="w-full"
                onClick={handleAdd}
                disabled={soldOut}
              >
                {added ? (
                  t("shop.added")
                ) : (
                  <>
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    {t("shop.quickAdd")}
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </BrutalCard>
    </motion.div>
  );
}

export function ShopPageContent({
  products,
}: {
  products: Product[];
}): React.JSX.Element {
  const { t } = useI18n();
  const [category, setCategory] = useState<"beans" | "merch">("beans");
  const coffee = products.filter((p) => p.kind === "coffee");
  const merch = products.filter((p) => p.kind !== "coffee");
  const visible = category === "beans" ? coffee : merch;

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:space-y-12 sm:py-12 md:px-8">
      <div className="flex items-center gap-3 border-2 border-coffee-blue bg-coffee-cream px-4 py-3 shadow-brutal-sm">
        <ShoppingBag className="h-5 w-5 text-coffee-blue" strokeWidth={2.5} />
        <p className="text-sm text-coffee-ink/70">
          {t("shop.freeShip")}{" "}
          <span className="font-display font-bold text-coffee-blue">
            {formatPrice(FREE_SHIPPING_THRESHOLD)}
          </span>
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2 sm:gap-3"
        role="tablist"
        aria-label={t("shop.categories")}
      >
        {(
          [
            { id: "beans" as const, label: t("shop.beans"), count: coffee.length },
            { id: "merch" as const, label: t("shop.merch"), count: merch.length },
          ]
        ).map((tab) => {
          const active = category === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(tab.id)}
              className={cn(
                "border-2 border-coffee-blue px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider sm:px-5 sm:text-sm",
                active
                  ? "bg-coffee-blue text-white shadow-brutal-sm"
                  : "bg-white text-coffee-ink hover:bg-coffee-cream",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "ml-2 tabular-nums",
                  active ? "text-white/70" : "text-coffee-ink/40",
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <section aria-labelledby="shop-category-heading">
        <h2
          id="shop-category-heading"
          className="mb-6 font-display text-2xl font-black"
        >
          {category === "beans" ? t("shop.beans") : t("shop.merch")}
        </h2>
        <div
          className={cn(
            "grid items-start gap-4 sm:grid-cols-2 sm:gap-6",
            category === "beans"
              ? "lg:grid-cols-3 xl:grid-cols-4"
              : "lg:grid-cols-3",
          )}
        >
          {visible.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}
