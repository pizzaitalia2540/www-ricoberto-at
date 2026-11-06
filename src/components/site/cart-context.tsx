import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Topping } from "@/data/menu";
import { addLine, changeQty, itemCount, subtotal, type CartLine } from "@/lib/order";

const STORAGE_KEY = "ricoberto-cart-v1";

type CartCtx = {
  cart: CartLine[];
  count: number;
  total: number;
  add: (itemId: string, vegan?: boolean, extras?: Topping[]) => void;
  change: (key: string, delta: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {
      /* ignore broken storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const add = useCallback(
    (itemId: string, vegan = false, extras: Topping[] = []) => setCart((c) => addLine(c, itemId, vegan, extras)),
    [],
  );
  const change = useCallback((key: string, delta: number) => setCart((c) => changeQty(c, key, delta)), []);
  const remove = useCallback((key: string) => setCart((c) => c.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({
      cart,
      count: itemCount(cart),
      total: subtotal(cart),
      add,
      change,
      remove,
      clear,
      cartOpen,
      setCartOpen,
      checkoutOpen,
      setCheckoutOpen,
    }),
    [cart, add, change, remove, clear, cartOpen, checkoutOpen],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
