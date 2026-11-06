import { Clock, Instagram, MapPin, Phone, Quote, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import burrata from "@/assets/gallery-burrata.jpg";
import carbonara from "@/assets/gallery-carbonara.jpg";
import tiramisu from "@/assets/gallery-tiramisu.jpg";
import antipasti from "@/assets/gallery-antipasti.jpg";
import hero from "@/assets/hero-pizza.jpg";
import logo from "@/assets/logo-ricoberto.jpg";
import { Button } from "@/components/ui/button";
import { OPENING_HOURS, RESTAURANT, REVIEWS } from "@/data/restaurant";

export function Gallery() {
  return (
    <section id="galerie" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-primary">Galerie</p>
            <h2 className="mt-4 text-4xl font-medium md:text-6xl">
              Aus unserer <em className="text-primary">Küche.</em>
            </h2>
          </div>
          <Button asChild variant="pillOutline" size="xl">
            <a href={RESTAURANT.instagramUrl} target="_blank" rel="noreferrer">
              <Instagram /> {RESTAURANT.instagramHandle}
            </a>
          </Button>
        </div>
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
          <Tile src={burrata} alt="Pizza mit Burrata und Kirschtomaten" className="row-span-2" w={1200} h={1504} />
          <Tile src={antipasti} alt="Antipasti Ricoberto" className="col-span-2" w={1504} h={1008} />
          <Tile src={carbonara} alt="Spaghetti alla carbonara" w={1200} h={1200} />
          <Tile src={tiramisu} alt="Hausgemachtes Tiramisù" className="row-span-2 md:row-span-1" w={1200} h={1200} />
          <Tile src={hero} alt="Pizza Margherita vor dem Holzofen" className="col-span-2 md:col-span-2" w={1600} h={1200} />
        </div>
      </div>
    </section>
  );
}

function Tile({ src, alt, className = "", w, h }: { src: string; alt: string; className?: string; w: number; h: number }) {
  return (
    <figure className={`group overflow-hidden rounded-2xl bg-muted ${className}`}>
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </figure>
  );
}

export function Reviews() {
  return (
    <section id="bewertungen" className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-32">
      <div className="absolute inset-0 bg-ember-glow" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-ember">Was Gäste sagen</p>
            <h2 className="mt-4 text-4xl font-medium md:text-6xl">
              {RESTAURANT.rating} von 5 <em className="text-ember">auf Google.</em>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-ink-muted">
            <span className="flex text-ember">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </span>
            Über {RESTAURANT.reviewCount.replace("+", "")} Bewertungen
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.author} className="flex flex-col rounded-3xl border border-ink-border bg-ink-foreground/5 p-7">
              <Quote className="h-6 w-6 text-ember" />
              <blockquote className="mt-4 flex-1 font-display text-xl leading-snug">„{r.quote}"</blockquote>
              <figcaption className="mt-6 text-sm text-ink-muted">— {r.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="kontakt" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">Standort &amp; Kontakt</p>
          <h2 className="mt-4 text-4xl font-medium md:text-6xl">
            Vorbeikommen <em className="text-primary">&amp; genießen.</em>
          </h2>
          <ul className="mt-10 space-y-6">
            <Info icon={<MapPin />} label="Adresse">
              <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
                {RESTAURANT.street}, {RESTAURANT.city}
              </a>
            </Info>
            <Info icon={<Phone />} label="Telefon & WhatsApp">
              <a href={RESTAURANT.phoneHref} className="hover:text-primary">
                {RESTAURANT.phoneDisplay}
              </a>
            </Info>
            <Info icon={<Instagram />} label="Instagram">
              <a href={RESTAURANT.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
                {RESTAURANT.instagramHandle}
              </a>
            </Info>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="pill" size="xl">
              <a href={RESTAURANT.phoneHref}>Tisch reservieren</a>
            </Button>
            <Button asChild variant="pillOutline" size="xl">
              <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer">
                Route planen
              </a>
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-10">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-2xl font-medium">Öffnungszeiten</h3>
          </div>
          <ul className="mt-6 divide-y divide-border">
            {OPENING_HOURS.map((o) => (
              <li key={o.day} className="flex justify-between py-3.5">
                <span className="font-medium">{o.day}</span>
                <span className="tabular-nums text-muted-foreground">{o.hours}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-2xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
            Küche bis kurz vor Schluss geöffnet. Bestellungen per WhatsApp während der Öffnungszeiten.
          </p>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-medium">{children}</p>
      </div>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-ink-foreground lg:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-sm">
          <span className="inline-flex rounded-2xl bg-paper p-3">
            <img src={logo} alt="Ricoberto 3.0" className="h-14 w-auto" width={1102} height={424} loading="lazy" />
          </span>
          <p className="mt-5 text-sm leading-relaxed text-ink-muted">
            Pizzeria &amp; Trattoria in Wien Landstraße. Pizza, Pasta und italienische Klassiker zum Genießen vor Ort,
            Abholen oder Liefern.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm">
          <div className="space-y-2">
            <p className="eyebrow text-ember">Besuch</p>
            <p>{RESTAURANT.street}</p>
            <p>{RESTAURANT.city}</p>
            <a href={RESTAURANT.phoneHref} className="block hover:text-ember">
              {RESTAURANT.phoneDisplay}
            </a>
          </div>
          <div className="space-y-2">
            <p className="eyebrow text-ember">Info</p>
            <a href="/#speisekarte" className="block hover:text-ember">
              Speisekarte
            </a>
            <Link to="/impressum" className="block hover:text-ember">
              Impressum &amp; Datenschutz
            </Link>
            <Link to="/impressum" hash="allergene" className="block hover:text-ember">
              Allergene
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-ink-border px-5 pt-6 text-xs text-ink-muted md:px-8">
        © {new Date().getFullYear()} Ricoberto 3.0 · Pizzeria Trattoria · Wien
      </div>
    </footer>
  );
}
