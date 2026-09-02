import { ArrowUpRight, BarChart3 } from "lucide-react";
import tableauData from "@/app/data/tableauProjects.json";

const SHOW_COUNT = 9;

const number = new Intl.NumberFormat("en-US");

/* A 1px ring on every cell, with a 1px grid gap for the rings to meet in.
   Adjacent rings coincide into single shared rules, so the plates read as one
   contact sheet instead of six floating cards — and an orphaned cell on the
   2-column breakpoint still closes its own frame. */
const CELL_RING = { boxShadow: "0 0 0 var(--rule-hairline) var(--hairline-color)" } as const;

/* Tableau's preview endpoint is named `4_3.png` but does not serve 4:3 — every
   viz on the profile comes back as a 736x454 (1.62:1) crop of the sheet's
   top-left corner, full-bleed with no bars of its own. Framing that in a 4:3
   plate spent ~18% of each plate's height on empty letterbox, so the plate takes
   the source's ratio verbatim and the image fills it edge to edge. */
const PLATE = { aspectRatio: "736 / 454", backgroundColor: "var(--raised)" } as const;

/* Two lines are reserved for every title so cells in a row are equal height.
   Without it a one-line title leaves a gap of dead canvas at the foot of its
   ring while the neighbour that wraps sets the row height. 1.35 is the
   line-height .tif-caption already carries. */
const TITLE_TWO_LINES = { minHeight: "calc(2 * 1.35em)" } as const;

/**
 * The six most-viewed pieces of Tableau work as a numbered contact sheet —
 * square corners, hairline gutters, no card chrome. Because the order is by
 * views, the plate numbers read as a ranking rather than as arbitrary labels.
 *
 * Captions sit under the plate rather than over it. The reference this follows
 * sets its metadata straight onto the imagery, which works for architectural
 * renders with large areas of empty sky; a Tableau thumbnail is dense to the
 * edges, so type over it would be unreadable and unpredictable.
 */
export function VizShowcase() {
  /* Most-viewed first, not profile order — the snapshot arrives in Tableau's own
     sequence, which buried the 10k and 8k pieces below a 119-view workout entry.
     Spread before sorting: the JSON import is a shared module object and other
     consumers read it in its original order. */
  const projects = [...tableauData.projects]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, SHOW_COUNT);

  /* Same opener as the writing section — accent rule, short headline, lede —
     so the two read as peers. The old single sentence was carrying eyebrow,
     headline and body all at once at h2 size. */
  const heading = (
    <>
      <div className="tif-accent-rule mb-6" />
      <h2 className="tif-h1" style={{ color: "var(--ink)" }}>
        Client work is only <em className="tif-accent-em">half the story</em>.
      </h2>
      <p
        className="tif-lede"
        style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-body)" }}
      >
        Here&rsquo;s what I build when nobody&rsquo;s asking me to &mdash;
        personal projects, published open on Tableau Public.
      </p>
    </>
  );

  /* The snapshot is refreshed by the prebuild script; if that fetch ever comes
     back empty, say so rather than rendering an empty grid under a heading. */
  if (projects.length === 0) {
    return (
      <section aria-label="Data visualisation work">
        <div className="mb-8">{heading}</div>
        <div className="tif-card items-start gap-4 p-8" style={{ borderStyle: "dashed" }}>
          <p className="tif-h2" style={{ fontSize: "var(--fs-body-lg)" }}>
            The portfolio snapshot is empty
          </p>
          <p className="tif-caption" style={{ maxWidth: "48ch" }}>
            The build couldn&rsquo;t read the Tableau Public profile this time.
            The work is still up at the source.
          </p>
          <a
            href={tableauData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tif-btn tif-btn--primary"
          >
            View on Tableau Public
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Data visualisation work">
      <div className="mb-8">{heading}</div>

      {/* Three across rather than five: at the shell's width that takes each
          plate from roughly 194px to 330px — near enough three times the area
          — without reaching back for a bento. Six items flow 3 + 3. */}
      <ul className="grid grid-cols-2 gap-px md:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.vizUrl} style={CELL_RING}>
            {/* .tif-row is the ledger's hover hook — it recolours
                .tif-row-title on hover and focus, so the gallery answers to
                the pointer exactly like a row in the writing list, with no
                lift and no zoom. */}
            <a
              href={project.vizUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${number.format(project.viewCount)} views on Tableau Public (opens in a new tab)`}
              className="tif-row flex h-full flex-col"
            >
              <div className="w-full overflow-hidden" style={PLATE}>
                {/* `cover` rather than `contain`: at the matched ratio the two
                    render identically, but cover also guarantees a filled plate
                    if Tableau ever changes the preview size — it would trim a
                    sliver instead of reopening the bars. Anchored to the top so
                    any such trim comes off the foot, never the viz title. */}
                <img
                  src={project.thumbnailUrl}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="flex flex-col gap-1 p-3 md:p-4">
                {/* The plate number only reads as a ranking if the thing being
                    ranked is on the plate with it, so the count it was sorted
                    on sits opposite. Wraps rather than overflows in the very
                    narrowest two-column cells; the number itself never breaks,
                    which is what nowrap is protecting. */}
                <span className="tif-micro tif-tabular flex flex-wrap items-baseline justify-between gap-x-3">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="whitespace-nowrap">
                    {number.format(project.viewCount)} views
                  </span>
                </span>
                <span
                  className="tif-row-title tif-caption line-clamp-2"
                  style={TITLE_TWO_LINES}
                >
                  {project.title}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* A quiet button rather than a text link, matching the archive CTA
          under the writing ledger — and carrying more weight than 15px grey
          at the foot of the section. */}
      <a
        href={tableauData.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View all ${tableauData.projects.length} vizzes on Tableau Public (opens in a new tab)`}
        className="tif-btn tif-btn--quiet"
        style={{ marginTop: "var(--space-3)" }}
      >
        <BarChart3 aria-hidden="true" className="h-4 w-4" />
        View all {tableauData.projects.length} vizzes on Tableau Public
      </a>
    </section>
  );
}
