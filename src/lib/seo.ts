import { CATEGORIES, MENU } from "@/data/menu";
import { OPENING_HOURS, RESTAURANT } from "@/data/restaurant";

export const SITE_URL = "https://order.pipapo-ricoberto.com";

export function pageHead(path: string, title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}${path}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
  };
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: RESTAURANT.name,
  alternateName: ["Ricoberto Pizza", "Pizzeria Ricoberto", "Ricoberto Wien"],
  url: SITE_URL,
  telephone: RESTAURANT.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT.street,
    postalCode: "1030",
    addressLocality: "Wien",
    addressCountry: "AT",
  },
  servesCuisine: ["Italian", "Pizza"],
  hasMenu: `${SITE_URL}/speisekarte`,
  sameAs: [RESTAURANT.instagramUrl],
  openingHoursSpecification: OPENING_HOURS.map((row, index) => {
    const [opens, closes] = row.hours.split(" – ");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAYS[index]}`, opens, closes };
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
