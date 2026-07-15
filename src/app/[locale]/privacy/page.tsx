import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { PRIVACY_SECTIONS } from "@/data/legal";
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
    "/privacy",
    "page.privacy.title",
    "page.privacy.desc",
  );
}

export default function PrivacyPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.privacy.eyebrow"
        titleKey="page.privacy.title"
        descriptionKey="page.privacy.desc"
      />
      <LegalPageContent sections={PRIVACY_SECTIONS} />
    </>
  );
}
