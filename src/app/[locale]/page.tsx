import type { Metadata } from "next";
import { AnnouncementMarquee } from "@/components/home/AnnouncementMarquee";
import { Hero } from "@/components/home/Hero";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import {
  InstagramWall,
  ReviewsSection,
} from "@/components/home/SocialProof";
import { getLocaleFromParams } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return pageMetadata(locale, "/", "page.home.title", "page.home.desc");
}

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <AnnouncementMarquee />
      <Hero />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <NewsletterSignup />
      </div>
      <ReviewsSection />
      <InstagramWall />
    </>
  );
}
