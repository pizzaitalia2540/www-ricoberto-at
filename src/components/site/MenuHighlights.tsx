import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MENU } from "@/data/menu";
import { money } from "@/lib/order";

export function MenuHighlights() {
  const items = MENU.filter((item) => ["Margherita", "Burrata", "Spaghetti alla carbonara", "Tiramisù"].includes(item.name));
  return (
    <section id="speisekarte" className="bg-secondary/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow text-primary">Pizza &amp; Pasta in Wien Landstraße</p>
        <h2 className="mt-4 text-4xl font-medium md:text-6xl">Aus unserer Speisekarte</h2>
        <div className="my-10 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="border-b border-border pb-6">
              <div className="flex justify-between gap-4"><h3 className="text-2xl">{item.name}</h3><span className="shrink-0 font-semibold text-primary">{money(item.price)}</span></div>
              <p className="mt-2 text-muted-foreground">{item.description || "Italienischer Dessertklassiker."}</p>
            </article>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="pill" size="xl"><Link to="/speisekarte">Speisekarte &amp; Bestellung</Link></Button>
          <Button asChild variant="pillOutline" size="xl"><Link to="/lieferung">Liefergebiete &amp; Abholung</Link></Button>
        </div>
      </div>
    </section>
  );
}