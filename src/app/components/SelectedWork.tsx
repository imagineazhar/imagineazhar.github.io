import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/app/data/caseStudies";

export function SelectedWork() {
  const featuredProjects = useMemo(() => caseStudies.slice(0, 3), []);
  const [activeIndex, setActiveIndex] = useState(1);
  const activeProject = featuredProjects[activeIndex];
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
    <section id="portfolio" className="relative py-32 bg-white">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {featuredProjects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`btn-luma btn-luma--soft w-full px-6 py-3 text-sm font-medium ${
                  isActive
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                PROJECT {index + 1}
              </button>
            );
          })}
        </div>

        {/* Featured Project */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50/70 shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="aspect-[4/3] bg-gray-100">
                <ImageWithFallback
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
                {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <h3 className="text-2xl sm:text-3xl font-medium text-black mb-3 leading-[1.2]">
                {activeProject.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{activeProject.client}</p>
              <p className="text-sm sm:text-base text-gray-600 leading-[1.6] mb-6">
                {activeProject.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {featuredMetrics.map((metric, metricIndex) => {
                  const { value, label } = splitMetric(metric);
                  return (
                    <div
                      key={metricIndex}
                      className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                    >
                      <p className="text-2xl font-semibold text-black mb-1">{value}</p>
                      <p className="text-sm text-gray-600">{label || "Impact outcome"}</p>
                    </div>
                  );
                })}
              </div>

              <Link
                to={`/case-study/${activeProject.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-accent transition-colors"
              >
                View Case Study
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </section>
  );
}
