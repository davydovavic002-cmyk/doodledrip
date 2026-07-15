import type { ReactNode } from "react";

/**
 * Passthrough root layout — html/body live in `[locale]/layout.tsx`.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return children;
}
