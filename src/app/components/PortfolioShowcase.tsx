import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

interface ShowcaseTile {
  id: string;
  title: string;
  span: string;
}

// Placeholder tiles — swap /example.png and titles for real personal-project visuals later.
const TILES: ShowcaseTile[] = [
  { id: "t1", title: "Personal Project 01", span: "md:col-span-2 md:row-span-2" },
  { id: "t2", title: "Personal Project 02", span: "md:row-span-1" },
  { id: "t3", title: "Personal Project 03", span: "md:row-span-1" },
  { id: "t4", title: "Personal Project 04", span: "md:col-span-2 md:row-span-1" },
  { id: "t5", title: "Personal Project 05", span: "md:row-span-2" },
  { id: "t6", title: "Personal Project 06", span: "md:row-span-1" },
];

export function PortfolioShowcase() {
  const prefersReducedMotion = useReducedMotion();

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-4">
          {TILES.map((tile, index) => (
            <motion.a
              key={tile.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`group relative overflow-hidden rounded-lg border border-white/10 ${tile.span}`}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
            >
              <img
                src="/example.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p
                  className="text-sm font-medium text-white"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {tile.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}
