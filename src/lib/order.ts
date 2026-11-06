import { DELIVERY_ZONES, MENU_BY_ID, VEGAN_CHEESE_PRICE, type Topping } from "@/data/menu";

export type CartLine = {
  key: string;
  itemId: string;
  qty: number;
  vegan: boolean;
  extras: Topping[];
};

export type OrderMode = "pickup" | "delivery";
export type PaymentMethod = "bar" | "card";

export type OrderDetails = {
  mode: OrderMode;
  payment: PaymentMethod;
  name: string;
  phone?: string;
  zip?: string;
  street?: string;
  houseNumber?: string;
  stiege?: string;
  door?: string;
  note?: string;
};

const fmt = new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR" });
export const money = (n: number) => fmt.format(n);

export function lineKey(itemId: string, vegan: boolean, extras: Topping[]) {
  const names = extras.map((e) => e.name).sort((a, b) => a.localeCompare(b));
  return `${itemId}|${vegan ? "v" : "n"}|${names.join("+")}`;
}

export function unitPrice(line: Pick<CartLine, "itemId" | "vegan" | "extras">) {
  const item = MENU_BY_ID[line.itemId];
  if (!item) return 0;
  const extras = line.extras.reduce((s, e) => s + e.price, 0);
  return round(item.price + (line.vegan ? VEGAN_CHEESE_PRICE : 0) + extras);
}

export function subtotal(cart: CartLine[]) {
  return round(cart.reduce((s, l) => s + unitPrice(l) * l.qty, 0));
}

export function itemCount(cart: CartLine[]) {
  return cart.reduce((s, l) => s + l.qty, 0);
}

export function addLine(cart: CartLine[], itemId: string, vegan = false, extras: Topping[] = []) {
  const sorted = [...extras].sort((a, b) => a.name.localeCompare(b.name));
  const key = lineKey(itemId, vegan, sorted);
  const existing = cart.find((l) => l.key === key);
  if (existing) return cart.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
  return [...cart, { key, itemId, qty: 1, vegan, extras: sorted }];
}

export function changeQty(cart: CartLine[], key: string, delta: number) {
  return cart
    .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
    .filter((l) => l.qty > 0);
}

/** Amount still missing to reach the delivery minimum, or 0 when reached / not applicable. */
export function missingForMinimum(cart: CartLine[], zip: string | undefined) {
  if (!zip || DELIVERY_ZONES[zip] === undefined) return 0;
  return Math.max(0, round(DELIVERY_ZONES[zip] - subtotal(cart)));
}

export function validateOrder(cart: CartLine[], d: OrderDetails): string | null {
  if (!cart.length) return "Dein Warenkorb ist leer.";
  if (!d.name.trim()) return "Bitte gib deinen Namen ein.";
  if (d.mode === "delivery") {
    if (!d.zip || DELIVERY_ZONES[d.zip] === undefined) return "Bitte wähle eine Liefer-PLZ aus.";
    if (!d.street?.trim() || !d.houseNumber?.trim()) return "Bitte Straße und Hausnummer angeben.";
    const missing = missingForMinimum(cart, d.zip);
    if (missing > 0)
      return `Der Mindestbestellwert für ${d.zip} beträgt ${money(DELIVERY_ZONES[d.zip] ?? 0)}. Es fehlen noch ${money(missing)}.`;
  }
  return null;
}

export function lineLabel(line: CartLine) {
  const item = MENU_BY_ID[line.itemId];
  const extras = line.extras.map((e) => e.name);
  if (line.vegan) extras.unshift("veganer Käse");
  return { name: item?.name ?? line.itemId, extras };
}

export function buildWhatsappMessage(cart: CartLine[], d: OrderDetails) {
  const lines = cart
    .map((l) => {
      const { name, extras } = lineLabel(l);
      const extra = extras.length ? ` (${extras.join(", ")})` : "";
      return `• ${l.qty}x ${name}${extra} – ${money(unitPrice(l) * l.qty)}`;
    })
    .join("\n");

  let address = "";
  if (d.mode === "delivery") {
    const street = `${d.street?.trim()} ${d.houseNumber?.trim()}`;
    const extra = `${d.stiege?.trim() ? `, Stg. ${d.stiege.trim()}` : ""}${d.door?.trim() ? `, Tür ${d.door.trim()}` : ""}`;
    const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street}, ${d.zip} Wien`)}`;
    address = `\nLieferadresse:\n${street}${extra}\n${d.zip} Wien\n📍 ${maps}`;
  }

  return [
    "*NEUE BESTELLUNG – RICOBERTO 3.0*",
    "-------------------------------",
    `Bestellart: ${d.mode === "pickup" ? "Abholung" : "Lieferung"}`,
    `*Zahlungsart: ${d.payment === "bar" ? "Barzahlung" : "Bankomat / Karte"}*`,
    `Name: ${d.name.trim()}${d.phone?.trim() ? `\nTelefon: ${d.phone.trim()}` : ""}${address}`,
    ...(d.note?.trim() ? [`Anmerkung: ${d.note.trim()}`] : []),
    "-------------------------------",
    `Bestellte Artikel:\n${lines}`,
    "-------------------------------",
    `Gesamtsumme: ${money(subtotal(cart))}`,
  ].join("\n");
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}
