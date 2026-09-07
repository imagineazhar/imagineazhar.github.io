import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { labProjectBySlug, vizHref } from "@/app/data/lab";
import { buildUrl, setPageMeta } from "@/app/utils/seo";

/* One viewport, minus the chrome the chart shares it with: the sticky masthead
   above and the fixed progress floor below.

   svh rather than vh — on mobile Safari vh is the *largest* viewport, so a vh
   frame runs its last band under the address bar on arrival. */
const PAGE_HEIGHT =
  "calc(100svh - var(--nav-height) - var(--floor-tick-height) - env(safe-area-inset-bottom, 0px))";

/**
 * /lab/:slug — one chart, running, framed by the site chrome.
 *
 * The bar is the only copy on the route, and both halves earn their line: a
 * way out, because every masthead link is a section jump and a deep link
 * arrives with nothing behind it to go back to; and a note that the numbers
 * are fetched when the chart opens, which is the one thing a still poster
 * cannot tell you. The rest the chart says for itself — title, method note,
 * source line and export buttons all live inside the bundle.
 *
 * Column layout rather than a second height calc: the bar wraps to two rows on
 * narrow screens, and the frame takes whatever is left instead of pushing the
 * page into a scroll. Full-bleed below the bar — the chart caps itself at its
 * own --w-page.
 */
export function VizPage() {
  const { slug } = useParams();
  const project = labProjectBySlug(slug);

  useEffect(() => {
    if (!project) return;
    setPageMeta({
      title: `${project.title} — Muhammad Azhar`,
      description: project.dek,
      url: buildUrl(`/lab/${project.slug}`),
    });
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <section
      aria-label={project.title}
      className="flex flex-col"
      style={{ height: PAGE_HEIGHT }}
    >
      {/* The chart's own <h1> is inside the iframe, where the page outline
          cannot see it, so the route carries one of its own. */}
      <h1 className="sr-only">{project.title}</h1>

      <div
        className="tif-shell flex flex-wrap items-center justify-between gap-x-4 gap-y-2"
        style={{
          paddingBlock: 8,
          borderBottom: "var(--rule-hairline) solid var(--hairline-color)",
        }}
      >
        {/* A route back, not history.back(): the destination is the same grid
            the plate was clicked from whether the visitor came from there or
            landed on a shared link, and App.tsx's hash effect parks them on
            the section rather than at the top of the page. */}
        <Link to="/#work" className="tif-btn tif-btn--quiet" style={{ paddingInline: 16 }}>
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to charts
        </Link>

        <p className="tif-caption" style={{ maxWidth: "56ch" }}>
          Live — this chart pulls its data straight from the source each time it
          opens, so what you are reading is the current record, not a snapshot.
        </p>
      </div>

      {/* min-h-0 so the frame can be shorter than its own content box: without
          it a flex item floors at min-content and the bar pushes it off. */}
      <iframe
        src={vizHref(project, project.defaultSubject)}
        title={project.title}
        className="block w-full min-h-0 flex-1"
        style={{
          border: 0,
          // The chart's own ground, so the frame doesn't flash --canvas first.
          backgroundColor: "var(--paper)",
        }}
      />
    </section>
  );
}
