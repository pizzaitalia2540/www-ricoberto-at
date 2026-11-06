import interior from "@/assets/trattoria-interior.jpg";
import logo from "@/assets/logo-ricoberto.jpg";

const FACTS = [
  { value: "4,7★", label: "auf Google" },
  { value: "3.", label: "Bezirk, Landstraße" },
  { value: "7/7", label: "Tage geöffnet" },
];

export function About() {
  return (
    <section id="ueber-uns" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:gap-20 md:px-8">
        <div className="relative">
          <img
            src={interior}
            alt="Gemütlicher Gastraum mit Holzofen"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift"
            width={1200}
            height={1504}
            loading="lazy"
          />
          <div className="absolute -bottom-8 -right-4 w-44 rotate-[-4deg] rounded-2xl bg-paper p-4 shadow-lift md:-right-10 md:w-56">
            <img src={logo} alt="" className="w-full" width={1102} height={424} loading="lazy" />
          </div>
        </div>

        <div>
          <p className="eyebrow text-primary">Über uns</p>
          <h2 className="mt-4 text-4xl font-medium leading-tight md:text-6xl">
            Ein Stück Italien <em className="text-primary">mitten in Wien.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Bei Ricoberto 3.0 kochen wir mit Leidenschaft für unsere Gäste. Dünner, luftiger Teig, beste Zutaten und
            hausgemachte Pasta – dazu eine entspannte Atmosphäre und ehrliche Gastfreundschaft.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Ob zur Mittagspause, mit der Familie oder auf ein Glas Wein am Abend: Wir halten den besten Platz für dich
            bereit. Oder du bestellst bequem zum Abholen oder Liefern.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="font-display text-3xl font-medium text-foreground md:text-4xl">{f.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
