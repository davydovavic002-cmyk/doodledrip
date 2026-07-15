"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { FlavorRadar } from "@/components/ui/FlavorRadar";
import { formatPrice } from "@/lib/pricing";
import { useI18n } from "@/hooks/use-i18n";
import type { DietaryTag, MenuItem } from "@/types";
import { cn } from "@/lib/utils";

export interface MenuCardProps {
  item: MenuItem;
  index: number;
  onSelect: (item: MenuItem) => void;
  isSelected: boolean;
  /** Filter drinks open flavor panel; bar/seasonal/food are plain cards */
  interactive?: boolean;
}

const categoryEmoji: Record<MenuItem["category"], string> = {
  filter: "☕",
  bar: "⚡",
  food: "🥐",
  seasonal: "✨",
};

const dietaryStyle: Record<DietaryTag, string> = {
  "lactose-free": "bg-white text-coffee-blue",
  "vegan-oat": "bg-coffee-cream text-coffee-blue",
  vegan: "bg-coffee-blue text-white",
  "contains-dairy": "bg-white text-coffee-ink/70",
  "contains-gluten": "bg-white text-coffee-ink/70",
  "gluten-free-option": "bg-coffee-cream text-coffee-blue",
};

function useMinWidth(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function MenuCard({
  item,
  index,
  onSelect,
  isSelected,
  interactive = true,
}: MenuCardProps): React.JSX.Element {
  const { l, t } = useI18n();

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl" aria-hidden="true">
          {categoryEmoji[item.category]}
        </span>
        <span className="font-display text-xl font-black text-coffee-blue">
          {formatPrice(item.price)}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-bold text-coffee-ink">
        {l(item.name)}
      </h3>
      <p className="mt-1 text-sm text-coffee-ink/60">{l(item.description)}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tags?.map((tag) => (
          <span
            key={tag}
            className="border border-coffee-blue px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-wider text-coffee-blue"
          >
            {tag}
          </span>
        ))}
        {item.dietary.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className={cn(
              "border border-coffee-blue px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-wider",
              dietaryStyle[tag],
            )}
          >
            {t(`dietary.${tag}`)}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 200 }}
    >
      <BrutalCard
        as="article"
        className={cn(
          interactive && "cursor-pointer transition-shadow hover:shadow-brutal-lg",
          interactive && isSelected && "ring-4 ring-coffee-blue-light",
        )}
      >
        {interactive ? (
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="w-full p-5 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coffee-blue/30"
            aria-pressed={isSelected}
            aria-label={`${l(item.name)}, ${formatPrice(item.price)}`}
          >
            {body}
          </button>
        ) : (
          <div className="p-5">{body}</div>
        )}
      </BrutalCard>
    </motion.div>
  );
}

export interface FlavorPanelProps {
  item: MenuItem | null;
}

export function FlavorPanel({ item }: FlavorPanelProps): React.JSX.Element {
  const { l, t } = useI18n();
  const wide = useMinWidth("(min-width: 640px)");

  if (!item) {
    return (
      <BrutalCard className="flex h-full min-h-[320px] items-center justify-center p-8">
        <p className="text-center font-display text-sm font-bold uppercase tracking-wider text-coffee-ink/40">
          {t("menu.flavorHint")}
        </p>
      </BrutalCard>
    );
  }

  return (
    <BrutalCard className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-black text-coffee-ink">
            {l(item.name)}
          </h3>
          {item.flavor ? (
            <p className="mt-1 text-sm text-coffee-ink/60">
              {t("menu.flavorTitle")}
            </p>
          ) : (
            <p className="mt-1 text-sm text-coffee-ink/60">
              {item.category === "food"
                ? t("menu.foodDetail")
                : t("menu.drinkDetail")}
            </p>
          )}
        </div>
        <span className="font-display text-xl font-black text-coffee-blue">
          {formatPrice(item.price)}
        </span>
      </div>

      {item.flavor ? (
        <>
          <div className="mt-4 flex justify-center">
            <FlavorRadar profile={item.flavor} size={wide ? 220 : 168} />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {(
              [
                ["acid", "flavor.acid"],
                ["body", "flavor.body"],
                ["sweetness", "flavor.sweet"],
              ] as const
            ).map(([key, labelKey]) => (
              <div key={key} className="text-center">
                <p className="font-display text-xl font-black text-coffee-blue sm:text-2xl">
                  {item.flavor![key]}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-coffee-ink/50 sm:text-xs">
                  {t(labelKey)}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm text-coffee-ink/60">{l(item.description)}</p>
      )}

      <div className="mt-4 border-t-2 border-coffee-blue/15 pt-4">
        <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-widest text-coffee-blue">
          {t("menu.dietary")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.dietary.map((tag) => (
            <span
              key={tag}
              className={cn(
                "border border-coffee-blue px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-wider",
                dietaryStyle[tag],
              )}
            >
              {t(`dietary.${tag}`)}
            </span>
          ))}
        </div>
      </div>
    </BrutalCard>
  );
}
