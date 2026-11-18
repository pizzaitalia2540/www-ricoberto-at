import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/site/Sections";
import { RESTAURANT } from "@/data/restaurant";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/galerie")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead(
      "/galerie",
      "Galerie | Ricoberto 3.0 Pizza & Pasta in Wien 1030",
      "Ein Blick in unsere Küche: neapolitanische Pizza, hausgemachte Pasta, Antipasti und hausgemachtes Tiramisù bei Ricoberto 3.0 in der Erdbergstraße 101, 1030 Wien.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Startseite", path: "/" },
            { name: "Galerie", path: "/galerie" },
          ]),
        ),
      },
    ],
  }),
  component: Galerie,
});

function Galerie() {
  return (
    <main className="pt-20">
      <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
        <p className="eyebrow text-primary">Galerie · {RESTAURANT.street}</p>
        <h1 className="mt-4 text-4xl font-medium md:text-6xl">
          Pizza, Pasta &amp; Antipasti bei <em className="text-primary">Ricoberto 3.0</em>
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Von der Margherita aus dem Holzofen über Spaghetti alla carbonara bis zum Tiramisù: Diese Eindrücke geben
          einen Vorgeschmack auf deinen Besuch in {RESTAURANT.city}. Bestellen kannst du jederzeit in unserer
          Speisekarte – zum Essen im Lokal, zur Abholung oder als Lieferung.
        </p>
      </div>

      <Gallery />

      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="pill" size="xl">
            <Link to="/speisekarte">Speisekarte ansehen &amp; bestellen</Link>
          </Button>
          <Button asChild variant="pillOutline" size="xl">
            <Link to="/kontakt">Kontakt &amp; Anfahrt</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
