import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
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
    "/checkout",
    "page.checkout.title",
    "page.checkout.desc",
  );
}

export default function CheckoutPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.checkout.eyebrow"
        titleKey="page.checkout.title"
        descriptionKey="page.checkout.desc"
      />
      <CheckoutForm />
    </>
  );
}
