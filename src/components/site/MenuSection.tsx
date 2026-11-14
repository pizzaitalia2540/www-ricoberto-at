import { useEffect, useMemo, useRef, useState } from "react";
import { Leaf, Plus, Search, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CATEGORIES, CATEGORY_KICKER, MENU, type Category, type MenuItem } from "@/data/menu";
import { money } from "@/lib/order";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-context";
import { CartPanel } from "./CartPanel";
import { PizzaDialog } from "./PizzaDialog";

const sectionId = (c: string) => `kat-${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export function MenuSection() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
  const [pizza, setPizza] = useState<MenuItem | null>(null);
  const { add } = useCart();
  const chipsRef = useRef<HTMLDivElement>(null);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.map((c) => ({
      category: c,
      items: MENU.filter(
        (m) => m.category === c && (!q || `${m.name} ${m.description}`.toLowerCase().includes(q)),
      ),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  useEffect(() => {
    const els = grouped.map((g) => document.getElementById(sectionId(g.category))).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.getAttribute("data-category") as Category);
      },
      { rootMargin: "-160px 0px -60% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [grouped]);

  useEffect(() => {
    // Scroll only the chip row horizontally — never the page.
    const row = chipsRef.current;
    const chip = row?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (row && chip) {
      row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  const onAdd = (item: MenuItem) => {
    if (item.pizza) {
      setPizza(item);
      return;
    }
    add(item.id);
    toast.success(`${item.name} im Warenkorb`);
  };

  return (
    <section id="speisekarte" className="relative bg-secondary/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">Speisekarte &amp; Bestellung</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight md:text-6xl">
              Frisch, ehrlich, <em className="text-primary">mit Liebe gemacht.</em>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Gerichte auswählen, Pizza nach Wunsch anpassen und die Bestellung direkt per WhatsApp an uns senden – zum
              Abholen oder Liefern.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 text-sm">
            <li className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-soft">
              <Leaf className="h-4 w-4 text-whatsapp" /> Jede Pizza mit veganem Käse +{money(3)}
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-soft">
              <Sparkles className="h-4 w-4 text-ember" /> 35 Extra-Toppings
            </li>
          </ul>
        </div>

        {/* Sticky search + categories */}
        <div className="sticky top-16 z-30 -mx-5 mt-12 border-y border-border bg-background/95 px-5 py-3 backdrop-blur-md md:top-20 md:mx-0 md:rounded-2xl md:border md:px-4 md:shadow-soft">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative md:w-72">
              <span className="sr-only">Gericht suchen</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Gericht suchen …"
                className="h-10 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <div ref={chipsRef} className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
              {grouped.map(({ category }) => (
                <a
                  key={category}
                  data-chip={category}
                  href={`#${sectionId(category)}`}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active === category ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-16">
            {grouped.length === 0 && (
              <p className="rounded-2xl bg-card p-10 text-center text-muted-foreground">
                Keine passenden Gerichte gefunden.
              </p>
            )}
            {grouped.map(({ category, items }) => (
              <div key={category} id={sectionId(category)} data-category={category} className="scroll-mt-44">
                <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="font-display text-sm italic text-primary">{CATEGORY_KICKER[category]}</p>
                    <h3 className="text-3xl font-medium md:text-4xl">{category}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">{items.length} Gerichte</span>
                </div>
                {category === "Pizza" && (
                  <p className="mb-5 rounded-xl border border-dashed border-primary/30 bg-card/60 px-4 py-3 text-sm text-muted-foreground">
                    Tippe auf eine Pizza, um veganen Käse oder Extra-Toppings zu wählen.
                  </p>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <ItemCard key={item.id} item={item} onAdd={() => onAdd(item)} />
                  ))}
                </div>
              </div>
            ))}
            <p className="text-sm text-muted-foreground">
              Buchstaben kennzeichnen Allergene –{" "}
              <Link to="/impressum" hash="allergene" className="font-medium text-primary underline-offset-4 hover:underline">
                Legende ansehen
              </Link>
              . Alle Preise in Euro inkl. USt.
            </p>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-44">
              <CartPanel />
            </div>
          </aside>
        </div>
      </div>

      <PizzaDialog item={pizza} onClose={() => setPizza(null)} />
    </section>
  );
}

function ItemCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return (
    <article
      type="button"
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-lg font-medium leading-snug">{item.name}</h4>
        <span className="shrink-0 font-semibold tabular-nums text-primary">{money(item.price)}</span>
      </div>
      {item.description && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <span className="text-xs text-muted-foreground">
          {item.allergens && <>Allergene: {item.allergens}</>}
          {item.pizza && <span className="ml-2 text-primary">· anpassbar</span>}
        </span>
        <Button variant="secondary" size="icon" onClick={onAdd} aria-label={`${item.name} hinzufügen`} className="h-11 w-11 shrink-0 rounded-full">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
