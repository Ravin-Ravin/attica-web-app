interface MarkProps {
  size?: number;
  className?: string;
  tone?: "gold" | "ink";
}

/**
 * Attica coin emblem — 24 reeded marks around the rim (one per karat)
 * with a struck "A" monogram in the field.
 */
export function AtticaMark({ size = 40, className = "", tone = "gold" }: MarkProps) {
  const gold = tone === "gold";
  const rim = gold ? "#D8B45C" : "#101318";
  const field = gold ? "#101318" : "#FBFAF7";
  const face = gold ? "#E3C57C" : "#7F6222";

  const ticks = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 360) / 24;
    return (
      <rect
        key={i}
        x="31.4"
        y="2.2"
        width="1.2"
        height="4.6"
        rx="0.6"
        fill={rim}
        opacity={i % 2 === 0 ? 0.95 : 0.45}
        transform={`rotate(${angle} 32 32)`}
      />
    );
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Attica Gold Company emblem"
    >
      <circle cx="32" cy="32" r="31" fill="none" stroke={rim} strokeWidth="1.1" opacity="0.55" />
      {ticks}
      <circle cx="32" cy="32" r="24.5" fill={field} stroke={rim} strokeWidth="1.6" />
      <circle cx="32" cy="32" r="21" fill="none" stroke={rim} strokeWidth="0.7" opacity="0.4" />
      <path
        d="M32 18.4 41.9 45.6h-5.5l-1.9-5.6h-5L27.6 45.6h-5.5L32 18.4Zm0 10.1-2.4 7.2h4.8L32 28.5Z"
        fill={face}
      />
      <path d="M20.6 47.4h22.8" stroke={rim} strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

interface WordmarkProps {
  tone?: "gold" | "ink";
  className?: string;
  compact?: boolean;
}

export function AtticaWordmark({ tone = "gold", className = "", compact = false }: WordmarkProps) {
  const gold = tone === "gold";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <AtticaMark size={compact ? 34 : 42} tone={tone} className="shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.35rem] font-semibold tracking-[0.2em] ${
            gold ? "text-gold-200" : "text-ink-900"
          }`}
        >
          ATTICA
        </span>
        <span
          className={`mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.42em] ${
            gold ? "text-gold-500" : "text-gold-600"
          }`}
        >
          Gold Company
        </span>
      </span>
    </span>
  );
}

export function SectionLabel({
  children,
  tone = "ink",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "ink" | "gold";
  className?: string;
}) {
  const gold = tone === "gold";
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.32em] ${
        gold ? "text-gold-400" : "text-gold-700"
      } ${className}`}
    >
      <span
        className={`h-px w-8 ${gold ? "bg-gold-500/60" : "bg-gold-600/45"}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function GoldButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "btn-sheen inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0.16em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-55";

  const styles =
    variant === "solid"
      ? "bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 text-ink-950 shadow-[0_10px_30px_-12px_rgba(200,162,74,0.85)] hover:shadow-[0_16px_40px_-12px_rgba(200,162,74,0.95)] hover:-translate-y-0.5"
      : variant === "outline"
      ? "border border-gold-500/45 text-gold-200 hover:border-gold-400 hover:bg-gold-400/10 hover:-translate-y-0.5"
      : "border border-ink-900/15 bg-transparent text-ink-900 hover:border-ink-900/40 hover:bg-ink-900/[0.04]";

  const merged = `${base} ${styles} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={merged}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={merged}>
      {children}
    </button>
  );
}
