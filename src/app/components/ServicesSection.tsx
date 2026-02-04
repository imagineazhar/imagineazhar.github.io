import {
  BarChart3,
  Layout,
  Lightbulb,
  TrendingUp,
  Database,
} from "lucide-react";

const services = [
  {
    title: "Data Visualization",
    icon: BarChart3,
  },
  {
    title: "Dashboard Development",
    icon: Layout,
  },
  {
    title: "Analytics Consulting",
    icon: Lightbulb,
  },
  {
    title: "Data Strategy",
    icon: TrendingUp,
  },
  {
    title: "Business Intelligence",
    icon: Database,
  },
];

export function ServicesSection() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div className="flex flex-col justify-between">
            <div>
              <h2
                className="text-5xl md:text-6xl mb-6 leading-tight"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
               Services.
              </h2>
              <p
                className="text-gray-400 text-lg leading-relaxed mb-12"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                I transform complex data into clear, impactful
                insights. Explore the services that help
                organizations grow, connect, and inspire.
              </p>
              <p
                className="text-gray-400 text-lg leading-relaxed mb-12"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Tools and tecnologies are chosen based on
                context, contraints, and business needs (not
                prefernce).
              </p>
            </div>
            <div>
              <a
                href="https://cal.com/muhammad-azhar-tbumar/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all duration-300 font-medium"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Let's work Together
              </a>
            </div>
          </div>

          {/* Right Column - Services List */}
          <div className="flex flex-col">
            {services.map((service, index) => (
              <div key={service.title}>
                <div className="flex items-center justify-between py-8">
                  <span
                    className="text-xl md:text-2xl"
                    style={{
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    {service.title}
                  </span>
                  <service.icon
                    className="w-6 h-6 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                {index < services.length - 1 && (
                  <div className="border-t border-gray-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
