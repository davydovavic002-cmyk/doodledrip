"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export interface FloatingCoffeeCupProps {
  className?: string;
}

export function FloatingCoffeeCup({
  className,
}: FloatingCoffeeCupProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18, mass: 0.8 };

  const cupX = useSpring(
    useTransform(mouseX, [-1, 1], [-16, 16]),
    springConfig,
  );
  const cupY = useSpring(
    useTransform(mouseY, [-1, 1], [-12, 12]),
    springConfig,
  );
  const steamX = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), {
    ...springConfig,
    stiffness: 80,
  });
  const steamY = useSpring(useTransform(mouseY, [-1, 1], [-5, 5]), {
    ...springConfig,
    stiffness: 80,
  });
  const rotate = useSpring(
    useTransform(mouseX, [-1, 1], [-5, 5]),
    springConfig,
  );
  const beanLeftX = useSpring(
    useTransform(mouseX, [-1, 1], [-10, 10]),
    springConfig,
  );
  const beanRightX = useSpring(
    useTransform(mouseX, [-1, 1], [8, -8]),
    springConfig,
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouseX.set((x - 0.5) * 2);
      mouseY.set((y - 0.5) * 2);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto h-[240px] w-[220px] sm:h-[300px] sm:w-[280px] md:h-[360px] md:w-[340px] lg:h-[400px] lg:w-[380px]",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Orbit — sits behind cup, sized to container */}
      <motion.div
        style={{ x: cupX, y: cupY, rotate }}
        className="pointer-events-none absolute inset-[8%] rounded-full border-4 border-dashed border-coffee-blue/25"
      />

      {/* Steam */}
      <motion.svg
        style={{ x: steamX, y: steamY }}
        viewBox="0 0 120 60"
        className="pointer-events-none absolute left-1/2 top-2 w-24 -translate-x-1/2 sm:w-28 md:top-4 md:w-32"
        fill="none"
      >
        <motion.path
          d="M30 55 C25 40, 35 30, 30 15 C28 8, 32 2, 30 0"
          stroke="#1a3a8f"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            d: [
              "M30 55 C25 40, 35 30, 30 15 C28 8, 32 2, 30 0",
              "M30 55 C28 38, 32 28, 30 12 C29 5, 31 1, 30 0",
              "M30 55 C25 40, 35 30, 30 15 C28 8, 32 2, 30 0",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M60 55 C55 38, 65 28, 60 12 C58 5, 62 1, 60 0"
          stroke="#1a3a8f"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            d: [
              "M60 55 C55 38, 65 28, 60 12 C58 5, 62 1, 60 0",
              "M60 55 C57 36, 63 26, 60 10 C59 4, 61 0, 60 0",
              "M60 55 C55 38, 65 28, 60 12 C58 5, 62 1, 60 0",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
        <motion.path
          d="M90 55 C85 42, 95 32, 90 18 C88 10, 92 3, 90 0"
          stroke="#1a3a8f"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            d: [
              "M90 55 C85 42, 95 32, 90 18 C88 10, 92 3, 90 0",
              "M90 55 C87 40, 93 30, 90 16 C89 8, 91 2, 90 0",
              "M90 55 C85 42, 95 32, 90 18 C88 10, 92 3, 90 0",
            ],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />
      </motion.svg>

      {/* Main cup — hero scale */}
      <motion.div
        style={{ x: cupX, y: cupY, rotate, willChange: "transform" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.svg
          viewBox="0 0 200 220"
          className="h-[220px] w-[200px] sm:h-[250px] sm:w-[228px] md:h-[300px] md:w-[274px]"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
        >
          <path
            d="M40 80 L35 180 Q35 200 55 200 L145 200 Q165 200 165 180 L160 80 Z"
            fill="white"
            stroke="#1a3a8f"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <ellipse
            cx="100"
            cy="80"
            rx="62"
            ry="14"
            fill="white"
            stroke="#1a3a8f"
            strokeWidth="4"
          />
          <ellipse
            cx="100"
            cy="85"
            rx="52"
            ry="10"
            fill="#1a3a8f"
            opacity="0.85"
          />
          <path
            d="M165 100 Q200 100 200 140 Q200 175 165 170"
            fill="none"
            stroke="#1a3a8f"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="80" cy="130" r="4" fill="#1a3a8f" />
          <circle cx="120" cy="130" r="4" fill="#1a3a8f" />
          <path
            d="M85 155 Q100 168 115 155"
            fill="none"
            stroke="#1a3a8f"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="68" cy="145" r="8" fill="#2d5bd4" opacity="0.2" />
          <circle cx="132" cy="145" r="8" fill="#2d5bd4" opacity="0.2" />
          <text x="55" y="65" fontSize="14" fill="#2d5bd4" fontWeight="bold">
            ✦
          </text>
          <text x="140" y="55" fontSize="10" fill="#1a3a8f" fontWeight="bold">
            ✦
          </text>
        </motion.svg>
      </motion.div>

      {/* Flat shadow */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 h-3 w-36 -translate-x-1/2 bg-coffee-blue/15 sm:bottom-8 sm:w-44 md:bottom-10 md:w-52" />

      {/* Beans — matched scale */}
      <motion.div
        style={{ x: beanLeftX }}
        className="absolute left-2 top-[38%] sm:left-3"
        animate={{ y: [0, -8, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <CoffeeBean className="h-9 w-7 md:h-10 md:w-8" />
      </motion.div>

      <motion.div
        style={{ x: beanRightX }}
        className="absolute bottom-[28%] right-2 sm:right-3"
        animate={{ y: [0, 7, 0], rotate: [0, -10, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <CoffeeBean className="h-9 w-7 md:h-10 md:w-8" />
      </motion.div>
    </div>
  );
}

function CoffeeBean({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 40 50" className={className}>
      <ellipse
        cx="20"
        cy="25"
        rx="16"
        ry="22"
        fill="#f8f9ff"
        stroke="#1a3a8f"
        strokeWidth="3"
      />
      <path
        d="M20 8 Q28 25 20 42 Q12 25 20 8"
        fill="none"
        stroke="#1a3a8f"
        strokeWidth="2"
      />
    </svg>
  );
}
