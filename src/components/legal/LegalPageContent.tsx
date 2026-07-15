"use client";

import { BrutalCard } from "@/components/ui/BrutalCard";
import type { LegalSection } from "@/data/legal";
import { useI18n } from "@/hooks/use-i18n";

export function LegalPageContent({
  sections,
}: {
  sections: LegalSection[];
}): React.JSX.Element {
  const { l } = useI18n();

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 md:px-8">
      {sections.map((section) => (
        <BrutalCard key={section.heading.en} className="p-6">
          <h2 className="font-display text-xl font-black text-coffee-ink">
            {l(section.heading)}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-coffee-ink/70">
            {l(section.body)}
          </p>
        </BrutalCard>
      ))}
    </div>
  );
}
