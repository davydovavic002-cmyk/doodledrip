"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSTAGRAM_POSTS, REVIEWS } from "@/data/social";
import { useI18n } from "@/hooks/use-i18n";

export function ReviewsSection(): React.JSX.Element {
  const { t, l } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:px-8">
      <SectionHeading
        eyebrow={t("reviews.eyebrow")}
        title={t("reviews.title")}
        className="mb-6 sm:mb-8"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((review) => (
          <BrutalCard key={review.id} className="p-5">
            <div className="flex gap-0.5" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-coffee-blue text-coffee-blue"
                  strokeWidth={2}
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-coffee-ink/80">
              “{l(review.text)}”
            </p>
            <p className="mt-4 font-display text-sm font-bold text-coffee-blue">
              {review.author}
            </p>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}

export function InstagramWall(): React.JSX.Element {
  const { t, l } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:px-8">
      <SectionHeading
        eyebrow={t("instagram.eyebrow")}
        title={t("instagram.title")}
        className="mb-6 sm:mb-8"
      />
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
        {INSTAGRAM_POSTS.map((post) => (
          <a
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <BrutalCard className="overflow-hidden transition-shadow group-hover:shadow-brutal-lg">
              <div className="relative aspect-square">
                <Image
                  src={post.image}
                  alt={l(post.caption)}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <p className="border-t-2 border-coffee-blue p-3 font-display text-xs font-bold text-coffee-ink">
                {l(post.caption)}
              </p>
            </BrutalCard>
          </a>
        ))}
      </div>
    </section>
  );
}
