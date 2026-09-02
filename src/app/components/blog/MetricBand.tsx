import tableauData from "@/app/data/tableauProjects.json";

/* Both figures are derived from the same snapshot the gallery renders and the
   prebuild script refreshes, so the band cannot drift out of date against the
   work it is describing — and the count matches the "View all N vizzes" CTA
   below it exactly, because it is the same array. */
const TOTAL_VIEWS = tableauData.projects.reduce((sum, project) => sum + project.viewCount, 0);
const VIZ_COUNT = tableauData.projects.length;

const number = new Intl.NumberFormat("en-US");

/**
 * The page's one metric moment, sitting between who is writing and what he has
 * built — the number is the transition between the two.
 *
 * A single figure rather than a row of three: the scale's metric step is sized
 * for one number, and three of them at that size would be a dashboard, which is
 * precisely the thing the writing above it argues against.
 *
 * No count-up animation. Motion in this system is caused by scroll or by
 * interaction; a figure that animates itself on load is decoration, and the
 * token file's motion tier rules that out.
 */
export function MetricBand() {
  /* An empty snapshot means the prebuild fetch failed. VizShowcase says so in
     its own words further down; a band reading "0" would be worse than absent,
     so this one simply steps out of the page. */
  if (VIZ_COUNT === 0) return null;

  return (
    <>
      <section aria-label="Published work in numbers">
        <p className="tif-metric">{number.format(TOTAL_VIEWS)}</p>
        <p className="tif-lede" style={{ marginTop: "var(--space-2)" }}>
          views across {VIZ_COUNT} visualizations, published open on Tableau
          Public.
        </p>
      </section>

      {/* The band closes itself. Kept here rather than in BlogHome so that an
          empty snapshot takes this rule with it, instead of leaving two
          hairlines stacked with nothing between them. */}
      <hr className="tif-hairline" style={{ marginBlock: "var(--space-5)" }} />
    </>
  );
}
