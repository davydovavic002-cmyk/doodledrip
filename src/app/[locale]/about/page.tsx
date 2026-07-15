import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { getLocaleFromParams } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return pageMetadata(locale, "/about", "page.about.title", "page.about.desc");
}

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.about.eyebrow"
        titleKey="page.about.title"
        descriptionKey="page.about.desc"
      />
      <AboutPageContent />
    </>
  );
}
