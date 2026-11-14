import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { Hero, Marquee } from "@/components/site/Hero";
import { MenuHighlights } from "@/components/site/MenuHighlights";
import { Contact, Gallery, Reviews } from "@/components/site/Sections";
import { pageHead, restaurantSchema, SITE_URL } from "@/lib/seo";

const TITLE = "Ricoberto 3.0 – Pizzeria & Trattoria in 1030 Wien";
const DESC =
  "Neapolitanische Pizza, hausgemachte Pasta und italienische Klassiker in der Erdbergstraße 101. Jetzt online bestellen – Abholung oder Lieferung nach 1030, 1020 und 1110 Wien.";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead("/", TITLE, DESC),
    links: [...pageHead("/", TITLE, DESC).links, { rel: "alternate", hrefLang: "de-AT", href: `${SITE_URL}/` }, { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en` }, { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(restaurantSchema) }],
  }),
  component: Index,
});

function Index() {
  return (
      <main>
        <Hero />
        <Marquee />
        <About />
        <MenuHighlights />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
  );
}
