import type { MenuItem } from "@/types";

export const MENU_ITEMS: MenuItem[] = [
  // —— Filter (flavor radar only here) ——
  {
    id: "pour-over",
    name: {
      en: "Single Origin Pour Over",
      nl: "Single Origin Pour Over",
    },
    description: {
      en: "Rotating guest bean, brewed to order on V60.",
      nl: "Wisselende gastboon, op bestelling gezet op V60.",
    },
    price: 5.5,
    category: "filter",
    flavor: { acid: 75, body: 45, sweetness: 60 },
    tags: ["Guest Bean"],
    dietary: ["lactose-free", "vegan"],
  },
  {
    id: "batch-brew",
    name: { en: "Batch Brew", nl: "Batch Brew" },
    description: {
      en: "Today's roast on tap. Refills half price.",
      nl: "De brand van vandaag op tap. Bijvullen half prijs.",
    },
    price: 3.5,
    category: "filter",
    flavor: { acid: 55, body: 50, sweetness: 50 },
    dietary: ["lactose-free", "vegan"],
  },
  {
    id: "cold-brew",
    name: { en: "Cold Brew", nl: "Cold Brew" },
    description: {
      en: "18-hour steep. Silky, chocolatey, zero bitterness.",
      nl: "18 uur trekken. Zijdezacht, chocoladeachtig, geen bitterheid.",
    },
    price: 5,
    category: "filter",
    flavor: { acid: 30, body: 70, sweetness: 55 },
    tags: ["Best Seller"],
    dietary: ["lactose-free", "vegan"],
  },
  {
    id: "aeropress",
    name: { en: "AeroPress", nl: "AeroPress" },
    description: {
      en: "Full immersion, clean cup. Ask which bean is on today.",
      nl: "Full immersion, schone kop. Vraag welke boon vandaag staat.",
    },
    price: 5,
    category: "filter",
    flavor: { acid: 60, body: 55, sweetness: 55 },
    dietary: ["lactose-free", "vegan"],
  },
  {
    id: "chemex",
    name: { en: "Chemex", nl: "Chemex" },
    description: {
      en: "Crystal-clear brew for two. Great for slow mornings.",
      nl: "Helder gezet voor twee. Ideaal voor trage ochtenden.",
    },
    price: 9,
    category: "filter",
    flavor: { acid: 70, body: 40, sweetness: 58 },
    tags: ["Share"],
    dietary: ["lactose-free", "vegan"],
  },
  {
    id: "flash-brew",
    name: { en: "Flash Brew", nl: "Flash Brew" },
    description: {
      en: "Hot brew over ice. Bright, juicy, summer-ready.",
      nl: "Warm gezet over ijs. Helder, sappig, klaar voor de zomer.",
    },
    price: 5.5,
    category: "filter",
    flavor: { acid: 80, body: 35, sweetness: 65 },
    tags: ["Iced"],
    dietary: ["lactose-free", "vegan"],
  },

  // —— Espresso bar ——
  {
    id: "espresso",
    name: { en: "Espresso", nl: "Espresso" },
    description: {
      en: "Single or double. Our house blend, dialled in daily.",
      nl: "Enkel of dubbel. Onze huisblend, dagelijks ingesteld.",
    },
    price: 2.8,
    category: "bar",
    dietary: ["lactose-free", "vegan"],
  },
  {
    id: "americano",
    name: { en: "Americano", nl: "Americano" },
    description: {
      en: "Double shot over hot water. Clean finish.",
      nl: "Dubbele shot over heet water. Schone afdronk.",
    },
    price: 4,
    category: "bar",
    dietary: ["lactose-free", "vegan"],
  },
  {
    id: "flat-white",
    name: { en: "Flat White", nl: "Flat White" },
    description: {
      en: "Double ristretto, silky microfoam, ceramic cup.",
      nl: "Dubbele ristretto, zijdezachte microfoam, keramische kop.",
    },
    price: 5.5,
    category: "bar",
    dietary: ["contains-dairy", "vegan-oat"],
  },
  {
    id: "cortado",
    name: { en: "Cortado", nl: "Cortado" },
    description: {
      en: "Equal parts espresso & steamed milk. Bold & balanced.",
      nl: "Gelijke delen espresso & gestoomde melk. Stoer & gebalanceerd.",
    },
    price: 4.5,
    category: "bar",
    dietary: ["contains-dairy", "vegan-oat"],
  },
  {
    id: "cappuccino",
    name: { en: "Cappuccino", nl: "Cappuccino" },
    description: {
      en: "Equal thirds: espresso, steamed milk, foam crown.",
      nl: "Gelijke delen: espresso, gestoomde melk, schuimkroon.",
    },
    price: 5,
    category: "bar",
    dietary: ["contains-dairy", "vegan-oat"],
  },
  {
    id: "latte",
    name: { en: "Café Latte", nl: "Café Latte" },
    description: {
      en: "Longer milk drink, soft and approachable.",
      nl: "Langere melkdrank — zacht en toegankelijk.",
    },
    price: 5.2,
    category: "bar",
    dietary: ["contains-dairy", "vegan-oat"],
  },
  {
    id: "mocha",
    name: { en: "Doodle Mocha", nl: "Doodle Mocha" },
    description: {
      en: "Espresso, melted dark chocolate, milk.",
      nl: "Espresso, gesmolten pure chocolade, melk.",
    },
    price: 6,
    category: "bar",
    tags: ["Crowd fave"],
    dietary: ["contains-dairy", "vegan-oat"],
  },
  {
    id: "macchiato",
    name: { en: "Macchiato", nl: "Macchiato" },
    description: {
      en: "Espresso stained with a dab of foam. Short and strong.",
      nl: "Espresso met een tipje schuim. Kort en krachtig.",
    },
    price: 3.5,
    category: "bar",
    dietary: ["contains-dairy", "vegan-oat"],
  },
  {
    id: "piccolo",
    name: { en: "Piccolo", nl: "Piccolo" },
    description: {
      en: "Ristretto + steamed milk in a small glass. Soft power.",
      nl: "Ristretto + gestoomde melk in een klein glas.",
    },
    price: 4.2,
    category: "bar",
    dietary: ["contains-dairy", "vegan-oat"],
  },

  // —— Seasonal ——
  {
    id: "lavender-latte",
    name: {
      en: "Lavender Honey Latte",
      nl: "Lavendel Honing Latte",
    },
    description: {
      en: "House espresso, local honey, lavender syrup.",
      nl: "Huisespresso, lokale honing, lavendelsiroop.",
    },
    price: 6.5,
    category: "seasonal",
    tags: ["Seasonal"],
    dietary: ["contains-dairy", "vegan-oat"],
  },
  {
    id: "matcha-cloud",
    name: { en: "Matcha Cloud", nl: "Matcha Cloud" },
    description: {
      en: "Ceremonial matcha, oat milk, vanilla cloud.",
      nl: "Ceremoniële matcha, havermelk, vanillewolk.",
    },
    price: 6,
    category: "seasonal",
    tags: ["New"],
    dietary: ["vegan", "vegan-oat", "lactose-free"],
  },
  {
    id: "chai-latte",
    name: { en: "Masala Chai Latte", nl: "Masala Chai Latte" },
    description: {
      en: "House-spiced chai concentrate with steamed milk.",
      nl: "Huisgemaakte chai met gestoomde melk.",
    },
    price: 5.5,
    category: "seasonal",
    dietary: ["contains-dairy", "vegan-oat"],
  },
  {
    id: "affogato",
    name: { en: "Affogato", nl: "Affogato" },
    description: {
      en: "Double espresso drowned over vanilla gelato.",
      nl: "Dubbele espresso over vanillegelato.",
    },
    price: 6.5,
    category: "seasonal",
    tags: ["Dessert"],
    dietary: ["contains-dairy"],
  },
  {
    id: "iced-orange-espresso",
    name: { en: "Orange Espresso Tonic", nl: "Sinaasappel Espresso Tonic" },
    description: {
      en: "Espresso, tonic, orange peel. Bitter-bright refresher.",
      nl: "Espresso, tonic, sinaasappelschil. Bitter-fris.",
    },
    price: 6,
    category: "seasonal",
    tags: ["Iced"],
    dietary: ["lactose-free", "vegan"],
  },

  // —— Food ——
  {
    id: "avocado-toast",
    name: {
      en: "Avocado Doodle Toast",
      nl: "Avocado Doodle Toast",
    },
    description: {
      en: "Sourdough, smashed avo, chili flakes, microgreens.",
      nl: "Desembrood, geplette avocado, chilivlokken, kiemgroenten.",
    },
    price: 9,
    category: "food",
    tags: ["Vegan"],
    dietary: ["vegan", "contains-gluten", "gluten-free-option"],
  },
  {
    id: "croissant",
    name: { en: "Butter Croissant", nl: "Botercroissant" },
    description: {
      en: "Baked fresh by Broodhuis. Flaky perfection.",
      nl: "Vers gebakken door Broodhuis. Boterachtig & bladerig.",
    },
    price: 4.5,
    category: "food",
    tags: ["Collab"],
    dietary: ["contains-dairy", "contains-gluten"],
  },
  {
    id: "banana-bread",
    name: { en: "Banana Bread", nl: "Bananenbrood" },
    description: {
      en: "Toasted slice, butter optional, walnut crunch.",
      nl: "Geroosterd sneetje, optioneel boter, walnootcrunch.",
    },
    price: 4,
    category: "food",
    dietary: ["contains-dairy", "contains-gluten"],
  },
  {
    id: "granola-bowl",
    name: { en: "Granola Bowl", nl: "Granola Bowl" },
    description: {
      en: "House granola, yoghurt, seasonal fruit, honey.",
      nl: "Huisgranola, yoghurt, seizoensfruit, honing.",
    },
    price: 8.5,
    category: "food",
    dietary: ["contains-dairy", "gluten-free-option"],
  },
];

export const MENU_CATEGORIES = [
  { id: "all" as const, label: { en: "All", nl: "Alles" } },
  { id: "filter" as const, label: { en: "Filter", nl: "Filter" } },
  { id: "bar" as const, label: { en: "Espresso Bar", nl: "Espressobar" } },
  { id: "seasonal" as const, label: { en: "Seasonal", nl: "Seizoen" } },
  { id: "food" as const, label: { en: "Food", nl: "Eten" } },
];
