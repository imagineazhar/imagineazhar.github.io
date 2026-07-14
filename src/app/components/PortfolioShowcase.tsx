import { ArrowUpRight, Eye } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import tableauData from "@/app/data/tableauProjects.json";

// Snapshot of the Tableau Public profile, refreshed on every build by
// scripts/fetch-tableau-projects.mjs (see the "prebuild" npm script).
const PROJECTS_SHOWN = 12;

interface TableauProject {
  title: string;
  viewCount: number;
  favorites: number;
  vizUrl: string;
  thumbnailUrl: string;
}

const viewFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function PortfolioShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const projects: TableauProject[] = tableauData.projects.slice(0, PROJECTS_SHOWN);

  return (
    <section id="personal-projects" className="relative py-32 bg-[var(--surface-dark)] text-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      <div className="max-w-6xl mx-auto px-6">
        <p
          className="mb-6 text-sm tracking-[0.25em] text-white/50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          [ PERSONAL PROJECTS ]
        </p>

        <h2 className="max-w-3xl mb-16 text-3xl sm:text-4xl md:text-5xl leading-[1.25] text-white">
          Client work is only half the story. Here&rsquo;s what I build when{" "}
          <em
            className="not-italic"
            style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}
          >
            nobody&rsquo;s asking me to
          </em>
          .
        </h2>

        {/* auto-fill + minmax lets the grid decide its own column count from
            the available width — no per-breakpoint column classes needed */}
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))]">
          {projects.map((project, index) => (
            <motion.a
              key={project.vizUrl}
              href={project.vizUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/5"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: "easeOut" }}
            >
              <ImageWithFallback
                src={project.thumbnailUrl}
                alt={`Tableau visualization: ${project.title}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4">
                <p
                  className="text-sm font-medium text-white"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {project.title}
                </p>
                <p
                  className="flex shrink-0 items-center gap-1 text-xs text-white/60"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <Eye className="h-3.5 w-3.5" />
                  {viewFormatter.format(project.viewCount)}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={tableauData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition-colors duration-300 hover:border-white/40 hover:text-white"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            View all {tableauData.projects.length} vizzes on Tableau Public
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}
