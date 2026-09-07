import { useEffect, useState } from "react";
import { waitForElement } from "@/app/utils/waitForElement";

/* Must stay in step with --nav-height, or the highlight changes at a different
   scroll position than the one an anchor jump parks a heading at. */
const NAV_LINE = 64;

/**
 * Which of `ids` the reader is currently inside, for the masthead's active
 * state. Null above the first section.
 *
 * Positions are re-read from the DOM on every callback rather than accumulated
 * from entry deltas, so a flick that crosses two boundaries in one frame still
 * resolves to the right section.
 *
 * @param enabled False on routes with no sections, where there is nothing to
 *   observe. The return is derived from it, so disabling never leaves a stale
 *   id highlighted.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let observer: IntersectionObserver | null = null;

    /* Returning home runs this effect while the archive is still mounted, so
       the sections do not exist yet and a direct lookup would find nothing —
       leaving the indicator dead for the rest of the visit. They all mount in
       the same commit, so waiting on the first covers the rest. */
    const cancel = waitForElement(ids[0], () => {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      // Document order leaves the deepest crossed boundary standing.
      const resolve = () => {
        let current: string | null = null;
        for (const el of elements) {
          if (el.getBoundingClientRect().top <= NAV_LINE) current = el.id;
        }
        setActive(current);
      };

      observer = new IntersectionObserver(resolve, {
        rootMargin: `-${NAV_LINE}px 0px 0px 0px`,
      });
      elements.forEach((el) => observer?.observe(el));
    });

    return () => {
      cancel();
      observer?.disconnect();
    };
  }, [ids, enabled]);

  return enabled ? active : null;
}
