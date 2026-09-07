import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { labProjectBySlug, vizHref } from "@/app/data/lab";
import { buildUrl, setPageMeta } from "@/app/utils/seo";

/* Everything the site chrome isn't.
 *
 * The masthead is sticky at --nav-height and the progress floor is fixed along
 * the bottom edge, so those two are the whole of what the chart has to share
 * the viewport with — subtract them and the frame is the rest. The footer sits
 * below the fold, reached by scrolling, which is what "full screen with the
 * site still around it" actually means.
 *
 * svh rather than vh: on mobile Safari vh is the *largest* viewport, so a vh
 * frame would run its last band under the address bar on arrival and only look
 * right after the reader had already scrolled. */
const FRAME_HEIGHT =
  "calc(100svh - var(--nav-height) - var(--floor-tick-height) - env(safe-area-inset-bottom, 0px))";

/**
 * /lab/:slug — one chart, running, with the masthead above it and the footer
 * below.
 *
 * There is no framing page between the plate on the home page and this: the
 * charts introduce themselves — title, subtitle, method note, source line and
 * the export buttons all live inside the bundle — so a wrapper explaining them
 * would only say the same things twice at a smaller size. What this route adds
 * is the one thing the standalone file cannot: the reader stays on the site,
 * with the nav they arrived by still on screen.
 *
 * Full-bleed on purpose — no .tif-shell. The chart caps itself at its own
 * --w-page and centres, so the measure is kept by the thing that knows what
 * its own measure should be.
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

  /* An unknown slug goes home rather than to a dead end. There is no index of
     charts to fall back to any more — the plates on the home page are it. */
  if (!project) return <Navigate to="/" replace />;

  return (
    <section aria-label={project.title}>
      {/* The chart's own <h1> is inside the iframe, where the page outline
          cannot see it. This one is the route's heading, so the document isn't
          headless for a screen reader walking it. */}
      <h1 className="sr-only">{project.title}</h1>

      <iframe
        src={vizHref(project, project.defaultSubject)}
        title={project.title}
        className="block w-full"
        style={{
          height: FRAME_HEIGHT,
          border: 0,
          /* The chart's own ground, so the frame doesn't flash --canvas
             through before the bundle paints. */
          backgroundColor: "var(--paper)",
        }}
      />
    </section>
  );
}
