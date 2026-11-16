import { cloneElement, useId, useMemo, useState, type ReactElement } from "react";
import { Banknote, Bike, Copy, CreditCard, Store } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DELIVERY_ZONES } from "@/data/menu";
import { RESTAURANT } from "@/data/restaurant";
import {
  buildWhatsappMessage,
  missingForMinimum,
  money,
  validateOrder,
  type OrderDetails,
  type OrderMode,
  type PaymentMethod,
} from "@/lib/order";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-context";

const fieldCls =
  "h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export function CheckoutDialog() {
  const { cart, total, checkoutOpen, setCheckoutOpen } = useCart();
  const [mode, setMode] = useState<OrderMode>("pickup");
  const [payment, setPayment] = useState<PaymentMethod>("bar");
  const [form, setForm] = useState({ name: "", phone: "", zip: "", street: "", houseNumber: "", stiege: "", door: "", note: "" });
  const [error, setError] = useState<string | null>(null);

  const details: OrderDetails = { mode, payment, ...form };
  const message = useMemo(() => buildWhatsappMessage(cart, details), [cart, mode, payment, form]); // eslint-disable-line react-hooks/exhaustive-deps
  const missing = mode === "delivery" ? missingForMinimum(cart, form.zip) : 0;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = () => {
    const err = validateOrder(cart, details);
    setError(err);
    if (err) return;
    window.open(`https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  };

  const copy = async () => {
    const err = validateOrder(cart, details);
    setError(err);
    if (err) return;
    await navigator.clipboard.writeText(message);
    toast.success("Bestellung kopiert");
  };

  return (
    <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
      <DialogContent className="flex max-h-[94svh] max-w-xl flex-col gap-0 overflow-hidden rounded-3xl border-border bg-background p-0">
        <DialogHeader className="border-b border-border px-6 pb-5 pt-6 text-left">
          <p className="eyebrow text-primary">Letzter Schritt</p>
          <DialogTitle className="font-display text-3xl font-medium">Bestellung abschließen</DialogTitle>
          <DialogDescription>Wir bestätigen deine Bestellung per WhatsApp.</DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <Segmented
            label="Bestellart"
            value={mode}
            onChange={(v) => setMode(v as OrderMode)}
            options={[
              { value: "pickup", label: "Abholung", icon: <Store className="h-4 w-4" /> },
              { value: "delivery", label: "Lieferung", icon: <Bike className="h-4 w-4" /> },
            ]}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name *">
              <input className={fieldCls} value={form.name} onChange={set("name")} autoComplete="name" />
            </Field>
            <Field label="Telefon (optional)">
              <input className={fieldCls} value={form.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" />
            </Field>
          </div>

          {mode === "delivery" && (
            <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
              <Field label="PLZ *">
                <select className={fieldCls} value={form.zip} onChange={set("zip")}>
                  <option value="">Bitte wählen</option>
                  {Object.entries(DELIVERY_ZONES).map(([zip, min]) => (
                    <option key={zip} value={zip}>
                      {zip} Wien – Mindestbestellwert {money(min)}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="grid grid-cols-[1fr_6rem] gap-3">
                <Field label="Straße *">
                  <input className={fieldCls} value={form.street} onChange={set("street")} autoComplete="address-line1" />
                </Field>
                <Field label="Nr. *">
                  <input className={fieldCls} value={form.houseNumber} onChange={set("houseNumber")} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Stiege">
                  <input className={fieldCls} value={form.stiege} onChange={set("stiege")} />
                </Field>
                <Field label="Tür">
                  <input className={fieldCls} value={form.door} onChange={set("door")} />
                </Field>
              </div>
              {form.zip && (
                <p
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm",
                    missing > 0 ? "bg-destructive/10 text-destructive" : "bg-whatsapp/10 text-foreground",
                  )}
                >
                  {missing > 0
                    ? `Mindestbestellwert für ${form.zip}: ${money(DELIVERY_ZONES[form.zip] ?? 0)} – es fehlen noch ${money(missing)}.`
                    : `Mindestbestellwert für ${form.zip} erreicht.`}
                </p>
              )}
            </div>
          )}

          <Field label="Anmerkung">
            <textarea
              className={cn(fieldCls, "h-20 resize-none py-2.5")}
              value={form.note}
              onChange={set("note")}
              placeholder="z. B. Klingel defekt, extra scharf …"
            />
          </Field>

          <Segmented
            label="Zahlungsart"
            value={payment}
            onChange={(v) => setPayment(v as PaymentMethod)}
            options={[
              { value: "bar", label: "Barzahlung", icon: <Banknote className="h-4 w-4" /> },
              { value: "card", label: "Bankomat / Karte", icon: <CreditCard className="h-4 w-4" /> },
            ]}
          />

          <details className="rounded-2xl border border-border bg-card p-4 text-sm">
            <summary className="cursor-pointer font-medium">Nachricht ansehen</summary>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-xs leading-relaxed text-muted-foreground">{message}</pre>
          </details>

          {error && <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        </div>

        <div className="space-y-3 border-t border-border bg-card px-6 py-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Gesamt</span>
            <span className="font-display text-2xl font-medium tabular-nums text-primary">{money(total)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="whatsapp" size="xl" className="min-w-0 flex-1" onClick={send}>
              Per WhatsApp senden
            </Button>
            <Button variant="pillOutline" size="icon" className="h-12 w-12 shrink-0" onClick={copy} aria-label="Bestellung kopieren">
              <Copy />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: ReactElement<{ id?: string }> }) {
  const id = useId();
  return (
    <div className="block space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-muted-foreground">{label}</label>
      {cloneElement(children, { id })}
    </div>
  );
}

function Segmented({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; icon: React.ReactNode }[];
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="grid grid-cols-2 gap-1 rounded-full bg-secondary p-1">
        {options.map((o) => (
          <Button variant="ghost"
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={cn(
              "inline-flex min-h-11 h-auto min-w-0 items-center justify-center gap-2 rounded-full px-2 py-2.5 text-sm font-semibold transition",
              value === o.value ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.icon}
            {o.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
