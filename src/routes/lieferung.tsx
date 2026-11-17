import { createFileRoute, Link } from "@tanstack/react-router";
import { Bike, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DELIVERY_ZONES } from "@/data/menu";
import { OPENING_HOURS, RESTAURANT } from "@/data/restaurant";
import { money } from "@/lib/order";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/lieferung")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead("/lieferung", "Pizza Lieferung Wien 1030, 1020 & 1110 | Ricoberto 3.0", "Pizza und Pasta in Wien liefern lassen: 1030 ab 16 €, 1020 und 1110 ab 19 €. Abholung in der Erdbergstraße 101 ohne Mindestbestellwert. Online auswählen und per WhatsApp bestätigen."),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: "Lieferung & Abholung", path: "/lieferung" },
    ])) }],
  }),
  component: Lieferung,
});

function Lieferung() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <p className="eyebrow text-primary">Lieferung &amp; Abholung in Wien</p>
      <h1 className="mt-4 text-4xl font-medium md:text-6xl">Pizza &amp; Pasta liefern lassen in Wien</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">Ricoberto 3.0 bringt neapolitanische Pizza, Pasta und italienische Klassiker in ausgewählte Liefergebiete in Wien. Du kannst deine Bestellung auch direkt in unserem Lokal in der Erdbergstraße 101 abholen.</p>
      <section className="mt-12">
        <h2 className="flex items-center gap-3 text-3xl"><Bike className="text-primary" /> Liefergebiete &amp; Mindestbestellwert</h2>
        <dl className="mt-6 divide-y divide-border">{Object.entries(DELIVERY_ZONES).map(([zip, minimum]) => <div key={zip} className="flex flex-wrap justify-between gap-3 py-5"><dt className="text-xl">{zip} Wien</dt><dd>Mindestbestellwert {money(minimum)}</dd></div>)}</dl>
        <p className="mt-4 text-sm text-muted-foreground">Die Liefergebiete und Mindestbestellwerte richten sich nach der Postleitzahl deiner Lieferadresse.</p>
      </section>
      <section className="mt-12">
        <h2 className="flex items-center gap-3 text-3xl"><Store className="text-primary" /> Pizza selbst abholen in 1030 Wien</h2>
        <p className="mt-4 text-lg text-muted-foreground">Du kannst deine Bestellung ohne Mindestbestellwert bei {RESTAURANT.name}, {RESTAURANT.street}, {RESTAURANT.city}, abholen. Bezahlen kannst du bar oder mit Bankomat/Karte.</p>
        <a className="mt-3 inline-block text-primary underline-offset-4 hover:underline" href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer">Route zu Ricoberto 3.0 planen</a>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl">So funktioniert die Bestellung</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-6 text-lg text-muted-foreground">
          <li>Gerichte und Extras in der <Link className="text-primary underline-offset-4 hover:underline" to="/speisekarte">Speisekarte</Link> auswählen.</li>
          <li>Im Warenkorb Lieferung oder Abholung wählen und die erforderlichen Angaben ergänzen.</li>
          <li>Die Bestellung über WhatsApp senden. Das Restaurant bestätigt die Bestellung dort.</li>
        </ol>
        <Button asChild variant="pill" size="xl" className="mt-6"><Link to="/speisekarte">Speisekarte ansehen &amp; bestellen</Link></Button>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl">Öffnungszeiten</h2>
        <dl className="mt-6 divide-y divide-border">{OPENING_HOURS.map((row) => <div key={row.day} className="flex justify-between gap-4 py-3"><dt>{row.day}</dt><dd>{row.hours}</dd></div>)}</dl>
      </section>
    </main>
  );
}
