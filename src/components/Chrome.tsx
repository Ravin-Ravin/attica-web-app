import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Clock,
  Menu,
  MessageCircle,
  Phone,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { CONTACT } from "../data/attica";
import { inr, useActiveSection, useScrollProgress, useScrolled } from "../lib/hooks";
import { AtticaWordmark, GoldButton } from "./Brand";

/* ------------------------------------------------------------------ */
/*  Live rate ticker — the most characteristic thing about a gold desk */
/* ------------------------------------------------------------------ */

export function RateTicker({ live }: { live: { city: string; rate22: number; rate24: number; change: number }[] }) {
  const items = [...live, ...live];

  return (
    <div className="relative z-50 border-b border-gold-500/15 bg-ink-950 text-gold-100">
      <div className="mx-auto flex max-w-[1600px] items-stretch">
        <div className="flex shrink-0 items-center gap-2 border-r border-gold-500/15 bg-gold-500/[0.07] px-3 py-2 sm:px-5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-gold-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-300" />
          </span>
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.26em] text-gold-300">
            Live rates
          </span>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.2em] text-ink-400 md:inline">
            Ravin M
          </span>
        </div>

        <div className="marquee-pause relative min-w-0 flex-1 overflow-hidden py-2">
          <div className="animate-marquee flex w-max items-center gap-8 pl-8">
            {items.map((c, i) => {
              const up = c.change >= 0;
              return (
                <span key={`${c.city}-${i}`} className="flex items-center gap-2.5 whitespace-nowrap">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-200/85">
                    {c.city}
                  </span>
                  <span className="tabular font-mono text-[0.72rem] text-paper">
                    22K ₹{inr(c.rate22)}
                  </span>
                  <span className="tabular font-mono text-[0.72rem] text-gold-300">
                    24K ₹{inr(c.rate24)}
                  </span>
                  <span
                    className={`flex items-center gap-0.5 font-mono text-[0.66rem] ${
                      up ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {up ? "+" : ""}
                    {c.change.toFixed(2)}%
                  </span>
                  <span className="h-3 w-px bg-gold-500/25" aria-hidden="true" />
                </span>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-950 to-transparent" />
        </div>

        <a
          href={CONTACT.phoneHref}
          className="hidden shrink-0 items-center gap-2 border-l border-gold-500/15 px-5 text-[0.7rem] font-semibold tracking-wide text-gold-200 transition-colors hover:bg-gold-500/10 hover:text-gold-100 lg:flex"
        >
          <Phone className="h-3.5 w-3.5" />
          {CONTACT.phone}
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky navigation                                                  */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { id: "process", label: "How it works" },
  { id: "we-buy", label: "What we buy" },
  { id: "why", label: "Why Attica" },
  { id: "branches", label: "Branches" },
  { id: "reviews", label: "Reviews" },
  { id: "guide", label: "Gold guide" },
];

const ALL_LINKS = [...NAV_LINKS, { id: "faq", label: "FAQ" }, { id: "valuation", label: "Book valuation" }];

// Stable identity — the section observer must not be rebuilt on every render.
const SECTION_IDS = ALL_LINKS.map((l) => l.id);

export function NavBar() {
  const progress = useScrollProgress();
  const scrolled = useScrolled(90);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-gold-500/15 bg-ink-900/92 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-4 transition-all duration-500 sm:px-6 lg:px-10 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          <a href="#top" aria-label="Attica Gold Company home" className="shrink-0">
            <AtticaWordmark tone="gold" compact={scrolled} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative rounded-sm px-3.5 py-2 text-[0.78rem] font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-gold-300" : "text-paper/70 hover:text-paper"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-gold-400 to-gold-600 transition-transform duration-400 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={CONTACT.phoneHref}
              className="hidden items-center gap-2 border border-gold-500/30 px-3.5 py-2 text-[0.72rem] font-semibold tracking-wide text-gold-200 transition-colors hover:border-gold-400 hover:bg-gold-400/10 md:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {CONTACT.phone}
            </a>

            <GoldButton href="#valuation" className="hidden !px-5 !py-2.5 sm:inline-flex">
              Book valuation
            </GoldButton>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center border border-gold-500/25 text-gold-200 transition-colors hover:bg-gold-400/10 xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* scroll progress */}
        <div className="h-px w-full bg-gold-500/10">
          <div
            className="h-px bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-60 xl:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`bg-bullion-vault absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-gold-500/20 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gold-500/15 px-6 py-5">
            <AtticaWordmark tone="gold" compact />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center border border-gold-500/25 text-gold-200 hover:bg-gold-400/10"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
            {ALL_LINKS.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-gold-500/10 py-4 transition-colors hover:border-gold-400/40"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                <span className="font-display text-2xl text-paper transition-colors group-hover:text-gold-300">
                  {link.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-gold-500/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-300" />
              </a>
            ))}
          </nav>

          <div className="space-y-3 border-t border-gold-500/15 px-6 py-6">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-3 text-sm text-paper/80 hover:text-gold-300"
            >
              <Phone className="h-4 w-4 text-gold-400" />
              {CONTACT.phone}
            </a>
            <p className="flex items-center gap-3 text-sm text-paper/60">
              <Clock className="h-4 w-4 text-gold-400" />
              {CONTACT.hours}
            </p>
            <GoldButton href="#valuation" onClick={() => setOpen(false)} className="w-full">
              Book free valuation
            </GoldButton>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating call / WhatsApp dock                                      */
/* ------------------------------------------------------------------ */

export function FloatingDock() {
  const show = useScrolled(700);

  return (
    <div
      className={`fixed bottom-5 right-4 z-50 flex flex-col items-end gap-2.5 transition-all duration-500 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-0 overflow-hidden rounded-full bg-jade text-paper shadow-[0_12px_30px_-10px_rgba(15,93,75,0.8)] transition-all duration-400 hover:pr-5"
      >
        <span className="flex h-12 w-12 items-center justify-center">
          <MessageCircle className="h-5 w-5" />
        </span>
        <span className="max-w-0 whitespace-nowrap text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-all duration-400 group-hover:max-w-[12rem]">
          WhatsApp us
        </span>
      </a>

      <a
        href={CONTACT.phoneHref}
        className="group flex items-center gap-0 overflow-hidden rounded-full bg-gradient-to-b from-gold-300 to-gold-600 text-ink-950 shadow-[0_12px_30px_-10px_rgba(200,162,74,0.9)] transition-all duration-400 hover:pr-5"
      >
        <span className="flex h-12 w-12 items-center justify-center">
          <Phone className="h-5 w-5" />
        </span>
        <span className="max-w-0 whitespace-nowrap text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-all duration-400 group-hover:max-w-[12rem]">
          {CONTACT.phone}
        </span>
      </a>
    </div>
  );
}
