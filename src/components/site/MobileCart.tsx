import { ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { money } from "@/lib/order";
import { useCart } from "./cart-context";
import { CartPanel } from "./CartPanel";

/** Floating cart bar (mobile/tablet) + slide-in cart sheet (all sizes, opened from header). */
export function MobileCart() {
  const { count, total, cartOpen, setCartOpen } = useCart();

  return (
    <>
      {count > 0 && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-ink px-5 py-3.5 text-ink-foreground shadow-lift lg:hidden"
        >
          <span className="inline-flex items-center gap-2 font-semibold">
            <ShoppingBag className="h-4 w-4 text-ember" /> Warenkorb · {count}
          </span>
          <span className="font-semibold tabular-nums">{money(total)}</span>
        </button>
      )}

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
