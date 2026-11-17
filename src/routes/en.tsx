import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DELIVERY_ZONES } from "@/data/menu";
import { RESTAURANT } from "@/data/restaurant";
import { money } from "@/lib/order";
import { breadcrumbSchema, pageHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/en")({
  staticData: { sitemap: true },
  head: () => {
    const head = pageHead("/en", "Ricoberto 3.0 | Neapolitan Pizza & Pasta in Vienna", "Enjoy pizza and Italian pasta at Ricoberto 3.0, Erdbergstraße 101 in Vienna's Landstraße district (1030). Dine in, collect your order or check delivery to Vienna 1020, 1030 and 1110.", "en_GB");
    return {
      ...head,
      links: [...head.links, { rel: "alternate", hrefLang: "de-AT", href: `${SITE_URL}/` }, { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en` }, { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "English", path: "/en" },
      ])) }],
    };
  },
  component: English,
});

function English() {
  return <main lang="en" className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8"><p className="eyebrow text-primary">Pizzeria · Trattoria · Vienna</p><h1 className="mt-4 text-5xl font-medium md:text-7xl">Ricoberto 3.0 – Pizza &amp; Pasta in Vienna</h1><p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">Enjoy Neapolitan-style pizza, homemade pasta and Italian classics at Ricoberto 3.0 in Vienna’s Landstraße district. Visit us at {RESTAURANT.street}, 1030 Vienna, or order for takeaway and delivery where available.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="pill" size="xl"><Link to="/speisekarte">Menu &amp; ordering (German)</Link></Button><Button asChild variant="pillOutline" size="xl"><a href={RESTAURANT.phoneHref}>Call the restaurant</a></Button><Button asChild variant="pillOutline" size="xl"><a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer">Directions</a></Button></div><section className="mt-16"><h2 className="text-3xl">Delivery &amp; takeaway in Vienna</h2><p className="mt-4 text-lg text-muted-foreground">Orders are sent through WhatsApp and confirmed by the restaurant. Pay with cash or card. There is no minimum order for collection.</p><ul className="mt-6 divide-y divide-border">{Object.entries(DELIVERY_ZONES).map(([zip, minimum]) => <li key={zip} className="flex justify-between gap-4 py-4"><span>Vienna {zip}</span><span>Minimum order {money(minimum)}</span></li>)}</ul></section><section className="mt-12"><h2 className="text-3xl">Opening hours</h2><p className="mt-4 text-lg text-muted-foreground">Monday–Thursday &amp; Saturday–Sunday: 12:00–23:30<br />Friday: 14:00–23:30</p></section></main>;
}
