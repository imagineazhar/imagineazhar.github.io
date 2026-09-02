import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, BarChart3, Menu, PenLine, User, X } from "lucide-react";
import { useActiveSection } from "@/app/hooks/useActiveSection";

/* Sections of the home page, in document order. The order is not cosmetic: the
   active indicator only reads as "you are here" if the nav sequence matches the
   scroll sequence — otherwise the highlight moves non-monotonically on the way
   down the page and reads as a bug.

   Targets are absolute paths so one set of links serves both routes. From the
   archive they navigate home and then scroll, which the hash effect in App.tsx
   handles centrally. */
const SECTIONS = [
  { id: "about", label: "About", Icon: User },
  { id: "work", label: "Work", Icon: BarChart3 },
  { id: "writing", label: "Writing", Icon: PenLine },
] as const;

/* Module scope keeps the array identity stable across renders — the observer
   inside useActiveSection keys its effect on it. */
const SECTION_IDS = SECTIONS.map((section) => section.id);

/* Touch floor. On the bar it is the row height; in the sheet it is applied to
   the inner span, which is what actually wraps the label. */
const TAP_TARGET = 44;

/* Both states carry the border so switching the active item never shifts the
   row. Weight and colour are .tif-accent-rule's — the same slate bar that marks
   every section heading — so the nav reads as part of the system rather than as
   a browser-default underline. */
const navItemStyle = (isActive: boolean) => ({
  color: isActive ? "var(--ink)" : "var(--gray)",
  borderBottom: `var(--rule-accent) solid ${isActive ? "var(--slate)" : "transparent"}`,
});

const BAR_ITEM = "tif-caption inline-flex items-center gap-2 px-3 transition-colors";
const SHEET_ITEM = "tif-caption flex items-center gap-2 px-1 transition-colors";

export function Masthead() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  /* Only the home page has sections to track. */
  const activeSection = useActiveSection(SECTION_IDS, location.pathname === "/");

  /* Escape closes the sheet — a disclosure the keyboard can open needs a way
     out that isn't "go find the toggle again". */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /* Clicking the wordmark at the top of the home page produces no location
     change to react to, so return to the top explicitly. No behavior option:
     the CSS scroll-behavior governs, and that is already auto under reduced
     motion. */
  const onWordmarkClick = () => {
    setOpen(false);
    if (location.pathname === "/" && !location.hash) window.scrollTo(0, 0);
  };

  /* Icons ride in the sheet only. On the bar, four labelled icons at 15px turn
     an editorial rule into clutter; in the sheet each row has the width for one
     and they speed up scanning. */
  const sectionLinks = (onBar: boolean) =>
    SECTIONS.map(({ id, label, Icon }) => {
      const isActive = activeSection === id;
      return (
        <Link
          key={id}
          to={`/#${id}`}
          onClick={() => setOpen(false)}
          /* "location" rather than "page": these are places within a document.
             The archive link below is the one that is genuinely a page. */
          aria-current={isActive ? "location" : undefined}
          className={onBar ? BAR_ITEM : SHEET_ITEM}
          style={onBar ? { ...navItemStyle(isActive), minHeight: TAP_TARGET } : navItemStyle(isActive)}
        >
          {onBar ? (
            label
          ) : (
            <>
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span className="flex items-center" style={{ minHeight: TAP_TARGET }}>
                {label}
              </span>
            </>
          )}
        </Link>
      );
    });

  /* The archive is reached from the writing section's own "Everything, newest
     first" button and from the footer, which is present on every route — so
     pulling it out of the bar leaves it reachable without giving a secondary
     index the same weight as the page's own sections. */

  /* Quiet rather than solid: as the filled slate button this outweighed the
     wordmark and the section links combined, which is the wrong emphasis for a
     header whose job is orientation. Hairline border keeps it legible as the
     one action here without shouting. */
  const contactCta = (className: string, style?: React.CSSProperties) => (
    <Link to="/#contact" onClick={() => setOpen(false)} className={className} style={style}>
      Get in touch
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        /* Opaque canvas, no backdrop blur: the rest of the site is flat paper
           and hairlines, and blur is reserved for dismissible surfaces. */
        backgroundColor: "var(--canvas)",
        borderBottom: "var(--rule-hairline) solid var(--hairline-color)",
      }}
    >
      {/* Three columns rather than a flex row: equal 1fr flanks put the nav at
          the centre of the header itself, not at the midpoint between a short
          wordmark and a wider button — which is where justify-between would
          leave it, visibly off-centre. minmax(0,1fr) so the flanks can shrink
          instead of forcing the bar wider than the shell. */}
      <div
        className="tif-shell grid items-center gap-4"
        style={{
          height: "var(--nav-height)",
          gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)",
        }}
      >
        {/* The wordmark is identity, not metadata — display face, like every
            heading on the site. Mono is kept for dates, counts and the footer
            colophon. */}
        <Link
          to="/"
          onClick={onWordmarkClick}
          className="justify-self-start"
          style={{
            fontFamily: "var(--ff-display)",
            fontSize: "var(--fs-body)",
            fontWeight: 600,
            letterSpacing: "var(--ls-h1)",
            color: "var(--ink)",
            whiteSpace: "nowrap",
          }}
        >
          Muhammad Azhar
        </Link>

        {/* Centre column. Hidden below md, where the grid collapses to wordmark
            and toggle with an empty middle. */}
        <nav aria-label="Primary" className="hidden items-center justify-center md:flex">
          {sectionLinks(true)}
        </nav>

        {/* Right column holds whichever control the breakpoint calls for. The
            CTA is an action rather than a destination, so it sits outside the
            nav landmark. */}
        <div className="col-start-3 flex items-center justify-end">
          {/* Tighter than the default button padding — 44px stays as the touch
              floor, the horizontal bulk is what made it dominate the bar. */}
          {contactCta("tif-btn tif-btn--quiet hidden md:inline-flex", { paddingInline: 16 })}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-nav-sheet"
            className="tif-btn tif-btn--quiet md:hidden"
            style={{ padding: 10, minWidth: TAP_TARGET }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="primary-nav-sheet"
          aria-label="Primary"
          className="tif-shell flex flex-col gap-1 pb-4 md:hidden"
          style={{ borderTop: "var(--rule-hairline) solid var(--hairline-color)", paddingTop: 12 }}
        >
          {sectionLinks(false)}
          {contactCta("tif-btn tif-btn--quiet mt-2")}
        </nav>
      )}
    </header>
  );
}
