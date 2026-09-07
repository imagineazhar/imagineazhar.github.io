import { Link } from "react-router-dom";
import { labProjects, type LabProject } from "@/app/data/lab";

/* Deliberately the same two constants VizShowcase uses, not an import of them:
   the two grids sit one above the other in #work and have to read as one
   contact sheet, but they answer to different data and neither should be able
   to restyle the other by accident. If one moves, move both.

   The plate ratio is Tableau's preview crop (736x454). These charts export at
   their own ratios, so a poster is cropped to fit rather than the grid being
   given a second shape — two ratios stacked in one section would read as two
   sections. */
const CELL_RING = { boxShadow: "0 0 0 var(--rule-hairline) var(--hairline-color)" } as const;
const PLATE = { aspectRatio: "736 / 454", backgroundColor: "var(--raised)" } as const;

/* Matches VizShowcase's two-line title reservation so cells in a row are equal
   height whichever grid they belong to. */
const TITLE_TWO_LINES = { minHeight: "calc(2 * 1.35em)" } as const;

/**
 * The plate itself. A poster is the chart's own PNG export, so the still and
 * the live page cannot disagree about what the chart looks like.
 *
 * Until one exists the plate is typographic rather than a broken image or a
 * grey void — the title set in the display face on the raised ground, which is
 * legible, on-system, and obviously deliberate.
 */
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

/**
 * The grid.
 *
 * Cells are react-router <Link>s, unlike VizShowcase's outbound anchors: these
 * open the chart on this site rather than sending the reader to another one,
 * which is the whole difference between work that is linked to and work that
 * is hosted. /lab/:slug is the chart itself running under the masthead — there
 * is no page in between describing it first.
 */
export function LabPlateGrid({ projects }: { projects: LabProject[] }) {
  return (
    <ul className="grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3">
      {projects.map((project) => (
        <li key={project.slug} style={CELL_RING}>
          <Link to={`/lab/${project.slug}`} className="tif-row flex h-full flex-col">
            <LabPlate project={project} />

            <div className="flex flex-col gap-1 p-3 md:p-4">
              {/* Where VizShowcase puts a rank and a view count, this puts the
                  two facts that actually distinguish these pieces: they run,
                  and they run on whatever subject you name. */}
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

/**
 * The interactive tier of #work, above the Tableau contact sheet.
 *
 * It goes first because it is the only work on this page that runs here — the
 * Tableau sheet below it is a set of doors to another site, and putting the
 * hosted work under the linked work would bury the distinction the section is
 * making.
 */
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
          Live climate charts, built and hosted here. Pick a country or a city
          and they redraw from current data &mdash; then hand you the SVG.
        </p>
      </div>

      {/* No CTA under this grid, unlike the two sections around it. Those
          point somewhere the section is only showing part of — the archive,
          the Tableau profile. This grid is the whole of the interactive work,
          and every plate on it already goes to the thing itself. */}
      <LabPlateGrid projects={labProjects} />
    </section>
  );
}
