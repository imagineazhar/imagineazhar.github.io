import { Mail, Linkedin, Twitter, Github, FileDown } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-[#E8EBEF] via-white to-[#DEEEFE] border-t border-[#48749E]/30">
      {/* Let's Connect Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-6">Let's Connect</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Interested in collaborating on your next data visualization project? 
              I'm currently accepting new clients for consulting engagements.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <a 
              href="mailto:hello@dataviz.com"
              className="group p-6 bg-white border border-[#48749E]/50 rounded-xl hover:border-[#FA9819] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#DEEEFE] rounded-lg flex items-center justify-center group-hover:bg-[#FA9819] transition-colors duration-300">
                  <Mail className="w-6 h-6 text-[#1E3D59] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">Email Me</h3>
                  <p className="text-sm text-slate-600">2muhammadazhar@gmail.com</p>
                </div>
              </div>
            </a>

            {/* Resume Download Card */}
            <a 
              href="#"
              className="group p-6 bg-white border border-[#48749E]/50 rounded-xl hover:border-[#FA9819] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#DEEEFE] rounded-lg flex items-center justify-center group-hover:bg-[#FA9819] transition-colors duration-300">
                  <FileDown className="w-6 h-6 text-[#1E3D59] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">Download Resume</h3>
                  <p className="text-sm text-slate-600">View my full credentials</p>
                </div>
              </div>
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-3">
            <a 
              href="https://linkedin.com/in/imagineazhar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#DEEEFE] text-[#1E3D59] hover:bg-[#FA9819] hover:text-white transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/imagineazhar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#DEEEFE] text-[#1E3D59] hover:bg-[#FA9819] hover:text-white transition-all duration-300"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/imagineazhar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#DEEEFE] text-[#1E3D59] hover:bg-[#FA9819] hover:text-white transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-[#48749E]/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © 2024 DataViz Portfolio. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6 text-sm text-slate-600">
            <a href="#about" className="hover:text-[#FA9819] transition-colors">About</a>
            <a href="#portfolio" className="hover:text-[#FA9819] transition-colors">Work</a>
            <a href="#gallery" className="hover:text-[#FA9819] transition-colors">Gallery</a>
            <a href="#writing" className="hover:text-[#FA9819] transition-colors">Writing</a>
            <a href="#contact" className="hover:text-[#FA9819] transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}