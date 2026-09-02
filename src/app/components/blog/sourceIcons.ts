import { BookOpen, Newspaper, Rss, type LucideIcon } from "lucide-react";

/* Lucide has no brand glyphs for Medium or Substack, so each writing source
   gets the icon that reads closest to what it is. Keyed off FeedSource.id so
   a new source falls back to a generic feed mark instead of rendering blank. */
const BY_ID: Record<string, LucideIcon> = {
  medium: BookOpen,
  substack: Newspaper,
};

export const sourceIcon = (id: string): LucideIcon => BY_ID[id] ?? Rss;
