import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/app/hooks/useFeed";

/* Posts live on Medium/Substack, so every link is outbound. */
export const outboundProps = (post: Post) => ({
  href: post.link,
  target: "_blank" as const,
  rel: "noopener noreferrer",
});

/**
 * The visible text of an outbound link never says the link leaves the site,
 * so every one of them ends with this.
 *
 * It is appended to the link's own content rather than set as an aria-label.
 * An aria-label replaces everything inside the element, so the label these
 * links used to carry — the title, and nothing else — silently threw away the
 * read time, the dek and the archive's date for exactly the readers who cannot
 * see them. Which platform hosts a piece isn't the reader's concern, so the
 * destination is named only as "a new tab".
 */
export function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

/**
 * A preview plate, carrying VizShowcase's hairline ring and square corners so
 * the two sections read as one system rather than as two unrelated galleries.
 *
 * The ratio is declared rather than inherited from the file, because an
 * undeclared box resizes under the reader as each image lands, and feed images
 * arrive at whatever the author uploaded: 953x844 on the current lead post,
 * 1536x1024 on the Substack one. 4:3 sits between the two, so neither is
 * mounted far off-square.
 *
 * Where this parts company with VizShowcase is `contain` over `cover`. That
 * grid can crop freely — every Tableau preview arrives at an identical ratio,
 * so the crop is always nil. Here the images are charts at ratios from 1.1 to
 * 1.5, and covering a 4:3 plate would take a third of the height off some of
 * them. Cropping a chart's axis off is exactly the failure this site is
 * written against, so the plate mounts the image whole and lets --raised show
 * as the mat. Capped well inside the text measure: at the full shell width a
 * 4:3 plate is 800px tall and stops being a lead image.
 */
const PLATE = {
  aspectRatio: "4 / 3",
  maxWidth: "560px",
  backgroundColor: "var(--raised)",
  boxShadow: "0 0 0 var(--rule-hairline) var(--hairline-color)",
} as const;

/**
 * Lead piece: an accent-ruled statement, not a card. The list below it is
 * dense, so this is deliberately the only large element in the column.
 *
 * It is also the one place the writing section shows what the writing is
 * about. Every essay here is built on charts, and the section above it is a
 * contact sheet of them — which left the ledger underneath as the only
 * passage on the page arguing for data visualisation without showing any.
 * The plate goes under the dek rather than above the headline: the headline
 * makes the claim, the chart is the evidence, and that is the order they
 * should arrive in. Only the featured post gets one — thumbnailing the six
 * rows below would cost the ledger the density its whole layout argues for.
 */
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <article
      style={{
        borderLeft: "var(--rule-accent) solid var(--slate)",
        paddingLeft: "clamp(18px, 3vw, 28px)",
      }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="tif-micro tif-tabular">{post.readTime}</span>
      </div>

      <h2 className="tif-h1" style={{ marginTop: 14 }}>
        <a {...outboundProps(post)} className="tif-link" style={{ color: "var(--ink)" }}>
          {post.title}
          <NewTabNote />
        </a>
      </h2>

      {post.excerpt && (
        <p className="tif-lede" style={{ marginTop: 12, fontSize: "var(--fs-body)" }}>
          {post.excerpt}
        </p>
      )}

      {/* Not itself a link. A third anchor to the same URL would add a third
          tab stop and a third identical entry in a screen reader's link list,
          for a target the headline directly above already covers. */}
      {post.image && (
        <div className="mt-6 w-full overflow-hidden" style={PLATE}>
          {/* alt is empty on purpose. This is a preview of the linked piece
              rather than content in its own right, and the feed gives nothing
              to write a truthful description from — "a chart from the article"
              is noise read aloud on every visit, and the headline and dek above
              already carry the meaning. */}
          <img
            src={post.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <a
        {...outboundProps(post)}
        className="tif-link tif-caption mt-5 inline-flex items-center gap-1.5"
        style={{ color: "var(--slate-deep)" }}
      >
        Read the essay
        {/* An accessible name has to contain the link's visible text (WCAG
            2.5.3, Label in Name) or voice control cannot act on "click Read
            the essay" — which is what the old aria-label, set to the title
            alone, broke. Naming the piece as well keeps this link and the
            headline above it distinguishable in a list of links. */}
        <span className="sr-only">: {post.title}</span>
        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        <NewTabNote />
      </a>
    </article>
  );
}

/** Reserves the featured block's rough box so the page doesn't jump. */
export function FeaturedPostSkeleton() {
  return (
    <div
      aria-hidden="true"
      style={{
        borderLeft: "var(--rule-accent) solid var(--hairline-color)",
        paddingLeft: "clamp(18px, 3vw, 28px)",
      }}
    >
      <div style={{ height: 12, width: "40%", backgroundColor: "var(--raised)" }} />
      <div style={{ height: 34, width: "85%", marginTop: 16, backgroundColor: "var(--raised)" }} />
      <div style={{ height: 16, width: "70%", marginTop: 14, backgroundColor: "var(--raised)" }} />
      {/* Reserves the plate. Nine of the eleven posts in the live feed carry an
          image and the newest always has, so matching that case is the smaller
          risk: an imageless post pulls the page up by the plate's height once,
          where omitting the box would push it down on nearly every load. */}
      <div style={{ ...PLATE, marginTop: 24 }} />
      <div style={{ height: 20, width: 120, marginTop: 20, backgroundColor: "var(--raised)" }} />
    </div>
  );
}
