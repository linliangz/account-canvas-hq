import type { CSSProperties } from "react";

/**
 * Visioner CRM — Logo system
 *
 * Variants:
 *  - <VisionerMark />          → the icon tile only
 *  - <VisionerLogo />          → mark + "Visioner CRM" wordmark
 *  - <VisionerLogo tagline />  → mark + wordmark + "Account Planning Canvas"
 *
 * Colors are read from the design tokens defined in src/styles.css
 * (--primary, --primary-foreground, --insight, --foreground, --muted-foreground)
 * so the logo automatically inherits any brand/theme adjustments.
 */

type MarkProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export function VisionerMark({
  size = 40,
  className = "",
  style,
  title = "Visioner",
}: MarkProps) {
  const r = size * 0.22;
  const inner = size * 0.78;
  const off = size * 0.11;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={style}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect
        width={size}
        height={size}
        rx={r}
        ry={r}
        fill="var(--primary)"
      />
      <g transform={`translate(${off} ${off}) scale(${inner / 32})`}>
        {/* Distant vision dot — the target the funnel is chasing */}
        <circle cx="16" cy="7.2" r="1.8" fill="var(--insight)" />
        {/* Open V — sales funnel with a wide bottom opening */}
        <path
          d="M4.2 10.5 L14 26.5"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeWidth="3.1"
          strokeLinecap="round"
        />
        <path
          d="M27.8 10.5 L18 26.5"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeWidth="3.1"
          strokeLinecap="round"
        />
        {/* Inner gutter — the "open book" spine hint */}
        <path
          d="M11.2 13.6 L15.4 22"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M20.8 13.6 L16.6 22"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

type LogoProps = {
  size?: number;
  tagline?: boolean;
  className?: string;
};

export function VisionerLogo({
  size = 40,
  tagline = false,
  className = "",
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <VisionerMark size={size} />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-bold tracking-tight text-foreground"
            style={{ fontSize: size * 0.5 }}
          >
            Visioner
          </span>
          <span
            className="font-semibold uppercase text-muted-foreground"
            style={{
              fontSize: size * 0.28,
              letterSpacing: "0.18em",
            }}
          >
            CRM
          </span>
        </div>
        {tagline && (
          <span
            className="mt-1 font-medium text-muted-foreground"
            style={{ fontSize: size * 0.24, letterSpacing: "0.01em" }}
          >
            Account Planning Canvas
          </span>
        )}
      </div>
    </div>
  );
}

export default VisionerLogo;
