/**
 * The screen-reader half of "this link leaves the site".
 *
 * Every post on this site lives on Medium or Substack, so every post link opens
 * a new tab. Lived in PostCard.tsx until the featured block was rebuilt; it is
 * shared by the ledger rows and the featured cards, so it belongs to neither.
 */
export function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}
