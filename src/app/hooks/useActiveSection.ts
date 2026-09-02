import { useEffect, useState } from "react";
import { waitForElement } from "@/app/utils/waitForElement";

/* The masthead is 64px; a section counts as current once its top edge has
   passed under the bar. Same number --nav-height carries in CSS, which keeps
   the highlight in step with where an anchor jump actually parks the heading. */
const NAV_LINE = 64;

/**
 * Reports which of `ids` the reader is currently inside, for the masthead's
 * active state. Returns null above the first section, so nothing is highlighted
 * while the page is still on its opening statement.
 *
 * An IntersectionObserver rather than a scroll listener: the callback fires
 * when a section boundary crosses the nav line, not on every frame of every
 * scroll. Positions are re-read from the DOM inside the callback rather than
 * accumulated from entry deltas, so a fast flick that crosses two boundaries
 * in one frame still resolves to the right section.
 *
 * @param ids Section element ids, in document order.
 * @param enabled False on routes with no sections (the archive), where there
 *   would be nothing to observe.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    let observer: IntersectionObserver | null = null;

    /* Returning to the home page runs this effect while the archive is still
       mounted, so the sections aren't in the document yet — looking them up
       directly would find nothing and the indicator would stay dead for the rest
       of the visit. Waiting on the first section covers the rest: they mount in
       the same commit. */
    const cancel = waitForElement(ids[0], () => {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      /* Walking in document order leaves the deepest crossed boundary standing,
         which is the section the reader is inside. */
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

  return active;
}
