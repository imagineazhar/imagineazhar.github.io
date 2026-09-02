import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PostListByYear, PostListSkeleton } from "@/app/components/blog/PostList";
import { enabledSources } from "@/app/data/feeds";
import type { FeedState } from "@/app/hooks/useFeed";
import { buildUrl, setPageMeta } from "@/app/utils/seo";

const ALL = "all";

export function ArchivePage({ feed }: { feed: FeedState }) {
  const sources = enabledSources();
  const [active, setActive] = useState<string>(ALL);

  useEffect(() => {
    setPageMeta({
      title: "Archive — Muhammad Azhar",
      description:
        "Notes on what I'm learning — where design, data, and how people actually read a chart all collide.",
      url: buildUrl("/archive"),
    });
  }, []);

  const visible = useMemo(
    () => (active === ALL ? feed.posts : feed.posts.filter((p) => p.sourceId === active)),
    [feed.posts, active]
  );

  return (
    <section
      className="tif-shell"
      style={{ paddingTop: "var(--space-5)", paddingBottom: "var(--space-6)" }}
    >
      <div style={{ marginBottom: "var(--space-4)" }}>
        {/* Page opener, not a section head — no accent rule, and it stays at
            --fs-display so the home page's statement is the only display-XL
            moment on the site. */}
        <h1
          className="tif-display"
          style={{ fontSize: "var(--fs-display)", color: "var(--ink)" }}
        >
          Everything, newest first.
        </h1>
        <p className="tif-lede" style={{ marginTop: "var(--space-3)" }}>
          {feed.loading
            ? "Loading the archive…"
            : `${feed.posts.length} ${feed.posts.length === 1 ? "essay" : "essays"} across ${
                sources.length === 1
                  ? sources[0]?.name ?? "no source"
                  : `${sources.length} sources`
              }.`}
        </p>

        {/* The source filter only earns its space once more than one feed is
            live — with Medium alone it would be a control with one option. */}
        {sources.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by source">
            {[{ id: ALL, name: "All" }, ...sources].map((source) => {
              const isActive = active === source.id;
              return (
                <button
                  key={source.id}
                  type="button"
                  onClick={() => setActive(source.id)}
                  aria-pressed={isActive}
                  className="tif-btn"
                  style={{
                    backgroundColor: isActive ? "var(--slate-deep)" : "transparent",
                    color: isActive ? "var(--paper)" : "var(--ink)",
                    borderColor: isActive ? "var(--slate-deep)" : "var(--hairline-color)",
                  }}
                >
                  {source.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {feed.loading && <PostListSkeleton rows={10} showDate />}

      {!feed.loading && visible.length === 0 && (
        <div className="tif-card items-start gap-4 p-8" style={{ borderStyle: "dashed" }}>
          <p className="tif-h2" style={{ fontSize: "var(--fs-body-lg)" }}>
            {feed.allFailed ? "The archive did not load" : "Nothing here yet"}
          </p>
          <p className="tif-caption" style={{ maxWidth: "48ch" }}>
            {feed.allFailed
              ? "The syndication service is unreachable right now. The writing is still up at the source."
              : "Nothing matches this filter."}
          </p>
          {feed.allFailed &&
            sources.map((source) => (
              <a
                key={source.id}
                href={source.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tif-btn tif-btn--primary"
              >
                Read on {source.name}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
        </div>
      )}

      {!feed.loading && !feed.allFailed && feed.failedSources.length > 0 && (
        <p className="tif-caption mb-6" role="status">
          Could not reach {feed.failedSources.join(" or ")} — this list is incomplete.
        </p>
      )}

      {!feed.loading && <PostListByYear posts={visible} />}
    </section>
  );
}
