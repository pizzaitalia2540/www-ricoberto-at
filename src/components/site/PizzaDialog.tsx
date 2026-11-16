import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EXTRA_TOPPINGS, VEGAN_CHEESE_PRICE, type MenuItem, type Topping } from "@/data/menu";
import { money, unitPrice } from "@/lib/order";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-context";

export function PizzaDialog({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const { add } = useCart();
  const [vegan, setVegan] = useState(false);
  const [extras, setExtras] = useState<Topping[]>([]);

  useEffect(() => {
    if (item) {
      setVegan(false);
      setExtras([]);
    }
  }, [item]);

  if (!item) return null;

  const toggle = (t: Topping) =>
    setExtras((cur) => (cur.some((e) => e.name === t.name) ? cur.filter((e) => e.name !== t.name) : [...cur, t]));

  const price = unitPrice({ itemId: item.id, vegan, extras });

  const confirm = () => {
    add(item.id, vegan, extras);
    toast.success(`${item.name} im Warenkorb`);
    onClose();
  };

  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="flex max-h-[92svh] max-w-2xl flex-col gap-0 overflow-hidden rounded-3xl border-border bg-background p-0">
        <DialogHeader className="border-b border-border px-6 pb-5 pt-6 text-left">
          <p className="eyebrow text-primary">Pizza anpassen</p>
          <DialogTitle className="font-display text-3xl font-medium">{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
          <div>
            <h4 className="eyebrow mb-3 text-muted-foreground">Käse-Basis</h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { v: false, label: "Mozzarella (Standard)", price: 0 },
                { v: true, label: "Vegane Käse-Alternative", price: VEGAN_CHEESE_PRICE },
              ].map((o) => (
                <Button variant="outline"
                  key={String(o.v)}
                  type="button"
                  onClick={() => setVegan(o.v)}
                  className={cn(
                    "flex h-auto min-h-11 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                    vegan === o.v ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:border-primary/40",
                  )}
                  aria-pressed={vegan === o.v}
                >
                  <span className="font-medium">{o.label}</span>
                  <span className="text-muted-foreground">{o.price ? `+ ${money(o.price)}` : "inklusive"}</span>
                </Button>
              ))}
            </div>
          </div>

          {EXTRA_TOPPINGS.map((group) => (
            <div key={group.category}>
              <h4 className="eyebrow mb-3 text-muted-foreground">{group.category}</h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((t) => {
                  const on = extras.some((e) => e.name === t.name);
                  return (
                    <Button variant="outline"
                      key={t.name}
                      type="button"
                      onClick={() => toggle(t)}
                      aria-pressed={on}
                      className={cn(
                        "inline-flex h-auto min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition",
                        on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40",
                      )}
                    >
                      {on && <Check className="h-3.5 w-3.5" />}
                      {t.name}
                      <span className={cn("text-xs", on ? "opacity-80" : "text-muted-foreground")}>
                        {t.price === 0 ? "gratis" : `+${money(t.price)}`}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border bg-card px-6 py-4">
          <Button variant="pill" size="xl" className="w-full" onClick={confirm}>
            In den Warenkorb · {money(price)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
