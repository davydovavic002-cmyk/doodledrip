"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/hooks/use-i18n";

export interface PageHeroProps {
  eyebrowKey: string;
  titleKey: string;
  descriptionKey: string;
}

export function PageHero({
  eyebrowKey,
  titleKey,
  descriptionKey,
}: PageHeroProps): React.JSX.Element {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden border-b-4 border-coffee-blue bg-coffee-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#1a3a8f 2px, transparent 2px),
            linear-gradient(90deg, #1a3a8f 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14 md:px-8 md:py-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-xs font-bold uppercase tracking-[0.2em] text-coffee-blue sm:text-sm sm:tracking-[0.25em]"
        >
          {t(eyebrowKey)}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mt-2 font-display text-4xl font-black tracking-tighter text-coffee-ink sm:mt-3 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t(titleKey)}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 max-w-xl text-base text-coffee-ink/70 sm:mt-4 sm:text-lg"
        >
          {t(descriptionKey)}
        </motion.p>
      </div>
    </section>
  );
}
