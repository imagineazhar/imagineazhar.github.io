import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { caseStudies } from "@/app/data/caseStudies";

export function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = caseStudies[activeIndex];
  const prefersReducedMotion = useReducedMotion();

  const featuredMetrics = useMemo(() => {
    const numeric = activeProject.metrics.filter((metric) => /\d/.test(metric));
    return (numeric.length ? numeric : activeProject.metrics).slice(0, 2);
  }, [activeProject.metrics]);

  const splitMetric = (metric: string) => {
    const tokens = metric.split(" ");
    const first = tokens[0] || metric;
    const second = tokens[1] || "";
    const firstHasNumber = /\d/.test(first);
    const secondHasNumber = /\d/.test(second);
    if (firstHasNumber) {
      return { value: first, label: tokens.slice(1).join(" ") };
    }
    if (secondHasNumber) {
      return { value: `${first} ${second}`.trim(), label: tokens.slice(2).join(" ") };
    }
    return { value: metric, label: "" };
  };

  return (
    <section id="portfolio" className="scroll-anchor relative py-32 bg-white">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="h-1 w-16 bg-accent mb-6"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2] text-black">
            Selected Work
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-[1.6]">
            A small selection of projects where analytics and design were used to clarify decisions.
          </p>
        </div>

        {/* Project Tabs */}
        <div
          role="tablist"
          aria-label="Selected work projects"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {caseStudies.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="selected-work-panel"
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`btn-luma ${
                  isActive ? "btn-luma--primary" : "btn-luma--soft text-gray-500 hover:text-black"
                } flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium`}
              >
                <span className={`text-xs ${isActive ? "opacity-80" : "text-gray-400"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{project.title}</span>
                {project.isConcept && (
                  <span
                    className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${
                      isActive ? "bg-current opacity-70" : "bg-accent/60"
                    }`}
                    aria-hidden="true"
                    title="Concept project"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Featured Project */}
        <div id="selected-work-panel" className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-2xl border border-gray-200 bg-gray-50/70 shadow-lg p-6 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
                <Link
                  to={`/case-study/${activeProject.id}`}
                  className="group relative block overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] bg-gray-100">
                    <ImageWithFallback
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-medium text-black mb-3 leading-[1.2]">
                    {activeProject.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="text-sm text-gray-500">{activeProject.client}</p>
                    {activeProject.isConcept && (
                      <span className="inline-flex items-center rounded-full border border-dashed border-gray-300 px-2 py-0.5 text-[11px] uppercase tracking-wide text-gray-500">
                        Concept
                      </span>
                    )}
                  </div>
                  {activeProject.isConcept && activeProject.conceptNote && (
                    <p className="text-xs text-gray-400 italic mb-4 max-w-md">
                      {activeProject.conceptNote}
                    </p>
                  )}
                  <p className="text-sm sm:text-base text-gray-600 leading-[1.6] mb-6">
                    {activeProject.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {featuredMetrics.map((metric, metricIndex) => {
                      const { value, label } = splitMetric(metric);
                      return (
                        <motion.div
                          key={metricIndex}
                          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 + metricIndex * 0.08, ease: "easeOut" }}
                          className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                        >
                          <p className="text-2xl font-semibold text-black mb-1">{value}</p>
                          <p className="text-sm text-gray-600">{label || "Impact outcome"}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <Link
                    to={`/case-study/${activeProject.id}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-black hover:text-accent transition-colors"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </section>
  );
}
