import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Archive, ArrowUpRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { AboutSection } from "@/app/components/blog/AboutSection";
import { MetricBand } from "@/app/components/blog/MetricBand";
import { FeaturedPost, FeaturedPostSkeleton } from "@/app/components/blog/PostCard";
import { PostList, PostListSkeleton } from "@/app/components/blog/PostList";
import { VizShowcase } from "@/app/components/blog/VizShowcase";
import { enabledSources } from "@/app/data/feeds";
import type { FeedState } from "@/app/hooks/useFeed";
import { buildUrl, setPageMeta } from "@/app/utils/seo";

/* The home ledger is a curated invitation, not an index — six entries with
   deks read faster than twelve bare titles, and the archive holds the rest. */
const LIST_COUNT = 6;

export function BlogHome({ feed }: { feed: FeedState }) {
  const prefersReducedMotion = useReducedMotion();
  const primary = enabledSources()[0];
  const [featured, ...rest] = feed.posts;
  const recent = rest.slice(0, LIST_COUNT);

  useEffect(() => {
    setPageMeta({
      title: "Muhammad Azhar",
      description:
        "Data analytics specialist focused on data visualization and enterprise data strategy.",
      url: buildUrl("/"),
    });
  }, []);

  return (
    <>
      {/* A single measure runs the length of the page: statement, then who is
          writing it, then the work, then the writing about the work. */}
      <section
        className="tif-shell"
        style={{ paddingTop: "var(--space-5)", paddingBottom: "var(--space-6)" }}
      >
        {/* ---- Masthead statement -------------------------------------- */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* No accent rule here: the rule marks a section within the page, and
              the sections below wear it. This is the page's own voice, and at
              display-XL it is the one thing on the page at this size — which is
              what makes the sections read as subordinate to it. */}
          <h1
            className="tif-display"
            style={{
              fontSize: "var(--fs-display-xl)",
              color: "var(--ink)",
              maxWidth: "20ch",
            }}
          >
            I help leaders see what their data{" "}
            <em className="tif-accent-em">is actually saying</em>.
          </h1>

          <p className="tif-lede" style={{ marginTop: "var(--space-3)" }}>
            Dashboards and reports are easy to build. Knowing what to do next is
            the hard part &mdash; that&rsquo;s what I&rsquo;m here for.
          </p>
        </motion.div>

        <hr className="tif-hairline" style={{ marginBlock: "var(--space-5)" }} />

        {/* ---- About ---------------------------------------------------- */}
        <AboutSection />

        <hr className="tif-hairline" style={{ marginBlock: "var(--space-5)" }} />

        {/* ---- The number the work adds up to --------------------------- */}
        {/* Carries its own closing rule, so it can return null on an empty
            snapshot without leaving a doubled hairline behind. */}
        <MetricBand />

        {/* ---- The work first, the writing about it after --------------- */}
        {/* Wrapper carries the anchor so VizShowcase stays a section component
            that doesn't need to know it is a navigation target. */}
        <div id="work" className="tif-anchor">
          <VizShowcase />
        </div>

        <hr className="tif-hairline" style={{ marginBlock: "var(--space-5)" }} />

        {/* ---- Writing --------------------------------------------------- */}
        {/* Named for what the masthead calls it; .tif-anchor clears the sticky
            bar from --anchor-offset so the heading isn't hidden behind it. */}
        <div id="writing" className="tif-anchor">
          <div className="tif-accent-rule mb-6" />
          <h2 className="tif-h1" style={{ color: "var(--ink)" }}>
            Writing &amp; Thinking
          </h2>
          <p
            className="tif-lede mb-8"
            style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-body)" }}
          >
            Notes on what I&rsquo;m learning &mdash; where design, data, and how
            people actually read a chart all collide. Some of it&rsquo;s
            technical, some of it&rsquo;s just things I wish I&rsquo;d known
            sooner.
          </p>

          {/* The skeletons below are aria-hidden, so without a status line the
              section is simply silent for a screen reader while the feed is in
              flight — the archive already says "Loading the archive…" in its
              own lede. */}
          {feed.loading && (
            <div aria-busy="true">
              <p className="sr-only" role="status">
                Loading recent writing…
              </p>
              <FeaturedPostSkeleton />
              <div style={{ marginTop: "var(--space-5)" }}>
                {/* Was hard-coded to 7 against a list of LIST_COUNT, so the
                    skeleton the comments describe as keeping the page still was
                    itself reserving one row too many and collapsing on arrival. */}
                <PostListSkeleton rows={LIST_COUNT} />
                {/* And the archive button that appears under the list was not
                    reserved at all, which pushed the page back down again. */}
                <div
                  aria-hidden="true"
                  style={{
                    height: 44,
                    width: 248,
                    marginTop: "var(--space-3)",
                    borderRadius: "var(--radius-chip)",
                    backgroundColor: "var(--raised)",
                  }}
                />
              </div>
            </div>
          )}

          {!feed.loading && featured && (
            <>
              <FeaturedPost post={featured} />

              {recent.length > 0 && (
                <div style={{ marginTop: "var(--space-5)" }}>
                  <PostList posts={recent} />
                  <Link
                    to="/archive"
                    className="tif-btn tif-btn--quiet"
                    style={{ marginTop: "var(--space-3)" }}
                  >
                    <Archive aria-hidden="true" className="h-4 w-4" />
                    Everything, newest first
                  </Link>
                </div>
              )}
            </>
          )}

          {!feed.loading && !featured && (
            <div className="tif-card items-start gap-4 p-8" style={{ borderStyle: "dashed" }}>
              <p className="tif-h2" style={{ fontSize: "var(--fs-body-lg)" }}>
                {feed.allFailed ? "The feed did not load" : "No writing published yet"}
              </p>
              <p className="tif-caption" style={{ maxWidth: "48ch" }}>
                {feed.allFailed
                  ? "The syndication service is unreachable right now. The writing is still up at the source."
                  : "New writing will appear here as soon as it is published."}
              </p>
              {primary && (
                <a
                  href={primary.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tif-btn tif-btn--primary"
                >
                  Read on {primary.name}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
            </div>
          )}

          {/* Partial failure: say which source is missing rather than quietly
              showing a short list as if it were complete. */}
          {!feed.allFailed && feed.failedSources.length > 0 && (
            <p className="tif-caption" role="status" style={{ marginTop: "var(--space-3)" }}>
              Could not reach {feed.failedSources.join(" or ")} — showing
              everything else.
            </p>
          )}
        </div>
      </section>

      {/* ---- Follow ------------------------------------------------------- */}
      {/* #contact lands here rather than on the footer: this block is the actual
          call to action, and the footer below it stays in view anyway. */}
      <section
        id="contact"
        className="tif-shell tif-anchor"
        style={{ paddingBottom: "var(--space-6)" }}
      >
        <div
          className="flex flex-col items-start gap-5 p-8 md:p-12"
          style={{ backgroundColor: "var(--raised)", borderRadius: "var(--radius-card)" }}
        >
          <h2 className="tif-h1" style={{ color: "var(--ink)", maxWidth: "20ch" }}>
            Let&rsquo;s Connect
          </h2>
          <p className="tif-lede" style={{ fontSize: "var(--fs-body)" }}>
            Got a dataset nobody&rsquo;s made sense of yet, or a dashboard nobody
            opens? I&rsquo;m taking on a few new projects right now &mdash;
            let&rsquo;s talk about it.
          </p>
          <div className="flex flex-wrap gap-3">
            {enabledSources().map((source, index) => (
              <a
                key={source.id}
                href={source.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`tif-btn ${index === 0 ? "tif-btn--primary" : "tif-btn--quiet"}`}
              >
                Follow on {source.name}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
            <a href="mailto:2muhammadazhar@gmail.com" className="tif-btn tif-btn--quiet">
              <Mail aria-hidden="true" className="h-4 w-4" />
              Email Me
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
