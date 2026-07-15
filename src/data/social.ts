import type {
  FaqItem,
  InstagramPost,
  Review,
  TeamMember,
} from "@/types";

export const TEAM: TeamMember[] = [
  {
    id: "maya",
    name: "Maya Chen",
    role: { en: "Head Roaster", nl: "Hoofdbrander" },
    bio: {
      en: "Chases first crack like a sport. Once burned a test batch… twice. Owns it.",
      nl: "Jaagt first crack alsof het topsport is. Heeft ooit een testbatch… twee keer laten aanbranden.",
    },
    image: "/images/team-maya.png",
  },
  {
    id: "sam",
    name: "Sam Okonkwo",
    role: { en: "Lead Barista", nl: "Lead Barista" },
    bio: {
      en: "Latte art champion of Vrijdagmarkt (unofficial). Remembers your usual.",
      nl: "Latte art-kampioen van de Vrijdagmarkt (officieus). Onthoudt jouw vaste bestelling.",
    },
    image: "/images/team-sam.png",
  },
  {
    id: "jules",
    name: "Jules De Smet",
    role: { en: "Pastry & Labels", nl: "Gebak & Labels" },
    bio: {
      en: "Draws every bag label by hand. Also smuggles Broodhuis croissants.",
      nl: "Tekent elk zaklabel met de hand. Smokkelt ook Broodhuis-croissants.",
    },
    image: "/images/team-jules.png",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Lien V.",
    rating: 5,
    text: {
      en: "Best flat white in Gent. The doodle murals alone are worth the detour.",
      nl: "Beste flat white van Gent. Alleen al de doodle-muurschilderingen zijn een omweg waard.",
    },
    date: "2026-06-12",
  },
  {
    id: "r2",
    author: "Marc T.",
    rating: 5,
    text: {
      en: "Took the Saturday cupping — finally understand acidity without being a snob about it.",
      nl: "Zaterdagcupping gedaan — eindelijk begrijp ik aciditeit zonder snob te worden.",
    },
    date: "2026-05-28",
  },
  {
    id: "r3",
    author: "Amina K.",
    rating: 5,
    text: {
      en: "Dog got a water bowl, I got oat lavender latte. Everybody won.",
      nl: "Hond kreeg een waterbakje, ik een haver-lavendel latte. Iedereen won.",
    },
    date: "2026-06-01",
  },
  {
    id: "r4",
    author: "Pieter D.",
    rating: 5,
    text: {
      en: "House blend + bike racks = my weekday ritual. Shipping to Antwerp is solid too.",
      nl: "Huisblend + fietsrekken = mijn weekritueel. Verzending naar Antwerpen is ook top.",
    },
    date: "2026-04-19",
  },
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig1",
    image: "/images/ig-latte.png",
    caption: {
      en: "Heart first, caffeine second.",
      nl: "Eerst hart, dan cafeïne.",
    },
    href: "https://instagram.com",
  },
  {
    id: "ig2",
    image: "/images/ig-beans.png",
    caption: {
      en: "Thursday micro-lot drop, still warm from the cooler.",
      nl: "Donderdag micro-lot drop, nog warm van de cooler.",
    },
    href: "https://instagram.com",
  },
  {
    id: "ig3",
    image: "/images/visit-interior.png",
    caption: {
      en: "Blue borders, busy mornings.",
      nl: "Blauwe randen, drukke ochtenden.",
    },
    href: "https://instagram.com",
  },
  {
    id: "ig4",
    image: "/images/visit-canal.png",
    caption: {
      en: "Post-espresso canal stroll recommended.",
      nl: "Na je espresso: grachtjeswandeling aangeraden.",
    },
    href: "https://instagram.com",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "ship-1",
    category: "shipping",
    question: {
      en: "Where do you ship?",
      nl: "Waarheen verzenden jullie?",
    },
    answer: {
      en: "Belgium & nearby EU (NL, DE, FR, LU). Orders over €45 ship free in Belgium. EU rates shown at checkout.",
      nl: "België & nabije EU (NL, DE, FR, LU). Bestellingen vanaf €45 verzenden gratis in België. EU-tarieven zie je bij checkout.",
    },
  },
  {
    id: "ship-2",
    category: "shipping",
    question: {
      en: "How fast is delivery?",
      nl: "Hoe snel is levering?",
    },
    answer: {
      en: "We roast to order Mon–Thu. Belgian parcels usually arrive in 2–4 working days after roast.",
      nl: "We branden op bestelling ma–do. Belgische pakjes komen meestal na 2–4 werkdagen na branding aan.",
    },
  },
  {
    id: "bean-1",
    category: "beans",
    question: {
      en: "How should I store my beans?",
      nl: "Hoe bewaar ik mijn bonen?",
    },
    answer: {
      en: "Airtight, cool, dark — never the fridge. Use within 4–6 weeks of the roast date for peak flavor.",
      nl: "Luchtdicht, koel, donker — nooit in de fridge. Gebruik binnen 4–6 weken na branddatum voor pieksmaak.",
    },
  },
  {
    id: "bean-2",
    category: "beans",
    question: {
      en: "Whole bean or ground?",
      nl: "Hele boon of gemalen?",
    },
    answer: {
      en: "Whole bean stays fresher. We grind for espresso or V60 if you ask — use ground coffee within 1–2 weeks.",
      nl: "Hele boon blijft frisser. We malen voor espresso of V60 op aanvraag — gemalen koffie binnen 1–2 weken gebruiken.",
    },
  },
  {
    id: "sub-1",
    category: "subscription",
    question: {
      en: "Do you offer subscriptions?",
      nl: "Hebben jullie abonnementen?",
    },
    answer: {
      en: "Thursday Drop Newsletter is free. A roast subscription (250g / month) launches this autumn — join the list to hear first.",
      nl: "De Thursday Drop Newsletter is gratis. Een roast-abonnement (250g / maand) start dit najaar — schrijf je in om het als eerste te horen.",
    },
  },
  {
    id: "sub-2",
    category: "subscription",
    question: {
      en: "Can I pause or cancel a future subscription?",
      nl: "Kan ik een toekomstig abonnement pauzeren of stopzetten?",
    },
    answer: {
      en: "Yes — pause anytime from your account email link. No awkward phone calls required.",
      nl: "Ja — pauzeer wanneer je wilt via de link in je mail. Geen ongemakkelijke telefoongesprekken.",
    },
  },
  {
    id: "cafe-1",
    category: "cafe",
    question: {
      en: "Are you dog-friendly / laptop-friendly?",
      nl: "Zijn honden / laptops welkom?",
    },
    answer: {
      en: "Dogs yes (short leash). Laptops yes until 16:00 on weekdays — evenings we keep tables for conversation.",
      nl: "Honden ja (kort aangelijnd). Laptops ja tot 16:00 op weekdagen — 's avonds houden we tafels vrij voor gesprekken.",
    },
  },
];
