import { CATEGORIES, DELIVERY_ZONES, MENU } from "@/data/menu";
import { OPENING_HOURS, RESTAURANT } from "@/data/restaurant";

// The verified public website for Ricoberto 3.0. Keep all SEO URLs on this origin.
export const SITE_URL = "https://pipapo-ricoberto.com";

const OG_IMAGE_ALT = "Neapolitanische Pizza und Pasta bei Ricoberto 3.0 in Wien 1030";

export function pageHead(path: string, title: string, description: string, locale = "de_AT") {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: locale },
      { property: "og:url", content: `${SITE_URL}${path}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: `Pizzeria ${RESTAURANT.name}`,
  alternateName: ["Ricoberto Pizza", "Pizzeria Ricoberto", "Pizzeria Ricoberto 3.0", "Ricoberto Wien"],
  url: SITE_URL,
  telephone: RESTAURANT.phoneHref.replace("tel:", ""),
  priceRange: "€€",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT.street,
    postalCode: "1030",
    addressLocality: "Wien",
    addressCountry: "AT",
  },
  servesCuisine: ["Italian", "Pizza", "Pasta", "Neapolitan Pizza"],
  areaServed: Object.keys(DELIVERY_ZONES).map((postalCode) => ({
    "@type": "Place",
    name: `${postalCode} Wien`,
    address: { "@type": "PostalAddress", postalCode, addressLocality: "Wien", addressCountry: "AT" },
  })),
  image: `${SITE_URL}/og-image.jpg`,
  hasMenu: `${SITE_URL}/speisekarte`,
  sameAs: [RESTAURANT.instagramUrl, RESTAURANT.mapsUrl],
  openingHoursSpecification: OPENING_HOURS.map((row, index) => {
    const [opens, closes] = row.hours.split(" – ");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DAYS[index]}`,
      opens,
      closes,
    };
  }),
};

export const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${SITE_URL}/speisekarte#menu`,
  name: `Speisekarte – ${RESTAURANT.name}`,
  url: `${SITE_URL}/speisekarte`,
  inLanguage: "de-AT",
  hasMenuSection: CATEGORIES.map((category) => ({
    "@type": "MenuSection",
    name: category,
    hasMenuItem: MENU.filter((item) => item.category === category).map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.description,
      offers: { "@type": "Offer", price: item.price.toFixed(2), priceCurrency: "EUR" },
    })),
  })),
};
