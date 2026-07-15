import type { LocalizedString, MilkId } from "@/types";

export interface MilkOption {
  id: MilkId;
  label: LocalizedString;
  hint: LocalizedString;
  surcharge: number;
  emoji: string;
}

export const MILK_OPTIONS: MilkOption[] = [
  {
    id: "dairy",
    label: { en: "Dairy", nl: "Koemelk" },
    hint: { en: "Organic whole milk", nl: "Biologische volle melk" },
    surcharge: 0,
    emoji: "🥛",
  },
  {
    id: "oat",
    label: { en: "Oat", nl: "Haver" },
    hint: { en: "Barista foam champ", nl: "Beste barista-schuim" },
    surcharge: 0.6,
    emoji: "🌾",
  },
  {
    id: "almond",
    label: { en: "Almond", nl: "Amandel" },
    hint: { en: "Light & nutty", nl: "Licht & nootachtig" },
    surcharge: 0.6,
    emoji: "🌰",
  },
  {
    id: "soy",
    label: { en: "Soy", nl: "Soja" },
    hint: { en: "Classic plant option", nl: "Klassieke plantaardige optie" },
    surcharge: 0.5,
    emoji: "🌱",
  },
  {
    id: "coconut",
    label: { en: "Coconut", nl: "Kokos" },
    hint: { en: "Tropical softness", nl: "Tropische zachtheid" },
    surcharge: 0.6,
    emoji: "🥥",
  },
];
