import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { TICK_TEXTURE } from "@/app/components/blog/floorTicks";

const TICKS = {
  backgroundImage: TICK_TEXTURE,
  height: "var(--floor-tick-height)",
} as const;

/**
 * "The Floor" from design-tokens.json, as a fixed reading-progress bar.
 *
 * The source spec places its marker at (slideIndex-1)/slideCount. A website has
 * no slide index, so the marker tracks scroll progress — the closest equivalent
 * that keeps the element doubling as both signature and progress indicator.
 */
export function ProgressFloor() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // The spring only exists to stop trackpad jitter; reduced motion binds to the
  // raw value instead.
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
            {/* Track inset by one marker width so left:100% lands the marker
                flush with the right edge instead of overflowing. */}
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
