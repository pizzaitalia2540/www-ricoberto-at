import { describe, expect, it } from "vitest";
import { breadcrumbSchema, menuSchema, restaurantSchema, SITE_URL, pageHead } from "./seo";
import { sitemapXML } from "./sitemap";

describe("Public website SEO", () => {
  it("uses the official Ricoberto website as its canonical origin", () => {
    expect(SITE_URL).toBe("https://pipapo-ricoberto.com");
    expect(pageHead("/speisekarte", "Menu", "Description").links).toContainEqual({
      rel: "canonical",
      href: "https://pipapo-ricoberto.com/speisekarte",
    });
  });
  it("uses the correct locale and official domain for social metadata", () => {
    const germanMeta = pageHead("/", "Home", "Description").meta;
    const englishMeta = pageHead("/en", "Home", "Description", "en_GB").meta;
    expect(germanMeta).toContainEqual({ property: "og:locale", content: "de_AT" });
    expect(englishMeta).toContainEqual({ property: "og:locale", content: "en_GB" });
    expect(germanMeta).toContainEqual({ property: "og:url", content: "https://pipapo-ricoberto.com/" });
    expect(germanMeta).toContainEqual({ property: "og:image", content: "https://pipapo-ricoberto.com/og-image.jpg" });
  });
  it("describes the social preview image for accessibility and link previews", () => {
    const meta = pageHead("/", "Home", "Description").meta;
    expect(meta).toContainEqual({ property: "og:image:alt", content: expect.stringContaining("Ricoberto") });
    expect(meta).toContainEqual({ name: "twitter:image:alt", content: expect.stringContaining("Ricoberto") });
  });
  it("builds breadcrumb URLs on the official domain", () => {
    expect(breadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: "Speisekarte", path: "/speisekarte" },
    ])).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { position: 1, name: "Startseite", item: "https://pipapo-ricoberto.com/" },
        { position: 2, name: "Speisekarte", item: "https://pipapo-ricoberto.com/speisekarte" },
      ],
    });
  });
  it("identifies the pizzeria as a Restaurant, a LocalBusiness subtype", () => {
    expect(restaurantSchema["@type"]).toBe("Restaurant");
    expect(restaurantSchema.name).toBe("Pizzeria Ricoberto 3.0");
    expect(restaurantSchema.url).toBe(SITE_URL);
  });
  it("publishes the restaurant phone number", () => {
    expect(restaurantSchema.telephone).toBe("+4366493291372");
  });
  it("publishes Pizza and Italian cuisine", () => {
    expect(restaurantSchema.servesCuisine).toEqual(expect.arrayContaining(["Pizza", "Italian", "Pasta"]));
  });
  it("publishes only the supported Vienna delivery areas", () => {
    expect(restaurantSchema.areaServed.map((place) => place.address.postalCode).sort()).toEqual(["1020", "1030", "1110"]);
  });
  it("declares accepted payment methods shown on the site", () => {
    expect(restaurantSchema.paymentAccepted).toContain("Cash");
    expect(restaurantSchema.paymentAccepted).toContain("Card");
  });
  it("publishes OSM-verified coordinates for Erdbergstraße 101", () => {
    expect(restaurantSchema.geo).toEqual({ "@type": "GeoCoordinates", latitude: 48.19669, longitude: 16.40495 });
  });
  it("omits self-serving review markup", () => {
    expect(restaurantSchema).not.toHaveProperty("aggregateRating");
  });
  it("publishes the verified Erdbergstraße address", () => {
    expect(restaurantSchema.address.streetAddress).toBe("Erdbergstraße 101");
    expect(restaurantSchema.address.postalCode).toBe("1030");
  });
  it("publishes the verified Friday hours", () => {
    expect(restaurantSchema.openingHoursSpecification.find((day) => day.dayOfWeek.endsWith("Friday"))).toMatchObject({ opens: "14:00", closes: "23:00" });
  });
  it("publishes Margherita at its menu price", () => {
    const pizza = menuSchema.hasMenuSection.find((section) => section.name === "Pizza");
    expect(pizza?.hasMenuItem.find((item) => item.name === "Margherita")?.offers).toMatchObject({ price: "10.90", priceCurrency: "EUR" });
  });
  it("omits unverified last modification dates", () => {
    expect(sitemapXML(SITE_URL, [{ path: "/" }])).not.toContain("lastmod");
  });
});
