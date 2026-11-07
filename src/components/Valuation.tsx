import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  IndianRupee,
  Lock,
  Phone,
  Scale,
  Send,
  ShieldCheck,
} from "lucide-react";
import { BASE_RATES, BRANCHES, CONTACT, ITEM_TYPES } from "../data/attica";
import { inr } from "../lib/hooks";
import { GoldButton, SectionLabel } from "./Brand";

interface FormState {
  name: string;
  phone: string;
  city: string;
  item: string;
  karat: string;
  weight: string;
  branch: string;
  date: string;
  notes: string;
  consent: boolean;
}

const EMPTY: FormState = {
  name: "",
  phone: "",
  city: "",
  item: ITEM_TYPES[0].label,
  karat: "22K",
  weight: "",
  branch: "",
  date: "",
  notes: "",
  consent: false,
};

const FIELD =
  "w-full border border-gold-500/22 bg-ink-950/55 px-3.5 py-3 text-[0.88rem] text-paper placeholder:text-paper/40 outline-none transition-colors focus:border-gold-400";
const LABEL = "mb-2 block font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-paper/60";

export function Valuation() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [ref, setRef] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const estimate = useMemo(() => {
    const w = parseFloat(form.weight);
    if (!w || w <= 0) return null;
    const rate = BASE_RATES.find((r) => r.karat === form.karat) ?? BASE_RATES[1];
    const item = ITEM_TYPES.find((t) => t.label === form.item) ?? ITEM_TYPES[0];
    const gross = w * rate.rate;
    return Math.round(gross * (1 - item.deduction / 100));
  }, [form.weight, form.karat, form.item]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = "Please enter your full name.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) e.phone = "Enter a 10-digit mobile number.";
    if (form.city.trim().length < 2) e.city = "Which city are you in?";
    const w = parseFloat(form.weight);
    if (!w || w <= 0) e.weight = "Approximate weight helps us prepare the counter.";
    if (!form.consent) e.consent = "Please accept the privacy note to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    window.setTimeout(() => {
      setRef(`ATT-VAL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`);
      setStatus("done");
    }, 900);
  };

  const nextSteps = [
    {
      icon: Phone,
      title: "We call you back",
      body: "An appraisal desk executive confirms your slot within one working hour.",
    },
    {
      icon: Scale,
      title: "You watch the test",
      body: "XRF purity scan and 0.001 g weighing happen at the counter, in front of you.",
    },
    {
      icon: IndianRupee,
      title: "You get paid instantly",
      body: "Accept the itemised offer and the money moves by IMPS before you leave.",
    },
  ];

  return (
    <section id="valuation" className="relative overflow-hidden bg-ink-950 py-20 sm:py-24 lg:py-32">
      <div
        className="animate-drift pointer-events-none absolute -right-32 top-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(216,180,92,0.18),transparent_66%)] blur-2xl"
        aria-hidden="true"
      />
      <div className="bg-hairline-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* form */}
        <div className="lg:col-span-7">
          <SectionLabel tone="gold">Free gold valuation</SectionLabel>
          <h2 className="reveal mt-6 font-display text-[clamp(2.3rem,5.4vw,4rem)] leading-[1.02] font-medium text-paper">
            Know your gold&rsquo;s
            <br />
            <em className="text-gold-sheen animate-sheen italic">value</em> before you walk in.
          </h2>
          <p className="reveal mt-5 max-w-lg text-[0.94rem] leading-relaxed text-paper/60">
            Share a few details and our team will prepare a counter slot for you. No
            obligation, no valuation fee — your details stay private.
          </p>

          <div className="reveal mt-10 border border-gold-500/22 bg-ink-900/70 backdrop-blur-sm">
            {status === "done" ? (
              <div className="p-8 sm:p-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/45 bg-emerald-500/12">
                  <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="mt-6 font-display text-[2rem] leading-tight font-medium text-paper">
                  Slot request received.
                </h3>
                <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-paper/60">
                  Thank you, {form.name.split(" ")[0]}. Our {form.branch || form.city} appraisal
                  desk will call {form.phone} within one working hour to confirm your visit.
                </p>

                <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-gold-500/18 bg-gold-500/18 sm:grid-cols-2">
                  {[
                    ["Reference", ref],
                    ["Item", `${form.item} · ${form.karat}`],
                    ["Approx. weight", `${form.weight} g`],
                    ["Indicative value", estimate ? `₹${inr(estimate)}` : "On test"],
                    ["Preferred date", form.date || "Earliest slot"],
                    ["Branch", form.branch || form.city],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-ink-950/85 px-4 py-3.5">
                      <dt className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-paper/55">
                        {k}
                      </dt>
                      <dd className="tabular mt-1.5 text-[0.88rem] font-semibold text-gold-200">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <GoldButton href={CONTACT.phoneHref}>
                    <Phone className="h-4 w-4" />
                    Call the desk now
                  </GoldButton>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY);
                      setStatus("idle");
                      setRef("");
                    }}
                    className="inline-flex items-center gap-2 border border-gold-500/35 px-6 py-3 text-[0.76rem] font-bold uppercase tracking-[0.16em] text-gold-200 transition-colors hover:bg-gold-400/10"
                  >
                    Book another valuation
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="p-6 sm:p-9">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={LABEL} htmlFor="v-name">Full name</label>
                    <input
                      id="v-name"
                      className={FIELD}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Lakshmi Narasimhan"
                      autoComplete="name"
                    />
                    {errors.name && <p className="mt-1.5 text-[0.72rem] text-rose-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="v-phone">Mobile number</label>
                    <input
                      id="v-phone"
                      className={FIELD}
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="10-digit mobile"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                    {errors.phone && <p className="mt-1.5 text-[0.72rem] text-rose-400">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="v-city">City</label>
                    <input
                      id="v-city"
                      className={FIELD}
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="e.g. Bengaluru"
                      autoComplete="address-level2"
                    />
                    {errors.city && <p className="mt-1.5 text-[0.72rem] text-rose-400">{errors.city}</p>}
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="v-item">What are you selling?</label>
                    <select
                      id="v-item"
                      className={FIELD}
                      value={form.item}
                      onChange={(e) => set("item", e.target.value)}
                    >
                      {ITEM_TYPES.map((t) => (
                        <option key={t.id} value={t.label} className="bg-ink-900">
                          {t.label}
                        </option>
                      ))}
                      <option value="Diamond / stones" className="bg-ink-900">Diamond / stones</option>
                      <option value="Silver articles" className="bg-ink-900">Silver articles</option>
                    </select>
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="v-karat">Purity (if known)</label>
                    <select
                      id="v-karat"
                      className={FIELD}
                      value={form.karat}
                      onChange={(e) => set("karat", e.target.value)}
                    >
                      {BASE_RATES.map((r) => (
                        <option key={r.karat} value={r.karat} className="bg-ink-900">
                          {r.karat} — {r.label}
                        </option>
                      ))}
                      <option value="22K" className="bg-ink-900">Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="v-weight">Approx. weight (grams)</label>
                    <input
                      id="v-weight"
                      className={FIELD}
                      value={form.weight}
                      onChange={(e) => set("weight", e.target.value.replace(/[^\d.]/g, ""))}
                      placeholder="e.g. 42"
                      inputMode="decimal"
                    />
                    {errors.weight && <p className="mt-1.5 text-[0.72rem] text-rose-400">{errors.weight}</p>}
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="v-date">Preferred date</label>
                    <input
                      id="v-date"
                      type="date"
                      className={`${FIELD} [color-scheme:dark]`}
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={LABEL} htmlFor="v-branch">Preferred branch</label>
                    <select
                      id="v-branch"
                      className={FIELD}
                      value={form.branch}
                      onChange={(e) => set("branch", e.target.value)}
                    >
                      <option value="" className="bg-ink-900">Suggest the nearest branch</option>
                      {BRANCHES.map((b) => (
                        <option key={b.id} value={`${b.name}, ${b.city}`} className="bg-ink-900">
                          {b.name} — {b.area}, {b.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={LABEL} htmlFor="v-notes">Anything we should know?</label>
                    <textarea
                      id="v-notes"
                      rows={3}
                      className={`${FIELD} resize-none`}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Inherited pieces, mixed karats, hallmark certificates…"
                    />
                  </div>
                </div>

                {/* live indicative estimate */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border border-gold-500/25 bg-gradient-to-r from-gold-500/[0.12] to-transparent px-5 py-4">
                  <span className="flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-300">
                    <BadgeCheck className="h-4 w-4" />
                    Indicative value at today&rsquo;s rate
                  </span>
                  <span className="tabular font-display text-[1.8rem] leading-none font-semibold text-paper">
                    {estimate ? `₹${inr(estimate)}` : "—"}
                  </span>
                </div>

                <label className="mt-6 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
                  />
                  <span className="text-[0.78rem] leading-relaxed text-paper/55">
                    I agree to be contacted by Attica Gold Company about this valuation. My
                    details are never shared with third-party jewellers.
                  </span>
                </label>
                {errors.consent && <p className="mt-1.5 text-[0.72rem] text-rose-400">{errors.consent}</p>}

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <GoldButton type="submit" disabled={status === "sending"} className="!px-8 !py-4">
                    {status === "sending" ? (
                      "Reserving your slot…"
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Check your gold value
                      </>
                    )}
                  </GoldButton>
                  <span className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-paper/50">
                    <Lock className="h-3.5 w-3.5" />
                    No obligation · Private
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* right rail */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-5">
            <div className="border border-gold-500/20 bg-ink-900/55 p-7">
              <span className="flex items-center gap-2.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold-400">
                <CalendarCheck className="h-4 w-4" />
                What happens next
              </span>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="group relative flex gap-4">
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-gold-500/35 text-gold-300 transition-colors duration-400 group-hover:border-gold-400 group-hover:bg-gold-400/10">
                      <s.icon className="h-4 w-4" />
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-ink-950 font-mono text-[0.58rem] font-bold text-gold-400 ring-1 ring-gold-500/30">
                        {i + 1}
                      </span>
                    </span>
                    <div>
                      <h3 className="font-display text-[1.15rem] leading-tight font-medium text-paper">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-paper/55">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-5 border border-gold-500/20 bg-gradient-to-br from-gold-500/[0.1] to-transparent p-6">
              <div>
                <p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold-400">
                  <ShieldCheck className="h-4 w-4" />
                  Talk to a human instead
                </p>
                <p className="mt-2.5 font-display text-[1.5rem] leading-tight text-paper">
                  {CONTACT.phone}
                </p>
                <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper/55">
                  {CONTACT.hours}
                </p>
              </div>
              <GoldButton href={CONTACT.whatsapp} variant="outline" className="!px-5 !py-3">
                WhatsApp
                <ArrowRight className="h-4 w-4" />
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
