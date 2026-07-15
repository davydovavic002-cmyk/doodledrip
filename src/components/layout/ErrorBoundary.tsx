"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
          <p className="font-display text-2xl font-black text-coffee-ink">
            Something went wrong
          </p>
          <p className="text-sm text-coffee-ink/60">
            Try refreshing the page. If it keeps happening, come back later —
            we&apos;re roasting through it.
          </p>
          <Button type="button" onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
