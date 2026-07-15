"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/hooks/use-i18n";
import type { Announcement } from "@/types";

export interface MarqueeProps {
  items: Announcement[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const speedMap = {
  slow: "40s",
  normal: "30s",
  fast: "20s",
} as const;

export function Marquee({
  items,
  speed = "normal",
  className,
}: MarqueeProps): React.JSX.Element {
  const { l, t } = useI18n();
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y-4 border-coffee-blue bg-coffee-blue py-3",
        className,
      )}
      aria-label={t("a11y.announcements")}
      role="marquee"
    >
      <div
        className="flex w-max animate-marquee gap-8"
        style={{ animationDuration: speedMap[speed] }}
      >
        {doubled.map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className={cn(
              "flex shrink-0 items-center gap-3 font-display text-sm font-bold uppercase tracking-widest text-white md:text-base",
              item.highlight && "text-coffee-cream",
            )}
          >
            <span aria-hidden="true" className="text-lg">
              ✦
            </span>
            {l(item.text)}
          </span>
        ))}
      </div>
    </div>
  );
}
