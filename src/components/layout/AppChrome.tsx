"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { WebVitals } from "@/components/layout/WebVitals";

const MiniCart = dynamic(
  () =>
    import("@/components/shop/MiniCart").then((m) => ({ default: m.MiniCart })),
  { ssr: false },
);

export function AppChrome({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <ErrorBoundary>
      <WebVitals />
      {children}
      <MiniCart />
    </ErrorBoundary>
  );
}
