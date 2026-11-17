import { DELIVERY_ZONES } from "@/data/menu";
import { OPENING_HOURS, RESTAURANT } from "@/data/restaurant";
import { money } from "@/lib/order";

export type FaqItem = { question: string; answer: string };

/** Groups days with identical hours, e.g. "Montag, Dienstag 12:00 – 23:30 Uhr; Freitag 14:00 – 23:30 Uhr". */
export function formatOpeningHours(rows = OPENING_HOURS): string {
  const groups = new Map<string, string[]>();
  for (const { day, hours } of rows) groups.set(hours, [...(groups.get(hours) ?? []), day]);
  return [...groups.entries()].map(([hours, days]) => `${days.join(", ")} ${hours} Uhr`).join("; ");
}

export function buildFaq(): FaqItem[] {
  const zones = Object.entries(DELIVERY_ZONES);
  const zoneText = zones.map(([zip, minimum]) => `${zip} Wien ab ${money(minimum)}`).join(", ");
  const home = DELIVERY_ZONES["1030"];
  return [
    {
      question: "Wo finde ich Ricoberto 3.0 in 1030 Wien?",
      answer: `${RESTAURANT.name} ist in der ${RESTAURANT.street}, ${RESTAURANT.city} (Landstraße, Erdberg). Die nächste U-Bahn-Station ist die ${RESTAURANT.nearestUbahn}.`,
    },
    {
      question: "Liefert Ricoberto Pizza und Pasta in die Erdbergstraße und nach Erdberg?",
      answer: `Ja, wir liefern Pizza und Pasta nach 1030 Wien${home ? ` ab einem Mindestbestellwert von ${money(home)}` : ""}. Weitere Liefergebiete: ${zoneText}.`,
    },
    {
      question: "Wann hat Ricoberto 3.0 geöffnet?",
      answer: `Unsere Öffnungszeiten: ${formatOpeningHours()}.`,
    },
    {
      question: "Kann ich Pizza und Pasta abholen?",
      answer: `Ja, du kannst deine Bestellung ohne Mindestbestellwert in der ${RESTAURANT.street}, ${RESTAURANT.city}, abholen. Bezahlen kannst du bar oder mit Karte.`,
    },
    {
      question: "Wie bestelle ich?",
      answer: "Gerichte in der Speisekarte auswählen, Lieferung oder Abholung wählen und die Bestellung per WhatsApp senden. Das Restaurant bestätigt sie dort.",
    },
  ];
}
