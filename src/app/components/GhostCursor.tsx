import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/*
 * The site's ghost mascot (same lucide "Ghost" as the navbar wordmark and
 * favicon) as a cursor companion: it lazily trails the pointer on a spring,
 * bobs gently, and blinks every few seconds. White-filled with an ink
 * stroke so it reads on both light and dark sections. Desktop-only (fine
 * pointers), skipped entirely under prefers-reduced-motion, and
 * pointer-events-none so it never intercepts a click.
 */
export function GhostCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Loose spring = the ghost drifts after the cursor instead of sticking to it
  const springX = useSpring(x, { stiffness: 110, damping: 15, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 110, damping: 15, mass: 0.7 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: PointerEvent) => {
      // Trail below-right of the cursor so it never covers what's being read
      x.set(e.clientX + 16);
      y.set(e.clientY + 20);
      setActive(true);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [prefersReducedMotion, x, y]);

  if (prefersReducedMotion || !active) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-40 pointer-events-none"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      {/* Gentle idle bob, independent of the follow spring */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#09090B"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"
            fill="#FFFFFF"
          />
          {/* Eyes blink by collapsing vertically for a beat every few seconds */}
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            animate={{ scaleY: [1, 1, 0.15, 1, 1] }}
            transition={{
              duration: 3.6,
              times: [0, 0.86, 0.9, 0.94, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <circle cx="9" cy="10" r="1.4" fill="#09090B" stroke="none" />
            <circle cx="15" cy="10" r="1.4" fill="#09090B" stroke="none" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
