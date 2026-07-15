import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { RETURNS_SECTIONS } from "@/data/legal";
import { getLocaleFromParams } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return pageMetadata(
    locale,
    "/returns",
    "page.returns.title",
    "page.returns.desc",
  );
}

export default function ReturnsPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.returns.eyebrow"
        titleKey="page.returns.title"
        descriptionKey="page.returns.desc"
      />
      <LegalPageContent sections={RETURNS_SECTIONS} />
    </>
  );
}
