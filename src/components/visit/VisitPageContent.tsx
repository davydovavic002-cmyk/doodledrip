"use client";

import Image from "next/image";
import {
  Bike,
  Bus,
  Dog,
  MapPin,
  Music2,
  PersonStanding,
  Plug,
  Wifi,
} from "lucide-react";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AMENITIES,
  OSM_EMBED,
  PARTNERS,
  TRANSIT,
  VISIT_PHOTOS,
} from "@/data/visit";
import { SITE_LOCATION } from "@/lib/constants";
import { useI18n } from "@/hooks/use-i18n";

const amenityIcons = {
  wifi: Wifi,
  music: Music2,
  dog: Dog,
  bike: Bike,
  socket: Plug,
} as const;

export function VisitPageContent(): React.JSX.Element {
  const { t, l, locale } = useI18n();

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:space-y-16 sm:py-12 md:px-8">
      {/* Photo strip */}
      <div className="grid gap-4 md:grid-cols-3">
        {VISIT_PHOTOS.map((photo, i) => (
          <BrutalCard
            key={photo.id}
            className={`overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
          >
            <div
              className={`relative ${i === 0 ? "aspect-[16/10] md:aspect-auto md:h-full md:min-h-[420px]" : "aspect-[4/3]"}`}
            >
              <Image
                src={photo.src}
                alt={l(photo.alt)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          </BrutalCard>
        ))}
      </div>

      {/* Address + hours */}
      <div className="grid gap-6 md:grid-cols-2">
        <BrutalCard className="p-6">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-coffee-blue">
            {SITE_LOCATION.city}
          </p>
          <h2 className="mt-2 font-display text-2xl font-black">
            {SITE_LOCATION.street}
          </h2>
          <p className="text-coffee-ink/70">
            {SITE_LOCATION.postalCode} {SITE_LOCATION.city},{" "}
            {t("visit.belgium")}
          </p>
          <p className="mt-4 text-sm text-coffee-ink/70">
            {locale === "nl" ? SITE_LOCATION.hoursNl : SITE_LOCATION.hours}
          </p>
          <a
            href={SITE_LOCATION.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block"
          >
            <Button>
              <MapPin className="h-4 w-4" strokeWidth={2.5} />
              {t("visit.openMaps")}
            </Button>
          </a>
        </BrutalCard>

        <BrutalCard className="overflow-hidden p-0">
          <iframe
            title={t("visit.map")}
            src={OSM_EMBED}
            className="h-64 w-full border-0 md:h-full md:min-h-[280px]"
            loading="lazy"
          />
        </BrutalCard>
      </div>

      {/* Transit */}
      <section>
        <SectionHeading
          eyebrow={t("visit.gent")}
          title={t("visit.getHere")}
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <TransitCard
            icon={<Bus className="h-6 w-6" strokeWidth={2.5} />}
            title={t("visit.tram")}
            body={l(TRANSIT.tram)}
          />
          <TransitCard
            icon={<Bike className="h-6 w-6" strokeWidth={2.5} />}
            title={t("visit.bike")}
            body={l(TRANSIT.bike)}
          />
          <TransitCard
            icon={<PersonStanding className="h-6 w-6" strokeWidth={2.5} />}
            title={t("visit.walk")}
            body={l(TRANSIT.walk)}
          />
        </div>
      </section>

      {/* Amenities */}
      <section>
        <SectionHeading title={t("visit.amenities")} className="mb-8" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((item) => {
            const Icon = amenityIcons[item.icon];
            return (
              <BrutalCard key={item.id} className="p-5">
                <Icon className="h-6 w-6 text-coffee-blue" strokeWidth={2.5} />
                <h3 className="mt-3 font-display text-lg font-bold">
                  {l(item.label)}
                </h3>
                <p className="mt-1 text-sm text-coffee-ink/60">
                  {l(item.detail)}
                </p>
              </BrutalCard>
            );
          })}
        </div>
      </section>

      {/* Partners */}
      <section>
        <SectionHeading title={t("visit.partners")} className="mb-8" />
        <div className="grid gap-4 md:grid-cols-3">
          {PARTNERS.map((partner) => (
            <BrutalCard key={partner.id} className="p-5">
              <span className="border-2 border-coffee-blue bg-coffee-cream px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-coffee-blue">
                {t(`partner.${partner.type}`)}
              </span>
              <h3 className="mt-3 font-display text-lg font-black">
                {partner.name}
              </h3>
              <p className="mt-2 text-sm text-coffee-ink/60">
                {l(partner.description)}
              </p>
              <p className="mt-3 font-display text-xs font-bold text-coffee-blue">
                ✦ {partner.mapLat.toFixed(4)}, {partner.mapLng.toFixed(4)}
              </p>
            </BrutalCard>
          ))}
        </div>
      </section>
    </div>
  );
}

function TransitCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}): React.JSX.Element {
  return (
    <BrutalCard className="p-5">
      <div className="text-coffee-blue">{icon}</div>
      <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-coffee-ink/60">{body}</p>
    </BrutalCard>
  );
}
