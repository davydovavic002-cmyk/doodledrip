import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FaqPageContent } from "@/components/faq/FaqPageContent";
import { getLocaleFromParams } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return pageMetadata(locale, "/faq", "page.faq.title", "page.faq.desc");
}

export default function FaqPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.faq.eyebrow"
        titleKey="page.faq.title"
        descriptionKey="page.faq.desc"
      />
      <FaqPageContent />
    </>
  );
}
