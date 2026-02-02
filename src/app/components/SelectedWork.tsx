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
    },
    {
      title: "Retail Sales Intelligence",
      client: "National Retail Chain",
      category: "Retail",
      description: "Multi-channel sales analytics combining in-store and e-commerce data, customer journey mapping, and inventory optimization across 200+ locations.",
      tools: ["Tableau", "R", "BigQuery"],
      metrics: ["30% revenue increase", "20% inventory reduction", "200+ stores"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MXx8fHwxNzcwMDE1Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-slate-50 via-white to-[#C6EBF7]/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2]">Selected Work</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-[1.6]">
            A curated collection of data visualization projects spanning healthcare, finance, 
            technology, and retail. Each project represents a unique challenge in transforming 
            complex data into actionable insights.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden border border-[#B6C9CF]/50 hover:border-[#FA9819] transition-all duration-300 hover:shadow-2xl"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FA9819]/40 via-slate-900/0 to-slate-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-slate-900 rounded-full group-hover:bg-[#FA9819] group-hover:text-white transition-colors leading-none">
                    {project.category}
                  </span>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:bg-[#FA9819]">
                  <ExternalLink className="w-4 h-4 text-slate-900 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Project Details */}
              <div className="p-5">
                <h3 className="text-xl font-medium mb-1 group-hover:text-slate-600 transition-colors leading-[1.3]">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3 leading-[1.5]">{project.client}</p>
                
                <p className="text-sm text-slate-600 leading-[1.5] mb-4">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.metrics.map((metric, metricIndex) => (
                    <span
                      key={metricIndex}
                      className="px-2.5 py-0.5 bg-[#C6EBF7]/40 text-xs text-slate-700 rounded-full group-hover:bg-[#FA9819]/20 transition-colors leading-none"
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