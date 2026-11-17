import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MENU } from "@/data/menu";
import { money } from "@/lib/order";
import { DELIVERY_ZONES, VEGAN_CHEESE_PRICE } from "@/data/menu";
import { RESTAURANT } from "@/data/restaurant";
import pizzaImage from "@/assets/gallery-burrata.jpg";
import pastaImage from "@/assets/gallery-carbonara.jpg";

export function MenuHighlights() {
  const selections = [
    {
      category: "Pizza",
      title: "Neapolitanische Pizza in Wien 1030",
      description: `Von Marinara und Margherita bis Burrata: Pizza mit Tomatensauce, Mozzarella oder Gemüse. Jede Pizza auch mit veganer Käse-Alternative für +${money(VEGAN_CHEESE_PRICE)} und Extra-Toppings nach Wunsch.`,
      names: ["Marinara", "Margherita", "Burrata"],
      image: pizzaImage,
      alt: "Neapolitanische Pizza mit Burrata, Kirschtomaten und Basilikum",
      width: 1200,
      height: 1504,
      hash: "kat-pizza",
    },
    {
      category: "Pasta",
      title: "Italienische Pasta in Wien Landstraße",
      description: "Spaghetti alla carbonara mit Speck, Ei und Grana, Linguine mit hausgemachter Bolognese oder Spaghetti aglio e olio mit Knoblauch, Olivenöl und Chili – entdecke unsere italienischen Pastagerichte.",
      names: ["Spaghetti alla carbonara", "Linguine alla bolognese", "Spaghetti aglio e olio"],
      image: pastaImage,
      alt: "Spaghetti alla carbonara mit Speck, geriebenem Käse und Pfeffer",
      width: 1200,
      height: 1200,
      hash: "kat-pasta",
    },
  ];
  return (
    <section id="speisekarte" className="bg-secondary/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow text-primary">Pizza &amp; Pasta in Wien Landstraße</p>
        <h2 className="mt-4 text-4xl font-medium md:text-6xl">Pizza, Pasta &amp; italienische Klassiker</h2>
        <div className="my-10 grid gap-12 md:grid-cols-2">
          {selections.map((selection) => (
            <section key={selection.category} className="min-w-0">
              <img src={selection.image} alt={selection.alt} width={selection.width} height={selection.height} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
              <h3 className="mt-6 text-3xl">{selection.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{selection.description}</p>
              <ul className="mt-6 divide-y divide-border">
                {MENU.filter((item) => item.category === selection.category && selection.names.includes(item.name)).map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex justify-between gap-3"><h4 className="min-w-0 font-display text-xl">{item.name}</h4><span className="shrink-0 font-semibold text-primary">{money(item.price)}</span></div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </li>
                ))}
              </ul>
              <Button asChild variant="pill" size="xl" className="mt-6"><Link to="/speisekarte" hash={selection.hash}>{selection.category} auswählen &amp; bestellen</Link></Button>
            </section>
          ))}
        </div>
        <div className="border-t border-border py-8">
          <h3 className="text-3xl">Abholung &amp; Lieferung in Wien</h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Besuche {RESTAURANT.name} in der {RESTAURANT.street}, {RESTAURANT.city}, oder bestelle per WhatsApp zur Abholung ohne Mindestbestellwert. Pizza und Pasta liefern wir nach {Object.entries(DELIVERY_ZONES).map(([zip, minimum]) => `${zip} Wien ab ${money(minimum)}`).join(", ")}. Zahlung in bar oder mit Karte; die Bestellung wird vom Restaurant bestätigt.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="pill" size="xl"><Link to="/speisekarte">Speisekarte &amp; Bestellung</Link></Button>
          <Button asChild variant="pillOutline" size="xl"><Link to="/lieferung">Liefergebiete &amp; Abholung</Link></Button>
        </div>
      </div>
    </section>
  );
}