import { describe, expect, it } from "vitest";
import { buildFaq, formatOpeningHours } from "@/data/faq";
import { DELIVERY_ZONES } from "@/data/menu";
import { OPENING_HOURS, RESTAURANT } from "@/data/restaurant";

describe("local FAQ", () => {
  const faq = buildFaq();
  const text = (q: string) => faq.find((item) => item.question.includes(q))!.answer;

  it("names the address and the nearest U-Bahn station", () => {
    expect(RESTAURANT.nearestUbahn).toBe("U3 Kardinal-Nagl-Platz");
    expect(text("Wo finde ich")).toContain(RESTAURANT.street);
    expect(text("Wo finde ich")).toContain("Kardinal-Nagl-Platz");
  });
  it("lists every delivery zone from DELIVERY_ZONES", () => {
    for (const zip of Object.keys(DELIVERY_ZONES)) expect(text("Liefert")).toContain(zip);
  });
  it("groups opening hours without losing a day", () => {
    const hours = formatOpeningHours();
    for (const { day, hours: h } of OPENING_HOURS) {
      expect(hours).toContain(day);
      expect(hours).toContain(h);
    }
  });
  it("mentions pickup without minimum order", () => {
    expect(text("abholen")).toContain("ohne Mindestbestellwert");
  });
});
