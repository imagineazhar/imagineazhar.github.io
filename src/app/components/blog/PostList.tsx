import { ArrowUpRight } from "lucide-react";
import { NewTabNote, outboundProps } from "@/app/components/blog/PostCard";
import type { Post } from "@/app/hooks/useFeed";

/* Rows show "Jul 30" — the year lives in the group's margin label. Only the
   archive dates its rows; the home ledger runs undated. */
const rowDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

/* "6 min read" is right for a byline but too wide for a margin column, where
   it sits beside a title competing for the same line. */
const shortReadTime = (readTime: string) => readTime.replace(/\sread$/, "");

/** Newest year first, posts already sorted newest-first inside each group. */
const groupByYear = (posts: Post[]) => {
  const groups = new Map<string, Post[]>();
  posts.forEach((post) => {
    const year = new Date(post.timestamp).getUTCFullYear().toString();
    const bucket = groups.get(year);
    if (bucket) bucket.push(post);
    else groups.set(year, [post]);
  });
  return [...groups.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
};

/**
 * The sighted half of the "opens in a new tab" note the link name carries.
 * Every row on this site leaves for Medium or Substack, and until now only the
 * featured block said so visually.
 *
 * Set inline, running with the title text, so it wraps with the last word
 * instead of needing a column of its own — and so revealing it changes no
 * geometry at all. `.tif-row-out` fades it in on hover and focus and parks it
 * visible on touch, where there is no hover to discover it with.
 */
function OutMark() {
  return (
    <ArrowUpRight
      aria-hidden="true"
      className="tif-row-out ml-1 inline-block h-3.5 w-3.5"
      style={{ verticalAlign: "-0.125em" }}
    />
  );
}

/** One line of the dense archive list; the whole row is the outbound link. */
export function PostRow({ post, showDate = false }: { post: Post; showDate?: boolean }) {
  return (
    <a
      {...outboundProps(post)}
      className={
        showDate
          ? "tif-row grid grid-cols-[4.25rem_minmax(0,1fr)] items-baseline gap-x-4 py-3"
          : "tif-row flex py-3"
      }
    >
      {showDate && (
        <time className="tif-micro tif-tabular" dateTime={post.isoDate}>
          {rowDate.format(post.timestamp)}
        </time>
      )}
      <span className="tif-row-title" style={{ fontSize: "var(--fs-body)" }}>
        {post.title}
        <OutMark />
        {/* Last, so the row is announced the way it is read: date, then title,
            then where the link goes. */}
        <NewTabNote />
      </span>
    </a>
  );
}

/**
 * A home-ledger entry: title, a two-line dek, and read time in the margin.
 *
 * The dek is what makes the list scannable — a column of bare titles gives a
 * reader nothing to choose on. Clamped to two lines so rows stay a uniform
 * height and the skeleton can reserve the right box; the full piece is one
 * click away, so there's nothing to expand in place.
 */
export function PostEntry({ post }: { post: Post }) {
  return (
    <a {...outboundProps(post)} className="tif-row block py-4">
      <div className="flex items-baseline justify-between gap-4">
        <span className="tif-row-title" style={{ fontSize: "var(--fs-body-lg)" }}>
          {post.title}
          <OutMark />
        </span>
        <span className="tif-micro tif-tabular shrink-0">
          {shortReadTime(post.readTime)}
        </span>
      </div>
      {post.excerpt && (
        <p className="tif-caption line-clamp-2 mt-1.5" style={{ maxWidth: "62ch" }}>
          {post.excerpt}
        </p>
      )}
      {/* Closes the row rather than interrupting it: the title, the read time
          and the dek are all part of the link's name now, and this is the last
          thing a reader needs to hear about it. */}
      <NewTabNote />
    </a>
  );
}

/** The home writing ledger: a short, curated set of entries with deks. */
export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="tif-rowlist">
      {posts.map((post) => (
        <li key={post.id}>
          <PostEntry post={post} />
        </li>
      ))}
    </ul>
  );
}

/** Year-grouped rows with the year standing in the left margin, ledger style.
    The archive is explicitly a chronological index, so it keeps its dates. */
export function PostListByYear({ posts }: { posts: Post[] }) {
  return (
    <>
      {groupByYear(posts).map(([year, group]) => (
        <section
          key={year}
          className="md:grid md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-x-6"
          style={{ marginBottom: "var(--space-4)" }}
        >
          {/* Parks at the same offset in-page anchors use, so a pinned year sits
              exactly where a jumped-to heading would rather than at a second,
              unrelated distance from the sticky bar. `top` is inert while the
              element is static below md. */}
          <h2
            className="tif-micro tif-tabular pt-3 md:sticky md:self-start"
            style={{ top: "var(--anchor-offset)" }}
          >
            {year}
          </h2>
          <ul className="tif-rowlist">
            {group.map((post) => (
              <li key={post.id}>
                <PostRow post={post} showDate />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

/** Mirrors the real row's box so nothing jumps when the feed lands. */
function RowSkeleton({ showDate }: { showDate: boolean }) {
  return showDate ? (
    <div className="grid grid-cols-[4.25rem_minmax(0,1fr)] items-center gap-x-4 py-3">
      <div style={{ height: 12, backgroundColor: "var(--raised)" }} />
      <div style={{ height: 18, width: "72%", backgroundColor: "var(--raised)" }} />
    </div>
  ) : (
    <div className="py-4">
      <div className="flex items-center justify-between gap-4">
        <div style={{ height: 21, width: "62%", backgroundColor: "var(--raised)" }} />
        <div style={{ height: 12, width: 44, backgroundColor: "var(--raised)" }} />
      </div>
      {/* Two dek lines, matching line-clamp-2 above. */}
      <div
        className="mt-2"
        style={{ height: 14, width: "88%", backgroundColor: "var(--raised)" }}
      />
      <div
        className="mt-1.5"
        style={{ height: 14, width: "54%", backgroundColor: "var(--raised)" }}
      />
    </div>
  );
}

export function PostListSkeleton({
  rows = 6,
  showDate = false,
}: {
  rows?: number;
  showDate?: boolean;
}) {
  return (
    <div className="tif-rowlist" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <RowSkeleton key={i} showDate={showDate} />
      ))}
    </div>
  );
}
