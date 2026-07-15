"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { FAQ_ITEMS } from "@/data/social";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";

const CATEGORIES = ["shipping", "beans", "subscription", "cafe"] as const;

const CATEGORY_LABELS = {
  shipping: { en: "Shipping", nl: "Verzending" },
  beans: { en: "Beans", nl: "Bonen" },
  subscription: { en: "Subscription", nl: "Abonnement" },
  cafe: { en: "Café", nl: "Café" },
} as const;

export function FaqPageContent(): React.JSX.Element {
  const { l, t } = useI18n();
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number] | "all">(
    "all",
  );

  const items =
    filter === "all"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterBtn
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={t("faq.all")}
        />
        {CATEGORIES.map((cat) => (
          <FilterBtn
            key={cat}
            active={filter === cat}
            onClick={() => setFilter(cat)}
            label={l(CATEGORY_LABELS[cat])}
          />
        ))}
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const open = openId === item.id;
          return (
            <BrutalCard key={item.id} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={open}
              >
                <span className="font-display text-base font-bold text-coffee-ink">
                  {l(item.question)}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-coffee-blue transition-transform",
                    open && "rotate-180",
                  )}
                  strokeWidth={2.5}
                />
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t-2 border-coffee-blue/20 px-5 pb-5 pt-3 text-sm leading-relaxed text-coffee-ink/70">
                      {l(item.answer)}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </BrutalCard>
          );
        })}
      </div>
    </div>
  );
}

function FilterBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border-2 border-coffee-blue px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider",
        active
          ? "bg-coffee-blue text-white"
          : "bg-white text-coffee-ink hover:bg-coffee-cream",
      )}
    >
      {label}
    </button>
  );
}
