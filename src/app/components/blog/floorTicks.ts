/**
 * The tick texture from "The Floor", the signature element in the token file.
 *
 * Painted as a repeating gradient rather than DOM nodes, so a ruled edge costs
 * one element no matter how wide the viewport gets. Shared between the footer
 * signature, the fixed progress floor, and the masthead's bottom edge — the
 * three places the device appears — so the rhythm can only be changed in one
 * place. Height is left to the caller; the gap comes from --floor-tick-gap.
 */
export const TICK_TEXTURE =
  "repeating-linear-gradient(to right, var(--grid) 0 1px, transparent 1px var(--floor-tick-gap))";
