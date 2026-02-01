import { ArrowRight, Mail, FileDown } from "lucide-react";
import { Logo } from "@/app/components/Logo";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-[#DEEEFE]/20">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Data Points */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FA9819] rounded-full opacity-30 animate-pulse" style={{animationDelay: '0s'}} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#48749E] rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-[#FA9819] rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#48749E] rounded-full opacity-40 animate-pulse" style={{animationDelay: '1.5s'}} />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#FA9819] rounded-full opacity-30 animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Logo size={140} variant="color" animated className="drop-shadow-2xl" />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Transforming Data into
          <span className="block mt-2 bg-gradient-to-r from-[#FA9819] via-[#B6C9CF] to-[#FA9819] bg-clip-text text-transparent">
            Visual Stories
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          I help data and engineering teams communicate insights with precision. 
          My focus is on building visual systems that reduce cognitive load, accelerate decision‑making, and scale across the organization.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group px-8 py-4 bg-[#FA9819] text-white rounded-lg hover:bg-[#e8890f] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
            View Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white text-slate-900 border-2 border-[#B6C9CF] rounded-lg hover:border-[#FA9819] transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md">
            <Mail className="w-5 h-5" />
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#B6C9CF] rounded-full p-1">
          <div className="w-1.5 h-3 bg-[#FA9819] rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}