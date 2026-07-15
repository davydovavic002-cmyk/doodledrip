"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-coffee-blue text-white border-brutal shadow-brutal hover:shadow-brutal-lg active:shadow-brutal-sm",
  secondary:
    "bg-white text-coffee-ink border-brutal shadow-brutal hover:bg-coffee-cream active:shadow-brutal-sm",
  ghost:
    "bg-transparent text-coffee-ink border-2 border-transparent hover:border-coffee-blue hover:shadow-brutal-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ): React.JSX.Element {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-display font-bold tracking-tight",
          "cursor-pointer select-none rounded-none",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coffee-blue/30",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
