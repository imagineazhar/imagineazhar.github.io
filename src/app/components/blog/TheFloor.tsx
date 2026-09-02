import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { TICK_TEXTURE } from "@/app/components/blog/floorTicks";

/*
 * "The Floor" — the signature element from design-tokens.json.
 *
 * The source spec describes a per-slide device: a baseline rule with regular
 * vertical ticks, a marker sitting at (slideIndex-1)/slideCount along it, and
 * a mono row above carrying the brand on the left and the page count on the
 * right. A website has no slide index, so the marker tracks the closest true
 * equivalent — reading progress down the page. That keeps the element's dual
 * job intact: it literalises the name and doubles as a progress indicator.
 *
 * The tick texture itself lives in floorTicks.ts. It is used here alone now —
 * the masthead's bottom edge is a plain hairline, so the device appears once
 * instead of three times.
 */

const TICKS = {
  backgroundImage: TICK_TEXTURE,
  height: "var(--floor-tick-height)",
} as const;

/** Fixed reading-progress floor pinned to the bottom of the viewport. */
export function ProgressFloor() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // A light spring keeps the marker from jittering on trackpad scroll; with
  // reduced motion we bind straight to the raw value instead.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });
  const left = useTransform(
    prefersReducedMotion ? scrollYProgress : smoothed,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div style={{ backgroundColor: "var(--canvas)" }}>
        <div className="tif-shell">
          <div className="relative" style={TICKS}>
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: "var(--rule-hairline)",
                backgroundColor: "var(--hairline-color)",
              }}
            />
            {/* Track is inset by one marker width so left:100% lands the
                marker flush with the right edge instead of overflowing. */}
            <div
              className="absolute bottom-0"
              style={{ left: 0, right: "var(--floor-marker-width)" }}
            >
              <motion.span
                className="absolute bottom-0 block"
                style={{
                  left,
                  width: "var(--floor-marker-width)",
                  height: "var(--rule-marker)",
                  backgroundColor: "var(--floor-marker-color)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* SignatureFloor — the static form of this device, a mono colophon row over a
   ticked rule with the marker parked at the end, used to close the page from the
   footer — was removed along with the masthead's tick band: two decorative
   restatements of the progress bar, competing with it rather than adding to it.
   The footer keeps its colophon text over a plain hairline. */
