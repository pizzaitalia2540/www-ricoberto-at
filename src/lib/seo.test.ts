import { describe, expect, it } from "vitest";
import { menuSchema, restaurantSchema } from "./seo";
import { sitemapXML } from "./sitemap";

describe("Public restaurant facts", () => {
  it("identifies the pizzeria as a Restaurant, a LocalBusiness subtype", () => {
    expect(restaurantSchema["@type"]).toBe("Restaurant");
    expect(restaurantSchema.name).toBe("Pizzeria Ricoberto 3.0");
  });
  it("publishes the restaurant phone number", () => {
    expect(restaurantSchema.telephone).toBe("+4366493291372");
  });
  it("publishes Pizza and Italian cuisine", () => {
    expect(restaurantSchema.servesCuisine).toEqual(expect.arrayContaining(["Pizza", "Italian"]));
  });
  it("publishes the verified Erdbergstraße address", () => {
    expect(restaurantSchema.address.streetAddress).toBe("Erdbergstraße 101");
    expect(restaurantSchema.address.postalCode).toBe("1030");
  });
  it("publishes the verified Friday hours", () => {
    expect(restaurantSchema.openingHoursSpecification.find((day) => day.dayOfWeek.endsWith("Friday"))).toMatchObject({ opens: "14:00", closes: "23:30" });
  });
  it("publishes Margherita at its menu price", () => {
    const pizza = menuSchema.hasMenuSection.find((section) => section.name === "Pizza");
    expect(pizza?.hasMenuItem.find((item) => item.name === "Margherita")?.offers).toMatchObject({ price: "10.90", priceCurrency: "EUR" });
  });
  it("omits unverified last modification dates", () => {
    expect(sitemapXML("https://ricoberto.lovable.app", [{ path: "/" }])).not.toContain("lastmod");
  });
});