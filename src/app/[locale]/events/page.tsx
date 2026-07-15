import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { EventsPageContent } from "@/components/events/EventsPageContent";
import { getLocaleFromParams } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return pageMetadata(locale, "/events", "page.events.title", "page.events.desc");
}

export default function EventsPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrowKey="page.events.eyebrow"
        titleKey="page.events.title"
        descriptionKey="page.events.desc"
      />
      <EventsPageContent />
    </>
  );
}
