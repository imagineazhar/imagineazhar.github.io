import { ArrowDownRight } from "lucide-react";
import { useHashNav } from "../hooks/useHashNav";

interface OctagonGlyphProps {
  stacks?: number;
}

function OctagonGlyph({ stacks = 1 }: OctagonGlyphProps) {
  const layers = Array.from({ length: stacks }, (_, i) => i);
  return (
    <svg
      width="72"
      height="72"
      viewBox="-16 -16 104 104"
      fill="none"
      aria-hidden="true"
      className="text-black/70"
    >
      {layers.map((i) => (
        <polygon
          key={i}
          points="26,4 46,4 64,22 64,42 46,60 26,60 8,42 8,22"
          transform={`translate(${i * 7}, ${-i * 6})`}
          stroke="currentColor"
          strokeWidth="1.25"
          fill="none"
          opacity={1 - i * 0.22}
        />
      ))}
    </svg>
  );
}

export function AboutSection() {
  const { navigateToHash } = useHashNav();
  const radarAxes = [
    { label: "Data Storytelling", value: 0.9 },
    { label: "Visual Design", value: 0.85 },
    { label: "Analytics", value: 0.8 },
    { label: "Research", value: 0.7 },
    { label: "Engineering", value: 0.75 },
    { label: "Strategy", value: 0.88 },
  ];

  const polarPoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = 120 * value;
    const x = 160 + Math.cos(angle) * radius;
    const y = 160 + Math.sin(angle) * radius;
    return `${x},${y}`;
  };

  const pillars = [
    {
      title: "Dashboards People Open",
      description:
        "Not another report that gets built, presented once, and forgotten. I design for the Monday morning check-in leadership actually shows up for.",
      stacks: 1,
    },
    {
      title: "Answers, Not Just Numbers",
      description:
        "Modeling and forecasting that end in a recommendation, not a spreadsheet — so someone can act on it with confidence.",
      stacks: 2,
    },
    {
      title: "Getting Teams On Board",
      description:
        "Training and workshops that help a team trust the data enough to actually use it when making a decision.",
      stacks: 3,
    },
  ];

  return (
    <section id="about" className="scroll-anchor relative py-32 bg-gray-50">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <p
          className="mb-6 text-sm tracking-[0.25em] text-gray-500"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          [ ABOUT ]
        </p>

        {/* Headline + CTA */}
        <div className="mb-20">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] mb-10 font-semibold uppercase leading-[1.05] text-black max-w-5xl"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            Data doesn&rsquo;t make decisions. People do. I make sure they have what they need.
          </h2>
{/* 
          <a
            href="#portfolio"
            onClick={(e) => navigateToHash(e, "#portfolio")}
            className="btn-luma btn-luma--primary px-6 py-3.5 text-sm font-semibold uppercase tracking-wide"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <ArrowDownRight className="w-4 h-4" />
            Learn more
          </a> */}
        </div>

        {/* Pillar grid (about_us.png reference) */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200 mb-24">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`py-10 px-2 md:px-8 ${
                index > 0 ? "md:border-l border-gray-200" : ""
              }`}
            >
              <div className="mb-8 h-[72px] flex items-end">
                <OctagonGlyph stacks={pillar.stacks} />
              </div>
              <h3
                className="text-xl md:text-2xl mb-3 font-semibold text-black"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {pillar.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-[1.6]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Signature block: personal bio + identity cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center pt-16 border-t border-gray-200">
          <div className="max-w-2xl">
            <p
              className="mb-4 text-xs tracking-[0.25em] text-gray-500"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [ WHO&rsquo;S BEHIND IT ]
            </p>
            <p className="text-lg text-gray-600 leading-[1.6] mb-6">
              I work with data in environments where clarity matters and decisions carry
              real consequences. My focus isn&rsquo;t producing dashboards — it&rsquo;s shaping
              analysis to support sound judgment.
            </p>
            <p className="text-lg text-gray-600 leading-[1.6]">
              To me, analytics is a design problem as much as a technical one: what
              matters, to whom, and at what moment. I&rsquo;ve spent my career in the messy
              middle of that — many stakeholders, shifting requirements, and data that&rsquo;s
              never quite as clean as you&rsquo;d like.
            </p>
          </div>

          <div className="group/stack relative">
            <div className="relative h-[420px] w-full max-w-[380px] mx-auto">
              {/* Portrait Card */}
              <div className="absolute left-0 top-0 w-full bg-white border border-gray-200 transition-all duration-300 ease-out z-20 shadow-md group-hover/stack:z-10 group-hover/stack:translate-x-3 group-hover/stack:translate-y-6 group-hover/stack:shadow-sm">
                <div className="p-4 sm:p-6">
                  <div className="aspect-square w-full overflow-hidden bg-gray-100">
                    <img
                      src="/portrait.png"
                      alt="Portrait of Muhammad Azhar"
                      className="h-full w-full object-cover saturate-90 contrast-105 brightness-95"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Radar Card */}
              <div className="absolute left-0 top-0 w-full bg-white border border-gray-200 transition-all duration-300 ease-out z-10 translate-x-3 translate-y-6 rotate-[-8deg] shadow-sm group-hover/stack:z-20 group-hover/stack:translate-x-0 group-hover/stack:translate-y-0 group-hover/stack:rotate-0 group-hover/stack:shadow-md hover:border-accent">
                <div className="p-4 sm:p-6">
                  <div className="w-full max-w-[380px] mx-auto px-2">
                    <svg
                      viewBox="-20 -20 360 360"
                      preserveAspectRatio="xMidYMid meet"
                      className="w-full h-auto overflow-visible"
                      role="img"
                      aria-label="Radar chart showing skill strengths"
                    >
                      <defs>
                        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="rgba(255,90,31,0.35)" />
                          <stop offset="100%" stopColor="rgba(255,90,31,0.04)" />
                        </linearGradient>
                      </defs>

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

                      <polygon
                        points={radarAxes
                          .map((axis, index) => polarPoint(axis.value, index, radarAxes.length))
                          .join(" ")}
                        fill="url(#radarFill)"
                        stroke="rgba(255,90,31,0.85)"
                        strokeWidth="2"
                      />

                      {radarAxes.map((axis, index) => {
                        const [x, y] = polarPoint(axis.value, index, radarAxes.length)
                          .split(",")
                          .map(Number);
                        return (
                          <circle key={`point-${index}`} cx={x} cy={y} r="4" fill="#FF5A1F" />
                        );
                      })}

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
                            fill="var(--color-gray-700)"
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
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
    </section>
  );
}
