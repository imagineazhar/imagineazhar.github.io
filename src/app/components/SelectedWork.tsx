import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/app/data/caseStudies";

export function SelectedWork() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="portfolio" className="relative py-32 bg-white">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          {/* Section accent line */}
          <div className="h-1 w-16 bg-accent mb-6"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2] text-black">Selected Work</h2>
          <p className="text-base sm:text-lg text-gray-600 leading-[1.6]">
            A small selection of projects where analytics and design were used to calrify decisions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {caseStudies.map((project:any, index:any) => (
            <Link
              key={project.id}
              to={`/case-study/${project.id}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-accent transition-all duration-300 hover:shadow-2xl block"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-black rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors leading-none">
                    {project.category}
                  </span>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:bg-accent">
                  <ArrowRight className="w-4 h-4 text-black group-hover:text-accent-foreground transition-colors" />
                </div>
              </div>

              {/* Project Details */}
              <div className="p-5">
                <h3 className="text-xl font-medium mb-1 text-black group-hover:text-gray-700 transition-colors leading-[1.3]">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 leading-[1.5]">{project.client}</p>
                
                <p className="text-sm text-gray-600 leading-[1.5] mb-4">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.metrics.map((metric, metricIndex) => (
                    <span
                      key={metricIndex}
                      className="px-2.5 py-0.5 bg-gray-100 text-xs text-gray-700 rounded-full group-hover:bg-gray-200 transition-colors leading-none"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Tools */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="text-xs text-gray-500"
                      >
                        {tool}
                        {toolIndex < project.tools.length - 1 && " •"}
                      </span>
                    ))}
                  </div>
                  <ArrowRight 
                    className={`w-5 h-5 text-black group-hover:text-accent transition-transform duration-300 ${
                      hoveredProject === index ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a 
            href="https://public.tableau.com/app/profile/m.azhar/vizzes"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-primary text-primary-foreground rounded-[var(--radius)] hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      
      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </section>
  );
}
