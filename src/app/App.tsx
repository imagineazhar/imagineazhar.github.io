import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Masthead } from "@/app/components/blog/Masthead";
import { SiteFooter } from "@/app/components/blog/SiteFooter";
import { ProgressFloor } from "@/app/components/blog/TheFloor";
import { GhostCursor } from "@/app/components/blog/GhostCursor";
import { BlogHome } from "@/app/pages/BlogHome";
import { ArchivePage } from "@/app/pages/ArchivePage";
import { useFeed, type FeedState } from "@/app/hooks/useFeed";
import { waitForElement } from "@/app/utils/waitForElement";

function PageTransition({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0 }}
      // Exit runs shorter than enter so navigation never feels held up.
      transition={{ duration: 0.2, ease: [0.45, 0, 0.55, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes({ feed }: { feed: FeedState }) {
  const location = useLocation();

  /* Navigation lands wherever the URL says, and focus follows it or a screen
     reader stays parked in the old position.

     The hash is handled here rather than in the masthead so every route into a
     section behaves identically: a link from the archive, a pasted /#work, and
     the back button all run this one path. Depending on hash as well as pathname
     is what makes a same-page section jump work at all — the pathname never
     changes for those.

     Neither scroll call passes a behavior option, so the CSS scroll-behavior
     governs and reduced-motion readers get an instant jump without a second
     code path here. */
  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
      document.getElementById("main")?.focus({ preventScroll: true });
    };

    const id = location.hash.slice(1);
    if (!id) {
      toTop();
      return;
    }

    /* waitForElement, not a direct lookup: arriving from another route, this
       effect fires while the outgoing page is still mounted and the section
       does not exist yet. An unresolvable hash falls back to the top. */
    return waitForElement(
      id,
      (target) => {
        target.scrollIntoView();
        /* Sections aren't focusable by default; the attribute makes this one
           programmatically focusable without adding it to the tab order.
           preventScroll because scrollIntoView has already positioned the page —
           focus() would otherwise scroll it again and undo the anchor offset. */
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      },
      toTop
    );
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <BlogHome feed={feed} />
            </PageTransition>
          }
        />
        <Route
          path="/archive"
          element={
            <PageTransition>
              <ArchivePage feed={feed} />
            </PageTransition>
          }
        />
        {/* Unknown URLs — including links to the retired /case-study/* pages —
            land on the essays index instead of a blank shell. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

/**
 * The feed is fetched once here and passed down, so moving between the index
 * and the archive doesn't re-hit the syndication API, and the footer count
 * always matches what the pages are showing.
 */
function Shell() {
  const feed = useFeed();

  return (
    <div className="tif min-h-dvh">
      <a href="#main" className="tif-btn tif-btn--primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]">
        Skip to content
      </a>

      <Masthead />

      <main id="main" tabIndex={-1} style={{ outline: "none" }}>
        <AnimatedRoutes feed={feed} />
      </main>

      <SiteFooter postCount={feed.posts.length} />

      {/* Sits above the footer's last rule; the spacer keeps the fixed floor
          from covering the final line of content. */}
      <div aria-hidden="true" style={{ height: "var(--floor-tick-height)" }} />
      <ProgressFloor />

      {/* Last, and outside every scrolling region — it is fixed to the viewport
          and follows the pointer across whichever route is mounted. */}
      <GhostCursor />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}
