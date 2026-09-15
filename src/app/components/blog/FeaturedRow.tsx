import { NewTabNote } from "@/app/components/blog/NewTabNote";
import { outboundProps } from "@/app/utils/outbound";
import type { Post } from "@/app/hooks/useFeed";

/* Three cards, one row. Fewer reads as an accident of the feed; more turns the
   ledger below it into a duplicate of itself. */
export const FEATURED_COUNT = 3;

/* The colour block behind each card's art, and the whole of it on a post that
   carries no thumbnail. Pastels rather than the site's slate family: the block
   shows as a band above and below the art and has to read as a ground, not as
   a second image. Decorative only — no text is ever set on these, so they
   carry no contrast obligation. */
const TONES = ["var(--pastel-slate)", "var(--pastel-lilac)", "var(--pastel-clay)"] as const;

/* Each card crops its art to a different band of the colour block and bleeds it
   past the block's sides by a different amount. Uniform values would line the
   three images up into a single strip and lose the cut-and-paste read; the
   bleed is capped under half of --space-4 so two neighbours can never touch. */
const CROPS = [
  { top: "11%", height: "70%", bleed: 14 },
  { top: "3%", height: "78%", bleed: 18 },
  { top: "8%", height: "76%", bleed: 10 },
] as const;

/* Ragged, like a real headline: a full line, a near-full one, then a short
   one. Equal widths would reserve the right box but read as a table. */
const SKELETON_LINES = ["100%", "88%", "52%"] as const;

/** Feed tags arrive as "machine-learning" as often as "Machine Learning". */
const topicOf = (post: Post) =>
  post.categories[0]?.replace(/[-_]+/g, " ").trim() || post.sourceName;

function FeaturedCard({ post, index }: { post: Post; index: number }) {
  const crop = CROPS[index % CROPS.length];

  return (
    <article className="tif-feat-card">
      <div className="tif-feat-panel" style={{ backgroundColor: TONES[index % TONES.length] }}>
        {post.image && (
          /* Empty alt: the feed gives nothing to write a truthful description
             from, and the headline under it carries the meaning. */
          <img
            src={post.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="tif-feat-art"
            style={{
              top: crop.top,
              height: crop.height,
              left: -crop.bleed,
              width: `calc(100% + ${crop.bleed * 2}px)`,
            }}
          />
        )}
      </div>

      {/* The only anchor in the card. Its ::after stretches over the whole
          article, so the art and the meta line are clickable without adding a
          second tab stop or a second entry in a screen reader's link list. */}
      <h3 className="tif-feat-title">
        <a {...outboundProps(post)} className="tif-feat-mark">
          {post.title}
          <NewTabNote />
        </a>
      </h3>

      <p className="tif-feat-meta">
        {/* Braced so eslint doesn't read the slashes as a stray JS comment. */}
        <span aria-hidden="true">{"//"}</span>{" "}
        <time dateTime={post.isoDate}>{post.date}</time>
        <span aria-hidden="true"> &middot; </span>
        <span className="tif-feat-topic">{topicOf(post)}</span>
      </p>
    </article>
  );
}

export function FeaturedRow({ posts }: { posts: Post[] }) {
  return (
    <div className="tif-feat-grid">
      {posts.map((post, index) => (
        <FeaturedCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}

/** Holds the row's box while the feed is in flight, colour blocks and all. */
export function FeaturedRowSkeleton({ count = FEATURED_COUNT }: { count?: number }) {
  return (
    <div className="tif-feat-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="tif-feat-card">
          <div
            className="tif-feat-panel"
            style={{ backgroundColor: TONES[index % TONES.length] }}
          />
          {/* Three bars rather than three runs of spaces: an inline span holds
              only the width of the text inside it, so spaces reserved a stub a
              quarter the width of a real line and the skeleton read as a broken
              card. Bars in em, so they track the headline's clamp. Three lines
              is the median headline at this measure, and what the negative
              margin on .tif-feat-title is tuned against. */}
          <div className="tif-feat-title" style={{ paddingTop: "0.15em" }}>
            {SKELETON_LINES.map((width, line) => (
              <div
                key={line}
                style={{
                  width,
                  height: "1.4em",
                  marginBottom: "0.1em",
                  /* --raised, not --ink: the bars sit where black headline
                     boxes will land, but every other skeleton on the site is a
                     raised-grey block, and three black slabs for the length of
                     a feed fetch read as an error state rather than as waiting.
                     The geometry is what has to match, not the colour. */
                  backgroundColor: "var(--raised)",
                }}
              />
            ))}
          </div>
          <p className="tif-feat-meta">
            <span style={{ visibility: "hidden" }}>{"// Aug 31, 2026 · Analytics"}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
