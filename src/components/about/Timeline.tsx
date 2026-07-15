"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { useI18n } from "@/hooks/use-i18n";
import type { TimelineMilestone } from "@/types";

export interface TimelineProps {
  milestones: TimelineMilestone[];
}

export function Timeline({ milestones }: TimelineProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-2xl py-8">
      {/* Track */}
      <div className="absolute left-6 top-0 h-full w-1 bg-coffee-blue/20 md:left-1/2 md:-ml-0.5">
        <motion.div
          className="w-full bg-coffee-blue"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <TimelineItem
            key={milestone.id}
            milestone={milestone}
            index={index}
            align={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  milestone: TimelineMilestone;
  index: number;
  align: "left" | "right";
}

function TimelineItem({
  milestone,
  index,
  align,
}: TimelineItemProps): React.JSX.Element {
  const { l } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      className={`relative flex items-center gap-6 md:gap-0 ${
        align === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="absolute left-6 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center md:left-1/2">
        <motion.div
          whileInView={{ scale: [0, 1.2, 1] }}
          viewport={{ once: true }}
          transition={{ type: "tween", duration: 0.45, ease: "easeOut" }}
          className="h-4 w-4 border-2 border-coffee-blue bg-coffee-blue-light"
        />
      </div>

      <div
        className={`ml-14 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
          align === "right" ? "md:pr-8 md:text-right" : "md:pl-8"
        }`}
      >
        <BrutalCard className="p-5">
          <span className="font-display text-3xl font-black text-coffee-blue">
            {milestone.year}
          </span>
          <h3 className="mt-1 font-display text-lg font-bold text-coffee-ink">
            {l(milestone.title)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-coffee-ink/60">
            {l(milestone.description)}
          </p>
        </BrutalCard>
      </div>
    </motion.div>
  );
}
