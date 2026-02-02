import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { caseStudies } from "@/app/data/caseStudies";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { useEffect } from "react";

export function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const caseStudy = caseStudies.find(cs => cs.id === id);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-base font-medium">Back to Home</span>
          </motion.button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full">
                {caseStudy.category}
              </span>
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
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-medium mb-12 text-center text-black">Key Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudy.results.map((result, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-white border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="text-3xl sm:text-4xl font-medium text-black mb-3">
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
        <div className="max-w-5xl mx-auto px-6">
          {/* Overview */}
          <div className="mb-16">
            <div className="h-1 w-16 bg-black mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">Overview</h2>
            <p className="text-lg text-gray-600 leading-[1.7]">
              {caseStudy.overview}
            </p>
          </div>

          {/* Challenge */}
          <div className="mb-16">
            <div className="h-1 w-16 bg-black mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">The Challenge</h2>
            <p className="text-lg text-gray-600 leading-[1.7]">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Approach */}
          <div className="mb-16">
            <div className="h-1 w-16 bg-black mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">Our Approach</h2>
            <div className="space-y-4">
              {caseStudy.approach.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg text-gray-600 leading-[1.7]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="mb-16">
            <div className="h-1 w-16 bg-black mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">The Solution</h2>
            <p className="text-lg text-gray-600 leading-[1.7]">
              {caseStudy.solution}
            </p>
          </div>

          {/* Tools & Technologies */}
          <div className="mb-16">
            <div className="h-1 w-16 bg-black mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-medium mb-6 text-black">Tools & Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {caseStudy.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium text-base hover:border-black transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}