import { BarChart3, Linkedin, type LucideIcon } from "lucide-react";
import tableauData from "@/app/data/tableauProjects.json";

type AboutLink = {
  label: string;
  Icon: LucideIcon;
  href: string;
};

const LINKS: AboutLink[] = [
  { label: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com/in/imagineazhar" },
  { label: "Tableau Public", Icon: BarChart3, href: tableauData.profileUrl },
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="tif-anchor">
      <div className="grid gap-8 md:grid-cols-[160px_minmax(0,1fr)] md:gap-10">
        {/* Explicit box + aspect-ratio so the bio beside it never reflows when
            the image lands. Served at 2x the 160px box, pre-cropped square. */}
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
            <span className="block" style={{ marginBottom: "var(--space-2)" }}>
              I&rsquo;m a data analytics professional with a designer&rsquo;s eye
              and a lawyer&rsquo;s instinct.
            </span>
            I&rsquo;m particularly interested in the space between &ldquo;here&rsquo;s
            the data&rdquo; and &ldquo;here&rsquo;s what it means.&rdquo;
          </p>

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
