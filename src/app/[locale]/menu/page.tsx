import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { MenuPageContent } from "@/components/menu/MenuPageContent";
import { getLocaleFromParams } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return pageMetadata(locale, "/menu", "page.menu.title", "page.menu.desc");
}

export default function MenuPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.menu.eyebrow"
        titleKey="page.menu.title"
        descriptionKey="page.menu.desc"
      />
      <MenuPageContent />
    </>
  );
}
