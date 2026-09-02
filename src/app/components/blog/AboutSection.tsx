import { BarChart3, Linkedin, type LucideIcon } from "lucide-react";
import tableauData from "@/app/data/tableauProjects.json";

type AboutLink = {
  label: string;
  Icon: LucideIcon;
  href: string;
};

/* Two links, where this row used to carry six.

   Medium, Substack, GitHub and email were all repeated from the Let's Connect
   block and the footer, which put most accounts on the page two or three times
   over — and a row of pills that long reads as a link dump rather than as
   evidence. What stays is what the bio above is actually claiming: the
   professional record, and the work itself. Everything cut is still one scroll
   away in the footer, which is the page's complete index by design.

   Module scope, not built per render — nothing here depends on state. */
const LINKS: AboutLink[] = [
  { label: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com/in/imagineazhar" },
  { label: "Tableau Public", Icon: BarChart3, href: tableauData.profileUrl },
];

/**
 * Who is writing this: portrait, two-sentence bio, and the two places the claim
 * can be checked — each one an icon-led pill rather than a bare text link.
 */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="tif-anchor">
      <div className="grid gap-8 md:grid-cols-[160px_minmax(0,1fr)] md:gap-10">
        {/* Explicit box + aspect-ratio so the portrait reserves its space and
            the bio beside it never reflows when the image lands.

            Served at 320px — 2x the 160px box, so it stays sharp on retina —
            and pre-cropped square to the same centre crop object-cover was
            doing at runtime. The full-resolution portrait.png is no longer
            referenced by anything shipped: og-card.png is its own 1200x630
            composition, and this is the only place the face appears on the
            site. */}
        <img
          src="/portrait.webp"
          alt="Portrait of Muhammad Azhar"
          width={160}
          height={160}
          className="w-full max-w-[160px] object-cover"
          style={{
            aspectRatio: "1 / 1",
            borderRadius: "var(--radius-card)",
            border: "var(--rule-hairline) solid var(--paper-line)",
          }}
        />

        <div className="min-w-0">
          <h2 id="about-heading" className="tif-h1" style={{ color: "var(--ink)" }}>
            About Muhammad Azhar
          </h2>

          <p
            className="tif-lede"
            style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-body)" }}
          >
            I work with data in environments where clarity matters and decisions
            carry real consequences. My focus isn&rsquo;t producing dashboards
            &mdash; it&rsquo;s shaping analysis to support sound judgment.
          </p>

          {/* Full button padding now the row is two items rather than six — the
              tighter inline padding only existed to stop the long row wrapping,
              and these now match every other CTA on the page. */}
          <ul className="flex flex-wrap gap-3" style={{ marginTop: "var(--space-3)" }}>
            {LINKS.map(({ label, Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  /* The icon is decorative, so the anchor carries the only
                     warning that the link leaves the site. */
                  aria-label={`${label} (opens in a new tab)`}
                  className="tif-btn tif-btn--quiet"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
