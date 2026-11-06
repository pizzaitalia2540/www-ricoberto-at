import { describe, expect, it } from "vitest";
import { MENU } from "@/data/menu";
import {
  addLine,
  buildWhatsappMessage,
  missingForMinimum,
  subtotal,
  unitPrice,
  validateOrder,
} from "./order";

const id = (name: string) => MENU.find((m) => m.name === name)!.id;

describe("order rules", () => {
  it("vegan cheese adds € 3,00 to a pizza", () => {
    expect(unitPrice({ itemId: id("Margherita"), vegan: true, extras: [] })).toBe(13.9);
  });

  it("extra toppings add their price", () => {
    const extras = [
      { name: "Burrata (Ganze Burrata)", price: 3.8 },
      { name: "Knoblauch", price: 0 },
    ];
    expect(unitPrice({ itemId: id("Margherita"), vegan: false, extras })).toBe(14.7);
  });

  it("same dish with same extras stacks quantity", () => {
    let cart = addLine([], id("Funghi"));
    cart = addLine(cart, id("Funghi"));
    expect(cart).toHaveLength(1);
    expect(cart[0]?.qty).toBe(2);
    expect(subtotal(cart)).toBe(25);
  });

  it("delivery minimum is € 16 for 1030 and € 19 for 1020 / 1110", () => {
    const cart = addLine([], id("Margherita")); // 10,90
    expect(missingForMinimum(cart, "1030")).toBe(5.1);
    expect(missingForMinimum(cart, "1020")).toBe(8.1);
    expect(missingForMinimum(cart, "1110")).toBe(8.1);
  });

  it("blocks delivery below the minimum but allows pickup", () => {
    const cart = addLine([], id("Margherita"));
    const base = { name: "Anna", payment: "bar" as const };
    expect(validateOrder(cart, { ...base, mode: "pickup" })).toBeNull();
    expect(
      validateOrder(cart, { ...base, mode: "delivery", zip: "1030", street: "Erdbergstraße", houseNumber: "1" }),
    ).toMatch(/Mindestbestellwert/);
  });

  it("rejects postcodes outside the delivery zones", () => {
    const cart = addLine(addLine([], id("Burrata")), id("Burrata"));
    expect(
      validateOrder(cart, { name: "Anna", payment: "bar", mode: "delivery", zip: "1010", street: "X", houseNumber: "1" }),
    ).toMatch(/PLZ/);
  });

  it("WhatsApp message lists items, payment and total", () => {
    const cart = addLine([], id("Margherita"), true, [{ name: "Rucola", price: 1.8 }]);
    const msg = buildWhatsappMessage(cart, { name: "Anna", payment: "card", mode: "pickup" });
    expect(msg).toContain("1x Margherita (veganer Käse, Rucola)");
    expect(msg).toContain("Bankomat / Karte");
    expect(msg).toContain("Abholung");
    expect(msg).toMatch(/Gesamtsumme: €\s15,70/);
  });
});
