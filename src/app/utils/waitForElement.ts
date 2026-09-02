/* Route transitions run through AnimatePresence with mode="wait", which holds
   the outgoing page mounted for the length of its exit animation and mounts the
   incoming one only after. So anything reacting to a location change — scrolling
   to a hash, attaching an observer to sections — can run a few hundred
   milliseconds before its target element exists.

   Waiting on frames rather than a fixed setTimeout tracks the actual mount
   instead of a duration copied from the transition config, which would go stale
   the moment that duration changed. */

const DEADLINE_MS = 1200;

/**
 * Calls `onFound` as soon as an element with `id` is in the document —
 * synchronously if it already is.
 *
 * @param onMissing Runs if the deadline passes without the element appearing,
 *   which means a hash pointing at nothing. Callers use it to fall back to a
 *   predictable position rather than leaving the reader wherever they were.
 * @returns A cancel function; call it from effect cleanup so a second
 *   navigation doesn't leave an earlier search running.
 */
export function waitForElement(
  id: string,
  onFound: (element: HTMLElement) => void,
  onMissing?: () => void
): () => void {
  const immediate = document.getElementById(id);
  if (immediate) {
    onFound(immediate);
    return () => {};
  }

  const startedAt = performance.now();
  let frame = 0;

  const look = () => {
    const element = document.getElementById(id);
    if (element) {
      onFound(element);
      return;
    }
    if (performance.now() - startedAt > DEADLINE_MS) {
      onMissing?.();
      return;
    }
    frame = requestAnimationFrame(look);
  };

  frame = requestAnimationFrame(look);
  return () => cancelAnimationFrame(frame);
}
