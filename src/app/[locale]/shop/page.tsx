import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ShopPageContent } from "@/components/shop/ProductCard";
import { PRODUCTS } from "@/data/products";
import { getLocaleFromParams } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return pageMetadata(locale, "/shop", "page.shop.title", "page.shop.desc");
}

export default function ShopPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.shop.eyebrow"
        titleKey="page.shop.title"
        descriptionKey="page.shop.desc"
      />
      <ShopPageContent products={PRODUCTS} />
    </>
  );
}
