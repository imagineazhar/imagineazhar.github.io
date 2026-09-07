export interface FeedSource {
  id: string;
  /** Shown on the post card so readers know where a piece lives. */
  name: string;
  /** Raw RSS URL. Both Medium and Substack expose one at a fixed path. */
  feedUrl: string;
  /** Where the "read everything" link points. */
  profileUrl: string;
  /** Flip to true to pull this source into the site. */
  enabled: boolean;
}

/**
 * Every writing source the site aggregates, merged newest-first.
 *
 * Nothing in the UI is Medium-specific — cards, the archive and the source
 * filter all read from this array, so adding a source is a one-entry change.
 */
export const FEED_SOURCES: FeedSource[] = [
  {
    id: "medium",
    name: "Medium",
    feedUrl: "https://medium.com/feed/@imagineazhar",
    profileUrl: "https://medium.com/@imagineazhar",
    enabled: true,
  },
  {
    id: "substack",
    name: "Substack",
    feedUrl: "https://imagineazhar.substack.com/feed",
    profileUrl: "https://imagineazhar.substack.com",
    enabled: true,
  },
];

export const enabledSources = () => FEED_SOURCES.filter((s) => s.enabled);
