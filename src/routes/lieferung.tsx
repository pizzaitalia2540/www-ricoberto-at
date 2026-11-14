import { createFileRoute, Link } from "@tanstack/react-router";
import { Bike, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DELIVERY_ZONES } from "@/data/menu";
import { OPENING_HOURS, RESTAURANT } from "@/data/restaurant";
import { money } from "@/lib/order";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/lieferung")({
  staticData: { sitemap: true },
  head: () => pageHead("/lieferung", "Pizza Lieferung Wien 1030, 1020 & 1110 – Ricoberto 3.0", "Pizza und Pasta liefern lassen: Liefergebiete und Mindestbestellwerte für 1030, 1020 und 1110 Wien. Abholung in der Erdbergstraße 101 und Bestellung per WhatsApp."),
  component: Lieferung,
});

function Lieferung() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <p className="eyebrow text-primary">Lieferung &amp; Abholung</p>
      <h1 className="mt-4 text-4xl font-medium md:text-6xl">Ricoberto 3.0 – Pizza Lieferung in Wien</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">Neapolitanische Pizza, Pasta und italienische Klassiker für zu Hause: Wir liefern nach Landstraße, Leopoldstadt und Simmering.</p>
      <section className="mt-12"><h2 className="flex items-center gap-3 text-3xl"><Bike className="text-primary" /> Unsere Liefergebiete</h2>
        <dl className="mt-6 divide-y divide-border">{Object.entries(DELIVERY_ZONES).map(([zip, minimum]) => <div key={zip} className="flex flex-wrap justify-between gap-3 py-5"><dt className="text-xl">{zip} Wien</dt><dd>Mindestbestellwert {money(minimum)}</dd></div>)}</dl>
      </section>
      <section className="mt-12"><h2 className="flex items-center gap-3 text-3xl"><Store className="text-primary" /> Abholung in 1030 Wien</h2><p className="mt-4 text-lg text-muted-foreground">Abholung ohne Mindestbestellwert bei {RESTAURANT.name}, {RESTAURANT.street}, {RESTAURANT.city}. Zahlung in bar oder mit Bankomat/Karte.</p></section>
      <section className="mt-12"><h2 className="text-3xl">Bestellung per WhatsApp</h2><p className="mt-4 text-lg text-muted-foreground">Wähle deine Gerichte aus der Speisekarte. Im Warenkorb kannst du Abholung oder Lieferung auswählen. Deine Bestellung wird von uns per WhatsApp bestätigt.</p><Button asChild variant="pill" size="xl" className="mt-6"><Link to="/speisekarte">Jetzt Pizza bestellen</Link></Button></section>
      <section className="mt-12"><h2 className="text-3xl">Öffnungszeiten</h2><dl className="mt-6 divide-y divide-border">{OPENING_HOURS.map((row) => <div key={row.day} className="flex justify-between gap-4 py-3"><dt>{row.day}</dt><dd>{row.hours}</dd></div>)}</dl></section>
    </main>
  );
}