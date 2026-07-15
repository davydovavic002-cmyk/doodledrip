"use client";

import { LayoutGroup, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterChip({
  label,
  active,
  onClick,
}: FilterChipProps): React.JSX.Element {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative px-3 py-2 font-display text-xs font-bold uppercase tracking-wider sm:px-5 sm:py-2.5 sm:text-sm",
        "border-2 border-coffee-blue cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coffee-blue/30",
        active
          ? "bg-coffee-blue text-white shadow-brutal-sm"
          : "bg-white text-coffee-ink shadow-brutal-sm hover:bg-coffee-cream",
      )}
      aria-pressed={active}
    >
      {active ? (
        <motion.span
          layoutId="filter-highlight"
          className="absolute inset-0 bg-coffee-blue"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          style={{ zIndex: -1 }}
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

export interface FilterChipGroupProps {
  children: React.ReactNode;
  className?: string;
  label: string;
}

export function FilterChipGroup({
  children,
  className,
  label,
}: FilterChipGroupProps): React.JSX.Element {
  return (
    <LayoutGroup id="filters">
      <div
        className={cn("flex flex-wrap gap-2 sm:gap-3", className)}
        role="group"
        aria-label={label}
      >
        {children}
      </div>
    </LayoutGroup>
  );
}
