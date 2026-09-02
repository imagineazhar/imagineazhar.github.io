import { useEffect, useState } from "react";
import { enabledSources, type FeedSource } from "@/app/data/feeds";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  /** Human-readable, e.g. "Jul 2, 2026". */
  date: string;
  /** Machine-readable for <time datetime>. */
  isoDate: string;
  timestamp: number;
  readTime: string;
  categories: string[];
  image?: string;
  sourceId: string;
  sourceName: string;
}

interface Rss2JsonItem {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  description?: string;
  thumbnail?: string;
  enclosure?: { link?: string; url?: string };
  categories?: string[];
}

/**
 * rss2json hands back "YYYY-MM-DD HH:mm:ss" in UTC. Safari refuses to parse
 * that space-separated form and yields Invalid Date, which would silently sort
 * every post to the epoch — so normalise to ISO before constructing.
 */
const parseDate = (raw?: string): Date => {
  if (!raw) return new Date(0);
  const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(raw)
    ? `${raw.replace(" ", "T")}Z`
    : raw;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const collapse = (raw: string) => raw.replace(/\s+/g, " ").trim();

/**
 * Parse feed HTML inertly. DOMParser builds a detached document that never
 * fetches images or runs script, unlike assigning to innerHTML.
 *
 * `text` is the whole body flattened, and it is only fit for counting words.
 * Excerpting from it fuses blocks together, because textContent drops the
 * boundaries between them: Medium opens every piece with an <h4> standfirst,
 * so the dek came out as "Building Radial Arc Visualizations from Scratch This
 * tutorial teaches you to build…" — two sentences run together with no
 * punctuation, in the first line the reader reads. `lead` takes the first real
 * paragraph instead, which across both live feeds is a clean opening sentence
 * every time, and drops the standfirst and the "Introduction:" headings with it.
 */
const readHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  /* Paragraphs inside a <figure> are captions, not the opening line. The
     length floor skips the stray one-word paragraphs both editors emit. */
  const lead = Array.from(doc.body.querySelectorAll("p"))
    .filter((node) => !node.closest("figure"))
    .map((node) => collapse(node.textContent ?? ""))
    .find((paragraph) => paragraph.length >= 40);

  return {
    text: collapse(doc.body.textContent ?? ""),
    lead,
    firstImage: doc.body.querySelector("img")?.getAttribute("src") ?? undefined,
  };
};

const toPost = (item: Rss2JsonItem, source: FeedSource): Post | null => {
  if (!item.link || !item.title) return null;

  const { text, lead, firstImage } = readHtml(item.content || item.description || "");
  const published = parseDate(item.pubDate);
  const words = text ? text.split(/\s+/).length : 0;

  /* Falls back to the flattened body for a feed that carries no paragraphs at
     all — a plain-text <description> still has to produce some dek. */
  const summary = lead ?? text;

  return {
    id: `${source.id}:${item.link}`,
    title: item.title,
    excerpt: summary.length > 180 ? `${summary.slice(0, 180).trimEnd()}…` : summary,
    link: item.link,
    date: dateFormatter.format(published),
    isoDate: published.toISOString(),
    timestamp: published.getTime(),
    readTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
    categories: item.categories?.filter(Boolean) ?? [],
    image: item.thumbnail || item.enclosure?.link || item.enclosure?.url || firstImage,
    sourceId: source.id,
    sourceName: source.name,
  };
};

const fetchSource = async (source: FeedSource, signal: AbortSignal): Promise<Post[]> => {
  const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.feedUrl)}`;
  const response = await fetch(endpoint, { signal });
  if (!response.ok) throw new Error(`${source.name} responded ${response.status}`);

  const data = await response.json();
  if (data.status !== "ok" || !Array.isArray(data.items)) {
    throw new Error(`${source.name} returned an unreadable feed`);
  }

  return (data.items as Rss2JsonItem[])
    .map((item) => toPost(item, source))
    .filter((post): post is Post => post !== null);
};

export interface FeedState {
  posts: Post[];
  loading: boolean;
  /** Sources that failed, so the UI can say so instead of pretending. */
  failedSources: string[];
  /** True only when every configured source failed. */
  allFailed: boolean;
}

/**
 * Pulls every enabled source in parallel and merges them newest-first.
 *
 * Uses allSettled rather than all: when Substack is switched on, one flaky
 * feed must not blank out the other's posts.
 */
export function useFeed(): FeedState {
  const [state, setState] = useState<FeedState>({
    posts: [],
    loading: true,
    failedSources: [],
    allFailed: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const sources = enabledSources();

    if (sources.length === 0) {
      setState({ posts: [], loading: false, failedSources: [], allFailed: false });
      return;
    }

    (async () => {
      const results = await Promise.allSettled(
        sources.map((source) => fetchSource(source, controller.signal))
      );
      if (controller.signal.aborted) return;

      const posts: Post[] = [];
      const failedSources: string[] = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          posts.push(...result.value);
        } else {
          failedSources.push(sources[index].name);
          console.error(`Feed failed: ${sources[index].name}`, result.reason);
        }
      });

      // The same piece cross-posted to Medium and Substack carries a different
      // link on each platform, so dedupe on normalised title — sorted first,
      // so the newer copy is the one that survives.
      const seen = new Set<string>();
      const deduped = posts
        .sort((a, b) => b.timestamp - a.timestamp)
        .filter((post) => {
          const key = post.title.trim().toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

      setState({
        posts: deduped,
        loading: false,
        failedSources,
        allFailed: failedSources.length === sources.length,
      });
    })();

    return () => controller.abort();
  }, []);

  return state;
}
