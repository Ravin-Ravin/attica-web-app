import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { COLLECTION, WE_BUY } from "../data/attica";
import { GoldButton, SectionLabel } from "./Brand";

/* ------------------------------------------------------------------ */
/*  What we buy — asymmetric bento                                     */
/* ------------------------------------------------------------------ */

export function WeBuy() {
  return (
    <section id="we-buy" className="bg-bullion-vault relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="bg-hairline-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionLabel tone="gold">What we buy</SectionLabel>
            <h2 className="reveal mt-6 font-display text-[clamp(2.3rem,5.4vw,4rem)] leading-[1.02] font-medium text-paper">
              Every form of gold,
              <br />
              <em className="text-gold-sheen animate-sheen italic">priced per purity</em>.
            </h2>
          </div>
          <p className="reveal max-w-sm text-[0.92rem] leading-relaxed text-paper/55" style={{ ["--reveal-delay" as string]: "120ms" }}>
            From a single broken earring to a 100 g assay bar — each category is assayed
            separately and paid at its own rate. Nothing is clubbed into a bulk lot.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(13rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {WE_BUY.map((item, i) => (
            <article
              key={item.id}
              className={`reveal group relative overflow-hidden border border-gold-500/18 bg-ink-800/60 transition-all duration-500 hover:border-gold-400/55 ${item.span}`}
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-45 transition-all duration-[1.3s] ease-out group-hover:scale-[1.07] group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/72 to-ink-950/18 transition-opacity duration-500 group-hover:from-ink-950/95" />

              {item.tag && (
                <span className="absolute right-4 top-4 border border-gold-400/45 bg-ink-950/70 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-gold-300 backdrop-blur-sm">
                  {item.tag}
                </span>
              )}

              <div className="relative flex h-full flex-col justify-end p-6 sm:p-7">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold-400/90">
                  {item.rate}
                </span>
                <h3
                  className={`mt-2 font-display font-medium text-paper ${
                    i === 0 ? "text-[clamp(1.7rem,3.4vw,2.5rem)]" : "text-[1.35rem]"
                  } leading-tight`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-2.5 leading-relaxed text-paper/60 ${
                    i === 0 ? "max-w-lg text-[0.92rem]" : "max-w-md text-[0.82rem]"
                  }`}
                >
                  {item.body}
                </p>

                <span className="mt-4 inline-flex w-fit items-center gap-1.5 border-b border-gold-500/35 pb-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-gold-300 transition-all duration-400 group-hover:border-gold-300 group-hover:gap-3">
                  Check today&rsquo;s payout
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-10 flex flex-wrap items-center justify-between gap-5 border border-gold-500/20 bg-ink-800/50 px-6 py-5">
          <p className="flex items-start gap-3 text-[0.86rem] leading-relaxed text-paper/65">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            Not sure what you have? Bring it in — appraisal and XRF testing are free, and
            there is no obligation to sell.
          </p>
          <GoldButton href="#valuation" variant="outline" className="!px-6 !py-3">
            Book a free appraisal
          </GoldButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  The Attica Collection — snap scroller                              */
/* ------------------------------------------------------------------ */

export function Collection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(420, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="collection" className="relative overflow-hidden bg-mist py-20 sm:py-24 lg:py-28">
      <div className="bg-paper-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <SectionLabel>Gold for every occasion</SectionLabel>
            <h2 className="reveal mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.03] font-medium text-ink-900">
              Explore the <em className="text-gold-700 italic">Attica Collection</em>
            </h2>
            <p className="reveal mt-4 max-w-lg text-[0.92rem] leading-relaxed text-ink-600" style={{ ["--reveal-delay" as string]: "90ms" }}>
              Jewellery, coins, gold bars and diamonds selected for celebrations, meaningful
              gifts and lasting value — exchanged against your old gold at live rates.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll collection left"
              className="inline-flex h-11 w-11 items-center justify-center border border-ink-900/15 bg-white text-ink-900 transition-all duration-300 hover:border-gold-600 hover:text-gold-700 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll collection right"
              className="inline-flex h-11 w-11 items-center justify-center border border-ink-900/15 bg-white text-ink-900 transition-all duration-300 hover:border-gold-600 hover:text-gold-700 active:scale-95"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-10"
        >
          {COLLECTION.map((item, i) => (
            <article
              key={item.name}
              className="reveal group w-[17rem] shrink-0 snap-start sm:w-[20rem]"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <div className="relative aspect-4/5 overflow-hidden bg-ink-900">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

                <span className="absolute left-3 top-3 border border-gold-400/45 bg-ink-950/70 px-2 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-gold-300 backdrop-blur-sm">
                  {item.category}
                </span>

                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-b from-gold-300 to-gold-500 px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink-950">
                    View piece
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

              <div className="mt-3.5 flex items-start justify-between gap-3 border-t border-ink-900/10 pt-3">
                <div>
                  <h3 className="font-display text-[1.1rem] leading-tight font-medium text-ink-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink-400">
                    {item.note}
                  </p>
                </div>
                <span className="tabular shrink-0 font-mono text-[0.78rem] font-semibold text-gold-700">
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* scroll progress hairline */}
        <div className="mx-4 mt-4 h-px bg-ink-900/10 sm:mx-6 lg:mx-10">
          <div
            className="h-px bg-gradient-to-r from-gold-600 to-gold-400 transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
