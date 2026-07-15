"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/hooks/use-i18n";
import type { ShopEvent } from "@/types";

export interface RsvpTicketProps {
  event: ShopEvent | null;
  onClose: () => void;
}

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString(
    locale === "nl" ? "nl-BE" : "en-GB",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );
}

export function RsvpTicket({
  event,
  onClose,
}: RsvpTicketProps): React.JSX.Element | null {
  const { t, l, locale } = useI18n();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(x, [-200, 0, 200], [0.6, 1, 0.6]);

  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [event, onClose]);

  if (!event) return null;

  const ticketId = `DD-${event.id.toUpperCase().replace(/-/g, "").slice(0, 8)}`;

  const handleDragEnd = (_: unknown, info: PanInfo): void => {
    if (Math.abs(info.offset.x) > 120) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-coffee-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t("a11y.rsvpTicket")}
    >
      <motion.div
        style={{ x, rotate, opacity, willChange: "transform" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative max-h-[92dvh] w-full max-w-md overflow-y-auto border-4 border-coffee-blue bg-white shadow-brutal-lg sm:max-h-none"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border-2 border-coffee-blue bg-white hover:bg-coffee-cream"
          aria-label={t("a11y.closeTicket")}
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="border-b-4 border-dashed border-coffee-blue bg-coffee-blue p-6 text-white">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] opacity-70">
            {t("events.admit")}
          </p>
          <h3 className="mt-2 font-display text-2xl font-black">
            {l(event.title)}
          </h3>
          <p className="mt-1 text-sm opacity-80">
            {t(`events.type.${event.type}`)}
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-coffee-blue/20 pb-2">
              <span className="font-bold uppercase tracking-wider text-coffee-ink/50">
                {t("events.date")}
              </span>
              <span className="font-medium text-coffee-ink">
                {formatDate(event.date, locale)}
              </span>
            </div>
            <div className="flex justify-between border-b border-coffee-blue/20 pb-2">
              <span className="font-bold uppercase tracking-wider text-coffee-ink/50">
                {t("events.time")}
              </span>
              <span className="font-medium text-coffee-ink">{event.time}</span>
            </div>
            <div className="flex justify-between border-b border-coffee-blue/20 pb-2">
              <span className="font-bold uppercase tracking-wider text-coffee-ink/50">
                {t("events.location")}
              </span>
              <span className="font-medium text-coffee-ink">
                {l(event.location)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold uppercase tracking-wider text-coffee-ink/50">
                {t("events.ticketId")}
              </span>
              <span className="font-display font-bold text-coffee-blue">
                {ticketId}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-center gap-1" aria-hidden="true">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="bg-coffee-blue"
                style={{
                  width: 3,
                  height: 20 + ((i * 7 + 13) % 30),
                }}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-coffee-ink/40">
            {t("events.drag")}
          </p>

          <Button className="mt-4 w-full" onClick={onClose}>
            {t("events.confirmed")}
          </Button>
        </div>

        <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-4 border-coffee-blue bg-coffee-ink/40" />
        <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-4 border-coffee-blue bg-coffee-ink/40" />
      </motion.div>
    </motion.div>
  );
}
