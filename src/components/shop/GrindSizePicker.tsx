"use client";

import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { VARIANT_LABELS } from "@/data/products";
import { useI18n } from "@/hooks/use-i18n";
import type { ProductVariant } from "@/types";

export interface GrindSizePickerProps {
  value: ProductVariant;
  onChange: (variant: ProductVariant) => void;
  layoutGroupId: string;
}

const VARIANTS: ProductVariant[] = ["whole-bean", "espresso", "v60"];

export function GrindSizePicker({
  value,
  onChange,
  layoutGroupId,
}: GrindSizePickerProps): React.JSX.Element {
  const { l, t } = useI18n();

  return (
    <LayoutGroup id={layoutGroupId}>
      <div
        className="flex gap-1 border-2 border-coffee-blue p-1"
        role="radiogroup"
        aria-label={t("a11y.grind")}
      >
        {VARIANTS.map((variant) => {
          const isActive = value === variant;

          return (
            <button
              key={variant}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(variant)}
              className={cn(
                "relative min-h-11 flex-1 px-1.5 py-2.5 font-display text-[9px] font-bold uppercase leading-tight tracking-wide transition-colors sm:px-2 sm:text-[10px] sm:tracking-wider",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coffee-blue",
                isActive
                  ? "text-white"
                  : "text-coffee-ink/60 hover:text-coffee-ink",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId={`${layoutGroupId}-indicator`}
                  className="absolute inset-0 bg-coffee-blue"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              ) : null}
              <span className="relative z-10">{l(VARIANT_LABELS[variant])}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
