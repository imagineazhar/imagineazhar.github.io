import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ExternalLink, BarChart3, Github } from "lucide-react";
import { useState } from "react";

export function DataGallery() {
  const [hoveredViz, setHoveredViz] = useState<number | null>(
    null,
  );

  const visualizations = [
    {
      title: "Baltimore's Trash Wheel",
      type: "Enviromental Visualization",
      tools: "R - ggplot",
      description:
        "Analysis of items types captured by Baltimore's trash wheels.",
      image:
        "https://raw.githubusercontent.com/imagineazhar/TidyTuesday/refs/heads/main/2024/2024-03-09/Week10.png",
    },
    {
      title: "Population Density Map",
      type: "Enviromental Visualization",
      tools: "D3.js",
      description:
        "Heat map visualization showing population distribution across major metropolitan areas.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGNoYXJ0cyUyMGdyYXBoc3xlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Stock Market Performance",
      type: "Financial Dashboard",
      tools: "Power BI",
      description:
        "Real-time tracking of S&P 500 companies with sector analysis and correlation matrices.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2OTY4NzY5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Network Graph Analysis",
      type: "Relationship Mapping",
      tools: "Observable",
      description:
        "Force-directed graph showing connections between 10K+ entities with community detection.",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwZ3JhcGglMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2OTY4NzY5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Customer Segmentation",
      type: "Clustering Analysis",
      tools: "Python + Plotly",
      description:
        "3D scatter plot revealing distinct customer personas through behavioral data analysis.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBjaGFydHN8ZW58MXx8fHwxNzY5Njg3Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Healthcare Outcomes",
      type: "Statistical Dashboard",
      tools: "Tableau",
      description:
        "Comparative analysis of treatment effectiveness across 50+ hospitals with outcome predictions.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZGF0YSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Sales Pipeline Flow",
      type: "Sankey Diagram",
      tools: "D3.js",
      description:
        "Flow visualization tracking conversion rates through each stage of the sales funnel.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGNoYXJ0cyUyMGdyYXBoc3xlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Energy Consumption Patterns",
      type: "Time-series Analysis",
      tools: "R + ggplot2",
      description:
        "Hourly energy usage patterns with seasonal decomposition and anomaly detection.",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Social Media Sentiment",
      type: "Text Analytics",
      tools: "Python + Altair",
      description:
        "Real-time sentiment analysis across 1M+ social media posts with topic modeling.",
      image:
        "https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section id="gallery" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          {/* Section accent line */}
          <div className="h-1 w-16 bg-accent mb-6"></div>
          <h2 className="text-4xl md:text-5xl mb-6 text-black">
            Data Visualization Gallery
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore a collection of interactive dashboards,
            statistical graphics, and data art. Each
            visualization tells a unique story through carefully
            crafted visual encodings and thoughtful design
            decisions.
          </p>
        </div>

        {/* External Portfolio Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Tableau Public Card */}
          <a
            href="https://public.tableau.com/app/profile/m.azhar/vizzes"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 hover:border-accent transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <ExternalLink className="w-6 h-6 text-black opacity-0 group-hover:opacity-100 group-hover:text-accent transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl mb-3 text-black">
                Tableau Public Portfolio
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                View my complete collection of interactive
                dashboards and data stories published on Tableau
                Public. Featuring business intelligence,
                exploratory analysis, and data journalism
                projects.
              </p>
              <div className="flex items-center gap-2 text-black font-medium group-hover:text-accent transition-colors duration-300">
                <span>Explore Tableau Vizzes</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                  linear-gradient(to right, #000000 1px, transparent 1px),
                  linear-gradient(to bottom, #000000 1px, transparent 1px)
                `,
                  backgroundSize: "30px 30px",
                }}
              />
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/imagineazhar"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 hover:border-accent transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-accent">
                  <Github className="w-8 h-8 text-white group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <ExternalLink className="w-6 h-6 text-black opacity-0 group-hover:opacity-100 group-hover:text-accent transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl mb-3 text-black">
                GitHub Repository
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Access the source code behind my data
                visualizations. Explore D3.js examples and R scripts.
              </p>
              <div className="flex items-center gap-2 text-black font-medium group-hover:text-accent transition-colors duration-300">
                <span>Browse Code & Projects</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                  linear-gradient(to right, #000000 1px, transparent 1px),
                  linear-gradient(to bottom, #000000 1px, transparent 1px)
                `,
                  backgroundSize: "30px 30px",
                }}
              />
            </div>
          </a>
        </div>

        {/* Visualization Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visualizations.map((viz, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-lg cursor-pointer"
              onMouseEnter={() => setHoveredViz(index)}
              onMouseLeave={() => setHoveredViz(null)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={viz.image}
                  alt={viz.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:bg-accent">
                  <ExternalLink className="w-5 h-5 text-black group-hover:text-accent-foreground transition-colors" />
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-black rounded-full">
                    {viz.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg mb-2 text-black group-hover:text-gray-700 transition-colors">
                  {viz.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                  {viz.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-700 font-medium">
                    {viz.tools}
                  </span>
                  <div
                    className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
                      hoveredViz === index
                        ? "translate-x-1"
                        : ""
                    }`}
                  >
                  <span className="text-black group-hover:text-accent transition-colors">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
