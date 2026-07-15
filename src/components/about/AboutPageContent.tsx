"use client";

import dynamic from "next/dynamic";
import { Timeline } from "@/components/about/Timeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FUN_FACTS, TIMELINE } from "@/data/about";
import { useI18n } from "@/hooks/use-i18n";

const ScratchReveal = dynamic(
  () =>
    import("@/components/about/ScratchReveal").then((m) => ({
      default: m.ScratchReveal,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto h-64 max-w-md border-4 border-dashed border-coffee-blue/30"
        aria-hidden="true"
      />
    ),
  },
);

export function AboutPageContent(): React.JSX.Element {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <SectionHeading
        eyebrow={t("about.story.eyebrow")}
        title={t("about.story.title")}
        description={t("about.story.desc")}
        className="mb-12"
      />

      <Timeline milestones={TIMELINE} />

      <div className="mt-20 border-t-4 border-coffee-blue pt-16">
        <SectionHeading
          eyebrow={t("about.scratch.eyebrow")}
          title={t("about.scratch.title")}
          description={t("about.scratch.desc")}
          align="center"
          className="mb-10"
        />
        <ScratchReveal facts={FUN_FACTS} />
      </div>
    </div>
  );
}
