import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useState } from "react";

export function SelectedWork() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Healthcare Analytics Dashboard",
      client: "Regional Medical Center",
      category: "Healthcare",
      description: "Comprehensive patient care analytics platform visualizing treatment outcomes, resource utilization, and operational efficiency metrics across 12 departments.",
      tools: ["Tableau", "Python", "SQL"],
      metrics: ["40% faster diagnosis", "25% cost reduction", "95% user adoption"],
      image: "https://images.unsplash.com/photo-1698306642516-9841228dcff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZGF0YSUyMGFuYWx5dGljcyUyMGRpc3BsYXl8ZW58MXx8fHwxNzY5Njg3NzAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Financial Performance Dashboard",
      client: "Global Investment Firm",
      category: "Finance",
      description: "Real-time portfolio analytics with interactive drill-downs, risk assessments, and predictive modeling for $2B+ in managed assets.",
      tools: ["D3.js", "React", "Power BI"],
      metrics: ["60% faster insights", "Real-time updates", "$15M saved annually"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmQlMjBncmFwaHMlMjBtZXRyaWNzfGVufDF8fHx8MTc2OTY4NzY5OXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Network Intelligence Platform",
      client: "Telecom Corporation",
      category: "Technology",
      description: "Interactive network topology visualization mapping 50K+ nodes, traffic patterns, and anomaly detection for infrastructure monitoring.",
      tools: ["D3.js", "Observable", "WebGL"],
      metrics: ["85% faster detection", "50K+ nodes", "99.9% uptime"],
      image: "https://images.unsplash.com/photo-1684610529682-553625a1ffed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMGRhdGElMjB2aXN1YWxpemF0aW9uJTIwbmV0d29ya3xlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-br from-slate-50 via-white to-[#C6EBF7]/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">Selected Work</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A curated collection of data visualization projects spanning healthcare, finance, 
            technology, and retail. Each project represents a unique challenge in transforming 
            complex data into actionable insights.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden border border-[#B6C9CF]/50 hover:border-[#FA9819] transition-all duration-300 hover:shadow-2xl"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FA9819]/40 via-slate-900/0 to-slate-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-slate-900 rounded-full group-hover:bg-[#FA9819] group-hover:text-white transition-colors">
                    {project.category}
                  </span>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:bg-[#FA9819]">
                  <ExternalLink className="w-5 h-5 text-slate-900 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-2xl mb-2 group-hover:text-slate-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{project.client}</p>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.metrics.map((metric, metricIndex) => (
                    <span
                      key={metricIndex}
                      className="px-3 py-1 bg-[#C6EBF7]/40 text-xs text-slate-700 rounded-full group-hover:bg-[#FA9819]/20 transition-colors"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Tools */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="text-xs text-slate-500"
                      >
                        {tool}
                        {toolIndex < project.tools.length - 1 && " •"}
                      </span>
                    ))}
                  </div>
                  <ArrowRight 
                    className={`w-5 h-5 text-[#FA9819] transition-transform duration-300 ${
                      hoveredProject === index ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a 
            href="https://public.tableau.com/app/profile/m.azhar/vizzes"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-[#FA9819] text-white rounded-lg hover:bg-[#e8890f] transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}