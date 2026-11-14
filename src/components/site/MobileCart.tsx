import { MapPin, Phone, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { RESTAURANT } from "@/data/restaurant";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { money } from "@/lib/order";
import { useCart } from "./cart-context";
import { CartPanel } from "./CartPanel";

/** Floating cart bar (mobile/tablet) + slide-in cart sheet (all sizes, opened from header). */
export function MobileCart() {
  const { count, total, cartOpen, setCartOpen } = useCart();

  return (
    <>
      <nav aria-label="Schnellaktionen" className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around gap-2 border-t border-border bg-background p-3 shadow-lift lg:hidden">
        <Button asChild variant="ghost" className="h-12"><a href={RESTAURANT.phoneHref} aria-label="Ricoberto anrufen"><Phone /> Anrufen</a></Button>
        <Button asChild variant="ghost" className="h-12"><a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer" aria-label="Route zu Ricoberto planen"><MapPin /> Route</a></Button>
        {count > 0 ? <Button variant="pill" className="h-12" onClick={() => setCartOpen(true)} aria-label={`Warenkorb öffnen, ${count} Artikel, ${money(total)}`}><ShoppingBag /> {count} · {money(total)}</Button> : <Button asChild variant="pill" className="h-12"><Link to="/speisekarte"><ShoppingBag /> Bestellen</Link></Button>}
      </nav>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="w-full border-border bg-background p-3 sm:max-w-md">
          <SheetTitle className="sr-only">Warenkorb</SheetTitle>
          <SheetDescription className="sr-only">Deine ausgewählten Gerichte</SheetDescription>
          <CartPanel className="h-full" onCheckout={() => setCartOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
