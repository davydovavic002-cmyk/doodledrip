import type { NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { labelKey: "nav.menu", href: "/menu" },
  { labelKey: "nav.events", href: "/events" },
  { labelKey: "nav.shop", href: "/shop" },
  { labelKey: "nav.visit", href: "/visit" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.faq", href: "/faq" },
];

export const LEGAL_LINKS = [
  { labelKey: "footer.privacy", href: "/privacy" },
  { labelKey: "footer.shipping", href: "/shipping" },
  { labelKey: "footer.returns", href: "/returns" },
] as const;

export const ANNOUNCEMENTS = [
  {
    id: "1",
    text: {
      en: "New Ethiopian Yirgacheffe — Limited Drop",
      nl: "Nieuwe Ethiopische Yirgacheffe — Limited Drop",
    },
    highlight: true,
  },
  {
    id: "2",
    text: {
      en: "Saturday Cupping @ 10:00 — RSVP Open",
      nl: "Zaterdag Cupping @ 10:00 — RSVP open",
    },
  },
  {
    id: "3",
    text: {
      en: "Free Shipping on Orders Over €45",
      nl: "Gratis verzending vanaf €45",
    },
  },
  {
    id: "4",
    text: {
      en: "Collab Roast with Broodhuis Bakery — This Friday",
      nl: "Collab-branding met Broodhuis — deze vrijdag",
    },
    highlight: true,
  },
  {
    id: "5",
    text: {
      en: "Seasonal Menu: Lavender Honey Latte is Back",
      nl: "Seizoensmenu: Lavender Honey Latte is terug",
    },
  },
] as const;

export const SITE_NAME = "Doodle & Drip";
/** Default English tagline for metadata; UI uses t("home.tagline") */
export const SITE_TAGLINE = "Specialty Coffee, Drawn Bold";

export const SITE_LOCATION = {
  street: "Vrijdagmarkt 12",
  city: "Gent",
  postalCode: "9000",
  country: "Belgium",
  countryCode: "BE",
  full: "Vrijdagmarkt 12, 9000 Gent, Belgium",
  short: "Vrijdagmarkt 12, Gent",
  phone: "+32 9 234 56 78",
  email: "hello@doodleanddrip.be",
  hours: "Mon–Fri 7:30–18:00 · Sat–Sun 9:00–17:00",
  hoursNl: "Ma–vr 7:30–18:00 · za–zo 9:00–17:00",
  mapUrl: "https://maps.google.com/?q=Vrijdagmarkt+12,+9000+Gent",
  instagram: "@doodleanddrip",
} as const;

export const FREE_SHIPPING_THRESHOLD = 45;
export const SHIPPING_FLAT_RATE = 4.5;
