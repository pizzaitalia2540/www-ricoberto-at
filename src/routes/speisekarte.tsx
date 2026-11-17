import { createFileRoute } from "@tanstack/react-router";
import { MenuSection } from "@/components/site/MenuSection";
import { menuSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/speisekarte")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead("/speisekarte", "Pizza & Pasta Speisekarte mit Preisen | Ricoberto 3.0 Wien", "Pizza, Pasta, Antipasti und Desserts mit Preisen und Allergenen. Bei Ricoberto 3.0 in 1030 Wien per WhatsApp zur Abholung oder Lieferung bestellen."),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(menuSchema) }],
  }),
  component: Speisekarte,
});

function Speisekarte() {
  return <main className="pt-20"><div className="mx-auto max-w-7xl px-5 pt-12 md:px-8"><h1 className="text-4xl font-medium md:text-6xl">Ricoberto 3.0 – Speisekarte</h1><p className="mt-4 text-lg text-muted-foreground">Pizza &amp; Pasta bestellen in 1030 Wien · Erdbergstraße 101</p></div><MenuSection /></main>;
}