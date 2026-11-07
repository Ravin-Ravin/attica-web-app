import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  MapPin,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { CONTACT, HERO_IMAGE, ITEM_TYPES, type KaratRate } from "../data/attica";
import { inr } from "../lib/hooks";
import { GoldButton, SectionLabel } from "./Brand";

function useTween(target: number, ms = 700) {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const s = from.current;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(s + (target - s) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else from.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      from.current = target;
    };
  }, [target, ms]);

  return value;
}

interface HeroProps {
  rates: KaratRate[];
}

export function Hero({ rates }: HeroProps) {
  const [karat, setKarat] = useState("22K");
  const [weight, setWeight] = useState(25);
  const [itemType, setItemType] = useState(ITEM_TYPES[0]);
  const prevRates = useRef<Record<string, number>>({});
  const [flash, setFlash] = useState<Record<string, "up" | "down" | null>>({});

  const active = rates.find((r) => r.karat === karat) ?? rates[1];

  useEffect(() => {
    const next: Record<string, "up" | "down" | null> = {};
    rates.forEach((r) => {
      const prev = prevRates.current[r.karat];
      if (prev === undefined) next[r.karat] = null;
      else if (r.rate > prev) next[r.karat] = "up";
      else if (r.rate < prev) next[r.karat] = "down";
      else next[r.karat] = null;
      prevRates.current[r.karat] = r.rate;
    });
    setFlash(next);
  }, [rates]);

  const quote = useMemo(() => {
    const gross = weight * active.rate;
    const purityValue = weight * active.purity * rates[0].rate;
    const deduction = gross * (itemType.deduction / 100);
    const net = gross - deduction;
    return { gross, purityValue, deduction, net, perGram: net / Math.max(weight, 0.001) };
  }, [weight, active, itemType, rates]);

  const animatedNet = useTween(quote.net);
  const sliderFill = `${(weight / 500) * 100}%`;

  const proofs = [
    { icon: MapPin, text: "200+ branches across South India" },
    { icon: Zap, text: "Payment in 5–12 minutes" },
    { icon: ShieldCheck, text: "RBI-compliant KYC & insured transit" },
  ];

  return (
    <section id="rates" className="bg-bullion-vault relative overflow-hidden pt-10 pb-20 sm:pt-14 lg:pb-28">
      {/* ambient layers */}
      <div className="bg-hairline-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(216,180,92,0.20),transparent_66%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-18rem] left-[-12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(169,131,47,0.16),transparent_68%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        {/* ---------------- left: editorial ---------------- */}
        <div className="lg:col-span-7">
          <SectionLabel tone="gold">Today&rsquo;s rate desk · Bengaluru HQ - Developed By Ravin</SectionLabel>

          <h1 className="mt-6 font-display text-[clamp(2.9rem,7.4vw,5.6rem)] leading-[0.94] font-medium text-paper">
            Sell gold at
            <br />
            the rate you <em className="text-gold-sheen animate-sheen italic font-normal">see</em>.
          </h1>

          <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-paper/65">
            Fourteen years, 200+ branches and 1.5 crore customers. We test purity on a
            calibrated XRF machine in front of you, build the offer from the live IBJA rate,
            and pay instantly — with every deduction printed on the slip.
          </p>

          {/* live rate board */}
          <div className="mt-9 border-y border-gold-500/20">
            {rates.map((r, i) => {
              const dir = flash[r.karat];
              const up = r.drift >= 0;
              return (
                <div
                  key={r.karat}
                  className={`group flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-gold-400/[0.05] ${
                    i !== 0 ? "border-t border-gold-500/10" : ""
                  } ${r.karat === karat ? "bg-gold-400/[0.06]" : ""}`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-2xl font-semibold text-gold-200">
                      {r.karat}
                    </span>
                    <span className="text-[0.68rem] uppercase tracking-[0.22em] text-paper/55">
                      {r.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      key={`${r.karat}-${r.rate}`}
                      className={`tabular font-mono text-[1.35rem] font-semibold text-paper sm:text-[1.6rem] ${
                        dir === "up"
                          ? "animate-tick-up"
                          : dir === "down"
                          ? "animate-tick-down"
                          : ""
                      }`}
                    >
                      ₹{inr(r.rate)}
                    </span>
                    <span className="hidden w-14 text-right text-[0.66rem] uppercase tracking-[0.16em] text-paper/50 sm:block">
                      / gram
                    </span>
                    <span
                      className={`flex w-16 items-center justify-end gap-1 font-mono text-[0.72rem] ${
                        up ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                      {up ? "+" : ""}
                      {r.drift.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <GoldButton href="#valuation" className="!px-8 !py-4 !text-[0.82rem]">
              Book free valuation
              <ArrowRight className="h-4 w-4" />
            </GoldButton>
            <GoldButton href="#branches" variant="outline" className="!px-7 !py-4 !text-[0.82rem]">
              Find a branch near you
            </GoldButton>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            {proofs.map((p) => (
              <li key={p.text} className="flex items-center gap-2 text-[0.78rem] text-paper/55">
                <p.icon className="h-4 w-4 shrink-0 text-gold-500" />
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------- right: valuation calculator ---------------- */}
        <div className="lg:col-span-5 lg:pl-4">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-x-4 -top-4 bottom-8 rounded-sm bg-gradient-to-b from-gold-500/10 to-transparent blur-xl"
              aria-hidden="true"
            />

            <div className="relative border border-gold-500/25 bg-ink-800/85 shadow-[0_40px_90px_-40px_rgba(0,0,0,1)] backdrop-blur-md">
              {/* slip header */}
              <div className="flex items-center justify-between border-b border-dashed border-gold-500/25 px-5 py-3.5 sm:px-7">
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="h-4 w-4 text-gold-400" />
                  <span className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-gold-200">
                    Instant valuation
                  </span>
                </div>
                <span className="tabular font-mono text-[0.62rem] uppercase tracking-[0.14em] text-paper/50">
                  Est. #{String(Math.round(quote.net)).slice(-6)}
                </span>
              </div>

              <div className="space-y-6 px-5 py-6 sm:px-7">
                {/* karat selector */}
                <div>
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-paper/55">
                    Purity / karat
                  </span>
                  <div className="mt-2.5 grid grid-cols-4 gap-1.5 border border-gold-500/20 bg-ink-950/50 p-1.5">
                    {rates.map((r) => (
                      <button
                        key={r.karat}
                        type="button"
                        onClick={() => setKarat(r.karat)}
                        className={`rounded-[2px] py-2 font-mono text-[0.78rem] font-semibold transition-all duration-300 ${
                          karat === r.karat
                            ? "bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 shadow-[0_4px_14px_-4px_rgba(216,180,92,0.8)]"
                            : "text-paper/55 hover:bg-gold-400/10 hover:text-gold-200"
                        }`}
                      >
                        {r.karat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* weight */}
                <div>
                  <div className="flex items-end justify-between">
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-paper/55">
                      Gross weight
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={0.5}
                        max={5000}
                        step={0.1}
                        value={weight}
                        onChange={(e) =>
                          setWeight(Math.max(0.5, Math.min(5000, Number(e.target.value) || 0.5)))
                        }
                        aria-label="Weight in grams"
                        className="tabular w-24 border border-gold-500/25 bg-ink-950/60 px-2.5 py-1.5 text-right font-mono text-lg font-semibold text-gold-200 outline-none focus:border-gold-400"
                      />
                      <span className="font-mono text-[0.7rem] text-paper/55">g</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0.5}
                    max={500}
                    step={0.5}
                    value={Math.min(weight, 500)}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    aria-label="Weight slider in grams"
                    className="mt-3.5 w-full"
                    style={{ ["--fill" as string]: sliderFill }}
                  />

                  <div className="mt-2 flex justify-between font-mono text-[0.62rem] text-paper/45">
                    <span>0.5 g</span>
                    <span>100 g</span>
                    <span>250 g</span>
                    <span>500 g+</span>
                  </div>
                </div>

                {/* item type */}
                <div>
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-paper/55">
                    Item type
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {ITEM_TYPES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setItemType(t)}
                        className={`rounded-full border px-3.5 py-1.5 text-[0.72rem] font-semibold transition-all duration-300 ${
                          itemType.id === t.id
                            ? "border-gold-400 bg-gold-400/15 text-gold-200"
                            : "border-gold-500/20 text-paper/50 hover:border-gold-500/45 hover:text-paper/80"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[0.7rem] text-paper/55">{itemType.note}</p>
                </div>

                {/* result */}
                <div className="relative overflow-hidden border border-gold-500/30 bg-gradient-to-br from-gold-500/[0.14] via-ink-950/40 to-ink-950/60 px-5 py-5">
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(216,180,92,0.18),transparent_60%)]"
                    aria-hidden="true"
                  />
                  <span className="relative text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-300/80">
                    You would receive
                  </span>
                  <div className="relative mt-1.5 flex items-baseline gap-2">
                    <span className="tabular font-display text-[clamp(2.4rem,7vw,3.4rem)] leading-none font-semibold text-paper">
                      ₹{inr(Math.round(animatedNet))}
                    </span>
                  </div>
                  <p className="relative mt-2 font-mono text-[0.7rem] text-paper/60">
                    ≈ ₹{inr(quote.perGram)} per gram net · {weight} g of {karat}
                  </p>

                  <dl className="relative mt-5 space-y-2 border-t border-dashed border-gold-500/25 pt-4 font-mono text-[0.74rem]">
                    <div className="flex justify-between text-paper/60">
                      <dt>Gross melt value ({active.purity * 100}% fine)</dt>
                      <dd className="tabular text-paper/85">₹{inr(quote.gross)}</dd>
                    </div>
                    <div className="flex justify-between text-paper/60">
                      <dt>{itemType.label} assay deduction</dt>
                      <dd className="tabular text-rose-300/90">
                        − ₹{inr(quote.deduction)} ({itemType.deduction}%)
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-gold-500/20 pt-2 text-[0.8rem] font-semibold text-gold-200">
                      <dt>Net payable</dt>
                      <dd className="tabular">₹{inr(Math.round(quote.net))}</dd>
                    </div>
                  </dl>
                </div>

                <GoldButton href="#valuation" className="w-full !py-3.5">
                  Lock this rate at a branch
                  <ArrowRight className="h-4 w-4" />
                </GoldButton>

                <p className="flex items-start gap-2 text-[0.68rem] leading-relaxed text-paper/55">
                  <BadgeCheck className="mt-px h-3.5 w-3.5 shrink-0 text-gold-500" />
                  Indicative estimate only. Your final quote is confirmed after XRF purity
                  testing and gross weighing at the counter — no obligation, no fee.
                </p>
              </div>

              {/* slip footer */}
              <div className="flex items-center justify-between border-t border-dashed border-gold-500/25 px-5 py-3 sm:px-7">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper/50">
                  {CONTACT.hours}
                </span>
                <a
                  href={CONTACT.phoneHref}
                  className="font-mono text-[0.68rem] font-semibold text-gold-300 hover:text-gold-200"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            {/* hero photo chip */}
            <div className="animate-float-slow absolute -bottom-10 -left-6 hidden w-44 border border-gold-500/30 bg-ink-900 p-1.5 shadow-[0_30px_60px_-25px_rgba(0,0,0,1)] lg:block">
              <img
                src={HERO_IMAGE}
                alt="Assay bars and minted gold coins at an Attica counter"
                loading="lazy"
                decoding="async"
                className="h-24 w-full object-cover grayscale-[0.25] transition-all duration-700 hover:grayscale-0"
              />
              <p className="px-1 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-paper/60">
                999 assay bars · paid at tightest spread
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
