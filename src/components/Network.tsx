import { useMemo, useState } from "react";
import {
  Crosshair,
  ExternalLink,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Quote,
  Search,
  ShieldCheck,
  Star,
  Clock,
} from "lucide-react";
import { BRANCHES, CONTACT, RATING_BREAKDOWN, REVIEWS, STATES, STORE_IMAGE } from "../data/attica";
import { useInView } from "../lib/hooks";
import { SectionLabel } from "./Brand";

const CITY_COORDS: Record<string, [number, number]> = {
  Bengaluru: [12.9716, 77.5946],
  Hyderabad: [17.385, 78.4867],
  Chennai: [13.0827, 80.2707],
  Vijayawada: [16.5062, 80.648],
  Mysuru: [12.2958, 76.6394],
  Kurnool: [15.8281, 78.0373],
  Mangaluru: [12.9141, 74.856],
  Hubballi: [15.3647, 75.124],
  Coimbatore: [11.0168, 76.9558],
  Tirupati: [13.6288, 79.4192],
};

function haversineKm(a: [number, number], b: [number, number]) {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const la1 = (a[0] * Math.PI) / 180;
  const la2 = (b[0] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

/* ------------------------------------------------------------------ */
/*  Branch locator                                                     */
/* ------------------------------------------------------------------ */

export function BranchLocator() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState(STATES[0]);
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [geoMsg, setGeoMsg] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = BRANCHES.filter((b) => {
      const matchState = state === STATES[0] || b.state === state;
      if (!matchState) return false;
      if (!q) return true;
      return [b.name, b.area, b.city, b.state, b.address]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

    if (coords) {
      list = [...list].sort((a, b) => {
        const ca = CITY_COORDS[a.city];
        const cb = CITY_COORDS[b.city];
        if (!ca || !cb) return 0;
        return haversineKm(coords, ca) - haversineKm(coords, cb);
      });
    }
    return list;
  }, [query, state, coords]);

  const nearest = coords && results[0] ? haversineKm(coords, CITY_COORDS[results[0].city] ?? coords) : null;

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setGeoMsg("Location is not available in this browser.");
      return;
    }
    setLocating(true);
    setGeoMsg(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setCoords(c);
        setLocating(false);
        const nearestCity = Object.entries(CITY_COORDS)
          .map(([city, cc]) => ({ city, km: haversineKm(c, cc) }))
          .sort((a, b) => a.km - b.km)[0];
        setGeoMsg(`Nearest network hub: ${nearestCity.city} · about ${nearestCity.km} km away.`);
      },
      () => {
        setLocating(false);
        setGeoMsg("Location permission declined — search by city or area instead.");
      },
      { timeout: 9000 }
    );
  };

  const networkFacts = [
    { icon: MapPin, title: "200+ branches", note: "Across South India" },
    { icon: ShieldCheck, title: "Trusted & secure", note: "Transparent process" },
    { icon: Clock, title: "Open 7 days", note: CONTACT.hours },
    { icon: Crosshair, title: "1.5 Cr+ customers", note: "Trust Attica Gold Company" },
  ];

  return (
    <section id="branches" className="bg-bullion-vault relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="bg-hairline-grid pointer-events-none absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-overlay" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel tone="gold">Find a branch</SectionLabel>
            <h2 className="reveal mt-6 font-display text-[clamp(2.3rem,5.2vw,3.8rem)] leading-[1.02] font-medium text-paper">
              Your nearest
              <br />
              <em className="text-gold-sheen animate-sheen italic">Attica counter</em>.
            </h2>
            <p className="reveal mt-5 max-w-md text-[0.94rem] leading-relaxed text-paper/60">
              Search a city, area or branch name — or let us find the closest hub from where
              you are standing right now.
            </p>

            <div className="reveal mt-9 overflow-hidden border border-gold-500/25">
              <div className="group relative">
                <img
                  src={STORE_IMAGE}
                  alt="Interior of a luxury jewellery showroom counter"
                  loading="lazy"
                  decoding="async"
                  className="h-56 w-full object-cover opacity-70 transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
                <p className="absolute bottom-4 left-5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold-300">
                  Flagship counters · Bengaluru · Hyderabad · Chennai
                </p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-gold-500/18 bg-gold-500/18">
              {networkFacts.map((f) => (
                <div key={f.title} className="bg-ink-900/85 px-4 py-4 transition-colors hover:bg-ink-800">
                  <f.icon className="h-4 w-4 text-gold-400" />
                  <dt className="mt-2.5 text-[0.86rem] font-bold text-paper">{f.title}</dt>
                  <dd className="mt-0.5 text-[0.72rem] text-paper/60">{f.note}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* locator panel */}
          <div className="lg:col-span-7">
            <div className="border border-gold-500/22 bg-ink-800/70 p-5 backdrop-blur-sm sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/50" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city, area or branch…"
                    aria-label="Search branches"
                    className="w-full border border-gold-500/22 bg-ink-950/60 py-3 pl-10 pr-4 text-[0.88rem] text-paper placeholder:text-paper/45 outline-none transition-colors focus:border-gold-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={locate}
                  disabled={locating}
                  className="inline-flex items-center justify-center gap-2 border border-gold-500/35 px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-400/10 disabled:opacity-50"
                >
                  <LocateFixed className={`h-4 w-4 ${locating ? "animate-pulse" : ""}`} />
                  {locating ? "Locating…" : "Use my location"}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {STATES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setState(s)}
                    className={`rounded-full border px-3.5 py-1.5 text-[0.72rem] font-semibold transition-all duration-300 ${
                      state === s
                        ? "border-gold-400 bg-gold-400/15 text-gold-200"
                        : "border-gold-500/20 text-paper/60 hover:border-gold-500/45 hover:text-paper/80"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gold-500/15 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper/60">
                <span>
                  {results.length} branch{results.length === 1 ? "" : "es"}
                  {state !== STATES[0] ? ` in ${state}` : ""}
                </span>
                {geoMsg && <span className="text-gold-300 normal-case tracking-normal">{geoMsg}</span>}
              </div>

              <div className="mt-4 max-h-[34rem] space-y-3 overflow-y-auto pr-1">
                {results.map((b, i) => {
                  const distance =
                    coords && CITY_COORDS[b.city] ? haversineKm(coords, CITY_COORDS[b.city]) : null;
                  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `Attica Gold ${b.name} ${b.address}`
                  )}`;

                  return (
                    <article
                      key={b.id}
                      className="group relative border border-gold-500/18 bg-ink-950/45 p-5 transition-all duration-400 hover:border-gold-400/55 hover:bg-ink-950/70"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <span
                        className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-gradient-to-b from-gold-300 to-gold-700 transition-transform duration-500 group-hover:scale-y-100"
                        aria-hidden="true"
                      />
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-[1.2rem] leading-tight font-medium text-paper">
                              {b.name}
                            </h3>
                            {b.flagship && (
                              <span className="border border-gold-400/45 px-1.5 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-gold-300">
                                Flagship
                              </span>
                            )}
                            {i === 0 && nearest !== null && (
                              <span className="border border-emerald-400/40 px-1.5 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-emerald-300">
                                Nearest · {nearest} km
                              </span>
                            )}
                          </div>
                          <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-gold-500">
                            {b.area} · {b.city} · {b.state}
                            {distance !== null ? ` · ~${distance} km` : ""}
                          </p>
                        </div>
                        <a
                          href={mapsHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center gap-1.5 border border-gold-500/30 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-400/10"
                        >
                          <Navigation className="h-3 w-3" />
                          Directions
                        </a>
                      </div>

                      <p className="mt-3 text-[0.84rem] leading-relaxed text-paper/55">{b.address}</p>

                      <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gold-500/12 pt-3 text-[0.76rem] text-paper/50">
                        <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 transition-colors hover:text-gold-300">
                          <Phone className="h-3.5 w-3.5 text-gold-500" />
                          {b.phone}
                        </a>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gold-500" />
                          {b.hours}
                        </span>
                        <a
                          href="#valuation"
                          className="ml-auto flex items-center gap-1 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-gold-400 transition-all hover:gap-2 hover:text-gold-200"
                        >
                          Book this branch
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </article>
                  );
                })}

                {results.length === 0 && (
                  <div className="border border-dashed border-gold-500/25 px-6 py-14 text-center">
                    <MapPin className="mx-auto h-6 w-6 text-gold-500/60" />
                    <p className="mt-3 font-display text-xl text-paper">No branch matches that search</p>
                    <p className="mt-2 text-[0.84rem] text-paper/50">
                      Try a city name, or call {CONTACT.phone} — we will find the closest
                      counter for you.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setState(STATES[0]);
                        setCoords(null);
                        setGeoMsg(null);
                      }}
                      className="mt-5 border border-gold-500/35 px-4 py-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-gold-200 hover:bg-gold-400/10"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Customer stories                                                   */
/* ------------------------------------------------------------------ */

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < n ? "fill-gold-400 text-gold-400" : "text-ink-900/20"}`}
        />
      ))}
    </span>
  );
}

export function Reviews() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section id="reviews" className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-32">
      <div className="bg-paper-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* rating summary */}
          <div ref={ref} className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>Customer stories</SectionLabel>
              <h2 className="reveal mt-6 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.02] font-medium text-ink-900">
                What our
                <br />
                <em className="text-gold-700 italic">customers</em> say.
              </h2>

              <div className="reveal mt-9 border border-ink-900/12 bg-white p-6">
                <div className="flex items-end gap-4">
                  <span className="font-display text-[4rem] leading-none font-semibold text-ink-900">
                    4.9
                  </span>
                  <div className="pb-2">
                    <Stars n={5} />
                    <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-400">
                      12,480 Google reviews
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {RATING_BREAKDOWN.map((row, i) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <span className="w-3 font-mono text-[0.68rem] text-ink-400">{row.stars}</span>
                      <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
                      <span className="h-1.5 flex-1 overflow-hidden bg-ink-900/8">
                        <span
                          className="block h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-[width] duration-1000 ease-out"
                          style={{
                            width: inView ? `${row.pct}%` : "0%",
                            transitionDelay: `${i * 110}ms`,
                          }}
                        />
                      </span>
                      <span className="tabular w-9 text-right font-mono text-[0.66rem] text-ink-400">
                        {row.pct}%
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 border-t border-ink-900/10 pt-4 text-[0.82rem] leading-relaxed text-ink-600">
                  Real experiences shared by our customers on Google. Every review below is
                  linked to a completed, documented transaction.
                </p>
              </div>
            </div>
          </div>

          {/* review wall */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {REVIEWS.map((r, i) => (
                <figure
                  key={r.name}
                  className={`reveal group relative border border-ink-900/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/45 hover:shadow-[0_30px_60px_-34px_rgba(16,19,24,0.5)] ${
                    i === 0 ? "sm:col-span-2" : ""
                  }`}
                  style={{ ["--reveal-delay" as string]: `${i * 75}ms` }}
                >
                  <Quote
                    className="absolute right-5 top-5 h-8 w-8 text-gold-500/12 transition-colors duration-500 group-hover:text-gold-500/25"
                    aria-hidden="true"
                  />
                  <Stars n={r.rating} />
                  <blockquote
                    className={`mt-4 leading-relaxed text-ink-700 ${
                      i === 0 ? "font-display text-[1.3rem] text-ink-900" : "text-[0.9rem]"
                    }`}
                  >
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink-900/10 pt-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 font-display text-[0.95rem] font-semibold text-ink-950">
                        {r.name.charAt(0)}
                      </span>
                      <div>
                        <div className="text-[0.84rem] font-bold text-ink-900">{r.name}</div>
                        <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-400">
                          {r.city} · {r.when}
                        </div>
                      </div>
                    </div>
                    <span className="border border-gold-600/22 bg-gold-50 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-gold-700">
                      {r.amount}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
