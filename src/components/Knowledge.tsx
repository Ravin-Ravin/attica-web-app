import { useState } from "react";
import { ArrowRight, ArrowUpRight, MessageCircle, Minus, Plus } from "lucide-react";
import { ARTICLES, CONTACT, FAQS } from "../data/attica";
import { SectionLabel } from "./Brand";

/* ------------------------------------------------------------------ */
/*  Gold guide                                                         */
/* ------------------------------------------------------------------ */

export function Guide() {
  const [featured, ...rest] = ARTICLES;

  return (
    <section id="guide" className="relative overflow-hidden bg-mist py-20 sm:py-24 lg:py-28">
      <div className="bg-paper-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>Gold guide</SectionLabel>
            <h2 className="reveal mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.03] font-medium text-ink-900">
              Latest <em className="text-gold-700 italic">insights</em>
            </h2>
            <p className="reveal mt-4 max-w-lg text-[0.92rem] leading-relaxed text-ink-600" style={{ ["--reveal-delay" as string]: "90ms" }}>
              Clear, practical guidance about gold rates, valuation and selling safely —
              written by our appraisal desk, not a marketing team.
            </p>
          </div>

          <a
            href={CONTACT.site}
            className="reveal group inline-flex w-fit items-center gap-2 border-b border-ink-900/25 pb-1.5 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:border-gold-600 hover:text-gold-700"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1.5" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* featured */}
          <article className="reveal group relative overflow-hidden border border-ink-900/10 bg-ink-900 lg:col-span-7">
            <img
              src={featured.image}
              alt={featured.title}
              loading="lazy"
              decoding="async"
              className="h-full min-h-[22rem] w-full object-cover opacity-55 transition-all duration-[1.5s] ease-out group-hover:scale-105 group-hover:opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.2em]">
                <span className="border border-gold-400/50 px-2 py-0.5 text-gold-300">
                  {featured.category}
                </span>
                <span className="text-paper/60">{featured.read}</span>
              </div>
              <h3 className="mt-4 max-w-xl font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight font-medium text-paper">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-xl text-[0.88rem] leading-relaxed text-paper/60">
                {featured.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-gold-300 transition-all duration-400 group-hover:gap-3.5">
                Read the analysis
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </article>

          {/* list */}
          <div className="flex flex-col gap-px overflow-hidden border border-ink-900/10 bg-ink-900/10 lg:col-span-5">
            {rest.map((a, i) => (
              <article
                key={a.title}
                className="reveal group flex-1 bg-white p-6 transition-colors duration-500 hover:bg-gold-50/70 sm:p-7"
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.18em]">
                  <span className="text-gold-700">{a.category}</span>
                  <span className="h-px w-4 bg-ink-900/20" aria-hidden="true" />
                  <span className="text-ink-400">{a.read}</span>
                </div>
                <h3 className="mt-3 font-display text-[1.25rem] leading-snug font-medium text-ink-900 transition-transform duration-500 group-hover:translate-x-1">
                  {a.title}
                </h3>
                <p className="mt-2.5 text-[0.84rem] leading-relaxed text-ink-600">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-900/60 transition-all duration-400 group-hover:gap-3 group-hover:text-gold-700">
                  Read more
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute left-[-12rem] bottom-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(216,180,92,0.14),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel>FAQs</SectionLabel>
            <h2 className="reveal mt-6 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.02] font-medium text-ink-900">
              Frequently
              <br />
              <em className="text-gold-700 italic">asked</em> questions.
            </h2>

            <div className="reveal mt-9 border border-gold-600/25 bg-gradient-to-br from-ink-900 to-ink-950 p-6">
              <MessageCircle className="h-5 w-5 text-gold-400" />
              <p className="mt-3 font-display text-[1.3rem] leading-snug text-paper">
                Still unsure about something?
              </p>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-paper/55">
                Our appraisal desk answers questions every day of the week — no obligation
                to sell, no fee for the valuation.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={CONTACT.phoneHref}
                  className="group inline-flex items-center justify-between border border-gold-500/35 px-4 py-2.5 font-mono text-[0.74rem] text-gold-200 transition-colors hover:bg-gold-400/10"
                >
                  {CONTACT.phone}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between border border-gold-500/20 px-4 py-2.5 font-mono text-[0.74rem] text-paper/70 transition-colors hover:bg-gold-400/10 hover:text-paper"
                >
                  Chat on WhatsApp
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink-900/12">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="reveal border-b border-ink-900/12" style={{ ["--reveal-delay" as string]: `${i * 55}ms` }}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors"
                    >
                      <span className="flex gap-4 sm:gap-6">
                        <span className="tabular pt-1 font-mono text-[0.68rem] font-semibold text-gold-600/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-[1.2rem] leading-snug font-medium transition-colors duration-300 sm:text-[1.45rem] ${
                            isOpen ? "text-gold-700" : "text-ink-900 group-hover:text-gold-700"
                          }`}
                        >
                          {f.q}
                        </span>
                      </span>
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-400 ${
                          isOpen
                            ? "rotate-180 border-gold-600 bg-gold-500 text-ink-950"
                            : "border-ink-900/18 text-ink-900/60 group-hover:border-gold-600 group-hover:text-gold-700"
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>

                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pl-8 pr-12 text-[0.92rem] leading-relaxed text-ink-600 sm:pl-12">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
