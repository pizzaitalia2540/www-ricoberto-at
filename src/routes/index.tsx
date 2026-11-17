import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { Hero, Marquee } from "@/components/site/Hero";
import { MenuHighlights } from "@/components/site/MenuHighlights";
import { Contact, Gallery, Reviews } from "@/components/site/Sections";
import { pageHead, SITE_URL } from "@/lib/seo";

const TITLE = "Pizza & Pasta in Wien 1030 bestellen | Ricoberto 3.0";
const DESC =
  "Neapolitanische Pizza & italienische Pasta bei Ricoberto 3.0 in Wien Landstraße. Erdbergstraße 101, 1030 Wien: vor Ort genießen, abholen oder liefern lassen.";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead("/", TITLE, DESC),
    links: [...pageHead("/", TITLE, DESC).links, { rel: "alternate", hrefLang: "de-AT", href: `${SITE_URL}/` }, { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en` }, { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` }],
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
