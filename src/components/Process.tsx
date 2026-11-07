import { PROCESS_STEPS, SCALES_IMAGE } from "../data/attica";
import { GoldButton, SectionLabel } from "./Brand";

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-32">
      <div className="bg-paper-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(216,180,92,0.16),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* sticky editorial column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel>The Attica process</SectionLabel>

            <h2 className="reveal mt-6 font-display text-[clamp(2.3rem,5.2vw,3.9rem)] leading-[1.02] font-medium text-ink-900">
              Four steps,
              <br />
              <em className="text-gold-700 italic">nothing hidden</em> in
              <br />
              any of them.
            </h2>

            <p className="reveal mt-6 max-w-md text-[0.98rem] leading-relaxed text-ink-600" style={{ ["--reveal-delay" as string]: "90ms" }}>
              Most customers are paid and out of the branch in under twenty minutes from
              walking in. Here is exactly what happens between the door and the payout.
            </p>

            <div className="reveal mt-9 overflow-hidden border border-ink-900/10" style={{ ["--reveal-delay" as string]: "160ms" }}>
              <div className="group relative">
                <img
                  src={SCALES_IMAGE}
                  alt="Precision balance used to weigh gold in front of the customer"
                  loading="lazy"
                  decoding="async"
                  className="h-64 w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105 sm:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold-300">
                    Stamped 0.001 g balance
                  </p>
                  <p className="mt-1 font-display text-xl text-paper">
                    Weighed in your presence, always
                  </p>
                </div>
              </div>
            </div>

            <GoldButton href="#valuation" className="reveal mt-8" >
              Reserve a counter slot
            </GoldButton>
          </div>
        </div>

        {/* timeline */}
        <div className="lg:col-span-7">
          <ol className="relative">
            <span
              className="absolute left-[1.45rem] top-3 bottom-3 w-px bg-gradient-to-b from-gold-500/60 via-gold-500/25 to-transparent sm:left-[1.7rem]"
              aria-hidden="true"
            />

            {PROCESS_STEPS.map((step, i) => (
              <li key={step.step} className="reveal relative pl-14 pb-10 sm:pl-20 sm:pb-12" style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}>
                <span
                  className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/45 bg-paper font-mono text-[0.78rem] font-bold text-gold-700 transition-all duration-500 sm:h-14 sm:w-14 sm:text-[0.86rem]"
                  aria-hidden="true"
                >
                  {step.step}
                </span>

                <div className="group relative border border-ink-900/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/45 hover:shadow-[0_28px_60px_-32px_rgba(16,19,24,0.45)] sm:p-8">
                  <span
                    className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-gradient-to-b from-gold-400 to-gold-700 transition-transform duration-500 group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-[1.5rem] leading-tight font-medium text-ink-900 sm:text-[1.75rem]">
                      {step.title}
                    </h3>
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-gold-700">
                      {step.meta}
                    </span>
                  </div>
                  <p className="mt-3.5 text-[0.92rem] leading-relaxed text-ink-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
