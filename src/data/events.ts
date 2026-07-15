import type { ShopEvent } from "@/types";

export const EVENTS: ShopEvent[] = [
  {
    id: "cupping-sat",
    title: {
      en: "Saturday Morning Cupping",
      nl: "Zaterdagochtend Cupping",
    },
    type: "cupping",
    date: "2026-07-19",
    time: "10:00",
    location: {
      en: "Roastery Tasting Bar · Vrijdagmarkt",
      nl: "Branderij Proefbar · Vrijdagmarkt",
    },
    description: {
      en: "Cup 4 single-origin coffees side by side. Learn to identify acidity, body, and sweetness like a pro.",
      nl: "Proef 4 single-origin koffies naast elkaar. Leer zuurgraad, body en zoetheid herkennen als een pro.",
    },
    spotsLeft: 6,
    totalSpots: 12,
    host: "Maya Chen, Head Roaster",
  },
  {
    id: "tandem-collab",
    title: {
      en: "Broodhuis Bakery Collab Night",
      nl: "Broodhuis Bakkerij Collab Night",
    },
    type: "collab",
    date: "2026-07-25",
    time: "18:00",
    location: {
      en: "Main Floor · Vrijdagmarkt",
      nl: "Gelijkvloers · Vrijdagmarkt",
    },
    description: {
      en: "Exclusive pastry pairings with our new Ethiopian natural. Live latte art throwdown with Broodhuis.",
      nl: "Exclusieve gebak-pairing bij onze nieuwe Ethiopische natural. Live latte art throwdown met Broodhuis.",
    },
    spotsLeft: 18,
    totalSpots: 30,
    host: "Doodle & Drip × Broodhuis",
  },
  {
    id: "brew-workshop",
    title: {
      en: "Home Brew Workshop",
      nl: "Home Brew Workshop",
    },
    type: "workshop",
    date: "2026-08-02",
    time: "14:00",
    location: {
      en: "Workshop Room · Vrijdagmarkt",
      nl: "Workshopruimte · Vrijdagmarkt",
    },
    description: {
      en: "Master V60 technique. Take home a bag of beans and a custom brew recipe card.",
      nl: "Beheers de V60-techniek. Neem een zak bonen en een persoonlijke recipe card mee naar huis.",
    },
    spotsLeft: 4,
    totalSpots: 8,
    host: "Alex Rivera",
  },
  {
    id: "natural-tasting",
    title: {
      en: "Natural Process Tasting",
      nl: "Natural Process Proeverij",
    },
    type: "tasting",
    date: "2026-08-09",
    time: "11:00",
    location: {
      en: "Roastery Tasting Bar",
      nl: "Branderij Proefbar",
    },
    description: {
      en: "Explore fruit-forward naturals from Ethiopia, Kenya, and Colombia. Limited seats.",
      nl: "Ontdek fruitige naturals uit Ethiopië, Kenia en Colombia. Beperkt aantal plaatsen.",
    },
    spotsLeft: 10,
    totalSpots: 15,
    host: "Maya Chen",
  },
  {
    id: "latte-art",
    title: {
      en: "Latte Art Basics",
      nl: "Latte Art Basics",
    },
    type: "workshop",
    date: "2026-08-16",
    time: "16:00",
    location: {
      en: "Espresso Bar",
      nl: "Espressobar",
    },
    description: {
      en: "From hearts to rosettas — hands-on session with our barista team. All levels welcome.",
      nl: "Van harten tot rosetta's — hands-on sessie met ons barista-team. Alle levels welkom.",
    },
    spotsLeft: 8,
    totalSpots: 10,
    host: "Sam Okonkwo",
  },
  {
    id: "roastery-tour",
    title: {
      en: "Behind the Roast Tour",
      nl: "Achter de Brand Tour",
    },
    type: "tasting",
    date: "2026-08-23",
    time: "13:00",
    location: {
      en: "Roasting Floor",
      nl: "Brandvloer",
    },
    description: {
      en: "See the Loring roaster in action. Sample green coffee and follow beans from crop to cup.",
      nl: "Zie de Loring-brander in actie. Proef green coffee en volg bonen van oogst tot kop.",
    },
    spotsLeft: 12,
    totalSpots: 20,
    host: "Maya Chen",
  },
];
