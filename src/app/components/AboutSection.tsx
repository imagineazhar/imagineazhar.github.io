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
    <section id="about" className="relative py-32 bg-gray-50">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          {/* Section accent line */}
          <div className="h-1 w-16 bg-black mb-6"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2] text-black">About</h2>
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

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-black hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-300">
                <item.icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
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