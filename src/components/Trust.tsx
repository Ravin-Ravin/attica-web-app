import { TRUST_STATS } from "../data/attica";
import { useCountUp } from "../lib/hooks";

function StatCell({
  value,
  suffix,
  decimals = 0,
  label,
  note,
  large = false,
}: {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  note: string;
  large?: boolean;
}) {
  const { ref, value: shown } = useCountUp(value, decimals);

  return (
    <div
      ref={ref}
      className={`group relative flex-1 px-5 py-8 transition-colors duration-500 hover:bg-gold-400/[0.06] sm:px-8 sm:py-10 ${
        large ? "lg:flex-[1.3]" : ""
      }`}
    >
      <span
        className="absolute left-0 top-6 h-0 w-px bg-gradient-to-b from-gold-400 to-transparent transition-all duration-700 group-hover:h-[calc(100%-3rem)]"
        aria-hidden="true"
      />
      <div
        className={`tabular font-display font-semibold text-paper ${
          large ? "text-[clamp(2.6rem,6vw,4.2rem)]" : "text-[clamp(2.2rem,5vw,3.4rem)]"
        } leading-none`}
      >
        {shown}
        <span className="text-gold-sheen animate-sheen">{suffix}</span>
      </div>
      <div className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-gold-300">
        {label}
      </div>
      <p className="mt-1.5 max-w-[15rem] text-[0.78rem] leading-relaxed text-paper/60">{note}</p>
    </div>
  );
}

export function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-y border-gold-500/20 bg-ink-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_140%_at_50%_0%,rgba(169,131,47,0.16),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-overlay" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col divide-y divide-gold-500/12 border-gold-500/12 lg:flex-row lg:divide-x lg:divide-y-0">
          <div className="flex shrink-0 items-center gap-3 px-5 py-8 sm:px-8 lg:w-[19rem] lg:py-10">
            <span className="h-8 w-px bg-gradient-to-b from-gold-400 to-transparent" aria-hidden="true" />
            <div>
              <div className="text-[0.66rem] font-bold uppercase tracking-[0.28em] text-gold-400">
                Trusted across India
              </div>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-paper/50">
                Numbers audited quarterly across every branch.
              </p>
            </div>
          </div>

          {TRUST_STATS.map((s, i) => (
            <StatCell key={s.label} {...s} large={i === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
