import { Briefcase, Award, Users, TrendingUp } from "lucide-react";

export function AboutSection() {
  const radarAxes = [
    { label: "Data Storytelling", value: 0.9 },
    { label: "Visual Design", value: 0.85 },
    { label: "Analytics", value: 0.8 },
    { label: "Research", value: 0.7 },
    { label: "Engineering", value: 0.75 },
    { label: "Strategy", value: 0.88 }
  ];

  const polarPoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = 120 * value;
    const x = 160 + Math.cos(angle) * radius;
    const y = 160 + Math.sin(angle) * radius;
    return `${x},${y}`;
  };

  const expertise = [
    {
      icon: TrendingUp,
      title: "Business Intelligence",
      description: "Dashboard design, KPI visualization, executive reporting"
    },
    {
      icon: Users,
      title: "User Research",
      description: "Data storytelling, perception studies, usability testing"
    },
    {
      icon: Award,
      title: "Technical Skills",
      description: "D3.js, Tableau, Power BI, Python, R, React, Observable"
    },
    {
      icon: Briefcase,
      title: "Consulting",
      description: "Strategy development, training workshops, implementation"
    }
  ];

  return (
    <section id="about" className="relative py-32 bg-gray-50">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="max-w-3xl">
            {/* Section accent line */}
            <div className="h-1 w-16 bg-accent mb-6"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2] text-black">About</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="max-w-3xl">
              <p className="text-lg text-gray-600 leading-[1.6] mb-6">
            I'm a data visualization consultant with a passion for transforming complex information 
            into clear, compelling visual narratives. With 5+ years of experience, 
            I help organizations make better decisions through smart design and clear analysis.
              </p>
              <p className="text-lg text-gray-600 leading-[1.6]">
            My approach combines deep technical expertise with a human-centered design philosophy, 
            ensuring every visualization not only looks beautiful but serves a genuine purpose in 
            driving understanding and action.
              </p>
            </div>

            {/* Radar Chart */}
            <div className="group relative p-6 bg-white border border-gray-200 rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Skill Radar</span>
            </div>
            <div className="w-full max-w-[420px] mx-auto px-2">
              <svg
                viewBox="-20 -20 360 360"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-auto overflow-visible"
                role="img"
                aria-label="Radar chart showing skill strengths"
              >
              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(195,177,225,0.45)" />
                  <stop offset="100%" stopColor="rgba(195,177,225,0.05)" />
                </linearGradient>
              </defs>

              {/* Grid */}
              {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
                <polygon
                  key={`grid-${i}`}
                  points={radarAxes
                    .map((_, index) => polarPoint(level, index, radarAxes.length))
                    .join(" ")}
                  fill="none"
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="1"
                />
              ))}

              {/* Axis lines */}
              {radarAxes.map((_, index) => (
                <line
                  key={`axis-${index}`}
                  x1="160"
                  y1="160"
                  x2={polarPoint(1, index, radarAxes.length).split(",")[0]}
                  y2={polarPoint(1, index, radarAxes.length).split(",")[1]}
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="1"
                />
              ))}

              {/* Data shape */}
              <polygon
                points={radarAxes
                  .map((axis, index) => polarPoint(axis.value, index, radarAxes.length))
                  .join(" ")}
                fill="url(#radarFill)"
                stroke="rgba(195,177,225,0.8)"
                strokeWidth="2"
              />

              {/* Data points */}
              {radarAxes.map((axis, index) => {
                const [x, y] = polarPoint(axis.value, index, radarAxes.length)
                  .split(",")
                  .map(Number);
                return (
                  <circle
                    key={`point-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#C3B1E1"
                  />
                );
              })}

              {/* Labels */}
              {radarAxes.map((axis, index) => {
                const angle = (Math.PI * 2 * index) / radarAxes.length - Math.PI / 2;
                const labelRadius = 150;
                const lx = 160 + Math.cos(angle) * labelRadius;
                const ly = 160 + Math.sin(angle) * labelRadius;
                const anchor = lx < 160 ? "end" : lx > 160 ? "start" : "middle";
                return (
                  <text
                    key={`label-${index}`}
                    x={lx}
                    y={ly}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    fontSize="11"
                    fill="#4B5563"
                  >
                    {axis.label}
                  </text>
                );
              })}
              </svg>
            </div>
            </div>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                <item.icon className="w-6 h-6 text-black group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-medium mb-2 leading-[1.3] text-black">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-[1.5]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </section>
  );
}
