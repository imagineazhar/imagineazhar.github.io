/* A gradient rather than DOM nodes, so a ruled edge costs one element no matter
   how wide the viewport gets. Height is the caller's; the gap is a token. */
export const TICK_TEXTURE =
  "repeating-linear-gradient(to right, var(--grid) 0 1px, transparent 1px var(--floor-tick-gap))";
