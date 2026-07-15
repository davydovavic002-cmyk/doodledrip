import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { SHIPPING_SECTIONS } from "@/data/legal";
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
    "/shipping",
    "page.shipping.title",
    "page.shipping.desc",
  );
}

export default function ShippingPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.shipping.eyebrow"
        titleKey="page.shipping.title"
        descriptionKey="page.shipping.desc"
      />
      <LegalPageContent sections={SHIPPING_SECTIONS} />
    </>
  );
}
