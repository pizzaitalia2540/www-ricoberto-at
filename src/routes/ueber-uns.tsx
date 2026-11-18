import { createFileRoute, Link } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { Button } from "@/components/ui/button";
import { RESTAURANT } from "@/data/restaurant";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/ueber-uns")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead(
      "/ueber-uns",
      "Über uns | Ricoberto 3.0 Pizzeria in Wien 1030",
      "Ricoberto 3.0 ist eine Pizzeria & Trattoria in der Erdbergstraße 101 in 1030 Wien: neapolitanische Pizza, hausgemachte Pasta und italienische Klassiker – im Lokal, zur Abholung oder als Lieferung.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Startseite", path: "/" },
            { name: "Über uns", path: "/ueber-uns" },
          ]),
        ),
      },
    ],
  }),
  component: UeberUns,
});

function UeberUns() {
  return (
    <main className="pt-20">
      <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
        <p className="eyebrow text-primary">Pizzeria · Trattoria · {RESTAURANT.city}</p>
        <h1 className="mt-4 text-4xl font-medium md:text-6xl">
          Über Ricoberto 3.0 in <em className="text-primary">Wien Landstraße</em>
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Wir sind die Pizzeria Ricoberto 3.0 in der {RESTAURANT.street}, {RESTAURANT.city} – im 3. Bezirk, direkt am
          Erdberg. Bei uns gibt es neapolitanische Pizza aus dem Ofen, hausgemachte Pasta und italienische Klassiker.
          Du kannst vor Ort essen, deine Bestellung abholen oder liefern lassen.
        </p>
      </div>

      <About />

      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="pill" size="xl">
            <Link to="/speisekarte">Speisekarte ansehen</Link>
          </Button>
          <Button asChild variant="pillOutline" size="xl">
            <Link to="/kontakt">Kontakt &amp; Anfahrt</Link>
          </Button>
          <Button asChild variant="pillOutline" size="xl">
            <Link to="/galerie">Galerie</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
