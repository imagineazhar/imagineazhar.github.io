import { Mail, Linkedin, Github, FileDown } from "lucide-react";
import { XIcon } from "@/app/components/icons/XIcon";

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 border-t border-gray-200">
      {/* Let's Connect Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Section accent line */}
            <div className="h-1 w-16 bg-black mb-6 mx-auto"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2] text-black">Let's Connect</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-[1.6] max-w-2xl mx-auto">
              Interested in collaborating on your next data visualization project? 
              I'm currently accepting new clients for consulting engagements.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <a 
              href="mailto:hello@dataviz.com"
              className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                  <Mail className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1 leading-[1.3] text-black">Email Me</h3>
                  <p className="text-sm text-gray-600 leading-[1.5]">2muhammadazhar@gmail.com</p>
                </div>
              </div>
            </a>

            {/* Resume Download Card */}
            <a 
              href="#"
              className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                  <FileDown className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1 leading-[1.3] text-black">Download Resume</h3>
                  <p className="text-sm text-gray-600 leading-[1.5]">View my full credentials</p>
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
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/imagineazhar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <XIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/imagineazhar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2024 DataViz Portfolio. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#portfolio" className="hover:text-black transition-colors">Work</a>
            <a href="#gallery" className="hover:text-black transition-colors">Gallery</a>
            <a href="#writing" className="hover:text-black transition-colors">Writing</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}