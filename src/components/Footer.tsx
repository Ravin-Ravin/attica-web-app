import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

/* Brand glyphs drawn locally — lucide ships no logo marks. */
const SOCIALS = [
  {
    name: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 2.3a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2Zm6.6-2.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  },
  {
    name: "Facebook",
    path: "M13.5 21.9v-8.4h2.8l.4-3.3h-3.2V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8v8.4h3.4Z",
  },
  {
    name: "YouTube",
    path: "M21.6 7.2c-.2-1-.9-1.7-1.8-1.9C18.1 4.9 12 4.9 12 4.9s-6.1 0-7.8.4c-1 .2-1.7.9-1.8 1.9C2 8.9 2 12 2 12s0 3.1.4 4.8c.2 1 .9 1.7 1.8 1.9 1.7.4 7.8.4 7.8.4s6.1 0 7.8-.4c1-.2 1.7-.9 1.8-1.9.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z",
  },
  {
    name: "LinkedIn",
    path: "M6.9 21H3.6V9.7h3.3V21ZM5.2 8.2a1.9 1.9 0 1 1 0-3.9 1.9 1.9 0 0 1 0 3.9ZM21 21h-3.3v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-3.3V9.7h3.2v1.5c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V21Z",
  },
];
import { CITIES_SERVED, CONTACT } from "../data/attica";
import { AtticaWordmark } from "./Brand";

const LINK_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Attica", href: "#why" },
      { label: "How it works", href: "#process" },
      { label: "Customer stories", href: "#reviews" },
      { label: "Gold guide", href: "#guide" },
      { label: "FAQs", href: "#faq" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Sell old gold jewellery", href: "#we-buy" },
      { label: "Gold coins & bars", href: "#we-buy" },
      { label: "Diamond grading", href: "#we-buy" },
      { label: "Silver articles", href: "#we-buy" },
      { label: "Free valuation", href: "#valuation" },
    ],
  },
  {
    title: "Network",
    links: [
      { label: "Find a branch", href: "#branches" },
      { label: "Live gold rates", href: "#rates" },
      { label: "The Attica Collection", href: "#collection" },
      { label: "Highest price promise", href: "#why" },
      { label: "Book a counter slot", href: "#valuation" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [err, setErr] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setErr("Enter a valid email address.");
      return;
    }
    setErr("");
    setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden border-t border-gold-500/18 bg-ink-950 text-paper">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(169,131,47,0.14),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* brand */}
          <div className="lg:col-span-4">
            <AtticaWordmark tone="gold" />
            <p className="mt-6 max-w-sm text-[0.88rem] leading-relaxed text-paper/55">
              Get the best price when you sell gold with Attica Gold Company — India&rsquo;s
              trusted gold buyer with 200+ branches. Instant cash, accurate valuation,
              transparent pricing and secure transactions.
            </p>

            <ul className="mt-7 space-y-3 text-[0.84rem]">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="group flex items-center gap-3 text-paper/70 transition-colors hover:text-gold-300"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-500 transition-transform group-hover:-rotate-12" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-3 text-paper/70 transition-colors hover:text-gold-300"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-paper/55">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                Corporate office — MG Road, Bengaluru 560001
              </li>
              <li className="flex items-start gap-3 text-paper/55">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {CONTACT.hours}
              </li>
            </ul>

            <div className="mt-7 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={`https://${CONTACT.site}/`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Attica Gold Company on ${s.name}`}
                  className="inline-flex h-10 w-10 items-center justify-center border border-gold-500/22 text-paper/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-300"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {LINK_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.24em] text-gold-400">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[0.84rem] text-paper/55 transition-colors hover:text-gold-200"
                      >
                        <span className="h-px w-0 bg-gold-400 transition-all duration-400 group-hover:w-3" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* cities + rate alerts */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.24em] text-gold-400">
              Daily rate alerts
            </h3>
            <p className="mt-4 text-[0.84rem] leading-relaxed text-paper/55">
              Today&rsquo;s 22K and 24K rate for your city, every morning at 9:40 IST. No
              marketing, no spam.
            </p>

            {subscribed ? (
              <p className="mt-5 flex items-start gap-2.5 border border-emerald-400/35 bg-emerald-500/10 px-4 py-3 text-[0.82rem] text-emerald-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                You&rsquo;re on the list — first alert arrives tomorrow morning.
              </p>
            ) : (
              <form onSubmit={subscribe} noValidate className="mt-5">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErr("");
                    }}
                    placeholder="you@email.com"
                    aria-label="Email for daily rate alerts"
                    className="min-w-0 flex-1 border border-gold-500/22 bg-ink-900/70 px-3.5 py-3 text-[0.84rem] text-paper placeholder:text-paper/40 outline-none transition-colors focus:border-gold-400"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to rate alerts"
                    className="btn-sheen flex shrink-0 items-center justify-center bg-gradient-to-b from-gold-300 to-gold-600 px-4 text-ink-950 transition-transform hover:-translate-y-0.5"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {err && <p className="mt-2 text-[0.72rem] text-rose-400">{err}</p>}
              </form>
            )}

            <h3 className="mt-9 font-mono text-[0.6rem] font-bold uppercase tracking-[0.24em] text-gold-400">
              Cities we serve
            </h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {CITIES_SERVED.map((c) => (
                <a
                  key={c}
                  href="#branches"
                  className="border border-gold-500/15 px-2.5 py-1 text-[0.7rem] text-paper/60 transition-colors hover:border-gold-400/50 hover:text-gold-200"
                >
                  {c}
                </a>
              ))}
              <span className="border border-gold-500/25 bg-gold-500/10 px-2.5 py-1 font-mono text-[0.7rem] text-gold-300">
                +180 more
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-gold-500/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/50">
            © {new Date().getFullYear()} Attica Gold Company. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/50">
            <span>Made with care for our customers</span>
            <a href="#rates" className="transition-colors hover:text-gold-300">Live rates</a>
            <a href="#faq" className="transition-colors hover:text-gold-300">Privacy</a>
            <a href="#branches" className="transition-colors hover:text-gold-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
