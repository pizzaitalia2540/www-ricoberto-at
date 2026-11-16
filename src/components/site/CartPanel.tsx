import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DELIVERY_ZONES } from "@/data/menu";
import { lineLabel, money, unitPrice } from "@/lib/order";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-context";

export function CartPanel({ className, onCheckout }: { className?: string; onCheckout?: () => void }) {
  const { cart, count, total, change, remove, setCheckoutOpen } = useCart();

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft", className)}>
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-display text-2xl font-medium">Deine Bestellung</h3>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">{count} Artikel</span>
      </div>

      <div className="max-h-[40svh] flex-1 overflow-y-auto px-5 lg:max-h-[38svh]">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center text-sm text-muted-foreground">
            <ShoppingBag className="h-8 w-8 opacity-40" />
            Dein Warenkorb ist noch leer.
            <br />
            Tippe auf ein Gericht, um es hinzuzufügen.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {cart.map((l) => {
              const { name, extras } = lineLabel(l);
              return (
                <li key={l.key} className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium leading-snug">{name}</p>
                      {extras.length > 0 && (
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">+ {extras.join(", ")}</p>
                      )}
                    </div>
                    <span className="shrink-0 font-semibold tabular-nums">{money(unitPrice(l) * l.qty)}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <QtyBtn label="Weniger" onClick={() => change(l.key, -1)}>
                      <Minus className="h-3.5 w-3.5" />
                    </QtyBtn>
                    <span className="w-7 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                    <QtyBtn label="Mehr" onClick={() => change(l.key, 1)}>
                      <Plus className="h-3.5 w-3.5" />
                    </QtyBtn>
                    <Button variant="ghost"
                      type="button"
                      onClick={() => remove(l.key)}
                      className="ml-auto inline-flex min-h-11 items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Entfernen
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="space-y-4 border-t border-border bg-secondary/40 px-5 py-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Gesamt</span>
          <span className="font-display text-3xl font-medium tabular-nums text-primary">{money(total)}</span>
        </div>
        <Button
          variant="pill"
          size="xl"
          className="w-full"
          disabled={cart.length === 0}
          onClick={() => {
            onCheckout?.();
            setCheckoutOpen(true);
          }}
        >
          Zur Bestellung
        </Button>
        <div className="rounded-2xl bg-ink p-4 text-sm text-ink-foreground">
          <p className="eyebrow mb-2 text-ember">Lieferzonen</p>
          <ul className="space-y-1">
            {Object.entries(DELIVERY_ZONES).map(([zip, min]) => (
              <li key={zip} className="flex justify-between">
                <span className="font-semibold">{zip} Wien</span>
                <span className="text-ink-muted">ab {money(min)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink-muted">Abholung jederzeit ohne Mindestbestellwert.</p>
        </div>
      </div>
    </div>
  );
}

function QtyBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <Button variant="outline" size="icon"
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background hover:border-primary hover:text-primary"
    >
      {children}
    </Button>
  );
}
