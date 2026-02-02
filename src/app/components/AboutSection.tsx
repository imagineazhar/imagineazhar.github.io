import { Briefcase, Award, Users, TrendingUp } from "lucide-react";

export function AboutSection() {
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
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2]">About</h2>
          <p className="text-lg text-slate-600 leading-[1.6] mb-6">
            I'm a data visualization consultant with a passion for transforming complex information 
            into clear, compelling visual narratives. With 5+ years of experience, 
            I help organizations make better decisions through smart design and clear analysis.
          </p>
          <p className="text-lg text-slate-600 leading-[1.6]">
            My approach combines deep technical expertise with a human-centered design philosophy, 
            ensuring every visualization not only looks beautiful but serves a genuine purpose in 
            driving understanding and action.
          </p>
        </div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item, index) => (
            <div 
              key={index}
              className="p-6 border border-[#48749E]/50 rounded-lg hover:border-[#FA9819] transition-all duration-300 hover:shadow-lg group"
            >
              <div className="w-12 h-12 bg-[#DEEEFE] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FA9819] transition-colors duration-300">
                <item.icon className="w-6 h-6 text-[#1E3D59] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-medium mb-2 leading-[1.3]">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-[1.5]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}