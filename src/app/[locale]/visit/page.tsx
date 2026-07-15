import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { VisitPageContent } from "@/components/visit/VisitPageContent";
import { getLocaleFromParams } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return pageMetadata(locale, "/visit", "page.visit.title", "page.visit.desc");
}

export default function VisitPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.visit.eyebrow"
        titleKey="page.visit.title"
        descriptionKey="page.visit.desc"
      />
      <VisitPageContent />
    </>
  );
}
