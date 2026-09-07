import { ArrowUpRight, BarChart3 } from "lucide-react";
import tableauData from "@/app/data/tableauProjects.json";

const SHOW_COUNT = 9;

/* A 1px ring on every cell with a 1px grid gap for the rings to meet in, so
   adjacent rings coincide into shared rules and the plates read as one contact
   sheet. An orphaned cell at the 2-column breakpoint still closes its frame. */
const CELL_RING = { boxShadow: "0 0 0 var(--rule-hairline) var(--hairline-color)" } as const;

/* Tableau's preview endpoint is named `4_3.png` but serves 736x454 (1.62:1) —
   a full-bleed crop of the sheet's top-left corner. Framing that in a real 4:3
   plate spent ~18% of the height on letterbox, so the plate takes the source's
   ratio verbatim. */
const PLATE = { aspectRatio: "736 / 454", backgroundColor: "var(--raised)" } as const;

/* Reserved so cells in a row are equal height — without it a one-line title
   leaves dead canvas while the neighbour that wraps sets the row height.
   1.35 is the line-height .tif-caption already carries. */
const TITLE_TWO_LINES = { minHeight: "calc(2 * 1.35em)" } as const;

export function VizShowcase() {
  /* viewCount is a hidden sort key, not a displayed metric: it is the only
     signal in the snapshot separating the work worth leading with from a
     one-off, and Tableau's own profile order buries the former. Spread before
     sorting — the JSON import is a shared module object other consumers read
     in its original order. */
  const projects = [...tableauData.projects]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, SHOW_COUNT);

  const heading = (
    <>
      <div className="tif-accent-rule mb-6" />
      <h2 className="tif-h1" style={{ color: "var(--ink)" }}>
        Data, made <em className="tif-accent-em">Visible</em>.
      </h2>
      <p
        className="tif-lede"
        style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-body)" }}
      >
        A selection of visualizations exploring data, design, and the stories
        between them.
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

      <ul className="grid grid-cols-2 gap-px md:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.vizUrl} style={CELL_RING}>
            {/* .tif-row is the ledger's hover hook — it recolours .tif-row-title
                on hover and focus, so the gallery answers to the pointer exactly
                like a row in the writing list, with no lift and no zoom. */}
            <a
              href={project.vizUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — on Tableau Public (opens in a new tab)`}
              className="tif-row flex h-full flex-col"
            >
              <div className="w-full overflow-hidden" style={PLATE}>
                {/* `cover` rather than `contain`: at the matched ratio the two
                    render identically, but cover keeps the plate filled if
                    Tableau ever changes the preview size. Anchored to the top so
                    any trim comes off the foot, never the viz title. */}
                <img
                  src={project.thumbnailUrl}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="flex flex-col gap-1 p-3 md:p-4">
                {/* A plate number, not a rank — nothing on the plate ranks it. */}
                <span className="tif-micro tif-tabular">
                  {String(index + 1).padStart(2, "0")}
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
