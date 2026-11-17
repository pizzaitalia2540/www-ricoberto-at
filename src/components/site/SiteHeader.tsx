import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, Phone, ShoppingBag, X } from "lucide-react";
import logo from "@/assets/logo-ricoberto.webp";
import { RESTAURANT } from "@/data/restaurant";
import { money } from "@/lib/order";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-context";

const NAV = [
  { to: "/speisekarte", hash: "", label: "Speisekarte" },
  { to: "/lieferung", hash: "", label: "Lieferung" },
  { to: "/", hash: "ueber-uns", label: "Über uns" },
  { to: "/", hash: "galerie", label: "Galerie" },
  { to: "/", hash: "kontakt", label: "Kontakt" },
  { to: "/en", hash: "", label: "EN" },
] as const;

export function SiteHeader({ withCart = true }: { withCart?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open || !withCart || pathname !== "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        solid
          ? "border-b border-border bg-background/90 text-foreground backdrop-blur-md"
          : "bg-transparent text-ink-foreground",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Ricoberto 3.0 – Startseite">
          <span className="flex h-11 w-16 items-center justify-center overflow-hidden rounded-xl bg-paper shadow-soft md:h-12 md:w-20">
            <img src={logo} alt="Ricoberto 3.0 Logo" className="h-full w-full object-contain p-1" width={1102} height={424} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold italic md:text-xl">Ricoberto 3.0</span>
            <span className="eyebrow block text-[0.6rem] opacity-70">Pizzeria · Trattoria</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium xl:flex">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} hash={n.hash} className="opacity-80 transition-opacity hover:opacity-100">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={RESTAURANT.phoneHref}
            className={cn(
              "hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors md:inline-flex",
              solid ? "border-border hover:bg-secondary" : "border-ink-foreground/30 hover:bg-ink-foreground/10",
            )}
          >
            <Phone className="h-4 w-4" /> {RESTAURANT.phoneDisplay}
          </a>
          {withCart && <CartButton />}
          <Button variant="ghost" size="icon"
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 pb-6 pt-2 xl:hidden">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 font-display text-xl"
            >
              {n.label}
            </Link>
          ))}
          <a href={RESTAURANT.phoneHref} className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">
            <Phone className="h-4 w-4" /> {RESTAURANT.phoneDisplay}
          </a>
        </nav>
      )}
    </header>
  );
}

function CartButton() {
  const { count, total, setCartOpen } = useCart();
  return (
    <Button variant="hero"
      type="button"
      onClick={() => setCartOpen(true)}
      className="inline-flex items-center gap-2 rounded-full bg-ember px-4 py-2 text-sm font-semibold text-ember-foreground shadow-soft transition hover:brightness-110"
      aria-label={`Warenkorb öffnen, ${count} Artikel`}
    >
      <ShoppingBag className="h-4 w-4" />
      <span className="tabular-nums">{count}</span>
      {count > 0 && <span className="hidden tabular-nums sm:inline">· {money(total)}</span>}
    </Button>
  );
}
