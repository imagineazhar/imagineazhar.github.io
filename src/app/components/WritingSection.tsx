import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";

export function WritingSection() {
  const articles = [
    {
      title: "The Psychology of Color in Data Visualization",
      excerpt: "Understanding how color choices impact data interpretation and decision-making. A deep dive into perception theory and practical applications for dashboard design.",
      category: "Design Theory",
      readTime: "8 min read",
      date: "Jan 15, 2026",
      tags: ["Color Theory", "Psychology", "Best Practices"]
    },
    {
      title: "Building Real-Time Dashboards with D3.js and WebSockets",
      excerpt: "A technical guide to creating performant, real-time data visualizations that scale to handle thousands of updates per second without sacrificing user experience.",
      category: "Technical",
      readTime: "12 min read",
      date: "Dec 28, 2025",
      tags: ["D3.js", "WebSockets", "Performance"]
    },
    {
      title: "When to Use Tables vs. Charts: A Decision Framework",
      excerpt: "Not every dataset needs a chart. Learn when tables outperform visualizations and how to make the right choice for your audience and use case.",
      category: "Best Practices",
      readTime: "6 min read",
      date: "Dec 10, 2025",
      tags: ["Decision Making", "UX", "Data Design"]
    },
    {
      title: "The Hidden Cost of Dashboard Complexity",
      excerpt: "How cognitive load affects dashboard effectiveness and why simplicity often beats feature richness. Lessons from 50+ enterprise implementations.",
      category: "Case Study",
      readTime: "10 min read",
      date: "Nov 22, 2025",
      tags: ["UX", "Enterprise", "Simplicity"]
    },
    {
      title: "Accessible Data Visualization: Beyond WCAG Compliance",
      excerpt: "Creating truly inclusive visualizations that serve users with diverse abilities. Practical techniques for color blindness, screen readers, and cognitive accessibility.",
      category: "Accessibility",
      readTime: "9 min read",
      date: "Nov 5, 2025",
      tags: ["Accessibility", "Inclusion", "Standards"]
    }
  ];

  return (
    <section id="writing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2]">Writing & Thinking</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-[1.6]">
            Exploring the intersection of design, data, and human perception. Thoughts on best practices, 
            technical deep-dives, and lessons learned from real-world projects.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <article
              key={index}
              className="group border border-[#B6C9CF]/50 rounded-xl p-6 hover:border-[#FA9819] hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-[#C6EBF7]/50 text-xs font-medium text-slate-700 rounded-full group-hover:bg-[#FA9819] group-hover:text-white transition-colors leading-none">
                  {article.category}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#FA9819] opacity-0 group-hover:opacity-100 transition-all" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium mb-3 group-hover:text-slate-600 transition-colors leading-[1.3]">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-slate-600 text-sm leading-[1.5] mb-4">
                {article.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs text-slate-500 leading-none"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* See More on Medium Button */}
        <div className="text-center">
          <a
            href="https://medium.com/@imagineazhar"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FA9819] text-white text-base font-medium rounded-lg hover:bg-[#e8890f] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>See more on Medium</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}