import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// House scroll-reveal: rise-and-settle on the shared spring, triggered once
// as the block scrolls into view. Stagger siblings via `delay` (0.08 steps).
const SPRING = { type: "spring", stiffness: 260, damping: 30 } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Initial downward offset in px before the block settles into place. */
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}
