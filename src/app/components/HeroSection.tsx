import { ArrowRight, Mail, FileDown } from "lucide-react";
import { Logo } from "@/app/components/Logo";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-[#DEEEFE]/20">
      {/* Animated Background Grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </motion.div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Circle */}
        <motion.div
          className="absolute top-1/4 -left-20 w-64 h-64 border-2 border-[#DEEEFE] rounded-full"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Medium Square */}
        <motion.div
          className="absolute top-1/3 right-10 w-32 h-32 border-2 border-[#FA9819]/20"
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Small Triangle */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-[#48749E]/30"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
          animate={{
            y: [0, 25, 0],
            x: [0, 15, 0],
            rotate: [0, -120, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Rectangle */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-32 border-2 border-[#B6C9CF]/40"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Small Circle Top Right */}
        <motion.div
          className="absolute top-20 right-1/3 w-16 h-16 border-2 border-[#FA9819]/30 rounded-full"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Data Points with Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FA9819] rounded-full opacity-30"
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#48749E] rounded-full opacity-40"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-[#FA9819] rounded-full opacity-25"
          animate={{
            y: [0, 35, 0],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#48749E] rounded-full opacity-40"
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#FA9819] rounded-full opacity-30"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.65, 0.3],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Additional floating dots */}
        <motion.div 
          className="absolute top-1/2 left-1/5 w-1.5 h-1.5 bg-[#B6C9CF] rounded-full opacity-35"
          animate={{
            y: [0, 40, 0],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
        <motion.div 
          className="absolute bottom-1/2 right-1/5 w-2 h-2 bg-[#FA9819] rounded-full opacity-28"
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            opacity: [0.28, 0.58, 0.28],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Logo size={140} variant="color" animated className="drop-shadow-2xl" />
        </motion.div>

        {/* Headline */}
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Transforming Data into
          <span className="block mt-2 bg-gradient-to-r from-[#FA9819] via-[#B6C9CF] to-[#FA9819] bg-clip-text text-transparent">
            Visual Stories
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          I help data and engineering teams communicate insights with precision. 
          My focus is on building visual systems that reduce cognitive load, accelerate decision‑making, and scale across the organization.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <motion.button 
            className="group px-8 py-4 bg-[#FA9819] text-white rounded-lg hover:bg-[#e8890f] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button 
            className="px-8 py-4 bg-white text-slate-900 border-2 border-[#B6C9CF] rounded-lg hover:border-[#FA9819] transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-[#B6C9CF] rounded-full p-1">
          <motion.div 
            className="w-1.5 h-3 bg-[#FA9819] rounded-full mx-auto"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}