import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccess } from "@/components/shop/OrderSuccess";
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
    "/checkout/success",
    "page.success.title",
    "page.success.desc",
  );
}

export default function CheckoutSuccessPage(): React.JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center font-display font-bold text-coffee-ink/40">
          Loading…
        </div>
      }
    >
      <OrderSuccess />
    </Suspense>
  );
}
