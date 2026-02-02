import { ArrowRight, Mail, FileDown } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Point {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [points, setPoints] = useState<Point[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Generate grid of points
    const cols = 12;
    const rows = 8;
    const newPoints: Point[] = [];
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newPoints.push({
          id: i * cols + j,
          x: (j / (cols - 1)) * 100,
          y: (i / (rows - 1)) * 100,
          baseX: (j / (cols - 1)) * 100,
          baseY: (i / (rows - 1)) * 100
        });
      }
    }
    
    setPoints(newPoints);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || prefersReducedMotion) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    mouseX.set(x);
    mouseY.set(y);

    // Update points based on mouse position (magnetic effect)
    setPoints(prevPoints => 
      prevPoints.map(point => {
        const dx = point.baseX - x;
        const dy = point.baseY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 25; // Influence radius
        
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 3; // Magnetic strength
          return {
            ...point,
            x: point.baseX + dx * force * 0.3,
            y: point.baseY + dy * force * 0.3
          };
        }
        
        // Smoothly return to base position
        return {
          ...point,
          x: point.x + (point.baseX - point.x) * 0.1,
          y: point.y + (point.baseY - point.y) * 0.1
        };
      })
    );
  };

  const handleMouseLeave = () => {
    // Smoothly return all points to base position
    setPoints(prevPoints => 
      prevPoints.map(point => ({
        ...point,
        x: point.baseX,
        y: point.baseY
      }))
    );
  };

  // Create lines between adjacent points
  const createLines = () => {
    const lines: JSX.Element[] = [];
    const cols = 12;
    const rows = 8;

    points.forEach((point, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      // Horizontal lines
      if (col < cols - 1) {
        const nextPoint = points[index + 1];
        lines.push(
          <motion.line
            key={`h-${point.id}`}
            x1={`${point.x}%`}
            y1={`${point.y}%`}
            x2={`${nextPoint.x}%`}
            y2={`${nextPoint.y}%`}
            stroke="#000000"
            strokeWidth="0.5"
            opacity="0.1"
          />
        );
      }

      // Vertical lines
      if (row < rows - 1) {
        const nextPoint = points[index + cols];
        lines.push(
          <motion.line
            key={`v-${point.id}`}
            x1={`${point.x}%`}
            y1={`${point.y}%`}
            x2={`${nextPoint.x}%`}
            y2={`${nextPoint.y}%`}
            stroke="#000000"
            strokeWidth="0.5"
            opacity="0.1"
          />
        );
      }
    });

    return lines;
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Magnetic Lines Background */}
      {!prefersReducedMotion && points.length > 0 && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Removed gradients - using solid colors */}
          </defs>
          
          {/* Draw lines */}
          {createLines()}
          
          {/* Draw points */}
          {points.map(point => (
            <motion.circle
              key={`point-${point.id}`}
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r="2"
              fill="#000000"
              opacity="0.15"
            />
          ))}
        </svg>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        {/* Headline */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1] font-medium text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Transforming Data into
          <span className="block mt-3 text-black">
            Visual Stories
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-[1.6]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          I help data and engineering teams communicate insights with precision. 
          My focus is on building visual systems that reduce cognitive load, accelerate decision‑making, and scale across the organization.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <motion.button 
            className="group px-8 py-4 bg-black text-white text-base font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.a 
            href="https://cal.com/muhammad-azhar-tbumar/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black text-base font-medium border-2 border-black rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </motion.a>
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
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full p-1">
          <motion.div 
            className="w-1.5 h-3 bg-black rounded-full mx-auto"
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