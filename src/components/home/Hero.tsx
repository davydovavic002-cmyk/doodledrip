"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useI18n } from "@/hooks/use-i18n";

const FloatingCoffeeCup = dynamic(
  () =>
    import("@/components/home/FloatingCoffeeCup").then((m) => ({
      default: m.FloatingCoffeeCup,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto h-[240px] w-[220px] border-4 border-dashed border-coffee-blue/30 sm:h-[300px] sm:w-[280px] md:h-[360px] md:w-[340px]"
        aria-hidden="true"
      />
    ),
  },
);

const letterVariants = {
  hidden: { y: 80, opacity: 0, rotate: -8 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
      delay: i * 0.04,
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.15, staggerChildren: 0.04 },
  }),
};

export function Hero(): React.JSX.Element {
  const { t } = useI18n();
  const heroWords = [
    t("home.hero.0"),
    t("home.hero.1"),
    t("home.hero.2"),
    t("home.hero.3"),
  ];

  return (
    <section
      className="relative overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#1a3a8f 2px, transparent 2px),
            linear-gradient(90deg, #1a3a8f 2px, transparent 2px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute -left-20 top-20 h-40 w-40 border-4 border-coffee-blue bg-coffee-cream"
        animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-10 bottom-32 h-24 w-24 rounded-full border-4 border-coffee-blue"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 sm:gap-8 sm:py-14 md:grid-cols-2 md:gap-4 md:px-8 md:py-24 lg:py-32">
        <div className="relative z-10 space-y-5 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex max-w-full items-center gap-2 border-2 border-coffee-blue bg-coffee-cream px-3 py-1.5 shadow-brutal-sm sm:px-4 sm:py-2"
          >
            <Sparkles
              className="h-4 w-4 shrink-0 text-coffee-blue"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span className="truncate font-display text-[10px] font-bold uppercase tracking-[0.18em] text-coffee-blue sm:text-xs sm:tracking-[0.25em]">
              {t("home.tagline")}
            </span>
          </motion.div>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-black leading-[0.9] tracking-tighter text-coffee-ink sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {heroWords.map((word, wordIndex) => (
              <motion.span
                key={`${word}-${wordIndex}`}
                custom={wordIndex}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="mr-3 inline-block last:mr-0"
              >
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${word}-${charIndex}`}
                    custom={wordIndex * 10 + charIndex}
                    variants={letterVariants}
                    whileHover={{
                      y: -8,
                      color: "#1a3a8f",
                      transition: { type: "spring", stiffness: 400, damping: 10 },
                    }}
                    className="inline-block cursor-default"
                    style={{ willChange: "transform" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="max-w-md text-base leading-relaxed text-coffee-ink/70 sm:text-lg md:text-xl"
          >
            {t("home.lead")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, type: "spring", stiffness: 200 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <LocaleLink href="/menu" className="min-w-[140px] flex-1 sm:flex-none">
              <Button size="lg" className="w-full sm:w-auto">
                {t("home.cta.menu")}
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </Button>
            </LocaleLink>
            <LocaleLink href="/shop" className="min-w-[140px] flex-1 sm:flex-none">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                {t("home.cta.shop")}
              </Button>
            </LocaleLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4 border-t-2 border-coffee-blue/20 pt-5 sm:gap-6 sm:pt-6"
            aria-label={t("a11y.highlights")}
          >
            {[
              { value: "12+", label: t("home.stat.origins") },
              { value: "4.9", label: t("home.stat.rating") },
              {
                value: t("home.stat.daily"),
                label: t("home.stat.roast"),
              },
            ].map((stat) => (
              <div key={stat.label} className="min-w-[4.5rem]">
                <p className="font-display text-xl font-black text-coffee-blue sm:text-2xl">
                  {stat.value}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-coffee-ink/50 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.3 }}
          className="relative flex items-center justify-center py-4 md:py-0"
        >
          <FloatingCoffeeCup />
        </motion.div>
      </div>
    </section>
  );
}
