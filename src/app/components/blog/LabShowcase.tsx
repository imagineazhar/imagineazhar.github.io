import { Link } from "react-router-dom";
import { labProjects, type LabProject } from "@/app/data/lab";

/* Duplicated from VizShowcase rather than imported: the two grids stack in
   #work and have to read as one contact sheet, but they answer to different
   data and neither should be able to restyle the other. If one moves, move
   both. The ratio is Tableau's preview crop, which these posters are cut to. */
const CELL_RING = { boxShadow: "0 0 0 var(--rule-hairline) var(--hairline-color)" } as const;
const PLATE = { aspectRatio: "736 / 454", backgroundColor: "var(--raised)" } as const;
const TITLE_TWO_LINES = { minHeight: "calc(2 * 1.35em)" } as const;

/** A poster is the chart's own PNG export, so the still and the live page
    cannot disagree. Until one exists the plate is typographic rather than a
    broken image or a grey void. */
function LabPlate({ project }: { project: LabProject }) {
  return (
    <div className="w-full overflow-hidden" style={PLATE}>
      {project.poster ? (
        <img
          src={project.poster}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col justify-end gap-2 p-4 md:p-5"
          style={{ borderBottom: "var(--rule-accent) solid var(--slate)" }}
        >
          <span
            className="tif-display"
            style={{
              fontSize: "var(--fs-h2)",
              color: "var(--ink)",
              opacity: 0.9,
              textWrap: "balance",
            }}
          >
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}

/* Cells are react-router <Link>s, unlike VizShowcase's outbound anchors: these
   open the chart on this site under the masthead, at /lab/:slug. */
function LabPlateGrid({ projects }: { projects: LabProject[] }) {
  return (
    <ul className="grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3">
      {projects.map((project) => (
        <li key={project.slug} style={CELL_RING}>
          <Link to={`/lab/${project.slug}`} className="tif-row flex h-full flex-col">
            <LabPlate project={project} />

            <div className="flex flex-col gap-1 p-3 md:p-4">
              <span className="tif-micro tif-tabular flex flex-wrap items-baseline justify-between gap-x-3">
                <span>Interactive</span>
                <span className="whitespace-nowrap">Any {project.subjectNoun}</span>
              </span>
              <span
                className="tif-row-title tif-caption line-clamp-2"
                style={TITLE_TWO_LINES}
              >
                {project.title}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function LabShowcase() {
  if (labProjects.length === 0) return null;

  return (
    <section aria-label="Interactive charts">
      <div className="mb-8">
        {/* Same opener as the Tableau section and the writing ledger — accent
            rule, short headline, lede — so all three read as peers. */}
        <div className="tif-accent-rule mb-6" />
        <h2 className="tif-h1" style={{ color: "var(--ink)" }}>
          Some charts are better <em className="tif-accent-em">played with</em>.
        </h2>
        <p
          className="tif-lede"
          style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-body)" }}
        >
          Live visualizations you can explore, reshape, and take with you.
        </p>
      </div>

      {/* No CTA under this grid: every plate already goes to the thing itself. */}
      <LabPlateGrid projects={labProjects} />
    </section>
  );
}
