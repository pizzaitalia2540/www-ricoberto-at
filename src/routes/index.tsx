import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { CartProvider } from "@/components/site/cart-context";
import { CheckoutDialog } from "@/components/site/CheckoutDialog";
import { Hero, Marquee } from "@/components/site/Hero";
import { MenuSection } from "@/components/site/MenuSection";
import { MobileCart } from "@/components/site/MobileCart";
import { Contact, Footer, Gallery, Reviews } from "@/components/site/Sections";
import { SiteHeader } from "@/components/site/SiteHeader";

const TITLE = "Ricoberto 3.0 – Pizzeria & Trattoria in 1030 Wien";
const DESC =
  "Neapolitanische Pizza, hausgemachte Pasta und italienische Klassiker in der Erdbergstraße 101. Jetzt online bestellen – Abholung oder Lieferung nach 1030, 1020 und 1110 Wien.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <About />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileCart />
      <CheckoutDialog />
    </CartProvider>
  );
}
