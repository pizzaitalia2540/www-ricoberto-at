import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { breadcrumbSchema, pageHead } from "@/lib/seo";
import { ALLERGENS } from "@/data/menu";
import { RESTAURANT } from "@/data/restaurant";

const TITLE = "Impressum, Datenschutz & Allergene – Ricoberto 3.0";
const DESC = "Offenlegung, Datenschutzerklärung, AGB und Allergen-Kennzeichnung von Ricoberto 3.0, Erdbergstraße 101, 1030 Wien.";

export const Route = createFileRoute("/impressum")({
  staticData: { sitemap: true },
  head: () => ({\n    ...pageHead("/impressum", TITLE, DESC),\n    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([\n      { name: "Startseite", path: "/" },\n      { name: "Impressum & Rechtliches", path: "/impressum" },\n    ])) }],\n  }),
  component: Impressum,
});

const COMPANY: [string, string][] = [
  ["Marke", "Ricoberto 3.0 – Pizzeria · Trattoria"],
  ["Inhaber / Medieninhaber", "Askin Altundal"],
  ["Rechtsform", "Einzelunternehmen (e.U.)"],
  ["Unternehmensgegenstand", "Gastronomie – Restaurant, Pizzeria, Speisenlieferung"],
  ["Anschrift", `${RESTAURANT.street}, ${RESTAURANT.city}, Österreich`],
  ["Telefon", RESTAURANT.phoneDisplay],
  ["Firmenbuchnummer", "FN 595233v"],
  ["Firmenbuchgericht", "Handelsgericht Wien"],
  ["UID-Nummer", "ATU82213748"],
  ["Gewerbebehörde", "Magistratisches Bezirksamt für den 3. Bezirk (Landstraße), Wien"],
  ["Kammerzugehörigkeit", "Wirtschaftskammer Wien, Fachgruppe Gastronomie"],
  ["Rechtsvorschriften", "Gewerbeordnung (GewO), www.ris.bka.gv.at"],
];

function Impressum() {
  return (
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>
        <h1 className="mt-6 text-4xl font-medium md:text-6xl">
          Impressum <em className="text-primary">&amp; Rechtliches</em>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Offenlegung gemäß § 5 ECG, § 14 UGB und § 25 MedienG, Datenschutz, AGB und Allergen-Hinweise.
        </p>

        <Block eyebrow="Offenlegung" title="Unternehmensdaten">
          <dl className="divide-y divide-border rounded-2xl border border-border bg-card">
            {COMPANY.map(([k, v]) => (
              <div key={k} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[14rem_1fr]">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <p>
            Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten.
            Inhalte, Texte und Bilder dieser Website sind urheberrechtlich geschützt. Für Inhalte verlinkter externer
            Websites (z. B. WhatsApp, Google Maps, Instagram) sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </Block>

        <Block eyebrow="DSGVO" title="Datenschutzerklärung">
          <p>
            Verantwortlich für die Datenverarbeitung ist Askin Altundal, {RESTAURANT.street}, {RESTAURANT.city}. Wir
            verarbeiten personenbezogene Daten ausschließlich auf Basis der gesetzlichen Bestimmungen (DSGVO, TKG 2021).
          </p>
          <p>
            <strong>Online-Bestellung:</strong> Der Warenkorb wird nur lokal in deinem Browser gespeichert. Deine
            Bestelldaten (Name, ggf. Telefon und Lieferadresse) werden erst übermittelt, wenn du die Bestellung selbst
            per WhatsApp (WhatsApp Ireland Ltd.) an uns sendest. Wir nutzen sie ausschließlich zur Abwicklung deiner
            Bestellung (Art. 6 Abs. 1 lit. b DSGVO).
          </p>
          <p>
            <strong>Server-Logfiles &amp; Cookies:</strong> Beim Besuch dieser Website werden technisch notwendige
            Zugriffsdaten verarbeitet. Diese Website setzt keine Marketing- oder Tracking-Cookies ein.
          </p>
          <p>
            <strong>Deine Rechte:</strong> Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und
            Widerspruch. Beschwerdebehörde ist die Österreichische Datenschutzbehörde, Barichgasse 40–42, 1030 Wien.
          </p>
        </Block>

        <Block eyebrow="Geschäftsbedingungen" title="AGB">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Preise in Euro inkl. gesetzlicher USt. Änderungen und Druckfehler vorbehalten.</li>
            <li>Reservierte Tische werden bis 15 Minuten nach der vereinbarten Zeit freigehalten.</li>
            <li>Zahlung vor Ort bzw. bei Lieferung in bar oder mit Karte. Ein Vertrag kommt mit Annahme der Bestellung zustande.</li>
            <li>Bei Speisen zum sofortigen Verzehr besteht gemäß § 18 FAGG kein Rücktrittsrecht.</li>
            <li>Reklamationen bitte unmittelbar bei Erhalt der Speisen melden.</li>
            <li>Es gilt österreichisches Recht. Gerichtsstand ist Wien.</li>
          </ol>
        </Block>

        <Block id="allergene" eyebrow="Kennzeichnung" title="Allergene">
          <p>
            Gemäß LMIV 1169/2011 informieren wir über allergene Stoffe. Da in unserer Küche mit Mehl, Milchprodukten,
            Fisch und Nüssen gearbeitet wird, können Spuren anderer Allergene nicht ausgeschlossen werden.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {Object.entries(ALLERGENS).map(([code, label]) => (
              <li key={code} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                  {code}
                </span>
                {label}
              </li>
            ))}
          </ul>
        </Block>
      </main>
  );
}

function Block({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-16 scroll-mt-28 space-y-4 leading-relaxed text-muted-foreground [&_strong]:text-foreground">
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-medium text-foreground">{title}</h2>
      {children}
    </section>
  );
}
