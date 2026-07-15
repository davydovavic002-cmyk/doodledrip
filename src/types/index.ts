export type NavLink = {
  labelKey: string;
  href: string;
};

export type ProductVariant = "whole-bean" | "espresso" | "v60";
export type BagSize = "250g" | "1kg";
export type ProductKind = "coffee" | "merch" | "gift-card";
export type EventType = "cupping" | "collab" | "workshop" | "tasting";
export type MenuCategory = "all" | "filter" | "bar" | "food" | "seasonal";
export type RoastLevel = "light" | "medium" | "dark";
export type { Locale } from "@/i18n/config";

export type DietaryTag =
  | "lactose-free"
  | "vegan-oat"
  | "vegan"
  | "contains-dairy"
  | "contains-gluten"
  | "gluten-free-option";

export interface LocalizedString {
  en: string;
  nl: string;
}

export type Announcement = {
  id: string;
  text: LocalizedString;
  highlight?: boolean;
};

export interface FlavorProfile {
  acid: number;
  body: number;
  sweetness: number;
}

export type MilkId = "dairy" | "oat" | "almond" | "soy" | "coconut";

export interface MenuItem {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  category: Exclude<MenuCategory, "all">;
  flavor?: FlavorProfile;
  tags?: string[];
  dietary: DietaryTag[];
}

export interface ShopEvent {
  id: string;
  title: LocalizedString;
  type: EventType;
  date: string;
  time: string;
  location: LocalizedString;
  description: LocalizedString;
  spotsLeft: number;
  totalSpots: number;
  host: string;
}

export interface Product {
  id: string;
  kind: ProductKind;
  name: LocalizedString;
  description: LocalizedString;
  /** Base price for coffee = 250g; merch/gift = unit price */
  price: number;
  origin?: string;
  flavor?: FlavorProfile;
  image: string;
  roastLevel?: RoastLevel;
  roastDate?: string;
  bestBy?: string;
  stock: number;
  sizes?: BagSize[];
  /** Limited farm/cooperative micro-lot release */
  microLot?: boolean;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface FunFact {
  id: string;
  fact: LocalizedString;
  emoji: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: LocalizedString;
  bio: LocalizedString;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: LocalizedString;
  date: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  caption: LocalizedString;
  href: string;
}

export interface Partner {
  id: string;
  name: string;
  type: "farmer" | "bakery" | "local";
  description: LocalizedString;
  mapLat: number;
  mapLng: number;
}

export interface FaqItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  category: "shipping" | "beans" | "subscription" | "cafe";
}

export interface Amenity {
  id: string;
  icon: "wifi" | "music" | "dog" | "bike" | "socket";
  label: LocalizedString;
  detail: LocalizedString;
}
