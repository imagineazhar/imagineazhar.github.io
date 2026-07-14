import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { caseStudies } from "@/app/data/caseStudies";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { buildUrl, setPageMeta } from "@/app/utils/seo";

function Reveal({
  id,
  className,
  delay = 0,
  children,
}: {
  id?: string;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const caseStudy = caseStudies.find((cs) => cs.id === id);
  const caseStudyIndex = caseStudies.findIndex((cs) => cs.id === id);
  const nextProject =
    caseStudy && caseStudies.length > 1
      ? caseStudies[(caseStudyIndex + 1) % caseStudies.length]
      : null;

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  const sections = useMemo(() => {
    if (!caseStudy) return [];
    return [
      { id: "impact", label: "Impact" },
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Challenge" },
      { id: "approach", label: "Approach" },
      { id: "solution", label: "Solution" },
      ...(caseStudy.dashboardGallery?.length ? [{ id: "dashboards", label: "Dashboards" }] : []),
      ...(caseStudy.testimonial ? [{ id: "testimonial", label: "Testimonial" }] : []),
      ...(caseStudy.reflection?.length ? [{ id: "reflection", label: "Reflection" }] : []),
      { id: "tools", label: "Tools" },
    ];
  }, [caseStudy]);

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (!caseStudy || sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [caseStudy, sections]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!caseStudy) {
      setPageMeta({
        title: "Case Study Not Found | Muhammad Azhar",
        description:
          "The requested case study could not be found. Explore data visualization and analytics work.",
        url: buildUrl(`/case-study/${id ?? ""}`),
      });
      return;
    }

    setPageMeta({
      title: `${caseStudy.title} | Case Study`,
      description: caseStudy.description,
      url: buildUrl(`/case-study/${caseStudy.id}`),
      image: caseStudy.image,
      imageAlt: caseStudy.title,
    });
  }, [caseStudy, id]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-4 text-black">Case Study Not Found</h1>
          <Link
            to="/"
            className="text-black hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progressScaleX, top: "var(--nav-height)" }}
        className="fixed left-0 right-0 z-40 h-1 origin-left bg-accent"
        aria-hidden="true"
      />

      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="btn-luma group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-base font-medium">Back to Home</span>
          </button>
          <p className="text-sm text-gray-400">
            Project {caseStudyIndex + 1} of {caseStudies.length}
          </p>
        </div>
      </div>

      {/* Concept banner */}
      {caseStudy.isConcept && (
        <div className="border-b border-dashed border-gray-300 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-600">
            <span className="font-medium text-black">Concept project.</span>{" "}
            {caseStudy.conceptNote ?? "A self-directed design exploration, not a client engagement."}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-1 w-16 bg-accent mb-6"></div>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full">
                {caseStudy.category}
              </span>
              {caseStudy.isConcept && (
                <span className="px-4 py-1.5 border border-dashed border-gray-400 text-gray-600 text-sm font-medium rounded-full">
                  Concept
                </span>
              )}
              <span className="text-sm text-gray-500">{caseStudy.duration}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium mb-6 leading-[1.1] text-black">
              {caseStudy.title}
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mb-8 leading-[1.5]">
              {caseStudy.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div>
                <span className="font-medium text-black">Client:</span> {caseStudy.client}
              </div>
              <div>
                <span className="font-medium text-black">Team:</span> {caseStudy.team}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <ImageWithFallback
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Key Metrics */}
      <section id="impact" className="scroll-anchor py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-medium mb-12 text-center text-black">Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudy.results.map((result, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-white border border-gray-200"
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="text-3xl sm:text-4xl font-medium text-accent mb-3">
                  {result.metric}
                </div>
                <p className="text-sm text-gray-600 leading-[1.5]">
                  {result.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
          {/* Sticky in-page nav (desktop only) */}
          {sections.length > 0 && (
            <nav aria-label="Case study sections" className="hidden lg:block">
              <div className="sticky space-y-1" style={{ top: "calc(var(--nav-height) + 24px)" }}>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-400">On this page</p>
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => scrollToSection(e, s.id)}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      activeSection === s.id
                        ? "bg-gray-100 text-black font-medium"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </nav>
          )}

          <div className="max-w-3xl">
            {/* Overview */}
            <Reveal id="overview" className="scroll-anchor mb-16">
              <div className="h-1 w-16 bg-accent mb-6"></div>
              <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">Overview</h2>
              <p className="text-lg text-gray-600 leading-[1.7]">
                {caseStudy.overview}
              </p>
            </Reveal>

            {/* Challenge */}
            <Reveal id="challenge" className="scroll-anchor mb-16">
              <div className="h-1 w-16 bg-accent mb-6"></div>
              <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">The Challenge</h2>
              <p className="text-lg text-gray-600 leading-[1.7]">
                {caseStudy.challenge}
              </p>
            </Reveal>

            {/* Approach — vertical timeline */}
            <Reveal id="approach" className="scroll-anchor mb-16">
              <div className="h-1 w-16 bg-accent mb-6"></div>
              <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">Our Approach</h2>
              <div className="relative">
                <div
                  className="absolute left-5 top-2 bottom-2 w-px bg-gray-200"
                  aria-hidden="true"
                />
                <div className="space-y-8">
                  {caseStudy.approach.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                      className="relative flex gap-4 items-start"
                    >
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-accent flex items-center justify-center">
                        <span className="text-sm font-semibold text-accent">{index + 1}</span>
                      </div>
                      <p className="text-lg text-gray-600 leading-[1.7] pt-1.5">
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Solution */}
            <Reveal id="solution" className="scroll-anchor mb-16">
              <div className="h-1 w-16 bg-accent mb-6"></div>
              <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">The Solution</h2>
              <p className="text-lg text-gray-600 leading-[1.7]">
                {caseStudy.solution}
              </p>
            </Reveal>

            {/* Dashboards */}
            {caseStudy.dashboardGallery?.length ? (
              <Reveal id="dashboards" className="scroll-anchor mb-16">
                <div className="h-1 w-16 bg-accent mb-6"></div>
                <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">
                  Dashboards
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudy.dashboardGallery.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                      className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/10] bg-gray-100">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-black">
                          {item.title}
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-gray-500 mb-3">
                          {item.description}
                        </p>
                        <div className="space-y-2">
                          {item.insights.map((insight, insightIndex) => (
                            <div
                              key={insightIndex}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                              <span>{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {/* Testimonial */}
            {caseStudy.testimonial ? (
              <Reveal id="testimonial" className="scroll-anchor mb-16">
                <div className="h-1 w-16 bg-accent mb-6"></div>
                <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">What They Said</h2>
                <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-10">
                  <Quote className="absolute top-6 left-6 w-8 h-8 text-accent/30" aria-hidden="true" />
                  <p className="relative text-xl sm:text-2xl text-black leading-[1.5] mb-6 pl-2">
                    &ldquo;{caseStudy.testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-medium text-black">{caseStudy.testimonial.author}</p>
                      <p className="text-sm text-gray-500">{caseStudy.testimonial.role}</p>
                    </div>
                    {caseStudy.isConcept && (
                      <p className="text-xs text-gray-400 italic">
                        Illustrative testimonial — concept project
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ) : null}

            {/* Reflection */}
            {caseStudy.reflection?.length ? (
              <Reveal id="reflection" className="scroll-anchor mb-16">
                <div className="h-1 w-16 bg-accent mb-6"></div>
                <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">
                  Reflection / Key Takeaways
                </h2>
                <div className="space-y-3">
                  {caseStudy.reflection.map((note, index) => (
                    <p
                      key={index}
                      className="text-lg text-gray-600 leading-[1.7]"
                    >
                      {note}
                    </p>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {/* Tools & Technologies */}
            <Reveal id="tools" className="scroll-anchor mb-4">
              <div className="h-1 w-16 bg-accent mb-6"></div>
              <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {caseStudy.tools.map((tool, index) => (
                  <motion.span
                    key={index}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                    className="px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium text-base hover:border-black transition-colors"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Next project */}
      {nextProject && (
        <section className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Next Project</p>
            <Link
              to={`/case-study/${nextProject.id}`}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-lg"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-medium text-black mb-2 leading-[1.2]">
                  {nextProject.title}
                </h3>
                <p className="text-sm text-gray-500">{nextProject.client}</p>
              </div>
              <span className="inline-flex flex-shrink-0 items-center gap-2 text-sm font-medium text-black transition-colors group-hover:text-accent">
                View case study
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
