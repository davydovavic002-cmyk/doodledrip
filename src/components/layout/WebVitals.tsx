"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Lightweight vitals reporting — logs in production for monitoring hooks.
 * Swap console for your analytics endpoint when ready.
 */
export function WebVitals(): null {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== "production") return;
    // Structured for log drains / RUM later
    console.info(
      JSON.stringify({
        type: "web-vital",
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        navigationType: metric.navigationType,
      }),
    );
  });
  return null;
}
