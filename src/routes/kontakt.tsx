import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FindUs } from "@/components/site/FindUs";
import { Contact } from "@/components/site/Sections";
import { RESTAURANT } from "@/data/restaurant";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/kontakt")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead(
      "/kontakt",
      "Kontakt & Anfahrt | Ricoberto 3.0, 1030 Wien",
      "Ricoberto 3.0 erreichen: Erdbergstraße 101, 1030 Wien (U3 Kardinal-Nagl-Platz). Tisch reservieren unter 0664 93291372, Bestellung per WhatsApp, Öffnungszeiten und Anfahrt.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Startseite", path: "/" },
            { name: "Kontakt & Anfahrt", path: "/kontakt" },
          ]),
        ),
      },
    ],
  }),
  component: Kontakt,
});

function Kontakt() {
  return (
    <main className="pt-20">
      <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
        <p className="eyebrow text-primary">Kontakt &amp; Anfahrt · {RESTAURANT.city}</p>
        <h1 className="mt-4 text-4xl font-medium md:text-6xl">
          Ricoberto 3.0 in <em className="text-primary">Erdberg, 1030 Wien</em>
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Du findest uns in der {RESTAURANT.street} im 3. Bezirk (Landstraße), nur wenige Minuten von der U-Bahn-Station{" "}
          {RESTAURANT.nearestUbahn}. Ruf uns an für eine Tischreservierung oder schreib uns per WhatsApp, wenn du
          bestellen möchtest.
        </p>
      </div>

      <Contact />
      <FindUs />

      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="pill" size="xl">
            <Link to="/speisekarte">Speisekarte ansehen &amp; bestellen</Link>
          </Button>
          <Button asChild variant="pillOutline" size="xl">
            <Link to="/lieferung">Lieferung &amp; Abholung</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
