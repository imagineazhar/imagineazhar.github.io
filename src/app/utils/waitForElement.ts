const DEADLINE_MS = 1200;

/**
 * Calls `onFound` as soon as an element with `id` is in the document —
 * synchronously if it already is.
 *
 * Exists because AnimatePresence runs mode="wait": the outgoing page stays
 * mounted for its exit animation, so anything reacting to a location change can
 * run a few hundred milliseconds before its target exists. Polling frames
 * rather than a fixed timeout tracks the actual mount instead of a duration
 * copied from the transition config, which would go stale the moment that
 * duration changed.
 *
 * @param onMissing Runs if the deadline passes — a hash pointing at nothing.
 * @returns Cancel function; call it from effect cleanup so a second navigation
 *   doesn't leave an earlier search running.
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
