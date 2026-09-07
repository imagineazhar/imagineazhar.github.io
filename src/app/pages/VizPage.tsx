import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { labProjectBySlug, vizHref } from "@/app/data/lab";
import { buildUrl, setPageMeta } from "@/app/utils/seo";

/* Everything the site chrome isn't: the sticky masthead and the fixed progress
   floor are the whole of what the chart shares the viewport with.

   svh rather than vh — on mobile Safari vh is the *largest* viewport, so a vh
   frame runs its last band under the address bar on arrival. */
const FRAME_HEIGHT =
  "calc(100svh - var(--nav-height) - var(--floor-tick-height) - env(safe-area-inset-bottom, 0px))";

/**
 * /lab/:slug — one chart, running, framed by the site chrome.
 *
 * No wrapper copy: the charts introduce themselves (title, method note, source
 * line and export buttons all live inside the bundle), so a framing page would
 * say the same things twice at a smaller size. Full-bleed, no .tif-shell — the
 * chart caps itself at its own --w-page.
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
    <section aria-label={project.title}>
      {/* The chart's own <h1> is inside the iframe, where the page outline
          cannot see it, so the route carries one of its own. */}
      <h1 className="sr-only">{project.title}</h1>

      <iframe
        src={vizHref(project, project.defaultSubject)}
        title={project.title}
        className="block w-full"
        style={{
          height: FRAME_HEIGHT,
          border: 0,
          // The chart's own ground, so the frame doesn't flash --canvas first.
          backgroundColor: "var(--paper)",
        }}
      />
    </section>
  );
}
