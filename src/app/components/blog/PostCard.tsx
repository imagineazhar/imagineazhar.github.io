import { ArrowUpRight } from "lucide-react";
import { outboundProps } from "@/app/utils/outbound";
import type { Post } from "@/app/hooks/useFeed";

export function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

/**
 * The ratio is declared rather than inherited from the file: feed images arrive
 * at whatever the author uploaded, and an undeclared box resizes under the
 * reader as each one lands.
 *
 * `contain`, unlike VizShowcase's `cover` — these are charts at ratios from 1.1
 * to 1.5, and covering a 4:3 plate would crop a third of the height off some of
 * them. The plate mounts the image whole and lets --raised show as the mat.
 */
const PLATE = {
  aspectRatio: "4 / 3",
  maxWidth: "560px",
  backgroundColor: "var(--raised)",
  boxShadow: "0 0 0 var(--rule-hairline) var(--hairline-color)",
} as const;

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

      {/* Not itself a link: a third anchor to the same URL would add a third tab
          stop and a third identical entry in a screen reader's link list. */}
      {post.image && (
        <div className="mt-6 w-full overflow-hidden" style={PLATE}>
          {/* Empty alt on purpose — the feed gives nothing to write a truthful
              description from, and the headline and dek already carry meaning. */}
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
        {/* An accessible name has to contain the visible text (WCAG 2.5.3, Label
            in Name) or voice control cannot act on "click Read the essay".
            Naming the piece keeps this and the headline distinct in a link list. */}
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
      {/* Most posts carry an image and the newest always has, so reserving the
          plate is the smaller risk: omitting it would push the page down on
          nearly every load. */}
      <div style={{ ...PLATE, marginTop: 24 }} />
      <div style={{ height: 20, width: 120, marginTop: 20, backgroundColor: "var(--raised)" }} />
    </div>
  );
}
