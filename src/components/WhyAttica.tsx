import { ADVANTAGES, COUNTER_IMAGE, INDIAN_STORE_IMAGE } from "../data/attica";
import { SectionLabel } from "./Brand";

function GuaranteeSeal() {
  const text = "HIGHEST PRICE GUARANTEED · 200+ BRANCHES · INSTANT PAYMENT · ";
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 200 200" className="animate-spin [animation-duration:34s] h-full w-full">
        <defs>
          <path
            id="seal-path"
            d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
            fill="none"
          />
        </defs>
        <text
          fill="#D8B45C"
          fontSize="13.2"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="2.1"
          fontWeight="600"
        >
          <textPath href="#seal-path" startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[2.1rem] leading-none font-semibold text-gold-300">14</span>
        <span className="mt-1 font-mono text-[0.52rem] uppercase tracking-[0.24em] text-paper/50">
          Years
        </span>
      </div>
      <span
        className="absolute inset-[22%] rounded-full border border-gold-500/25"
        aria-hidden="true"
      />
    </div>
  );
}

export function WhyAttica() {
  return (
    <section id="why" className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute right-[-14rem] top-16 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(216,180,92,0.15),transparent_68%)]"
        aria-hidden="true"
      />
      <div className="bg-paper-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* advantage list */}
          <div className="lg:col-span-7">
            <SectionLabel>The Attica advantage</SectionLabel>
            <h2 className="reveal mt-6 font-display text-[clamp(2.3rem,5.4vw,4rem)] leading-[1.02] font-medium text-ink-900">
              Best value for your gold,
              <br />
              <em className="text-gold-700 italic">backed by a process</em> you can watch.
            </h2>

            <ul className="mt-12 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {ADVANTAGES.map((adv, i) => (
                <li key={adv.title} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                  <div className="group relative flex gap-5 py-6 transition-colors duration-500 hover:bg-gold-50/60 sm:gap-7 sm:py-7">
                    <span
                      className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-gradient-to-b from-gold-400 to-gold-700 transition-transform duration-500 group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                    <span className="tabular w-7 shrink-0 pt-1 font-mono text-[0.72rem] font-semibold text-gold-600/70 transition-colors group-hover:text-gold-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 pl-2 sm:pl-3">
                      <h3 className="font-display text-[1.4rem] leading-tight font-medium text-ink-900 transition-transform duration-500 group-hover:translate-x-1 sm:text-[1.6rem]">
                        {adv.title}
                      </h3>
                      <p className="mt-2.5 max-w-xl text-[0.9rem] leading-relaxed text-ink-600 transition-transform duration-500 group-hover:translate-x-1">
                        {adv.body}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 border border-gold-600/25 bg-gold-50 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold-700">
                        {adv.proof}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* sticky proof column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-5">
              <div className="reveal relative overflow-hidden border border-ink-900/10 bg-ink-900">
                <img
                  src={INDIAN_STORE_IMAGE}
                  alt="An Attica Gold branch counter lit at dusk"
                  loading="lazy"
                  decoding="async"
                  className="h-72 w-full object-cover opacity-85 transition-transform duration-[1.6s] ease-out hover:scale-105 sm:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-gold-400">
                    Open all seven days
                  </p>
                  <p className="mt-1.5 font-display text-[1.6rem] leading-tight text-paper">
                    Walk into any branch,
                    <br />
                    9 AM to 6 PM.
                  </p>
                </div>
              </div>

              <div className="reveal flex items-center justify-between gap-5 border border-gold-600/25 bg-gradient-to-br from-ink-900 to-ink-950 p-6" style={{ ["--reveal-delay" as string]: "110ms" }}>
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-400">
                    The Attica promise
                  </p>
                  <p className="mt-3 font-display text-[1.35rem] leading-snug text-paper">
                    Your gold deserves expert care — and a rate you can verify yourself.
                  </p>
                </div>
                <GuaranteeSeal />
              </div>

              <div className="reveal overflow-hidden border border-ink-900/10" style={{ ["--reveal-delay" as string]: "180ms" }}>
                <div className="group relative">
                  <img
                    src={COUNTER_IMAGE}
                    alt="Attica appraiser presenting necklaces across the counter"
                    loading="lazy"
                    decoding="async"
                    className="h-52 w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 to-transparent" />
                  <p className="absolute inset-y-0 left-0 flex max-w-[16rem] flex-col justify-center p-5 font-display text-[1.2rem] leading-snug text-paper">
                    Trained appraisers,
                    <span className="text-gold-300 italic"> not salesmen.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
