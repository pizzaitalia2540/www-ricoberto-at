import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { buildFaq } from "@/data/faq";
import { RESTAURANT } from "@/data/restaurant";

export function FindUs() {
  const faq = buildFaq();
  return (
    <section id="anfahrt" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <p className="eyebrow text-primary">Anfahrt &amp; Fragen</p>
        <h2 className="mt-4 text-4xl font-medium md:text-6xl">So finden Sie uns in Erdberg, 1030 Wien</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {RESTAURANT.name} ist Ihre Pizzeria in der Erdbergstraße im 3. Bezirk (Landstraße). Sie finden uns in der {RESTAURANT.street}, {RESTAURANT.city}, die nächste U-Bahn-Station ist die {RESTAURANT.nearestUbahn}. Neapolitanische Pizza, Pasta und italienische Küche genießen Sie bei uns im Lokal, zur Abholung oder als Lieferung.{" "}
          <a className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline" href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin className="h-4 w-4" /> Route planen
          </a>
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          Mehr dazu: <Link className="text-primary underline-offset-4 hover:underline" to="/speisekarte">Speisekarte mit Pizza &amp; Pasta</Link> und <Link className="text-primary underline-offset-4 hover:underline" to="/lieferung">Lieferung &amp; Abholung in 1030 Wien</Link>.
        </p>
        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
          {faq.map((item) => (
            <details key={item.question} className="group p-6 md:px-8">
              <summary className="cursor-pointer list-none text-xl font-medium marker:content-none">{item.question}</summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
