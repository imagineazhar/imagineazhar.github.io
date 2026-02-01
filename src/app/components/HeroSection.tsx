import { ArrowRight, Mail, FileDown } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-[#C6EBF7]/10">
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
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#B6C9CF] rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-[#FA9819] rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#B6C9CF] rounded-full opacity-40 animate-pulse" style={{animationDelay: '1.5s'}} />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#FA9819] rounded-full opacity-30 animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 240 240" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl"
          >
            {/* Central Spark */}
            <circle cx="120" cy="120" r="8" fill="#FA9819" className="animate-pulse"/>
            
            {/* Expanding Signal Waves */}
            <g className="origin-center" style={{animation: 'expand 3s ease-in-out infinite'}}>
              <path 
                d="M 120 80 Q 140 90, 145 110 Q 148 120, 145 130 Q 140 150, 120 160 Q 100 150, 95 130 Q 92 120, 95 110 Q 100 90, 120 80 Z" 
                stroke="#FA9819"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              <path 
                d="M 120 60 Q 155 70, 165 110 Q 170 120, 165 130 Q 155 170, 120 180 Q 85 170, 75 130 Q 70 120, 75 110 Q 85 70, 120 60 Z" 
                stroke="#B6C9CF"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
              <path 
                d="M 120 40 Q 170 55, 185 110 Q 192 120, 185 130 Q 170 185, 120 200 Q 70 185, 55 130 Q 48 120, 55 110 Q 70 55, 120 40 Z" 
                stroke="#C6EBF7"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
            </g>
            
            {/* Flowing Data Streams */}
            <g opacity="0.8">
              <path d="M 125 115 Q 145 100, 165 95 Q 175 93, 180 98" stroke="#FA9819" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
              <circle cx="180" cy="98" r="4" fill="#FA9819" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
              <circle cx="165" cy="95" r="3" fill="#FA9819" opacity="0.7"/>
              
              <path d="M 128 120 Q 155 120, 175 118 Q 185 117, 190 120" stroke="#FA9819" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
              <circle cx="190" cy="120" r="4" fill="#FA9819" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
              <circle cx="175" cy="118" r="3" fill="#FA9819" opacity="0.7"/>
              
              <path d="M 125 125 Q 145 140, 165 145 Q 175 147, 180 142" stroke="#FA9819" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
              <circle cx="180" cy="142" r="4" fill="#FA9819" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
              <circle cx="165" cy="145" r="3" fill="#FA9819" opacity="0.7"/>
              
              <path d="M 115 115 Q 95 100, 75 95 Q 65 93, 60 98" stroke="#B6C9CF" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
              <circle cx="60" cy="98" r="4" fill="#B6C9CF" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
              <circle cx="75" cy="95" r="3" fill="#B6C9CF" opacity="0.7"/>
              
              <path d="M 112 120 Q 85 120, 65 118 Q 55 117, 50 120" stroke="#B6C9CF" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
              <circle cx="50" cy="120" r="4" fill="#B6C9CF" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
              <circle cx="65" cy="118" r="3" fill="#B6C9CF" opacity="0.7"/>
              
              <path d="M 115 125 Q 95 140, 75 145 Q 65 147, 60 142" stroke="#B6C9CF" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.8s'}}/>
              <circle cx="60" cy="142" r="4" fill="#B6C9CF" className="animate-pulse" style={{animationDelay: '0.8s'}}/>
              <circle cx="75" cy="145" r="3" fill="#B6C9CF" opacity="0.7"/>
            </g>
            
            {/* Analytical Grid Lines */}
            <g opacity="0.15">
              <line x1="30" y1="90" x2="210" y2="90" stroke="#B6C9CF" strokeWidth="0.5"/>
              <line x1="30" y1="120" x2="210" y2="120" stroke="#B6C9CF" strokeWidth="0.5"/>
              <line x1="30" y1="150" x2="210" y2="150" stroke="#B6C9CF" strokeWidth="0.5"/>
              <line x1="90" y1="30" x2="90" y2="210" stroke="#B6C9CF" strokeWidth="0.5"/>
              <line x1="120" y1="30" x2="120" y2="210" stroke="#B6C9CF" strokeWidth="0.5"/>
              <line x1="150" y1="30" x2="150" y2="210" stroke="#B6C9CF" strokeWidth="0.5"/>
            </g>
            
            {/* Particle Field */}
            <g opacity="0.3">
              <circle cx="80" cy="70" r="1.5" fill="#FA9819"/>
              <circle cx="160" cy="75" r="1.5" fill="#FA9819"/>
              <circle cx="70" cy="165" r="1.5" fill="#B6C9CF"/>
              <circle cx="170" cy="170" r="1.5" fill="#B6C9CF"/>
              <circle cx="95" cy="55" r="1" fill="#FA9819"/>
              <circle cx="145" cy="58" r="1" fill="#FA9819"/>
              <circle cx="92" cy="182" r="1" fill="#B6C9CF"/>
              <circle cx="148" cy="185" r="1" fill="#B6C9CF"/>
            </g>
          </svg>
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
          Expert data visualization consulting that turns complex information into clear, 
          compelling insights. Where analytical precision meets creative imagination.
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