import type { Amenity, Partner } from "@/types";

export const VISIT_PHOTOS = [
  {
    id: "facade",
    src: "/images/visit-facade.png",
    alt: {
      en: "Doodle & Drip facade on Vrijdagmarkt",
      nl: "Doodle & Drip gevel op de Vrijdagmarkt",
    },
  },
  {
    id: "interior",
    src: "/images/visit-interior.png",
    alt: {
      en: "Café interior with espresso bar",
      nl: "Café-interieur met espressobar",
    },
  },
  {
    id: "canal",
    src: "/images/visit-canal.png",
    alt: {
      en: "Canal walk near the café",
      nl: "Langs de grachten vlakbij het café",
    },
  },
] as const;

export const TRANSIT = {
  tram: {
    en: "Tram 1 or 4 to Vrijdagmarkt (2 min walk). From Gent-Sint-Pieters ±15 min.",
    nl: "Tram 1 of 4 naar Vrijdagmarkt (2 min stappen). Vanuit Gent-Sint-Pieters ±15 min.",
  },
  bike: {
    en: "Blue bike racks on the square. Covered racks behind the café for café guests.",
    nl: "Blauwe fietsenrekken op het plein. Overdekte rekken achter het café voor gasten.",
  },
  walk: {
    en: "From Korenmarkt: 6 minutes via Cataloniëstraat. Look for the thick blue door.",
    nl: "Vanaf Korenmarkt: 6 minuten via Cataloniëstraat. Zoek de dikke blauwe deur.",
  },
} as const;

export const AMENITIES: Amenity[] = [
  {
    id: "wifi",
    icon: "wifi",
    label: { en: "Free Wi‑Fi", nl: "Gratis Wi‑Fi" },
    detail: {
      en: "Network: DoodleGuest · ask for the doodle password at the bar.",
      nl: "Netwerk: DoodleGuest · vraag het doodle-wachtwoord aan de bar.",
    },
  },
  {
    id: "music",
    icon: "music",
    label: { en: "Vinyl & playlists", nl: "Vinyl & playlists" },
    detail: {
      en: "Morning jazz → afternoon indie. Staff picks rotate monthly.",
      nl: "Ochtendjazz → namiddag indie. Staff picks wisselen maandelijks.",
    },
  },
  {
    id: "dog",
    icon: "dog",
    label: { en: "Dog-friendly", nl: "Honden welkom" },
    detail: {
      en: "Water bowls at the door. Keep pups on a short leash indoors.",
      nl: "Waterbakjes aan de deur. Houd pups kort aangelijnd binnen.",
    },
  },
  {
    id: "bike",
    icon: "bike",
    label: { en: "Bike parking", nl: "Fietsparking" },
    detail: {
      en: "Square racks + café courtyard racks for longer visits.",
      nl: "Pleinrekken + cafékoer voor langere bezoeken.",
    },
  },
  {
    id: "socket",
    icon: "socket",
    label: { en: "Power outlets", nl: "Stopcontacten" },
    detail: {
      en: "Window seats and the long table have EU sockets.",
      nl: "Ramenbank en de lange tafel hebben EU-stopcontacten.",
    },
  },
];

/** Rough coords around Vrijdagmarkt, Gent */
export const CAFE_COORDS = { lat: 51.0574, lng: 3.7256 };

export const PARTNERS: Partner[] = [
  {
    id: "broodhuis",
    name: "Broodhuis",
    type: "bakery",
    description: {
      en: "Our pastry partners — croissants land warm every morning.",
      nl: "Onze bakkerijpartner — croissants komen warm binnen elke ochtend.",
    },
    mapLat: 51.0568,
    mapLng: 3.7249,
  },
  {
    id: "yirga-coop",
    name: "Kochere Co-op",
    type: "farmer",
    description: {
      en: "Ethiopia — source of our Yirgacheffe micro-lots.",
      nl: "Ethiopië — herkomst van onze Yirgacheffe micro-lots.",
    },
    mapLat: 51.0581,
    mapLng: 3.7272,
  },
  {
    id: "huila-finca",
    name: "Finca El Mirador",
    type: "farmer",
    description: {
      en: "Colombia Huila partners — caramel apple notes year-round.",
      nl: "Partners in Colombia Huila — karamel-appel tonen het jaar rond.",
    },
    mapLat: 51.0562,
    mapLng: 3.7268,
  },
];

export const OSM_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=3.7206%2C51.0544%2C3.7306%2C51.0604&layer=mapnik&marker=51.0574%2C3.7256";
