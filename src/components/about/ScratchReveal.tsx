"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks/use-i18n";
import type { FunFact } from "@/types";

export interface ScratchRevealProps {
  facts: FunFact[];
}

export function ScratchReveal({ facts }: ScratchRevealProps): React.JSX.Element {
  const { l, t, locale } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const activeFact = facts[activeIndex];
  const scratchHint = t("about.scratch.hint");

  const initCanvas = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      // Reset any previous scale so redraws don't stack transforms / text.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "#1a3a8f";
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const fontSize = Math.max(14, Math.min(18, Math.floor(rect.width / 18)));
      ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
      ctx.fillText(scratchHint, rect.width / 2, rect.height / 2);
    },
    [scratchHint],
  );

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x * scaleX, y * scaleY, 30 * scaleX, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparent++;
      }
      const percent = transparent / (imageData.data.length / 4);

      if (percent > 0.4) {
        setRevealed((prev) => new Set(prev).add(activeIndex));
      }
    },
    [activeIndex],
  );

  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
  ): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      if (!touch) return null;
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }

    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent): void => {
    isDrawing.current = true;
    const pos = getPos(e);
    if (pos) scratch(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDrawing.current) return;
    const pos = getPos(e);
    if (pos) scratch(pos.x, pos.y);
  };

  const handleEnd = (): void => {
    isDrawing.current = false;
  };

  useEffect(() => {
    if (revealed.has(activeIndex)) return;
    const frame = requestAnimationFrame(() => initCanvas(canvasRef.current));
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, revealed, initCanvas, locale]);

  return (
    <div className="mx-auto max-w-lg">
      <div
        className="mb-4 flex justify-center gap-2"
        role="tablist"
        aria-label={t("a11y.funFacts")}
      >
        {facts.map((fact, i) => (
          <button
            key={fact.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            onClick={() => setActiveIndex(i)}
            className={`h-3 w-3 border-2 border-coffee-blue transition-colors ${
              activeIndex === i
                ? "bg-coffee-blue"
                : revealed.has(i)
                  ? "bg-coffee-blue-light"
                  : "bg-white"
            }`}
            aria-label={`Fact ${i + 1}`}
          />
        ))}
      </div>

      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-[4/3] border-4 border-coffee-blue shadow-brutal"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-coffee-cream p-6 text-center sm:p-8">
          {revealed.has(activeIndex) ? (
            <span className="rounded-sm bg-coffee-blue px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-white">
              {t("about.scratch.done")}
            </span>
          ) : null}
          <span className="text-5xl" aria-hidden="true">
            {activeFact.emoji}
          </span>
          <p className="font-display text-base font-bold leading-snug text-coffee-ink sm:text-lg sm:leading-relaxed">
            {l(activeFact.fact)}
          </p>
        </div>

        {!revealed.has(activeIndex) ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            aria-label={scratchHint}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
