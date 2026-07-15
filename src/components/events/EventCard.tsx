"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, Users } from "lucide-react";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/hooks/use-i18n";
import type { ShopEvent } from "@/types";

export interface EventCardProps {
  event: ShopEvent;
  index: number;
  onRsvp: (event: ShopEvent) => void;
}

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString(
    locale === "nl" ? "nl-BE" : "en-GB",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    },
  );
}

export function EventCard({
  event,
  index,
  onRsvp,
}: EventCardProps): React.JSX.Element {
  const { t, l, locale } = useI18n();
  const [flipped, setFlipped] = useState(false);
  const spotsPercent = (event.spotsLeft / event.totalSpots) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
      className="perspective-[1000px]"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative h-[300px] w-full cursor-pointer sm:h-[340px]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        onClick={() => setFlipped((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-label={l(event.title)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((prev) => !prev);
          }
        }}
      >
        <BrutalCard
          as="article"
          className="absolute inset-0 flex flex-col justify-between p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <span className="inline-block border-2 border-coffee-blue bg-coffee-cream px-3 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-coffee-blue">
              {t(`events.type.${event.type}`)}
            </span>
            <h3 className="mt-4 font-display text-xl font-black text-coffee-ink">
              {l(event.title)}
            </h3>
            <div className="mt-4 space-y-2 text-sm text-coffee-ink/60">
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-coffee-blue" strokeWidth={2.5} />
                {formatDate(event.date, locale)} · {event.time}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-coffee-blue" strokeWidth={2.5} />
                {l(event.location)}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-coffee-ink/50">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" strokeWidth={2.5} />
                {t("events.spots", { n: event.spotsLeft })}
              </span>
              <span>{t("events.flip")}</span>
            </div>
            <div className="h-2 border-2 border-coffee-blue bg-white">
              <motion.div
                className="h-full bg-coffee-blue-light"
                initial={{ width: 0 }}
                animate={{ width: `${spotsPercent}%` }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </div>
          </div>
        </BrutalCard>

        <BrutalCard
          as="article"
          className="absolute inset-0 flex flex-col justify-between bg-coffee-cream p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <p className="max-h-[140px] overflow-y-auto text-sm leading-relaxed text-coffee-ink/70 sm:max-h-none">
              {l(event.description)}
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-coffee-ink/60">
              <User className="h-4 w-4 text-coffee-blue" strokeWidth={2.5} />
              {event.host}
            </p>
          </div>

          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRsvp(event);
            }}
          >
            {t("events.rsvp")}
          </Button>
        </BrutalCard>
      </motion.div>
    </motion.div>
  );
}
