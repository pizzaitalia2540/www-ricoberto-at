import { MapPin, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-pizza.webp";
import { Button } from "@/components/ui/button";
import { RESTAURANT } from "@/data/restaurant";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-ink text-ink-foreground">
      <img
        src={heroImg}
        alt="Neapolitanische Pizza Margherita frisch aus dem Holzofen"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_center]"
        width={1600}
        height={1200}
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-hero-fade" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <p className="eyebrow mb-5 inline-flex animate-rise items-center gap-2 rounded-full border border-ink-foreground/25 px-3 py-1.5 text-ink-foreground/90 backdrop-blur-sm">
          <MapPin className="h-3.5 w-3.5 text-ember" /> 1030 Wien · Landstraße
        </p>
        <h1 className="max-w-4xl animate-rise text-5xl font-medium leading-[0.95] sm:text-7xl md:text-8xl [animation-delay:80ms]">
          Ricoberto 3.0
          <br />
          <em className="text-3xl font-normal text-ember sm:text-5xl">Pizza &amp; Pasta in 1030 Wien.</em>
        </h1>
        <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-ink-foreground/80 [animation-delay:160ms]">
          Willkommen bei Ricoberto 3.0 – neapolitanische Pizza aus dem Ofen, hausgemachte Pasta und herzliche
          Gastfreundschaft in der Erdbergstraße 101 in Wien Landstraße.
        </p>
        <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">
          <Button asChild variant="hero" size="xl">
            <Link to="/speisekarte">Jetzt bestellen</Link>
          </Button>
          <Button asChild variant="heroOutline" size="xl">
            <a href={RESTAURANT.phoneHref}>Tisch reservieren</a>
          </Button>
        </div>
        <div className="mt-10 flex animate-rise flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-foreground/80 [animation-delay:320ms]">
          <span className="inline-flex items-center gap-1.5">
            <span className="flex text-ember">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <strong className="ml-1 text-ink-foreground">{RESTAURANT.rating}</strong> · {RESTAURANT.reviewCount}{" "}
            Google-Bewertungen
          </span>
          <span className="hidden h-4 w-px bg-ink-foreground/30 sm:block" />
          <span>Abholung &amp; Lieferung in 1030 · 1020 · 1110</span>
        </div>
      </div>
    </section>
  );
}

const STRIP = ["Pizza napoletana", "Pasta fresca", "Antipasti", "Al forno", "Dolci", "Pane fatto in casa"];

export function Marquee() {
  const items = [...STRIP, ...STRIP];
  return (
    <div className="overflow-hidden border-y border-ink-border bg-ink py-4 text-ink-foreground">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...items, ...items].map((s, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl italic text-ink-foreground/85">
            {s}
            <span className="text-ember not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
