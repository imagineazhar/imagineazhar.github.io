import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

/*
 * Four highway-like ribbons drawn as wide stroked cubic Béziers, after the
 * reference hero. Every band shares the same control-point offset (CURVE)
 * at the same control x-positions, so all curves are congruent in bend —
 * they diverge only through their anchor y-positions: bundled into a dense
 * stack at the left edge, fanning apart to the right (moss climbs to the
 * top-right, ochre dives to the bottom-right, clay and plum hold the middle
 * and cross over each other). Depth is strictly 2D: paint order decides
 * occlusion at the crossings, with opacity and value falling off toward the
 * back. Each band carries a grainy gradient surface and dashed lane
 * markings on its centerline; some bands add hexagon gate markers and
 * directional chevrons. Small square bits ride each band's exact path to
 * convey flow.
 */
const X0 = -40;
const X1 = 1660;
const CP1_X = 520;
const CP2_X = 1080;
const CURVE = 90; // identical for all bands — congruent curvature

interface BandSpec {
  y0: number;
  y1: number;
  color: string;
  width: number; // wide, flat bands — not thin strokes
  opacity: number; // opacity falloff toward the back
  haze: number; // % mixed toward cream on distant bands
  laneDash: string; // centerline lane-marking rhythm
  laneWidth: number;
  gates?: number[]; // t positions of hexagon gate markers
  chevrons?: number[]; // t positions of directional arrows
  flowDur: number; // seconds for a bit to travel end to end
  bitSize: number;
  bitCount: number;
}

// Painted back → front. clay descends slightly while plum rises, so the two
// middle bands cross mid-canvas and plum (front) occludes clay there.
const BANDS: BandSpec[] = [
  { y0: 402, y1: 118, color: "var(--band-moss)", width: 46, opacity: 0.78, haze: 18, laneDash: "4 44", laneWidth: 3, chevrons: [0.42, 0.8], flowDur: 12, bitSize: 5, bitCount: 3 },
  { y0: 416, y1: 468, color: "var(--band-clay)", width: 44, opacity: 0.86, haze: 10, laneDash: "5 38", laneWidth: 3, chevrons: [0.62], flowDur: 10.5, bitSize: 6, bitCount: 3 },
  { y0: 460, y1: 604, color: "var(--band-ochre)", width: 48, opacity: 0.92, haze: 5, laneDash: "4 40", laneWidth: 3, chevrons: [0.85], flowDur: 9.5, bitSize: 5.5, bitCount: 3 },
  { y0: 444, y1: 372, color: "var(--band-plum)", width: 64, opacity: 1, haze: 0, laneDash: "30 26 12 42 46 34", laneWidth: 7, gates: [0.16, 0.5, 0.82], flowDur: 8.5, bitSize: 7, bitCount: 4 },
];

const bandPath = ({ y0, y1 }: Pick<BandSpec, "y0" | "y1">) =>
  `M ${X0},${y0} C ${CP1_X},${y0 + CURVE} ${CP2_X},${y1 - CURVE} ${X1},${y1}`;

// Cubic Bézier evaluation — used to place gates, chevrons, and static bits
// directly on a band's centerline, rotated to its tangent.
const cubic = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};
const cubicDeriv = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return 3 * u * u * (b - a) + 6 * u * t * (c - b) + 3 * t * t * (d - c);
};
function pointOn(spec: Pick<BandSpec, "y0" | "y1">, t: number) {
  const cp1y = spec.y0 + CURVE;
  const cp2y = spec.y1 - CURVE;
  const x = cubic(X0, CP1_X, CP2_X, X1, t);
  const y = cubic(spec.y0, cp1y, cp2y, spec.y1, t);
  const dx = cubicDeriv(X0, CP1_X, CP2_X, X1, t);
  const dy = cubicDeriv(spec.y0, cp1y, cp2y, spec.y1, t);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

// Elongated hexagon straddling a band: wider than it is tall, taller than
// the band so its points reach past both edges.
const hexPoints = (w: number, h: number) =>
  `${-w / 2},0 ${-w / 2 + 16},${-h / 2} ${w / 2 - 16},${-h / 2} ${w / 2},0 ${w / 2 - 16},${h / 2} ${-w / 2 + 16},${h / 2}`;

const INK = "#221B13";

function Band({ spec, index, animate }: { spec: BandSpec; index: number; animate: boolean }) {
  const d = bandPath(spec);
  const gradientId = `hero-band-grad-${index}`;
  // Distant bands sit hazed toward the cream background before the
  // along-the-band light/dark gradient is applied.
  const base = `color-mix(in srgb, ${spec.color} ${100 - spec.haze}%, #F4EFE3)`;

  return (
    <g opacity={spec.opacity}>
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={X0} y1="0" x2={X1} y2="0">
          <stop offset="0" stopColor={`color-mix(in srgb, ${base} 80%, #FDFAF2)`} />
          <stop offset="0.45" stopColor={base} />
          <stop offset="1" stopColor={`color-mix(in srgb, ${base} 74%, #2A2015)`} />
        </linearGradient>
      </defs>
      {/* Soft under-edge so crossings separate cleanly */}
      <path
        d={d}
        transform="translate(0, 5)"
        fill="none"
        stroke={`color-mix(in srgb, ${base} 70%, #2A2015)`}
        strokeWidth={spec.width}
        strokeLinecap="round"
      />
      {/* Gradient body */}
      <path d={d} fill="none" stroke={`url(#${gradientId})`} strokeWidth={spec.width} strokeLinecap="round" />
      {/* Dashed lane markings along the centerline */}
      <path
        d={d}
        fill="none"
        stroke="var(--background)"
        strokeOpacity={0.7}
        strokeWidth={spec.laneWidth}
        strokeDasharray={spec.laneDash}
        strokeDashoffset={index * 29}
      />
      {/* Hexagon gate markers straddling the band */}
      {spec.gates?.map((t, g) => {
        const p = pointOn(spec, t);
        return (
          <g key={`gate-${g}`} transform={`translate(${p.x}, ${p.y}) rotate(${p.angle})`}>
            <polygon
              points={hexPoints(96, spec.width + 18)}
              fill="var(--background)"
              fillOpacity={0.22}
              stroke="var(--background)"
              strokeOpacity={0.95}
              strokeWidth={2}
            />
          </g>
        );
      })}
      {/* Directional chevrons pointing in the flow direction */}
      {spec.chevrons?.map((t, c) => {
        const p = pointOn(spec, t);
        return (
          <g key={`chev-${c}`} transform={`translate(${p.x}, ${p.y}) rotate(${p.angle})`} fill={INK} fillOpacity={0.85}>
            <polygon points="-18,-6 -6,0 -18,6" />
            <polygon points="-2,-6 10,0 -2,6" />
          </g>
        );
      })}
      {/* Square bits riding this band's exact Bézier path */}
      {Array.from({ length: spec.bitCount }, (_, p) => {
        const s = spec.bitSize * (1 + (p % 2) * 0.3); // slight size variation
        if (!animate) {
          // Reduced motion: static bits along the band instead of flow
          const pt = pointOn(spec, (p + 1) / (spec.bitCount + 1));
          return (
            <rect
              key={`bit-${p}`}
              x={-s / 2}
              y={-s / 2}
              width={s}
              height={s}
              fill={INK}
              opacity={0.8}
              transform={`translate(${pt.x}, ${pt.y}) rotate(${pt.angle})`}
            />
          );
        }
        return (
          <rect key={`bit-${p}`} x={-s / 2} y={-s / 2} width={s} height={s} fill={INK} opacity={0.8}>
            <animateMotion
              dur={`${spec.flowDur}s`}
              begin={`${-((p + 0.37 * index + 0.13 * p) * spec.flowDur) / spec.bitCount}s`}
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
      viewBox="0 0 1600 640"
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
          <rect x="0" y="0" width="1600" height="640" fill="black" />
          {BANDS.map((spec, i) => (
            <path
              key={i}
              d={bandPath(spec)}
              fill="none"
              stroke="white"
              strokeWidth={spec.width + 6}
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
        height="640"
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

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[var(--background)] md:min-h-[calc(40vw+420px)]"
    >
      {/* Ribbon highway: reveals left-to-right, fanning apart across the page */}
      <motion.div
        className="hidden md:block absolute inset-x-0 bottom-0 z-0 w-full aspect-[1600/640] pointer-events-none"
        initial={prefersReducedMotion ? undefined : { clipPath: "inset(0 100% 0 0)" }}
        animate={prefersReducedMotion ? undefined : { clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 3.2, delay: 0.4, ease: "easeInOut" }}
      >
        <HeroGraphic animate={!prefersReducedMotion} />
      </motion.div>

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
            style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}
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
