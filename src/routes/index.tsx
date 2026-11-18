import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { FindUs } from "@/components/site/FindUs";
import { Hero, Marquee } from "@/components/site/Hero";
import { MenuHighlights } from "@/components/site/MenuHighlights";
import { Contact, Gallery, Reviews } from "@/components/site/Sections";
import { RESTAURANT } from "@/data/restaurant";
import { pageHead, SITE_URL } from "@/lib/seo";

const TITLE = "Neapolitanische Pizza & frische Pasta: Ricoberto 3.0 Wien 1030";
const DESC = `Ricoberto 3.0, ${RESTAURANT.street}, ${RESTAURANT.city}: neapolitanische Pizza, hausgemachte Pasta & frische Salate. ${RESTAURANT.rating}★ bei ${RESTAURANT.reviewCount} Google-Bewertungen. Täglich geöffnet.`;

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
        <FindUs />
        <Contact />
      </main>
  );
}
