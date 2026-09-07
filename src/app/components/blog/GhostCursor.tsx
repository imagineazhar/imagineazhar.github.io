import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * A cursor companion: the site's ghost trails the pointer on a spring, bobs,
 * and blinks.
 *
 * Hand-written SVG rather than lucide's <Ghost /> because the blink animates
 * the eyes on their own, and the packaged component gives no handle on them.
 */
export function GhostCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 110, damping: 15, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 110, damping: 15, mass: 0.7 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    /* Latched in the closure rather than read back off state: the handler runs
       on every pointer move, and calling the setter each time dispatches an
       update React only discards after the fact. */
    let summoned = false;

    const move = (event: PointerEvent) => {
      /* A touchscreen laptop matches `pointer: fine`, so the media query alone
         would let a finger drag summon a companion meant for a mouse. */
      if (event.pointerType !== "mouse") return;

      // Below-right of the cursor, so it never covers what is being read.
      x.set(event.clientX + 16);
      y.set(event.clientY + 20);

      if (!summoned) {
        summoned = true;
        setActive(true);
      }
    };

    // Passive: the handler never calls preventDefault, and this one fires often.
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [prefersReducedMotion, x, y]);

  if (prefersReducedMotion || !active) return null;

  return (
    /* Above the sticky masthead and the progress floor, below the skip link: a
       companion that slides under the page chrome reads as a bug rather than as
       depth. pointer-events-none so it can never take a click. */
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[55]"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      {/* Idle bob, independent of the follow spring. */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"
            fill="var(--paper)"
          />
          {/* Blink: the eyes collapse vertically for a beat every few seconds. */}
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
            <circle cx="9" cy="10" r="1.4" fill="var(--ink)" stroke="none" />
            <circle cx="15" cy="10" r="1.4" fill="var(--ink)" stroke="none" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
