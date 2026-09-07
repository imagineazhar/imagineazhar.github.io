import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, BarChart3, Menu, PenLine, User, X } from "lucide-react";
import { useActiveSection } from "@/app/hooks/useActiveSection";

/* Must stay in document order: the active indicator only reads as "you are
   here" while the nav sequence matches the scroll sequence. Absolute paths so
   one set of links serves both routes — from the archive they navigate home
   and then scroll, which the hash effect in App.tsx handles centrally. */
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
   row. Weight and colour are .tif-accent-rule's, so the nav reads as part of
   the system rather than as a browser-default underline. */
const navItemStyle = (isActive: boolean) => ({
  color: isActive ? "var(--ink)" : "var(--gray)",
  borderBottom: `var(--rule-accent) solid ${isActive ? "var(--slate)" : "transparent"}`,
});

const BAR_ITEM = "tif-caption inline-flex items-center gap-2 px-3 transition-colors";
const SHEET_ITEM = "tif-caption flex items-center gap-2 px-1 transition-colors";

export function Masthead() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const activeSection = useActiveSection(SECTION_IDS, location.pathname === "/");

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
     the CSS scroll-behavior governs, already auto under reduced motion. */
  const onWordmarkClick = () => {
    setOpen(false);
    if (location.pathname === "/" && !location.hash) window.scrollTo(0, 0);
  };

  /* Icons ride in the sheet only — on the bar, labelled icons at 15px turn an
     editorial rule into clutter. */
  const sectionLinks = (onBar: boolean) =>
    SECTIONS.map(({ id, label, Icon }) => {
      const isActive = activeSection === id;
      return (
        <Link
          key={id}
          to={`/#${id}`}
          onClick={() => setOpen(false)}
          /* "location" rather than "page": these are places within a document.
             The archive link is the one that is genuinely a page. */
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
        /* Opaque canvas, no backdrop blur: blur is reserved for dismissible
           surfaces, and the rest of the site is flat paper and hairlines. */
        backgroundColor: "var(--canvas)",
        borderBottom: "var(--rule-hairline) solid var(--hairline-color)",
      }}
    >
      {/* Three columns rather than a flex row: equal 1fr flanks centre the nav
          on the header itself, not on the midpoint between a short wordmark and
          a wider button — where justify-between would leave it, visibly off.
          minmax(0,1fr) so the flanks shrink instead of widening the bar. */}
      <div
        className="tif-shell grid items-center gap-4"
        style={{
          height: "var(--nav-height)",
          gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)",
        }}
      >
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

        {/* Hidden below md, where the grid collapses to wordmark and toggle. */}
        <nav aria-label="Primary" className="hidden items-center justify-center md:flex">
          {sectionLinks(true)}
        </nav>

        {/* The CTA is an action rather than a destination, so it sits outside
            the nav landmark. */}
        <div className="col-start-3 flex items-center justify-end">
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
