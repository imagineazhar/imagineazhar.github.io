import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useHashNav } from "@/app/hooks/useHashNav";

/*
 * Five highway-like ribbons after reference/hero.png. All bands share one
 * width. Each runs dead flat off the left edge — bundled into a tight,
 * overlapping stack — then bends once and exits as a straight ray, the rays
 * fanning from a common pivot: two climb to the upper right, two dive to
 * the lower right, and the front band holds the horizontal centerline the
 * whole way. The geometry encodes this directly: every path starts with a
 * horizontal tangent (cp1 at y0) and ends with its exit-ray slope (cp2 on
 * the ray), so a band with y0 === y1 is exactly straight. Depth is strictly
 * 2D: paint order decides occlusion at the crossings, with opacity and
 * value falling off toward the back. Each band carries a grainy gradient
 * surface, dashed lane markings, and a stream of dash/segment items of
 * varying length riding its exact path — data in transit.
 */
const X0 = -40;
const X1 = 1660;
const PIVOT_X = 420; // fan origin — every exit ray aims from here through its endpoint
const CP1_X = 560; // start control at y0: holds bands flat off the left edge
const CP2_X = 880; // end control on the exit ray: bands leave straight, not curved

const BAND_WIDTH = 42; // identical for all bands

interface BandSpec {
  y0: number;
  y1: number;
  color: string;
  opacity: number; // opacity falloff toward the back
  haze: number; // % mixed toward cream on distant bands
  laneDash: string; // centerline lane-marking rhythm
  laneWidth: number;
  flowDur: number; // seconds for an item to travel end to end
  itemCount: number; // items in the flowing stream
  itemFill: string; // primary stream-item color
  itemAlt: string; // every third item
}

// Painted back → front: two far bands (one up, one down), two near bands
// (one up, one down), then the straight front band holding the centerline.
// Endpoint ys follow the reference proportions (≈44% / 56% / 83% / 94%).
const BANDS: BandSpec[] = [
  { y0: 338, y1: 202, color: "var(--band-moss)", opacity: 0.85, haze: 14, laneDash: "4 44", laneWidth: 3, flowDur: 12, itemCount: 8, itemFill: "#FFFFFF", itemAlt: "#0F172A" },
  { y0: 376, y1: 520, color: "var(--band-ochre)", opacity: 0.92, haze: 5, laneDash: "4 40", laneWidth: 3, flowDur: 10.5, itemCount: 9, itemFill: "#0F172A", itemAlt: "#FFFFFF" },
  { y0: 348, y1: 276, color: "var(--band-clay)", opacity: 0.9, haze: 6, laneDash: "5 38", laneWidth: 3, flowDur: 9.5, itemCount: 8, itemFill: "#FFFFFF", itemAlt: "#0F172A" },
  { y0: 368, y1: 450, color: "var(--band-ink)", opacity: 0.95, haze: 0, laneDash: "6 42", laneWidth: 3, flowDur: 11, itemCount: 8, itemFill: "#FFFFFF", itemAlt: "#3B82F6" },
  { y0: 356, y1: 356, color: "var(--band-plum)", opacity: 1, haze: 0, laneDash: "30 26 12 42 46 34", laneWidth: 6, flowDur: 8.5, itemCount: 10, itemFill: "#FFFFFF", itemAlt: "#93C5FD" },
];

// Varying dash lengths for the stream items — deterministic so every render
// shows the same rhythm of long bars, short ticks, and squares.
const ITEM_WIDTHS = [26, 7, 14, 7, 34, 10, 7, 20, 12, 7, 30, 9];
const ITEM_H = 7;

// Exit-ray slope: from the fan pivot (at the band's flat height) through the
// endpoint. Straight band (y0 === y1) gets slope 0 — a perfectly flat path.
const exitSlope = ({ y0, y1 }: Pick<BandSpec, "y0" | "y1">) =>
  (y1 - y0) / (X1 - PIVOT_X);
const cp2Y = (spec: Pick<BandSpec, "y0" | "y1">) =>
  spec.y1 - exitSlope(spec) * (X1 - CP2_X);

const bandPath = (spec: Pick<BandSpec, "y0" | "y1">) =>
  `M ${X0},${spec.y0} C ${CP1_X},${spec.y0} ${CP2_X},${cp2Y(spec)} ${X1},${spec.y1}`;

// Cubic Bézier evaluation — used to place static (reduced-motion) stream
// items directly on a band's centerline, rotated to its tangent.
const cubic = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};
const cubicDeriv = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return 3 * u * u * (b - a) + 6 * u * t * (c - b) + 3 * t * t * (d - c);
};
function pointOn(spec: Pick<BandSpec, "y0" | "y1">, t: number) {
  const cp1y = spec.y0;
  const cp2y = cp2Y(spec);
  const x = cubic(X0, CP1_X, CP2_X, X1, t);
  const y = cubic(spec.y0, cp1y, cp2y, spec.y1, t);
  const dx = cubicDeriv(X0, CP1_X, CP2_X, X1, t);
  const dy = cubicDeriv(spec.y0, cp1y, cp2y, spec.y1, t);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

function Band({ spec, index, animate }: { spec: BandSpec; index: number; animate: boolean }) {
  const d = bandPath(spec);
  const gradientId = `hero-band-grad-${index}`;
  // Distant bands sit hazed toward the white hero surface before the
  // along-the-band light/dark gradient is applied.
  const base = `color-mix(in srgb, ${spec.color} ${100 - spec.haze}%, #FFFFFF)`;

  return (
    <g opacity={spec.opacity}>
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={X0} y1="0" x2={X1} y2="0">
          <stop offset="0" stopColor={`color-mix(in srgb, ${base} 80%, #FFFFFF)`} />
          <stop offset="0.45" stopColor={base} />
          <stop offset="1" stopColor={`color-mix(in srgb, ${base} 74%, #0F172A)`} />
        </linearGradient>
      </defs>
      {/* Soft under-edge so crossings separate cleanly */}
      <path
        d={d}
        transform="translate(0, 5)"
        fill="none"
        stroke={`color-mix(in srgb, ${base} 70%, #0F172A)`}
        strokeWidth={BAND_WIDTH}
        strokeLinecap="round"
      />
      {/* Gradient body */}
      <path d={d} fill="none" stroke={`url(#${gradientId})`} strokeWidth={BAND_WIDTH} strokeLinecap="round" />
      {/* Dashed lane markings along the centerline */}
      <path
        d={d}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity={0.7}
        strokeWidth={spec.laneWidth}
        strokeDasharray={spec.laneDash}
        strokeDashoffset={index * 29}
      />
      {/* Stream of dash items riding this band's exact Bézier path */}
      {Array.from({ length: spec.itemCount }, (_, p) => {
        const w = ITEM_WIDTHS[(index * 4 + p * 5) % ITEM_WIDTHS.length];
        const fill = p % 3 === 2 ? spec.itemAlt : spec.itemFill;
        if (!animate) {
          // Reduced motion: static items along the band instead of flow
          const pt = pointOn(spec, (p + 0.5) / spec.itemCount);
          return (
            <rect
              key={`item-${p}`}
              x={-w / 2}
              y={-ITEM_H / 2}
              width={w}
              height={ITEM_H}
              rx={1.5}
              fill={fill}
              opacity={0.9}
              transform={`translate(${pt.x}, ${pt.y}) rotate(${pt.angle})`}
            />
          );
        }
        // Items spaced evenly through the loop (with slight irregularity)
        // form a continuous stream; each band's stream is phase-shifted so
        // they never synchronize.
        return (
          <rect key={`item-${p}`} x={-w / 2} y={-ITEM_H / 2} width={w} height={ITEM_H} rx={1.5} fill={fill} opacity={0.9}>
            <animateMotion
              dur={`${spec.flowDur}s`}
              begin={`${-((p / spec.itemCount) * spec.flowDur + (p % 3) * 0.35 + index * 1.3)}s`}
              repeatCount="indefinite"
              rotate="auto"
              path={d}
            />
          </rect>
        );
      })}
    </g>
  );
}

function HeroGraphic({ animate }: { animate: boolean }) {
  return (
    <svg
      viewBox="0 0 1600 560"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="hero-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <mask id="hero-bands-mask">
          <rect x="0" y="0" width="1600" height="560" fill="black" />
          {BANDS.map((spec, i) => (
            <path
              key={i}
              d={bandPath(spec)}
              fill="none"
              stroke="white"
              strokeWidth={BAND_WIDTH + 6}
              strokeLinecap="round"
            />
          ))}
        </mask>
      </defs>
      {BANDS.map((spec, i) => (
        <Band key={i} spec={spec} index={i} animate={animate} />
      ))}
      {/* Grain overlay confined to the band surfaces */}
      <rect
        x="0"
        y="0"
        width="1600"
        height="560"
        filter="url(#hero-grain)"
        mask="url(#hero-bands-mask)"
        opacity={0.28}
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { navigateToHash } = useHashNav();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white md:min-h-[calc(35vw+400px)]"
    >
      {/* Ribbon highway: reveals left-to-right, fanning apart across the page */}
      <motion.div
        className="hidden md:block absolute inset-x-0 bottom-0 z-0 w-full aspect-[1600/560] pointer-events-none"
        initial={prefersReducedMotion ? undefined : { clipPath: "inset(0 100% 0 0)" }}
        animate={prefersReducedMotion ? undefined : { clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 3.2, delay: 0.4, ease: "easeInOut" }}
      >
        <HeroGraphic animate={!prefersReducedMotion} />
      </motion.div>

      {/* Bottom fade: the white hero surface (and its bands) dissolve into
          the about section's gray, so the two sections read as distinct
          surfaces with a smooth handoff instead of a hard cut */}
      <div
        className="hidden md:block absolute inset-x-0 bottom-0 z-0 h-36 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-gray-50))" }}
      />

      {/* Copy block: left-aligned per the reference layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-40 md:pb-24">
        <motion.h1
          className="max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1] font-semibold text-black"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30, delay: 0.1 }}
        >
          I help leaders see what their data{" "}
          <em
            className="not-italic"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            is actually saying
          </em>
          .
        </motion.h1>

        <motion.p
          className="max-w-xl text-lg sm:text-xl text-gray-600 mb-12 leading-[1.6]"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30, delay: 0.2 }}
        >
          Dashboards and reports are easy to build. Knowing what to do next is the hard part — that&rsquo;s what I&rsquo;m here for.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30, delay: 0.3 }}
        >
          <a
            href="#portfolio"
            onClick={(e) => navigateToHash(e, "#portfolio")}
            className="group btn-luma btn-luma--primary px-8 py-4 text-base font-medium flex items-center justify-center gap-2 min-w-[200px]"
          >
            View Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://cal.com/muhammad-azhar-tbumar/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luma px-8 py-4 text-base font-medium flex items-center justify-center gap-2 min-w-[200px]"
          >
            Let&rsquo;s talk
            <MessageCircle className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
