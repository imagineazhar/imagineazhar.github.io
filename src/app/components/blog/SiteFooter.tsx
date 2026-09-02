import { Link } from "react-router-dom";
import { Archive, Home, Mail, Linkedin, Github } from "lucide-react";
import { FEED_SOURCES } from "@/app/data/feeds";
import { sourceIcon } from "@/app/components/blog/sourceIcons";

const SOCIALS = [
  { label: "Email Muhammad Azhar", href: "mailto:2muhammadazhar@gmail.com", Icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/imagineazhar", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/imagineazhar", Icon: Github },
];

/* Icon sits inside the link box, so the hover underline spans both. */
const LINK = "tif-link tif-caption inline-flex items-center gap-2";

export function SiteFooter({ postCount }: { postCount: number }) {
  const live = FEED_SOURCES.filter((s) => s.enabled);

  /* No id="contact" on this element any more — that anchor belongs to the Let's
     Connect block above it, and two elements sharing one id makes the target
     ambiguous for both the browser and assistive tech. */
  return (
    <footer style={{ borderTop: "var(--rule-hairline) solid var(--hairline-color)" }}>
      <div className="tif-shell" style={{ paddingBlock: "var(--space-5)" }}>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="tif-h2" style={{ fontSize: "var(--fs-body-lg)", color: "var(--ink)" }}>
              Data doesn&rsquo;t make decisions. People do. I make sure they have
              what they need.
            </p>
            <p className="tif-caption mt-3" style={{ maxWidth: "42ch" }}>
              Data analytics specialist focused on data visualization and
              enterprise data strategy.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2">
              {/* "Essays" pointed at a page that opens on a positioning
                  statement and the Tableau work — the same mislabel the header
                  carried. The essays themselves are the archive, below. */}
              <li>
                <Link to="/" className={LINK}>
                  <Home aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/archive" className={LINK}>
                  <Archive aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Archive
                </Link>
              </li>
              {live.map((source) => {
                const Icon = sourceIcon(source.id);
                return (
                  <li key={source.id}>
                    <a
                      href={source.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${source.name} (opens in a new tab)`}
                      className={LINK}
                    >
                      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {source.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <div className="flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="tif-btn tif-btn--quiet"
                  style={{ padding: 0, width: 44, height: 44, minHeight: 44 }}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* The signature tick device is gone; the colophon it carried is not —
            dropping the notice along with the ornament would lose the copyright
            line. Plain mono row over a hairline, no ticks and no marker. */}
        <div style={{ marginTop: "var(--space-5)" }}>
          <hr className="tif-hairline" />
          <div className="flex flex-wrap items-baseline justify-between gap-4 pt-4">
            <span className="tif-micro">Muhammad Azhar</span>
            <span className="tif-micro tif-tabular">
              {postCount} {postCount === 1 ? "Essay" : "Essays"} · © 2026 · All rights
              reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
