import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import { useHashNav } from "@/app/hooks/useHashNav";

export function Footer() {
  const { navigateToHash } = useHashNav();

  return (
    <footer id="contact" className="scroll-anchor bg-black border-t-4 border-accent">
      {/* Let's Connect Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Section accent line */}
            <div className="h-1 w-16 bg-accent mb-6 mx-auto"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2] text-white">Let&rsquo;s Connect</h2>
            <p className="text-base sm:text-lg text-gray-300 leading-[1.6] max-w-2xl mx-auto">
              Got a dataset nobody&rsquo;s made sense of yet, or a dashboard nobody opens?
              I&rsquo;m taking on a few new projects right now — let&rsquo;s talk about it.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <a
              href="mailto:2muhammadazhar@gmail.com"
              className="group p-6 bg-gray-900 border border-gray-700 rounded-xl hover:border-accent hover:bg-gray-800 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <Mail className="w-6 h-6 text-white group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1 leading-[1.3] text-white">Email Me</h3>
                  <p className="text-sm text-gray-400 leading-[1.5]">2muhammadazhar@gmail.com</p>
                </div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com/in/imagineazhar"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-gray-900 border border-gray-700 rounded-xl hover:border-accent hover:bg-gray-800 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <Linkedin className="w-6 h-6 text-white group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1 leading-[1.3] text-white">Connect on LinkedIn</h3>
                  <p className="text-sm text-gray-400 leading-[1.5]">The short version of my career so far</p>
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
              className="btn-luma btn-luma--icon w-10 h-10 flex items-center justify-center transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/imagineazhar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-luma btn-luma--icon w-10 h-10 flex items-center justify-center transition-all duration-300"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/imagineazhar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-luma btn-luma--icon w-10 h-10 flex items-center justify-center transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2026 Muhammad Azhar. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#about" onClick={(e) => navigateToHash(e, "#about")} className="hover:text-accent transition-colors">About</a>
            <a href="#portfolio" onClick={(e) => navigateToHash(e, "#portfolio")} className="hover:text-accent transition-colors">Work</a>
            <a href="#writing" onClick={(e) => navigateToHash(e, "#writing")} className="hover:text-accent transition-colors">Writing</a>
            <a href="#contact" onClick={(e) => navigateToHash(e, "#contact")} className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
