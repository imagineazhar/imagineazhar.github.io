import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // If not on homepage, navigate to homepage with hash
      navigate(`/${hash}`);
    } else {
      // If on homepage, just scroll to section
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8EBEF]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 240 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:scale-110"
            >
              {/* Central Spark */}
              <circle cx="120" cy="120" r="8" fill="#FA9819" />

              {/* Expanding Signal Waves */}
              <g>
                <path
                  d="M 120 80 Q 140 90, 145 110 Q 148 120, 145 130 Q 140 150, 120 160 Q 100 150, 95 130 Q 92 120, 95 110 Q 100 90, 120 80 Z"
                  stroke="#FA9819"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M 120 60 Q 155 70, 165 110 Q 170 120, 165 130 Q 155 170, 120 180 Q 85 170, 75 130 Q 70 120, 75 110 Q 85 70, 120 60 Z"
                  stroke="#48749E"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.5"
                />
              </g>

              {/* Flowing Data Streams */}
              <g opacity="0.8">
                <path
                  d="M 125 115 Q 145 100, 165 95 Q 175 93, 180 98"
                  stroke="#FA9819"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="180" cy="98" r="4" fill="#FA9819" />

                <path
                  d="M 128 120 Q 155 120, 175 118 Q 185 117, 190 120"
                  stroke="#FA9819"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle
                  cx="190"
                  cy="120"
                  r="4"
                  fill="#FA9819"
                />

                <path
                  d="M 125 125 Q 145 140, 165 145 Q 175 147, 180 142"
                  stroke="#FA9819"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle
                  cx="180"
                  cy="142"
                  r="4"
                  fill="#FA9819"
                />

                <path
                  d="M 115 115 Q 95 100, 75 95 Q 65 93, 60 98"
                  stroke="#48749E"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="98" r="4" fill="#48749E" />

                <path
                  d="M 112 120 Q 85 120, 65 118 Q 55 117, 50 120"
                  stroke="#48749E"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="120" r="4" fill="#48749E" />

                <path
                  d="M 115 125 Q 95 140, 75 145 Q 65 147, 60 142"
                  stroke="#48749E"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="142" r="4" fill="#48749E" />
              </g>
            </svg>
            <span className="text-xl font-semibold text-[#1E3D59]">
              Muhammad Azhar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
            >
              Home
            </Link>
            <a
              href="#about"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
              onClick={(e) => handleHashNavigation(e, "#about")}
            >
              About
            </a>
            <a
              href="#portfolio"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
              onClick={(e) => handleHashNavigation(e, "#portfolio")}
            >
              Work
            </a>
            <Link
              to="/gallery"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
            >
              Gallery
            </Link>
            <a
              href="#writing"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
              onClick={(e) => handleHashNavigation(e, "#writing")}
            >
              Writing
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-[#FA9819] text-white rounded-lg hover:bg-[#e8890f] transition-all duration-300 shadow-sm hover:shadow-md ml-2"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-[#E8EBEF] mt-4">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#about"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={(e) => handleHashNavigation(e, "#about")}
              >
                About
              </a>
              <a
                href="#portfolio"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={(e) => handleHashNavigation(e, "#portfolio")}
              >
                Work
              </a>
              <Link
                to="/gallery"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <a
                href="#writing"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={(e) => handleHashNavigation(e, "#writing")}
              >
                Writing
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-[#FA9819] text-white rounded-lg hover:bg-[#e8890f] transition-all duration-300 text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}