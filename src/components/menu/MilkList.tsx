"use client";

import { BrutalCard } from "@/components/ui/BrutalCard";
import { MILK_OPTIONS } from "@/data/milk";
import { formatPrice } from "@/lib/pricing";
import { useI18n } from "@/hooks/use-i18n";

export function MilkList(): React.JSX.Element {
  const { t, l } = useI18n();

  return (
    <BrutalCard className="overflow-hidden">
      <div className="border-b-4 border-coffee-blue bg-coffee-cream px-5 py-4">
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-blue">
          {t("menu.milkListEyebrow")}
        </p>
        <h3 className="mt-1 font-display text-xl font-black text-coffee-ink">
          {t("menu.milkListTitle")}
        </h3>
        <p className="mt-1 text-sm text-coffee-ink/60">{t("menu.milkListHint")}</p>
      </div>

      <ul className="divide-y-2 divide-coffee-blue/15">
        {MILK_OPTIONS.map((milk) => (
          <li
            key={milk.id}
            className="flex items-center gap-3 px-5 py-3"
          >
            <span className="text-xl" aria-hidden="true">
              {milk.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold text-coffee-ink">
                {l(milk.label)}
              </p>
              <p className="text-xs text-coffee-ink/50">{l(milk.hint)}</p>
            </div>
            <span className="shrink-0 font-display text-xs font-black text-coffee-blue">
              {milk.surcharge === 0
                ? t("menu.milkIncluded")
                : `+${formatPrice(milk.surcharge)}`}
            </span>
          </li>
        ))}
      </ul>
    </BrutalCard>
  );
}
