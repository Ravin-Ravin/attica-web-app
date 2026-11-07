import { useEffect, useRef, useState } from "react";
import { FloatingDock, NavBar, RateTicker } from "./components/Chrome";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Guide, Faq } from "./components/Knowledge";
import { BranchLocator, Reviews } from "./components/Network";
import { Collection, WeBuy } from "./components/Offerings";
import { Process } from "./components/Process";
import { TrustStrip } from "./components/Trust";
import { Valuation } from "./components/Valuation";
import { WhyAttica } from "./components/WhyAttica";
import { BASE_RATES, CITY_TICKER, type KaratRate } from "./data/attica";
import { useRevealObserver } from "./lib/hooks";

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export default function App() {
  const [rates, setRates] = useState<KaratRate[]>(BASE_RATES);
  const [cities, setCities] = useState(CITY_TICKER);

  const karatBase = useRef(BASE_RATES.map((r) => r.rate));
  const cityBase = useRef(CITY_TICKER.map((c) => [c.rate22, c.rate24] as const));

  // The rate desk never sits still — nudge every few seconds inside a tight band.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      setRates((prev) =>
        prev.map((r, i) => {
          const base = karatBase.current[i];
          const next = clamp(
            r.rate + Math.round((Math.random() - 0.47) * 7),
            Math.round(base * 0.993),
            Math.round(base * 1.007)
          );
          return {
            ...r,
            rate: next,
            drift: Number((((next - base) / base) * 100).toFixed(2)),
          };
        })
      );

      setCities((prev) =>
        prev.map((c, i) => {
          const [b22, b24] = cityBase.current[i];
          const jitter = Math.random() - 0.47;
          return {
            ...c,
            rate22: clamp(c.rate22 + Math.round(jitter * 5), Math.round(b22 * 0.994), Math.round(b22 * 1.006)),
            rate24: clamp(c.rate24 + Math.round(jitter * 6), Math.round(b24 * 0.994), Math.round(b24 * 1.006)),
            change: Number((jitter * 0.9).toFixed(2)),
          };
        })
      );
    }, 4200);

    return () => window.clearInterval(id);
  }, []);

  useRevealObserver([]);

  return (
    <div id="top" className="relative min-h-screen bg-paper">
      <a
        href="#rates"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-70 focus:border focus:border-gold-400 focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-sm focus:text-gold-200"
      >
        Skip to today&rsquo;s gold rates
      </a>

      <RateTicker live={cities} />
      <NavBar />

      <main>
        <Hero rates={rates} />
        <TrustStrip />
        <Process />
        <WeBuy />
        <Collection />
        <WhyAttica />
        <BranchLocator />
        <Reviews />
        <Guide />
        <Faq />
        <Valuation />
      </main>

      <Footer />
      <FloatingDock />
    </div>
  );
}
