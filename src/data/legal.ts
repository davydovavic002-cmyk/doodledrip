import type { LocalizedString } from "@/types";

export interface LegalSection {
  heading: LocalizedString;
  body: LocalizedString;
}

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: { en: "What we collect", nl: "Wat we verzamelen" },
    body: {
      en: "Order details, contact info, and newsletter emails you voluntarily share. We don't sell personal data.",
      nl: "Bestelgegevens, contactinfo en nieuwsbriefmails die je vrijwillig deelt. We verkopen geen persoonsgegevens.",
    },
  },
  {
    heading: { en: "Cookies", nl: "Cookies" },
    body: {
      en: "We use essential cookies for cart & language preferences. No creepy ad trackers.",
      nl: "We gebruiken essentiële cookies voor mandje & taal. Geen enge ad-trackers.",
    },
  },
  {
    heading: { en: "Your rights", nl: "Jouw rechten" },
    body: {
      en: "Email hello@doodleanddrip.be to access, correct, or delete your data (GDPR).",
      nl: "Mail hello@doodleanddrip.be om je data in te zien, te corrigeren of te wissen (GDPR).",
    },
  },
];

export const SHIPPING_SECTIONS: LegalSection[] = [
  {
    heading: { en: "Belgium", nl: "België" },
    body: {
      en: "€4.50 flat — free from €45. Roasted Mon–Thu, shipped next business day.",
      nl: "€4,50 vast — gratis vanaf €45. Gebrand ma–do, verzonden volgende werkdag.",
    },
  },
  {
    heading: { en: "Nearby EU", nl: "Nabije EU" },
    body: {
      en: "NL / DE / FR / LU from €7.90. Customs not applicable within EU.",
      nl: "NL / DE / FR / LU vanaf €7,90. Geen douane binnen de EU.",
    },
  },
  {
    heading: { en: "Pickup", nl: "Afhalen" },
    body: {
      en: "Free at Vrijdagmarkt 12. We'll email when your bag hits the counter (1–2 roast days).",
      nl: "Gratis op Vrijdagmarkt 12. Je krijgt mail wanneer je zakje klaarligt (1–2 branddagen).",
    },
  },
];

export const RETURNS_SECTIONS: LegalSection[] = [
  {
    heading: { en: "Coffee", nl: "Koffie" },
    body: {
      en: "Unopened bags within 14 days: full refund or exchange. Opened beans: contact us if roast QC is off — we'll make it right.",
      nl: "Ongeopende zakjes binnen 14 dagen: volledige terugbetaling of omruiling. Geopende bonen: contacteer ons bij QC-issues — we lossen het op.",
    },
  },
  {
    heading: { en: "Merch", nl: "Merch" },
    body: {
      en: "Unused items with tags within 30 days. Gift cards are non-refundable once issued.",
      nl: "Ongebruikte items met labels binnen 30 dagen. Cadeaubonnen zijn niet terugbetaalbaar na uitgifte.",
    },
  },
  {
    heading: { en: "How to return", nl: "Hoe retourneren" },
    body: {
      en: "Mail returns@doodleanddrip.be with your order ID. We'll send a prepaid label for Belgium.",
      nl: "Mail returns@doodleanddrip.be met je order-ID. We sturen een vooruitbetaald label voor België.",
    },
  },
];
