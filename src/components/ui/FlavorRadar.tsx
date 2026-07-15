"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";
import type { FlavorProfile } from "@/types";

export interface FlavorRadarProps {
  profile: FlavorProfile;
  size?: number;
  className?: string;
}

/** Acid top, Sweet bottom-right, Body bottom-left */
const AXES = [
  { key: "acid" as const, labelKey: "flavor.acid", angle: 0 },
  { key: "sweetness" as const, labelKey: "flavor.sweet", angle: 120 },
  { key: "body" as const, labelKey: "flavor.body", angle: 240 },
];

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
): { x: number; y: number } {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function buildPolygonPoints(
  profile: FlavorProfile,
  cx: number,
  cy: number,
  maxRadius: number,
): string {
  return AXES.map((axis) => {
    const value = profile[axis.key] / 100;
    const point = polarToCartesian(cx, cy, maxRadius * value, axis.angle);
    return `${point.x},${point.y}`;
  }).join(" ");
}

function labelLayout(angle: number): {
  textAnchor: "start" | "middle" | "end";
  dy: number;
} {
  if (angle === 0) return { textAnchor: "middle", dy: 0 };
  if (angle === 120) return { textAnchor: "start", dy: 4 };
  return { textAnchor: "end", dy: 4 };
}

export function FlavorRadar({
  profile,
  size = 200,
  className,
}: FlavorRadarProps): React.JSX.Element {
  const { t } = useI18n();
  // Extra room for labels — viewBox matches display size 1:1 so fontSize stays readable
  const pad = Math.round(size * 0.22);
  const outer = size + pad * 2;
  const cx = outer / 2;
  const cy = outer / 2;
  const maxRadius = size * 0.34;
  const labelRadius = maxRadius + pad * 0.55;
  const fontSize = Math.max(14, Math.round(size * 0.095));
  const points = buildPolygonPoints(profile, cx, cy, maxRadius);

  return (
    <svg
      viewBox={`0 0 ${outer} ${outer}`}
      width={outer}
      height={outer}
      className={cn("mx-auto block overflow-visible", className)}
      role="img"
      aria-label={`${t("menu.flavorTitle")}: ${t("flavor.acid")} ${profile.acid}, ${t("flavor.body")} ${profile.body}, ${t("flavor.sweet")} ${profile.sweetness}`}
    >
      {[0.33, 0.66, 1].map((scale) => (
        <polygon
          key={scale}
          points={AXES.map((axis) => {
            const p = polarToCartesian(cx, cy, maxRadius * scale, axis.angle);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="#1a3a8f"
          strokeWidth="1.5"
          opacity={0.2}
        />
      ))}

      {AXES.map((axis) => {
        const end = polarToCartesian(cx, cy, maxRadius, axis.angle);
        return (
          <line
            key={axis.key}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="#1a3a8f"
            strokeWidth="1.5"
            opacity={0.3}
          />
        );
      })}

      <motion.polygon
        points={points}
        fill="#2d5bd4"
        fillOpacity={0.25}
        stroke="#1a3a8f"
        strokeWidth="3"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {AXES.map((axis) => {
        const labelPos = polarToCartesian(cx, cy, labelRadius, axis.angle);
        const { textAnchor, dy } = labelLayout(axis.angle);
        return (
          <text
            key={axis.key}
            x={labelPos.x}
            y={labelPos.y + dy}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            fill="#1a3a8f"
            fontSize={fontSize}
            fontWeight={700}
            fontFamily="var(--font-display), Space Grotesk, sans-serif"
            style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}
          >
            {t(axis.labelKey)}
          </text>
        );
      })}

      {AXES.map((axis) => {
        const value = profile[axis.key] / 100;
        const dot = polarToCartesian(cx, cy, maxRadius * value, axis.angle);
        return (
          <motion.circle
            key={`dot-${axis.key}`}
            cx={dot.x}
            cy={dot.y}
            r={5}
            fill="#1a3a8f"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          />
        );
      })}
    </svg>
  );
}
